import Image from "next/image";
import { navigationItems } from "@/config/navigation";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-background/80 px-5 backdrop-blur sm:px-8 lg:px-12">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        <a
          href="#pocetna"
          className="relative block h-14 w-14 shrink-0"
          aria-label="Pocetna"
        >
          <Image
            src="/brand/logo.png"
            alt="Event Rent logo"
            fill
            priority
            sizes="56px"
            className="object-contain"
          />
        </a>

        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          {navigationItems.map((item) => (
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
  );
}
