import Link from "next/link";
import { cn } from "../utils";

type Props = {
    href: string;
    variant?: "primary" | "secondary";
    children: React.ReactNode;
    className?: string;
};

export default function PrimaryLink({
    href,
    variant = "primary",
    children,
    className,
}: Props) {
    const base =
        "inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 active:scale-[0.98]";

    const variants = {
        primary: `
      bg-customPrimary text-white
      hover:bg-customPrimaryHover
      hover:-translate-y-[1px]
      hover:shadow-md
    `,
        secondary: `
      bg-customWhite text-customPrimary
      border border-customPrimary
      hover:bg-customPrimarySoft
      hover:-translate-y-[1px]
    `,
    };

    return (
        <Link href={href} className={cn(base, variants[variant], className)}>
            {children}
        </Link>
    );
}