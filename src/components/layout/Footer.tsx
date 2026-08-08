import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8 text-sm text-muted sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>{siteConfig.name}</p>
        <p>Prostor i oprema za proslave na otvorenom.</p>
      </div>
    </footer>
  );
}
