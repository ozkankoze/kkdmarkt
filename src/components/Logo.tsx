import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="KKDMARKT anasayfa"
      className={`font-display inline-flex items-baseline text-brand ${className}`}
    >
      <span className="font-extrabold tracking-[-0.045em]">kkdmarkt</span>
      <span className="font-extrabold tracking-[-0.045em]">.com</span>
    </Link>
  );
}
