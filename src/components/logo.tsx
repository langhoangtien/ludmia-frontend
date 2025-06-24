import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

// ---------------------------------------------------------------------

export const Logo = () => {
  return (
    <span className="w-18 h-10 text-primary justify-center font-extrabold text-3xl flex items-center">
      QUITMOOD.
    </span>
  );
};
export const LogoWithLink = ({ className }: { className?: string }) => {
  return (
    <Link
      to="/"
      className={cn(
        "h-12 justify-center font-extrabold text-3xl  flex items-center",
        className
      )}
    >
      QUITMOOD.
    </Link>
  );
};
