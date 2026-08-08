import { configurableTableSetups } from "../data/configurable-table-setups";
import { TableSetCarousel } from "./TableSetCarousel";

export function TableShowcaseSection() {
  return (
    <section id="setovi" className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <TableSetCarousel setups={configurableTableSetups} />
      </div>
    </section>
  );
}
