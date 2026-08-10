import { configurableTableSetups } from "../data/configurable-table-setups";
import { TableSetCarousel } from "./TableSetCarousel";

export function TableShowcaseSection() {
  return (
    <section id="setovi" className="bg-background px-3 py-16 sm:px-4 sm:py-20 lg:px-6">
      <div className="w-full">
        <TableSetCarousel setups={configurableTableSetups} />
      </div>
    </section>
  );
}
