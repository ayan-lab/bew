import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Opens WhatsApp chat (same number as Contact / Footer). */
const WHATSAPP_CHAT_URL =
  "https://wa.me/919874751736?text=" +
  encodeURIComponent("Hi, I'd like to inquire about Baidya Engineering Works.");

/** PNG + preserve alpha so the bar/video shows through non-logo pixels (not flattened to white). */
const LOGO_URL =
  // "https://res.cloudinary.com/dqhnt5mus/image/upload/f_png,q_auto,fl_preserve_transparency/v1777806592/logo_i8q8wh.png";
  "https://res.cloudinary.com/dqhnt5mus/image/upload/f_png,q_auto,fl_preserve_transparency/v1777807947/logo_1_y0ki0y.png";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all duration-300",
        "py-3.5",
        scrolled && "shadow-md",
      )}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 bg-transparent"
          >
            <img
              src={LOGO_URL}
              alt="Baidya Engineering Works"
              className="block h-auto max-h-9 w-[min(92vw,14rem)] shrink-0 bg-transparent object-contain object-left shadow-none ring-0 transition-transform duration-200 group-hover:scale-[1.02] sm:max-h-10 sm:w-[min(90vw,16rem)] md:max-h-11 md:w-[20rem] lg:max-h-12 lg:w-[22rem]"
              width={280}
              height={85}
              decoding="async"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={location === link.href ? "page" : undefined}
                className="text-xs font-medium uppercase tracking-wide text-slate-900 transition-colors hover:text-primary px-1"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative isolate inline-flex items-center overflow-hidden rounded-sm bg-whatsapp-cta px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-white shadow-md shadow-emerald-950/25 transition-[transform,box-shadow] duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ring-offset-white"
            >
              <span
                className="pointer-events-none absolute inset-0 z-0 skew-x-[-16deg] animate-whatsapp-shine bg-gradient-to-r from-transparent via-white/40 to-transparent"
                aria-hidden
              />
              <span className="relative z-10 inline-flex items-center gap-1.5 drop-shadow-sm">
                <FaWhatsapp className="h-5 w-5 shrink-0 text-white" aria-hidden />
                <span className="leading-none">WhatsApp</span>
              </span>
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-1.5 text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-5">
          <div className="flex flex-col p-3 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={location === link.href ? "page" : undefined}
                className="text-sm font-bold uppercase tracking-wide py-1.5 px-3 rounded-md text-slate-600 transition-colors hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="relative isolate flex w-full items-center justify-center overflow-hidden rounded-sm bg-whatsapp-cta py-2.5 text-[12px] font-bold uppercase tracking-wide text-white shadow-md shadow-emerald-950/20 transition-[transform,box-shadow] active:scale-[0.99] hover:shadow-lg hover:shadow-emerald-900/25"
            >
              <span
                className="pointer-events-none absolute inset-0 z-0 skew-x-[-16deg] animate-whatsapp-shine bg-gradient-to-r from-transparent via-white/40 to-transparent"
                aria-hidden
              />
              <span className="relative z-10 inline-flex items-center gap-1.5 drop-shadow-sm">
                <FaWhatsapp className="h-5 w-5 shrink-0 text-white" aria-hidden />
                WhatsApp
              </span>
            </a>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <button
                type="button"
                className="w-full rounded-sm bg-primary-gradient py-2 text-[12px] font-bold uppercase tracking-wide text-white transition-[background-image] duration-200 hover:bg-primary-gradient-hover"
              >
                Get a quote
              </button>
            </Link>
          </div>
        </div>
      )}
      
    </header>
  );
}
