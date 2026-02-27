import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ChevronRight, ArrowRight, Shield, Globe, Cpu } from "lucide-react";

const jobs = [
  {
    title: "Solar Design Engineer",
    location: "Chennai, Tamil Nadu",
    type: "Full-Time",
    requirements: [
      "B.E./B.Tech in Electrical or Mechanical Engineering",
      "2+ years in solar PV system design",
      "Proficiency with PVsyst, AutoCAD, ETAP",
      "Knowledge of IEC, CEA, MNRE standards",
    ],
    preferred: "Experience with BESS integration and grid interconnection studies is a plus.",
  },
  {
    title: "Project Manager",
    location: "Chennai, Tamil Nadu",
    type: "Full-Time",
    requirements: [
      "5+ years managing large EPC projects",
      "Proven track record of 500kW+ deployments",
      "Strong stakeholder and vendor management",
      "PMP or equivalent certification preferred",
    ],
    preferred: "Background in renewable energy or power infrastructure preferred.",
  },
  {
    title: "Sales Engineer",
    location: "Pan India (Remote + Travel)",
    type: "Full-Time",
    requirements: [
      "3+ years in B2B technical sales",
      "Ability to build ROI and financial models",
      "Strong communication and presentation skills",
      "Understanding of commercial/industrial energy procurement",
    ],
    preferred: "Solar or energy sector experience is strongly preferred.",
  },
];

const techReqs = [
  { icon: Shield, label: "Panel Standards", value: "IEC 61215 / IEC 61730 certified Tier-1 modules" },
  { icon: Globe, label: "Inverter Protocol", value: "SMA, Fronius, Huawei — RS485 / Modbus RTU" },
  { icon: Cpu, label: "Monitoring Platform", value: "Proprietary GridStack + third-party SCADA" },
  { icon: Zap, label: "Grid Connection", value: "TNEB / BESCOM grid code compliant" },
];

export default function Careers() {
  const [applied, setApplied] = useState<string | null>(null);

  return (
    <main className="bg-[#030303] min-h-screen pt-32 perpetual-pixel">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-geist text-[10px] tracking-[0.4em] uppercase text-amber mb-6 font-bold flex items-center gap-3">
              <span className="w-8 h-[1px] bg-amber/40" />
              Join the Mission
            </p>
            <h1 className="font-outfit font-black text-6xl md:text-9xl uppercase text-foreground leading-[0.8] tracking-tighter mb-10 max-w-5xl">
              Power the<br />
              <span className="text-amber">Infrastructure.</span>
            </h1>
            <p className="font-geist text-sm text-muted-foreground max-w-xl leading-relaxed">
              We're building India's most technically advanced solar infrastructure company. Engineering the grid, one megawatt at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-outfit font-black text-4xl uppercase text-foreground mb-12 tracking-tight">Open Positions</h2>
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-refraction rounded-none p-12 group hover:bg-white/[0.04] transition-spring border-white/5"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
                <div>
                  <h3 className="font-outfit font-black text-3xl uppercase text-foreground mb-4 group-hover:text-amber transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-6">
                    <span className="font-geist text-[10px] tracking-widest uppercase text-muted-foreground font-bold">{job.location}</span>
                    <span className="font-geist text-[10px] tracking-widest uppercase text-amber font-bold flex items-center gap-2">
                      <Zap className="w-3 h-3" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setApplied(job.title)}
                  className={`flex-shrink-0 font-outfit font-black text-[10px] tracking-widest uppercase px-10 py-5 rounded-none transition-spring ${applied === job.title
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default"
                    : "bg-amber text-black hover:bg-white active:scale-95"
                    }`}
                >
                  {applied === job.title ? "Sent" : "Apply Now"}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="font-geist text-[10px] tracking-widest uppercase text-muted-foreground mb-6 font-bold">Requirements</p>
                  <ul className="space-y-4">
                    {job.requirements.map((req, j) => (
                      <li key={j} className="flex items-start gap-4 font-geist text-sm text-foreground">
                        <ChevronRight className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-geist text-[10px] tracking-widest uppercase text-muted-foreground mb-6 font-bold">Preferred</p>
                  <p className="font-geist text-sm text-muted-foreground leading-relaxed italic border-l-2 border-amber/30 pl-6">{job.preferred}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Standards */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="glass-refraction rounded-none p-12 md:p-20 border-amber/10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-outfit font-black text-4xl uppercase text-foreground mb-4 tracking-tight">Technical Standards</h2>
            <p className="font-geist text-sm text-muted-foreground mb-12 max-w-md">Our engineering environment and protocol stack.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {techReqs.map((req, i) => (
                <div key={i} className="space-y-4">
                  <div
                    className="w-12 h-12 glass-refraction rounded-none flex items-center justify-center text-amber"
                    aria-hidden="true"
                  >
                    <req.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-geist text-[10px] tracking-widest uppercase text-muted-foreground mb-1 font-bold">{req.label}</p>
                    <p className="font-geist text-sm text-foreground font-bold leading-tight">{req.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
