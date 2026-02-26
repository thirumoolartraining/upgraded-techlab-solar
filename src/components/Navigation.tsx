import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "py-3 glass-refraction border-b border-white/10"
          : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-amber rounded-xl flex items-center justify-center transition-spring group-hover:rotate-12 group-hover:scale-110">
              <Zap className="w-4 h-4 text-[#050505]" fill="currentColor" />
            </div>
            <span className="font-outfit font-black text-sm tracking-widest uppercase text-foreground">
              Techlab <span className="text-amber">Solars</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 100, damping: 20 }}
            >
              <Link
                to={link.to}
                className={`px-4 py-2 rounded-full font-geist text-[10px] tracking-[0.2em] font-medium uppercase transition-spring ${location.pathname === link.to
                    ? "text-amber bg-amber/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="hidden md:block"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-amber text-[#050505] font-outfit font-black text-[10px] tracking-[0.2em] uppercase px-6 py-3 rounded-full hover:bg-white hover:text-black transition-spring scale-100 hover:scale-[1.05] active:scale-95"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-foreground p-2 glass-refraction rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-refraction border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`block px-6 py-4 rounded-2xl font-geist text-xs tracking-widest uppercase transition-spring ${location.pathname === link.to
                        ? "bg-amber/10 text-amber"
                        : "text-muted-foreground hover:bg-white/5"
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="p-2 pt-4">
                <Link
                  to="/contact"
                  className="block text-center bg-amber text-[#050505] font-outfit font-bold text-xs tracking-widest uppercase py-4 rounded-2xl"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
