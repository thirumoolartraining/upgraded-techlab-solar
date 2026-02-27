import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const mainServices = [
  {
    title: "Residential Solar Infrastructure",
    size: "col-span-8",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
    tag: "Residential",
    desc: "Engineered rooftop systems delivering maximum power density per square meter. Grid-tied and off-grid configurations for homes and housing complexes across India.",
    specs: ["Up to 30kW capacity", "Tier-1 panel supply chain", "Structural load certified", "Net metering compliant"],
  },
  {
    title: "Industrial & Commercial Solar",
    size: "col-span-4",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
    tag: "Industrial",
    desc: "Scalable solar infrastructure for factories, warehouses, and commercial campuses.",
    specs: ["100kW – 5MW+", "MNRE approved EPC", "Substation integration", "Carbon credit advisory"],
  },
];

const subServices = [
  {
    title: "Battery Storage Systems",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80",
    desc: "BESS integration for energy resilience — peak shaving, backup power, and grid independence.",
  },
  {
    title: "Energy Audits",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=600&q=80",
    desc: "Facility audits using thermal imaging and load profiling to identify optimization opportunities.",
  },
  {
    title: "O&M Contracts",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    desc: "Lifetime O&M with remote monitoring dashboards and predictive preventive maintenance.",
  },
];

export default function Services() {
  return (
    <main className="bg-[#030303] min-h-screen pt-32 perpetual-pixel">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-geist text-[10px] tracking-[0.4em] uppercase text-amber mb-6 font-bold flex items-center gap-3">
            <span className="w-8 h-[1px] bg-amber/40" />
            Capabilities
          </p>
          <h1 className="font-outfit font-black text-6xl md:text-9xl uppercase text-foreground mb-20 leading-[0.8] tracking-tighter">
            Services.
          </h1>
        </motion.div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-12 gap-10 mb-10">
          {mainServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${service.size} flex flex-col gap-6`}
            >
              <div
                className="glass-card-hover rounded-none overflow-hidden aspect-[16/10] relative group"
                role="img"
                aria-label={service.title}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 saturate-[0.1] group-hover:saturate-[0.4]"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
              </div>
              <div className="px-4">
                <span className="font-geist text-[10px] tracking-widest uppercase text-amber mb-2 block font-bold">{service.tag}</span>
                <h2 className="font-outfit font-black text-3xl uppercase text-foreground mb-3">{service.title}</h2>
                <p className="font-geist text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">{service.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  {service.specs.map((spec, j) => (
                    <div key={j} className="flex items-center gap-3 font-geist text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      <Zap className="w-3 h-3 text-amber" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {subServices.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-refraction rounded-none p-10 group hover:bg-white/[0.05] transition-spring"
            >
              <div className="aspect-video rounded-none overflow-hidden mb-8 border border-white/5">
                <img
                  src={s.image}
                  alt={`${s.title} integration visualization`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover saturate-[0.1] group-hover:saturate-[0.5] transition-all duration-700"
                />
              </div>
              <h3 className="font-outfit font-black text-xl uppercase text-foreground mb-3 tracking-tight group-hover:text-amber transition-colors">{s.title}</h3>
              <p className="font-geist text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-none py-24 px-10 md:px-20 overflow-hidden border border-white/10 glass-refraction"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <h2 className="font-outfit font-black text-4xl md:text-7xl uppercase text-foreground leading-[0.8] tracking-tighter max-w-4xl">
              Engineering<br />your energy future.
            </h2>
            <Link
              to="/contact"
              className="flex-shrink-0 inline-flex items-center gap-4 bg-amber text-black font-outfit font-black text-xs tracking-[0.2em] uppercase px-14 py-8 rounded-none hover:bg-white transition-spring group scale-100 hover:scale-[1.05] active:scale-95"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/tl%20logo.png" alt="" className="w-full h-full object-contain" />
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
