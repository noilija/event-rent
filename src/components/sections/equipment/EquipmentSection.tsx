import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { equipmentItems } from "./equipment.data";

export function EquipmentSection() {
  return (
    <section id="oprema" className="px-4 py-16 sm:px-4 sm:py-24 lg:px-6">
      <Container className="mx-auto max-w-[96rem]">
        <div className="max-w-3xl">
          <SectionEyebrow>Oprema</SectionEyebrow>
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Oprema koju nudimo
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            Pažljivo odabrana oprema za elegantne, udobne i besprekorno
            organizovane proslave na otvorenom.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {equipmentItems.map((item, index) => (
            <article
              key={item.slug}
              className="group relative isolate aspect-[4/5] min-w-0 overflow-hidden rounded-2xl border border-white/20 bg-surface-alt shadow-[0_12px_30px_rgba(55,42,20,0.10)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_24px_55px_rgba(55,42,20,0.20)] sm:rounded-3xl motion-reduce:transform-none motion-reduce:transition-none"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 1023px) 50vw, 33vw"
                className="object-cover scale-[1.01] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055] motion-reduce:transform-none motion-reduce:transition-none"
                style={{ objectPosition: item.objectPosition }}
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10 transition-colors duration-500 group-hover:from-black/90 group-hover:via-black/5 motion-reduce:transition-none"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-5">
                <span className="rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.18em] text-white/85 backdrop-blur-md sm:px-3 sm:text-[0.65rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="h-px w-5 origin-right bg-gold/90 transition-transform duration-500 group-hover:scale-x-150 sm:w-7 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-6 lg:p-7">
                <div
                  className="mb-2 h-px w-6 origin-left bg-gold transition-transform duration-500 group-hover:scale-x-150 sm:mb-3 sm:w-8 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <h3 className="font-display text-[1.25rem] font-semibold leading-[1.05] text-balance [text-shadow:0_2px_16px_rgba(0,0,0,0.45)] sm:text-3xl lg:text-4xl">
                  {item.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
