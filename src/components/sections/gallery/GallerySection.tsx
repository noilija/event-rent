import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function GallerySection() {
  return (
    <section id="galerija" className="px-3 py-24 sm:px-4 lg:px-6">
      <Container>
        <SectionEyebrow>Galerija</SectionEyebrow>
        <h2 className="font-display text-5xl font-semibold">
          Detalji koji stvaraju utisak
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="aspect-[4/5] border border-line bg-surface"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
