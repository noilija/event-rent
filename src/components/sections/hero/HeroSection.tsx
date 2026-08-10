import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { HeroSlideshow } from "./HeroSlideshow";

export function HeroSection() {
  return (
    <section
      id="pocetna"
      className="sticky top-0 z-0 min-h-screen overflow-x-hidden"
    >
      <Container>
        <div className="relative w-full">
          <HeroSlideshow />

          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 text-center sm:px-8">
            <div className="pointer-events-auto max-w-4xl text-white [text-shadow:0_3px_24px_rgba(0,0,0,0.9)]">
              <p className="mb-6 text-sm uppercase tracking-[0.36em] text-[#f4c766]">
                Proslave na otvorenom
              </p>
              <h1 className="font-display text-6xl font-semibold leading-[0.94] text-white sm:text-7xl lg:text-[clamp(4rem,6vw,6.8rem)]">
                Oprema za proslave na vasoj lokaciji
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/90">
                Iznajmljivanje pagoda, paviljona, stolova, stolica,
                barskih stolova i kompletnog seta za posluzivanje.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href="#oprema"
                  variant="primary"
                  className="bg-black/35 backdrop-blur-sm hover:bg-gold hover:text-black"
                >
                  Pogledajte ponudu
                </ButtonLink>
                <ButtonLink
                  href="#kontakt"
                  className="border-white/70 bg-black/30 text-white backdrop-blur-sm hover:bg-white hover:text-black"
                >
                  Kontaktirajte nas
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
