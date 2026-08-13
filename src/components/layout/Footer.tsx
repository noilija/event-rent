import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-background px-3 py-8 text-sm text-muted sm:px-4 lg:px-6">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>{siteConfig.name}</p>
        <p>Prostor i oprema za proslave na otvorenom.</p>
      </div>
    </footer>
  );
}
