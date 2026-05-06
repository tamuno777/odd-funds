import React from "react";
import { cn } from "../utils";

type Props = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  variant?: "primary" | "dark" | "muted"| "default";
  className?: string;
};

export default function Heading({
  children,
  as: Tag = "h2",
  variant = "dark",
  className,
}: Props) {
  const base = "font-bold mb-6 leading-tight";

  const sizes = {
    h1: "text-4xl md:text-5xl",
    h2: "text-3xl",
    h3: "text-2xl",
  };

  const colors = {
    primary: "text-customPrimary",
    dark: "text-customBlack",
    muted: "text-customGray",
    default: "text-white",
  };

  return (
    <Tag className={cn(base, sizes[Tag], colors[variant], className)}>
      {children}
    </Tag>
  );
}