import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { HeroSlideshow } from "./HeroSlideshow";

export function HeroSection() {
  return (
    <section
      id="pocetna"
      className="min-h-screen overflow-x-hidden px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-16"
    >
      <Container className="grid min-h-[calc(100vh-7rem)] items-center gap-12 py-8 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-0">
        <div className="max-w-2xl">
          <p className="mb-6 text-sm uppercase tracking-[0.36em] text-gold">
            Proslave na otvorenom
          </p>
          <h1 className="font-display text-6xl font-semibold leading-[0.94] text-foreground sm:text-7xl lg:text-[clamp(4rem,6vw,6.8rem)]">
            Oprema za proslave na vašoj lokaciji
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
            Iznajmljivanje pagoda, paviljona, stolova, stolica,
            barskih stolova i kompletnog seta za posluživanje.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#prostor" variant="primary">
              Pogledajte ponudu
            </ButtonLink>
            <ButtonLink href="#kontakt">Kontaktirajte nas</ButtonLink>
          </div>
        </div>

        <div className="lg:-mr-12 xl:-mr-24">
          <HeroSlideshow />
        </div>
      </Container>
    </section>
  );
}
