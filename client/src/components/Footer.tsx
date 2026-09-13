import { Link } from "wouter";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t-[3px] border-[#E4572E] bg-[#F3F1EC] text-[#1A1A1A]">
      <div className="container mx-auto grid grid-cols-1 items-center gap-3 px-8 py-4 text-center md:grid-cols-3 md:gap-6 md:px-12 md:text-left lg:px-16">
        <Link
          href="/"
          className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A] transition-colors hover:text-[#E4572E] md:justify-self-start md:whitespace-nowrap"
        >
          BEW <span className="font-normal text-[#9A9A98]">/</span> Baidya Engineering Works
        </Link>

        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#7A7A78] md:justify-self-center md:whitespace-nowrap md:text-center">
          &copy; {year} Industrial contractors, West Bengal
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A] transition-colors hover:text-[#E4572E] md:justify-self-end md:whitespace-nowrap"
        >
          Back to top
          <ArrowUp className="h-3 w-3" strokeWidth={2.25} />
        </button>
      </div>
    </footer>
  );
}
