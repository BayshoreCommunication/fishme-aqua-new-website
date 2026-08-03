"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "outline";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    onClick?: never;
  };

type ActionButtonProps = CommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children" | "onClick"
  > & {
    href?: undefined;
    onClick: () => void;
  };

export type ButtonProps = LinkButtonProps | ActionButtonProps;

const variantStyles: Record<Variant, string> = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "bg-black text-white hover:opacity-90",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-white",
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 font-sans font-semibold transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as Omit<
      LinkButtonProps,
      keyof CommonProps
    >;

    return (
      <Link href={href} className={styles} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { onClick, ...buttonProps } = rest as Omit<
    ActionButtonProps,
    keyof CommonProps
  >;

  return (
    <button type="button" onClick={onClick} className={styles} {...buttonProps}>
      {children}
    </button>
  );
}
