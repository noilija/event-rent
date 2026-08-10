import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { EquipmentSection } from "@/components/sections/equipment/EquipmentSection";
import { GallerySection } from "@/components/sections/gallery/GallerySection";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { TableShowcaseSection } from "@/features/table-configurator/components/TableShowcaseSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* <ServiceModesSection /> */}
        <EquipmentSection />
        <TableShowcaseSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
