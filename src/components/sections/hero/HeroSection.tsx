import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { HeroSlideshow } from "./HeroSlideshow";

export function HeroSection() {
  return (
    <section
      id="pocetna"
      className="sticky top-0 z-0 min-h-[100svh] overflow-x-hidden"
    >
      <Container>
        <div className="relative w-full">
          <HeroSlideshow />

          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5 pb-14 pt-28 text-center sm:px-8 sm:pb-16 sm:pt-32">
            <div className="pointer-events-auto max-w-[21rem] text-white [text-shadow:0_3px_24px_rgba(0,0,0,0.9)] sm:max-w-3xl lg:max-w-4xl">
              <h1 className="font-display text-[2.55rem] font-semibold leading-[0.98] text-white min-[380px]:text-[3rem] sm:text-7xl lg:text-[clamp(4rem,6vw,6.8rem)]">
                Oprema za proslave na vašoj lokaciji
              </h1>
              <p className="mx-auto mt-5 max-w-[20rem] text-[0.98rem] leading-7 text-white/90 sm:mt-8 sm:max-w-2xl sm:text-lg sm:leading-8">
                Iznajmljivanje pagoda, paviljona, stolova, stolica,
                barskih stolova i kompletne opreme za posluživanje.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row">
                <ButtonLink
                  href="#oprema"
                  variant="primary"
                  className="w-full bg-black/35 backdrop-blur-sm hover:bg-gold hover:text-black sm:w-auto"
                >
                  Pogledajte ponudu
                </ButtonLink>
                <ButtonLink
                  href="#kontakt"
                  className="w-full border-white/70 bg-black/30 text-white backdrop-blur-sm hover:bg-white hover:text-black sm:w-auto"
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
