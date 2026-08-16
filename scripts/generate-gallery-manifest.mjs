import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const smallDirectory = path.join(projectRoot, "public", "gallery_small");
const highDirectory = path.join(projectRoot, "public", "gallery_high");
const manifestPath = path.join(
  projectRoot,
  "src",
  "data",
  "gallery.generated.ts"
);
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function normalizeName(fileName) {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension).toLocaleLowerCase();

  return baseName
    .replace(/\s*\(\d+\)(?=_result$|$)/, "")
    .replace(/(?:_result)+$/, "_result");
}

function readWebpDimensions(buffer) {
  for (let offset = 12; offset + 8 <= buffer.length; ) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkLength = buffer.readUInt32LE(offset + 4);
    const chunkStart = offset + 8;

    if (chunkType === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(chunkStart + 4, 3),
        height: 1 + buffer.readUIntLE(chunkStart + 7, 3),
      };
    }

    if (chunkType === "VP8 ") {
      return {
        width: buffer.readUInt16LE(chunkStart + 6) & 0x3fff,
        height: buffer.readUInt16LE(chunkStart + 8) & 0x3fff,
      };
    }

    if (chunkType === "VP8L") {
      const bits = buffer.readUInt32LE(chunkStart + 1);

      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >>> 14) & 0x3fff) + 1,
      };
    }

    offset = chunkStart + chunkLength + (chunkLength % 2);
  }

  throw new Error("Nepoznat WEBP format.");
}

function readJpegDimensions(buffer) {
  let offset = 2;

  while (offset + 9 < buffer.length) {
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd8 || marker === 0xd9) continue;

    const segmentLength = buffer.readUInt16BE(offset);
    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isStartOfFrame) {
      return {
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3),
      };
    }

    offset += segmentLength;
  }

  throw new Error("Nepoznat JPEG format.");
}

function readPngDimensions(buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function readImageDimensions(filePath) {
  const buffer = await readFile(filePath);
  const extension = path.extname(filePath).toLocaleLowerCase();

  if (extension === ".webp") return readWebpDimensions(buffer);
  if (extension === ".png") return readPngDimensions(buffer);
  if (extension === ".jpg" || extension === ".jpeg") {
    return readJpegDimensions(buffer);
  }

  throw new Error(`Format ${extension} trenutno nije podržan za galeriju.`);
}

async function listImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  return entries
    .filter(
      (entry) =>
        entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLocaleLowerCase())
    )
    .map((entry) => entry.name)
    .sort((first, second) => first.localeCompare(second, "en", { numeric: true }));
}

function createManifestSource(items) {
  return `// Ovaj fajl se generiše komandom \`npm run generate:gallery\`.\n// Ne menjati ručno.\n\nexport type GalleryManifestItem = {\n  alt: string;\n  height: number;\n  highSrc: string;\n  smallSrc: string;\n  width: number;\n};\n\nexport const galleryItems: GalleryManifestItem[] = ${JSON.stringify(
    items,
    null,
    2
  )};\n`;
}

async function main() {
  const [smallFiles, highFiles] = await Promise.all([
    listImages(smallDirectory),
    listImages(highDirectory),
  ]);
  const highByName = new Map(highFiles.map((fileName) => [fileName, fileName]));
  const highByNormalizedName = new Map();

  highFiles.forEach((fileName) => {
    const normalizedName = normalizeName(fileName);
    const existing = highByNormalizedName.get(normalizedName);

    if (existing) {
      throw new Error(
        `Više high-res fotografija ima isto normalizovano ime: ${existing}, ${fileName}.`
      );
    }

    highByNormalizedName.set(normalizedName, fileName);
  });

  const items = await Promise.all(
    smallFiles.map(async (smallFileName, index) => {
      const highFileName =
        highByName.get(smallFileName) ??
        highByNormalizedName.get(normalizeName(smallFileName));

      if (!highFileName) {
        throw new Error(
          `Nedostaje high-res par za fotografiju: ${smallFileName}`
        );
      }

      const { width, height } = await readImageDimensions(
        path.join(smallDirectory, smallFileName)
      );

      return {
        smallSrc: `/gallery_small/${smallFileName}`,
        highSrc: `/gallery_high/${highFileName}`,
        alt: `Event Rent oprema i postavka za proslavu na otvorenom — fotografija ${
          index + 1
        }`,
        width,
        height,
      };
    })
  );

  await writeFile(manifestPath, createManifestSource(items), "utf8");
  console.log(`Galerija: generisano ${items.length} parova fotografija.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
