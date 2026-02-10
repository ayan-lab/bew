import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, HardHat } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-2 rounded text-white group-hover:scale-105 transition-transform">
              <HardHat size={28} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-bold leading-none uppercase font-display tracking-wider",
                scrolled ? "text-slate-900" : "text-white"
              )}>
                Baidya
              </span>
              <span className={cn(
                "text-xs font-medium tracking-[0.2em] opacity-80",
                scrolled ? "text-slate-600" : "text-slate-200"
              )}>
                Engineering Works
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors hover:text-primary px-1",
                  location === link.href 
                    ? "text-primary border-b-2 border-primary" 
                    : scrolled ? "text-slate-900" : "text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
              <button className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-sm font-bold uppercase text-xs tracking-widest transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5">
                Get a Quote
              </button>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={cn("md:hidden p-2", scrolled ? "text-slate-900" : "text-white")}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-bold uppercase tracking-wider py-2 px-4 rounded-md transition-colors",
                  location === link.href ? "bg-orange-50 text-primary" : "text-slate-600 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-primary text-white py-3 rounded-sm font-bold uppercase mt-2">
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
