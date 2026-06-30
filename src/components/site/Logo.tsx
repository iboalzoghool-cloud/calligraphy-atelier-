import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-2 ${className}`}
      aria-label="Kalligraphie – Startseite"
    >
      <span className="font-display text-2xl font-semibold tracking-tight">
        Kalligraphie
      </span>
      <span
        className="h-1.5 w-1.5 rounded-full bg-rose transition-transform duration-300 group-hover:scale-125"
        aria-hidden
      />
    </Link>
  );
}
