import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ContactSection() {
  return (
    <section id="kontakt" className="px-4 py-16 sm:px-4 sm:py-24 lg:px-6">
      <div className="w-full text-center">
        <SectionEyebrow>Kontakt</SectionEyebrow>
        <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Planirate proslavu?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted sm:mt-6 sm:leading-8">
          Javite nam da li proslavu planirate kod nas ili na vasoj lokaciji,
          datum dogadjaja i okviran broj gostiju.
        </p>
      </div>
    </section>
  );
}
