import React from "react";
import { cn } from "../utils";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "dark";
  className?: string;
};

export default function TextHighlight({
  children,
  variant = "primary",
  className,
}: Props) {
  const colors = {
    primary: "text-customPrimary",
    dark: "text-customBlack",
  };

  return <span className={cn(colors[variant], className)}>{children}</span>;
}