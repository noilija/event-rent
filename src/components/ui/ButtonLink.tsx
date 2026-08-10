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
      className={`border px-4 py-3 text-center text-sm transition hover:border-gold hover:text-gold sm:px-6 sm:py-4 sm:text-base ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
