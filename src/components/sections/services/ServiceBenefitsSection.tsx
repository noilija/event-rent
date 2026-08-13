import { Gauge, TableProperties, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const serviceBenefits = [
  {
    title: "Postavka stolova",
    description:
      "Opremu raspoređujemo i pripremamo prema dogovorenoj postavci vašeg događaja.",
    icon: TableProperties,
  },
  {
    title: "Dostava na adresu",
    description:
      "Odabranu opremu bezbedno dovozimo direktno na lokaciju vaše proslave.",
    icon: Truck,
  },
  {
    title: "Brzo i efikasno",
    description:
      "Pouzdana organizacija i uigran tim omogućavaju da sve bude spremno na vreme.",
    icon: Gauge,
  },
];

export function ServiceBenefitsSection() {
  return (
    <section
      aria-label="Usluge koje pružamo"
      className="px-4 pb-16 sm:px-4 sm:pb-24 lg:px-6"
    >
      <Container className="mx-auto max-w-[96rem]">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_16px_44px_rgba(55,42,20,0.08)] sm:rounded-[2.25rem]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            aria-hidden="true"
          />

          <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {serviceBenefits.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group flex flex-col items-center px-6 py-9 text-center sm:px-5 sm:py-10 lg:px-10 lg:py-12"
              >
                <div className="relative mb-5 grid size-14 place-items-center rounded-full border border-gold/35 bg-[#f8f1e5] text-gold shadow-[0_10px_24px_rgba(181,138,59,0.12)] transition-[transform,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_14px_30px_rgba(181,138,59,0.25)] sm:mb-6 sm:size-16 motion-reduce:transform-none motion-reduce:transition-none">
                  <Icon
                    aria-hidden="true"
                    className="size-6 sm:size-7"
                    strokeWidth={1.6}
                  />
                </div>

                <h3 className="font-display text-2xl font-semibold leading-tight sm:text-[1.7rem]">
                  {title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
