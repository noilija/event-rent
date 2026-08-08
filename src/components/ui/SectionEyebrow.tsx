import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function SectionEyebrow({
  children,
  className = "",
}: SectionEyebrowProps) {
  return (
    <p
      className={`mb-4 text-sm uppercase tracking-[0.32em] text-gold ${className}`}
    >
      {children}
    </p>
  );
}
