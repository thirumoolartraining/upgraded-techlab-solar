import { motion } from "framer-motion";
import { Zap, MapPin, ArrowUpRight, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "ALPHA",
    capacity: "500 kW",
    location: "Coimbatore",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&q=80&sat=-20",
    afterImage: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80&sat=-20",
    specs: {
      Capacity: "500 kW",
      "Panels Installed": "1,250 Units (400W)",
      Timeline: "18 Days",
      Outcome: "₹42L/yr savings",
    },
    desc: "Industrial rooftop installation across a 3-building manufacturing complex. Full grid-tie with net metering and SCADA monitoring.",
  },
  {
    id: "DELTA",
    capacity: "120 kW",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80&sat=-20",
    afterImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80&sat=-20",
    specs: {
      Capacity: "120 kW",
      "Panels Installed": "300 Units (400W)",
      Timeline: "12 Days",
      Outcome: "₹9.6L/yr savings",
    },
    desc: "Commercial office complex with battery backup integration. Ground-mount + rooftop hybrid system with real-time energy dashboard.",
  },
  {
    id: "SIGMA",
    capacity: "1.2 MW",
    location: "Industrial Estate",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80&sat=-20",
    afterImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80&sat=-20",
    specs: {
      Capacity: "1.2 MW",
      "Panels Installed": "3,000 Units (400W)",
      Timeline: "28 Days",
      Outcome: "₹1.2Cr/yr savings",
    },
    desc: "Flagship mega-installation across 14-acre industrial estate. Includes BESS, substation upgrade, and 25-year O&M contract.",
  },
];

export default function Projects() {
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
            Deployments
          </p>
          <h1 className="font-outfit font-black text-6xl md:text-9xl uppercase text-foreground mb-4 leading-[0.8] tracking-tighter">
            Archive.
          </h1>
          <p className="font-geist text-sm text-muted-foreground mb-20 max-w-xl leading-relaxed">
            A field record of deployed solar infrastructure across Tamil Nadu and beyond, engineering the shift toward grid-independence.
          </p>
        </motion.div>

        {/* Project List */}
        <div className="space-y-4 mb-32">
          <div className="hidden md:grid grid-cols-5 px-10 pb-4 border-b border-white/5 opacity-40">
            <span className="font-geist text-[10px] tracking-[0.2em] uppercase font-bold">Identifier</span>
            <span className="font-geist text-[10px] tracking-[0.2em] uppercase font-bold">Load Capacity</span>
            <span className="font-geist text-[10px] tracking-[0.2em] uppercase font-bold">Region</span>
            <span className="font-geist text-[10px] tracking-[0.2em] uppercase font-bold">Protocol</span>
            <span className="font-geist text-[10px] tracking-[0.2em] uppercase font-bold text-right">Operational Status</span>
          </div>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid md:grid-cols-5 items-center bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-2xl px-10 py-6 transition-spring group cursor-pointer"
            >
              <span className="font-outfit font-black text-xl text-foreground group-hover:text-amber transition-colors">#{p.id}</span>
              <span className="font-geist text-lg tracking-tighter text-foreground font-bold">{p.capacity}</span>
              <span className="font-geist text-sm text-muted-foreground">{p.location}</span>
              <span className="font-geist text-[10px] tracking-widest uppercase text-muted-foreground font-bold">Grid-Tie EPC</span>
              <div className="flex items-center justify-end gap-3 text-emerald-500">
                <span className="font-geist text-[10px] tracking-widest uppercase font-bold">Active</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Reports */}
        <h2 className="font-outfit font-black text-4xl uppercase text-foreground mb-12 tracking-tight">Technical Reports</h2>
        <div className="space-y-24">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-12 gap-12"
            >
              <div className="md:col-span-7">
                <div
                  className="relative rounded-[2.5rem] overflow-hidden aspect-video border border-white/5 group"
                  role="img"
                  aria-label={`Visual report for project ${p.id}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 saturate-[0.1] group-hover:saturate-100"
                    style={{ backgroundImage: `url(${p.image}&fm=webp&q=80)` }}
                  />
                  <div className="absolute top-8 left-8">
                    <div className="glass-refraction rounded-full px-6 py-2 flex items-center gap-3">
                      <Zap className="w-4 h-4 text-amber" />
                      <span className="font-geist text-[10px] tracking-widest uppercase font-bold text-white">Project {p.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-center">
                <p className="font-geist text-[10px] tracking-[0.3em] uppercase text-amber mb-4 font-bold">{p.location}</p>
                <h3 className="font-outfit font-black text-4xl uppercase text-foreground mb-6 leading-tight">
                  {p.capacity} Power Plant
                </h3>
                <p className="font-geist text-sm text-muted-foreground leading-relaxed mb-10">{p.desc}</p>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(p.specs).map(([key, val]) => (
                    <div key={key} className="glass-refraction rounded-2xl p-5 border-white/5">
                      <p className="font-geist text-[8px] tracking-widest uppercase text-muted-foreground mb-1 font-bold">{key}</p>
                      <p className="font-geist text-sm text-foreground font-bold">{val}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex gap-4">
                  <div className="w-1/2 aspect-video rounded-2xl overflow-hidden border border-white/5 relative group">
                    <img
                      src={`${p.beforeImage}&fm=webp&q=60`}
                      alt={`Pre-installation state of project ${p.id}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover saturate-0 transition-all group-hover:saturate-50"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
                      <span className="font-geist text-[8px] tracking-widest uppercase font-bold">Pre-Install</span>
                    </div>
                  </div>
                  <div className="w-1/2 aspect-video rounded-2xl overflow-hidden border border-amber/20 relative group">
                    <img
                      src={`${p.afterImage}&fm=webp&q=70`}
                      alt={`Post-installation state of project ${p.id}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover saturate-0 transition-all group-hover:saturate-100"
                    />
                    <div className="absolute inset-0 bg-amber/20 flex items-center justify-center">
                      <span className="font-geist text-[8px] tracking-widest uppercase font-bold text-black">Post-Install</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
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
