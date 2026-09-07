import { Phone, Mail, Globe } from "lucide-react";

const logo = "/favicon.png";

const EMAIL = "bpmrsapfico@gmail.com";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.1 8.65 22 10.9 22 14v7h-4v-6.2c0-1.5-.54-2.5-1.87-2.5-1.02 0-1.63.69-1.9 1.35-.1.24-.13.57-.13.9V21h-4V9Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.2C2 8.9 2 12 2 12s0 3.1.4 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9C22 15.1 22 12 22 12s0-3.1-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2c2.7 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.42.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77c-.55.55-1.11.9-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.42.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.25-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.5-3.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
    </svg>
  );
}

const socials = [
  { Icon: LinkedInIcon, label: "LinkedIn", href: "#" },
  { Icon: YouTubeIcon, label: "YouTube", href: "#" },
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 md:pt-16 pb-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pb-10 md:pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-navy-950/40 p-1.5">
                <img
                  src={logo}
                  alt="BPMR SAP FICO Training Institute logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-white font-bold text-lg tracking-tight">
                  BPMR <span className="text-gold-400">SAP FICO</span>
                </div>
                <div className="text-navy-400 text-xs font-medium tracking-widest uppercase">
                  Training Institute
                </div>
              </div>
            </div>

            <p className="mt-5 text-navy-300 text-sm leading-relaxed max-w-md">
              India's premier SAP FICO training institute delivering industry-ready professionals
              through hands-on, project-based learning and comprehensive placement support.
            </p>

            <div className="mt-4 text-gold-400 text-sm font-semibold italic">
              "Empowering Careers. Delivering Excellence."
            </div>

            <div className="flex gap-3 mt-6">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-gold-500 hover:border-gold-500 flex items-center justify-center text-navy-300 hover:text-navy-900 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-gold-400 font-bold text-sm uppercase tracking-widest mb-5">
              Courses
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "SAP FI & CO Fundamentals",
                "GL, AP/AR & Asset Accounting",
                "S/4HANA FICO & COPA",
                "Complete Course Bundle",
                "Corporate Training",
              ].map((c) => (
                <li key={c}>
                  <a
                    href="#courses"
                    className="text-navy-300 hover:text-gold-400 transition-colors"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-400 font-bold text-sm uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="tel:9885076704"
                  className="flex items-center gap-2.5 text-navy-300 hover:text-gold-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  +91 98850 76704
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2.5 text-navy-300 hover:text-gold-400 transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="https://bpmrsapfico.com"
                  className="flex items-center gap-2.5 text-navy-300 hover:text-gold-400 transition-colors"
                >
                  <Globe className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  www.bpmrsapfico.com
                </a>
              </li>
            </ul>

            <a
              href="#contact"
              className="mt-6 inline-block px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-900 text-sm font-bold transition-colors"
            >
              Enroll Now
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-navy-500 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} BPMR SAP FICO Training Institute. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-navy-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-navy-300 transition-colors">
              Terms of Service
            </a>
            <a href="/auth" className="hover:text-navy-300 transition-colors">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
