import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { equipmentItems } from "./equipment.data";

export function EquipmentSection() {
  return (
    <section id="oprema" className="px-4 py-16 sm:px-4 sm:py-24 lg:px-6">
      <Container>
        <SectionEyebrow>Oprema</SectionEyebrow>
        <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Oprema koju nudimo
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {equipmentItems.map((item) => (
            <article
              key={item}
              className="border border-line bg-surface-alt p-6"
            >
              <h3 className="text-lg font-semibold">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Elegantno resenje za proslave na otvorenom, prilagodjeno
                prostoru i broju gostiju.
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
