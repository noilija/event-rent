import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  children,
  className = "",
  variant = "secondary",
  ...props
}: ButtonLinkProps) {
  const variantClass =
    variant === "primary"
      ? "border-gold text-gold"
      : "border-line text-foreground";

  return (
    <a
      className={`border px-6 py-4 text-center transition hover:border-gold hover:text-gold ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
