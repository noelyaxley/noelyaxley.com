import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white px-6 lg:px-10 py-10 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="font-body font-medium text-sm text-white/80"
          style={{ letterSpacing: "-0.3px" }}
        >
          &copy; {new Date().getFullYear()} Noel Yaxley
        </p>
        <div className="flex items-center gap-2 text-sm font-body text-white/40">
          <Globe className="w-3.5 h-3.5" />
          <span>Sydney, Australia</span>
        </div>
      </div>
    </footer>
  );
}
