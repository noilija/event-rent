import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ContactSection() {
  return (
    <section id="kontakt" className="px-3 py-24 sm:px-4 lg:px-6">
      <div className="w-full text-center">
        <SectionEyebrow>Kontakt</SectionEyebrow>
        <h2 className="font-display text-5xl font-semibold">
          Planirate proslavu?
        </h2>
        <p className="mt-6 leading-8 text-muted">
          Javite nam da li proslavu planirate kod nas ili na vasoj lokaciji,
          datum dogadjaja i okviran broj gostiju.
        </p>
      </div>
    </section>
  );
}
