import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const metrics = [
  "25.4 MW DEPLOYED",
  "12,400 TONS CO₂ SAVED",
  "CHENNAI HQ",
  "INDUSTRIAL + RESIDENTIAL",
  "25-YEAR OUTPUT MODEL",
  "500+ INSTALLATIONS",
  "98.6% UPTIME",
  "ISO CERTIFIED",
];

const capabilities = [
  {
    number: "01",
    title: "Site Survey & Energy Audit",
    desc: "Precision on-site assessment using thermal imaging and load analysis to baseline your energy consumption profile.",
  },
  {
    number: "02",
    title: "Design & Engineering",
    desc: "Structural, electrical, and grid-integration engineering by certified professionals. MNRE compliant designs.",
  },
  {
    number: "03",
    title: "Deployment & Commissioning",
    desc: "End-to-end installation with zero-downtime protocols. Full grid synchronization and safety compliance.",
  },
  {
    number: "04",
    title: "Monitoring & O&M",
    desc: "24/7 remote performance monitoring, predictive maintenance alerts, and quarterly O&M site visits.",
  },
];

const stat = [
  { value: "Up to 40%", label: "Energy Cost Reduction" },
  { value: "≤ 30 Days", label: "Installation Planning" },
  { value: "Real-Time", label: "Performance Monitoring" },
  { value: "25 Years", label: "Modeled Output Lifecycle" },
];

export default function Home() {
  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-[#030303] min-h-screen">
      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(3,3,3,0.7) 0%, rgba(3,3,3,0.8) 60%, rgba(3,3,3,1) 100%), url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80&sat=-20)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.8)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-amber mb-6 opacity-90">
            Energy Infrastructure — India
          </p>
          <h1 className="font-outfit font-black text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] tracking-tighter uppercase text-foreground mb-12 max-w-4xl">
            Dominate<br />
            <span className="text-amber">the Grid.</span>
          </h1>
          <p className="font-inter text-base text-[#B7B7BE] max-w-xl mb-12 leading-relaxed">
            Techlab Solars engineers high-performance solar infrastructure for residential, commercial, and industrial scale operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-amber text-[#050505] font-outfit font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber/90 transition-all group"
            >
              Request Site Survey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 border border-white/10 text-foreground font-outfit font-bold text-xs tracking-widest uppercase px-8 py-4 hover:border-amber/40 hover:text-amber transition-all bg-black/20"
            >
              View Projects
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-foreground animate-pulse" />
        </div>
      </section>

      {/* Scrolling Ticker */}
      <div className="border-y border-white/10 bg-[#08080A] overflow-hidden py-4">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...metrics, ...metrics].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8 font-outfit font-bold text-xs tracking-widest uppercase text-[#B7B7BE]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <p className="font-inter text-xs tracking-[0.3em] uppercase text-amber mb-4">Infrastructure Systems</p>
        <h2 className="font-outfit font-black text-4xl md:text-6xl uppercase text-foreground mb-16 leading-[0.85] tracking-tighter">
          Built for the Grid.
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          {/* Large Card */}
          <div
            className="md:col-span-3 glass-card-hover rounded-sm overflow-hidden min-h-[480px] flex flex-col justify-end relative"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(3,3,3,0.97) 30%, rgba(3,3,3,0.2) 100%), url(https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80&sat=-20)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(0.8)",
            }}
          >
            <div className="p-10">
              <span className="font-inter text-xs tracking-widest uppercase text-amber mb-3 block">Large Scale</span>
              <h3 className="font-outfit font-bold text-2xl uppercase text-foreground mb-3">Grid-Ready Solar Infrastructure</h3>
              <p className="font-inter text-sm text-[#B7B7BE] leading-relaxed">
                Engineered systems designed for performance, scalability, and long-term output stability across India's energy grid.
              </p>
            </div>
          </div>

          {/* Small Card */}
          <div
            className="md:col-span-2 glass-card-hover rounded-sm overflow-hidden min-h-[480px] flex flex-col justify-end relative"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(3,3,3,0.97) 30%, rgba(3,3,3,0.2) 100%), url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&sat=-20)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(0.8)",
            }}
          >
            <div className="p-10">
              <span className="font-inter text-xs tracking-widest uppercase text-amber mb-3 block">Intelligence Layer</span>
              <h3 className="font-outfit font-bold text-2xl uppercase text-foreground mb-3">Smart Monitoring Systems</h3>
              <p className="font-inter text-sm text-[#B7B7BE] leading-relaxed">
                Real-time analytics and performance tracking with precision diagnostics for every installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="border-y border-white/10 bg-[#08080A]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stat.map((s, i) => (
            <div key={i} className="px-8 py-4">
              <div className="font-outfit font-black text-4xl md:text-5xl text-amber mb-2">{s.value}</div>
              <div className="font-inter text-xs text-[#B7B7BE] tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GridStack Platform */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-amber mb-4">Platform</p>
            <h2 className="font-outfit font-black text-4xl md:text-6xl uppercase text-foreground leading-[0.85] tracking-tighter">
              Introducing<br />Techlab<br /><span className="text-amber">GridStack</span>
            </h2>
          </div>
          <div className="flex items-center">
            <p className="font-inter text-base text-[#B7B7BE] leading-relaxed">
              GridStack is our integrated solar deployment, monitoring, optimization, and lifecycle management platform — engineered for infrastructure-grade operations at any scale.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="flex gap-8 py-8 border-b border-white/10 group cursor-default hover:bg-white/[0.02] px-4 transition-colors"
            >
              <span className="font-outfit font-bold text-xs tracking-widest text-amber opacity-60 pt-1 w-8 flex-shrink-0">{cap.number}</span>
              <div className="flex-1">
                <h3 className="font-outfit font-bold text-lg uppercase text-foreground mb-2 group-hover:text-amber transition-colors">{cap.title}</h3>
                <p className="font-inter text-sm text-[#B7B7BE] leading-relaxed max-w-xl">{cap.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#B7B7BE] opacity-0 group-hover:opacity-100 transition-opacity self-center flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Amber CTA */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #FFB800 0%, #E6A500 50%, #CC9400 100%), radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
          backgroundImage: `linear-gradient(135deg, #FFB800 0%, #E6A500 50%, #CC9400 100%), radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%), repeating-radial-gradient(circle at 50% 50%, transparent 0, rgba(0,0,0,0.03) 1px, transparent 2px, transparent 40px)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-outfit font-black text-4xl md:text-6xl uppercase text-[#050505] leading-[0.85] tracking-tighter max-w-3xl">
            Ready to convert sunlight into infrastructure-grade value?
          </h2>
          <Link
            to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-[#050505] text-amber font-outfit font-bold text-sm tracking-widest uppercase px-12 py-6 hover:bg-[#111114] transition-colors group"
          >
            Contact Techlab
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-[#B7B7BE] tracking-widest uppercase">
            © 2024 Techlab Solars — Chennai, India
          </p>
          <p className="font-inter text-xs text-[#B7B7BE]">
            Energy Infrastructure Powerhouse
          </p>
        </div>
      </footer>
    </main>
  );
}
