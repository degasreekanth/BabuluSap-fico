import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const logo = "/favicon.png";

const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "Why Us", href: "#why-us" },
  { label: "About", href: "#about" },
  { label: "Placement", href: "#placement" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-navy-950 text-gold-400 text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-navy-300">Empowering Careers. Delivering Excellence.</span>
          <a
            href="tel:9885076704"
            className="flex items-center gap-1.5 hover:text-gold-300 transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5" />
            +91 98850 76704
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-navy-900/95 backdrop-blur-md shadow-lg shadow-navy-950/30" : "bg-navy-900"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18 py-3">
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-navy-950/30 p-1 group-hover:scale-105 transition-transform flex-shrink-0">
              <img
                src={logo}
                alt="BPMR SAP FICO Training Institute logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-white font-bold text-base sm:text-lg tracking-tight truncate">
                BPMR <span className="text-gold-400">SAP FICO</span>
              </div>
              <div className="text-navy-300 text-[10px] sm:text-xs font-medium tracking-widest uppercase">
                Training Institute
              </div>
            </div>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-navy-200 hover:text-gold-400 transition-colors font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-900 text-sm font-bold transition-all shadow-lg shadow-gold-500/25 hover:-translate-y-0.5"
          >
            Enroll Now
          </a>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden bg-navy-900 border-t border-white/10">
            <ul className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-navy-200 hover:text-gold-400 py-2 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="tel:9885076704"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-gold-400 py-2 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +91 98850 76704
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block text-center px-5 py-3 rounded-lg bg-gold-500 text-navy-900 font-bold"
                >
                  Enroll Now
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
