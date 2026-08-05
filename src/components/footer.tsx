import { Globe, Linkedin, Mail } from "lucide-react";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";

const linkClass =
  "inline-flex items-center gap-2 font-body font-medium text-sm text-white no-underline transition-colors duration-200 hover:text-white/70";

export function Footer() {
  return (
    <footer className="bg-black text-white px-6 lg:px-10 py-10 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={linkClass}
            style={{ letterSpacing: "-0.3px" }}
          >
            <Mail className="w-4 h-4" strokeWidth={2} />
            {CONTACT_EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Noel Yaxley on LinkedIn"
            className={linkClass}
            style={{ letterSpacing: "-0.3px" }}
          >
            <Linkedin className="w-4 h-4" strokeWidth={2} />
            LinkedIn
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-sm font-body text-white/70">
            <Globe className="w-3.5 h-3.5" />
            <span>Sydney, Australia</span>
          </div>
          <p
            className="font-body font-medium text-sm text-white/70"
            style={{ letterSpacing: "-0.3px" }}
          >
            &copy; {new Date().getFullYear()} Noel Yaxley
          </p>
        </div>
      </div>
    </footer>
  );
}
