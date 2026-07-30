import { TableShowcaseSection } from "@/features/table-configurator/components/TableShowcaseSection";

const navItems = [
  { label: "Pocetna", href: "#pocetna" },
  { label: "Prostor", href: "#prostor" },
  { label: "Oprema", href: "#oprema" },
  { label: "Setovi", href: "#setovi" },
  { label: "Galerija", href: "#galerija" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Home() {
  return (
    <main>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-background/80 px-5 backdrop-blur sm:px-8 lg:px-12">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          <a href="#pocetna" className="font-display text-2xl font-semibold">
            Event Rent
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#kontakt"
            className="border border-gold px-4 py-2 text-sm text-gold transition hover:bg-gold hover:text-black"
          >
            Kontakt
          </a>
        </nav>
      </header>

      <section id="pocetna" className="min-h-screen px-5 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-end pb-20 pt-28">
          <p className="mb-6 text-sm uppercase tracking-[0.36em] text-gold">
            Proslave na otvorenom
          </p>
          <h1 className="max-w-5xl font-display text-6xl font-semibold leading-none text-foreground sm:text-7xl lg:text-8xl">
            Prostor i oprema za proslave kod nas ili na vasoj lokaciji.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
            Iznajmljivanje dvorista, pagoda, paviljona, stolova, stolica,
            barskih stolova i kompletnog seta za posluzivanje.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#prostor"
              className="border border-gold px-6 py-4 text-center text-gold"
            >
              Pogledajte ponudu
            </a>
            <a
              href="#kontakt"
              className="border border-line px-6 py-4 text-center"
            >
              Kontaktirajte nas
            </a>
          </div>
        </div>
      </section>

      <section id="prostor" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-gold">
            Kod nas ili kod vas
          </p>
          <h2 className="font-display text-5xl font-semibold">
            Dva nacina organizacije
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="border border-line bg-surface p-8">
              <h3 className="font-display text-3xl">Proslava kod nas</h3>
              <p className="mt-4 leading-7 text-muted">
                Uredjen prostor na otvorenom za porodicne i svecane proslave.
              </p>
            </article>
            <article className="border border-line bg-surface p-8">
              <h3 className="font-display text-3xl">Oprema kod vas</h3>
              <p className="mt-4 leading-7 text-muted">
                Pagode, stolovi, stolice, barski stolovi i setovi za
                posluzivanje mogu se organizovati na lokaciji po vasem izboru.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="oprema" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-gold">
            Oprema
          </p>
          <h2 className="font-display text-5xl font-semibold">
            Sve sto je potrebno za uredno postavljen dogadjaj
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Pagode 5x5 m",
              "Paviljoni",
              "Stolovi i stolice",
              "Barski stolovi",
              "Ventilatori",
            ].map((item) => (
              <article
                key={item}
                className="border border-line bg-white/[0.03] p-6"
              >
                <h3 className="text-lg font-semibold">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Elegantno resenje za proslave na otvorenom, prilagodjeno
                  prostoru i broju gostiju.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TableShowcaseSection />

      <section id="galerija" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-gold">
            Galerija
          </p>
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
        </div>
      </section>

      <section id="kontakt" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-gold">
            Kontakt
          </p>
          <h2 className="font-display text-5xl font-semibold">
            Planirate proslavu?
          </h2>
          <p className="mt-6 leading-8 text-muted">
            Javite nam da li proslavu planirate kod nas ili na vasoj lokaciji,
            datum dogadjaja i okviran broj gostiju.
          </p>
        </div>
      </section>
    </main>
  );
}
