import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050505]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-amber rounded flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#050505]" fill="currentColor" />
          </div>
          <span className="font-outfit font-800 text-sm tracking-widest uppercase text-foreground">
            Techlab <span className="text-amber">Solars</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-inter text-xs tracking-widest uppercase transition-colors duration-200 ${
                location.pathname === link.to
                  ? "text-amber"
                  : "text-[#B7B7BE] hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 bg-amber text-[#050505] font-outfit font-bold text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-amber/90 transition-colors"
        >
          Get Started
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0B0B0D] border-t border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-6 py-4 font-inter text-xs tracking-widest uppercase border-b border-white/5 ${
                location.pathname === link.to ? "text-amber" : "text-[#B7B7BE]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="p-4">
            <Link
              to="/contact"
              className="block text-center bg-amber text-[#050505] font-outfit font-bold text-xs tracking-widest uppercase py-3"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
