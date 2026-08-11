import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ServiceModesSection() {
  return (
    <section id="prostor" className="px-3 py-24 sm:px-4 lg:px-6">
      <Container>
        <SectionEyebrow>Kod nas ili kod vas</SectionEyebrow>
        <h2 className="font-display text-5xl font-semibold">
          Dva načina organizacije
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="border border-line bg-surface p-8">
            <h3 className="font-display text-3xl">Proslava kod nas</h3>
            <p className="mt-4 leading-7 text-muted">
              Uređen prostor na otvorenom za porodične i svečane proslave.
            </p>
          </article>
          <article className="border border-line bg-surface p-8">
            <h3 className="font-display text-3xl">Oprema kod vas</h3>
            <p className="mt-4 leading-7 text-muted">
              Pagode, stolovi, stolice, barski stolovi i setovi za
              posluživanje mogu se organizovati na lokaciji po vašem izboru.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
