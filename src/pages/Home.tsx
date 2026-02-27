import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Zap, Globe, Shield, Activity, Clock } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

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

function MagneticButton({ children, className, to }: { children: React.ReactNode; className?: string; to: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x * 0.4);
    mouseY.set(y * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      style={{ x: dx, y: dy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={to} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main className="bg-[#030303] min-h-screen perpetual-pixel selection:bg-amber/30 selection:text-amber">
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
          role="img"
          aria-label="Solar panel installation under clear sky"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 saturate-[0.2] hover:saturate-[0.5]"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(3,3,3,0.5) 0%, rgba(3,3,3,0.8) 60%, rgba(3,3,3,1) 100%), url(https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80)`
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-geist text-[10px] tracking-[0.4em] uppercase text-amber mb-8 opacity-80 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-amber/40" />
              Energy Infrastructure — India
            </p>
            <h1 className="font-outfit font-black text-[clamp(4rem,12vw,11rem)] leading-[0.8] tracking-tighter uppercase text-foreground mb-12 max-w-5xl">
              Dominate<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber/50">the Grid.</span>
            </h1>
            <p className="font-geist text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed font-light">
              Techlab Solars engineers high-performance solar infrastructure for residential, commercial, and industrial scale operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticButton
                to="/contact"
                className="inline-flex items-center gap-3 bg-amber text-black font-outfit font-black text-[10px] tracking-[0.2em] uppercase px-10 py-5 rounded-none hover:bg-white transition-spring group"
              >
                Request Site Survey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 glass-refraction text-foreground font-outfit font-black text-[10px] tracking-[0.2em] uppercase px-10 py-5 rounded-none hover:bg-white/5 transition-spring"
              >
                View Projects
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-amber to-transparent animate-bounce" />
          <span className="font-geist text-[8px] tracking-[0.3em] uppercase opacity-40">Scroll</span>
        </motion.div>
      </section>

      {/* Scrolling Ticker */}
      <div className="border-y border-white/10 bg-[#08080A] overflow-hidden py-6">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...metrics, ...metrics].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-12 font-outfit font-black text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-amber shadow-[0_0_10px_rgba(255,184,0,0.5)] flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bento 2.0 Grid */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="mb-20">
          <p className="font-geist text-[10px] tracking-[0.3em] uppercase text-amber mb-4 font-bold">Infrastructure Systems</p>
          <h2 className="font-outfit font-black text-5xl md:text-8xl uppercase text-foreground leading-[0.8] tracking-tighter">
            Built for<br />the Grid.
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-10">
          {/* Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 flex flex-col gap-6"
          >
            <div
              className="glass-card-hover rounded-none overflow-hidden aspect-[16/9] md:aspect-auto md:h-[500px] relative group"
              role="img"
              aria-label="Grid-ready solar infrastructure installation"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-cover bg-center saturate-[0.1] group-hover:saturate-[0.4] transition-all duration-1000"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="px-4">
              <span className="font-geist text-[10px] tracking-widest uppercase text-amber mb-2 block font-bold">Large Scale</span>
              <h3 className="font-outfit font-black text-2xl uppercase text-foreground mb-3">Grid-Ready Solar Infrastructure</h3>
              <p className="font-geist text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Engineered systems designed for performance, scalability, and long-term output stability across India's energy grid.
              </p>
            </div>
          </motion.div>

          {/* Small Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 flex flex-col gap-6"
          >
            <div
              className="glass-card-hover rounded-none overflow-hidden aspect-square md:h-[500px] relative group"
              role="img"
              aria-label="Solar monitoring intelligence layer"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-cover bg-center saturate-[0.1] group-hover:saturate-[0.4] transition-all duration-1000"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="px-4">
              <span className="font-geist text-[10px] tracking-widest uppercase text-amber mb-2 block font-bold">Intelligence Layer</span>
              <h3 className="font-outfit font-black text-2xl uppercase text-foreground mb-3">Smart Monitoring</h3>
              <p className="font-geist text-sm text-muted-foreground leading-relaxed">
                Real-time analytics and performance tracking with precision diagnostics for every installation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="border-y border-white/10 bg-[#08080A]">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12 md:divide-x md:divide-white/10">
          {stat.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-8 flex flex-col items-center md:items-start text-center md:text-left group"
            >
              <div className="font-outfit font-black text-5xl text-foreground mb-3 group-hover:text-amber transition-colors">{s.value}</div>
              <div className="font-geist text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-bold">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GridStack Platform */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="grid md:grid-cols-2 gap-20 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-geist text-[10px] tracking-[0.3em] uppercase text-amber mb-6 font-bold">The Platform</p>
            <h2 className="font-outfit font-black text-5xl md:text-8xl uppercase text-foreground leading-[0.8] tracking-tighter">
              Introducing<br /><span className="text-amber">GridStack</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <p className="font-geist text-xl text-muted-foreground leading-relaxed font-light">
              GridStack is our integrated solar deployment, monitoring, optimization, and lifecycle management platform — engineered for infrastructure-grade operations at any scale.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-refraction rounded-none p-10 group cursor-default hover:bg-white/[0.05] transition-spring border-white/5 active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="font-mono font-bold text-xs tracking-widest text-amber">{cap.number}</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber/50 transition-colors">
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-amber transition-colors" />
                </div>
              </div>
              <h3 className="font-outfit font-black text-2xl uppercase text-foreground mb-4 group-hover:text-amber transition-colors">{cap.title}</h3>
              <p className="font-geist text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Amber CTA */}
      <section className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-none py-32 px-10 md:px-20 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #FFB800 0%, #E6A500 50%, #CC9400 100%)`,
          }}
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none perpetual-pixel" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <h2 className="font-outfit font-black text-5xl md:text-7xl uppercase text-black leading-[0.8] tracking-tighter max-w-4xl">
              Convert sunshine into infrastructure value.
            </h2>
            <Link
              to="/contact"
              className="flex-shrink-0 inline-flex items-center gap-4 bg-black text-amber font-outfit font-black text-xs tracking-[0.2em] uppercase px-14 py-8 rounded-none hover:bg-zinc-900 transition-spring group scale-100 hover:scale-[1.05] active:scale-95"
            >
              Contact Techlab
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber" />
            </div>
            <p className="font-geist text-[10px] text-muted-foreground tracking-[0.3em] uppercase font-bold">
              © 2024 Techlab Solars — Chennai, India
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="font-geist text-[10px] text-muted-foreground hover:text-amber tracking-widest uppercase transition-colors">Privacy</a>
            <a href="#" className="font-geist text-[10px] text-muted-foreground hover:text-amber tracking-widest uppercase transition-colors">Terms</a>
            <a href="#" className="font-geist text-[10px] text-muted-foreground hover:text-amber tracking-widest uppercase transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
