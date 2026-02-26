import { useState } from "react";

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
    title: "Project Manager — Renewable Infrastructure",
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
    title: "Sales Engineer — Enterprise Accounts",
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
  { label: "Panel Standards", value: "IEC 61215 / IEC 61730 certified Tier-1 modules" },
  { label: "Inverter Protocol", value: "SMA, Fronius, Huawei — RS485 / Modbus RTU" },
  { label: "Monitoring Platform", value: "Proprietary GridStack + third-party SCADA" },
  { label: "Grid Connection", value: "TNEB / BESCOM grid code compliant" },
  { label: "Safety Standards", value: "IS 13947, IS 13010, CEA Safety Regulations" },
  { label: "Structural Load", value: "IS 875 wind + dead load certified mounts" },
  { label: "EPC Certification", value: "MNRE Empanelled EPC Contractor" },
  { label: "O&M SLA", value: "98.6% uptime guarantee, 4-hour response SLA" },
];

export default function Careers() {
  const [applied, setApplied] = useState<string | null>(null);

  return (
    <main className="bg-[#030303] min-h-screen pt-24">
      {/* Hero */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(3,3,3,0.8) 0%, rgba(3,3,3,1) 100%), url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80&sat=-20)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.8)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-amber mb-4">Join the Mission</p>
          <h1 className="font-outfit font-black text-5xl md:text-8xl uppercase text-foreground leading-[0.85] tracking-tighter mb-8 max-w-4xl">
            Build the Future<br />
            <span className="text-amber">of Energy.</span>
          </h1>
          <p className="font-inter text-base text-[#B7B7BE] max-w-xl leading-relaxed">
            We're building India's most technically advanced solar infrastructure company. If you're an engineer, project leader, or business builder — and you care about the grid — we want to hear from you.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-outfit font-black text-4xl uppercase text-foreground mb-12 leading-[0.85] tracking-tighter">Open Positions</h2>
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <div key={i} className="glass-card rounded-sm p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-outfit font-bold text-2xl uppercase text-foreground mb-2">{job.title}</h3>
                  <div className="flex items-center gap-4">
                    <span className="font-inter text-xs text-[#B7B7BE]">{job.location}</span>
                    <span className="font-inter text-xs tracking-widest uppercase text-amber border border-amber/30 px-3 py-1 bg-transparent">{job.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => setApplied(job.title)}
                  className={`flex-shrink-0 font-outfit font-bold text-xs tracking-widest uppercase px-6 py-3 transition-all ${
                    applied === job.title
                      ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                      : "bg-amber text-[#050505] hover:bg-amber/90"
                  }`}
                >
                  {applied === job.title ? "Application Sent ✓" : "Apply Now"}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE] mb-3">Requirements</p>
                  <ul className="space-y-2">
                    {job.requirements.map((req, j) => (
                      <li key={j} className="flex items-start gap-2 font-inter text-sm text-[#B7B7BE]">
                        <span className="w-1 h-1 rounded-full bg-amber flex-shrink-0 mt-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE] mb-3">Preferred</p>
                  <p className="font-inter text-sm text-[#B7B7BE] leading-relaxed">{job.preferred}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Requirements Spec Sheet */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="font-outfit font-black text-4xl uppercase text-foreground mb-4 leading-[0.85] tracking-tighter">Technical Requirements</h2>
        <p className="font-inter text-sm text-[#B7B7BE] mb-8">Our engineering environment and standards spec sheet.</p>

        <div className="border border-white/10 divide-y divide-white/10">
          {techReqs.map((req, i) => (
            <div key={i} className="grid md:grid-cols-3 gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
              <span className="font-inter text-xs tracking-widest uppercase text-amber">{req.label}</span>
              <span className="font-inter text-sm text-foreground md:col-span-2">{req.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-[#B7B7BE] tracking-widest uppercase">© 2024 Techlab Solars — Chennai, India</p>
          <p className="font-inter text-xs text-[#B7B7BE]">Energy Infrastructure Powerhouse</p>
        </div>
      </footer>
    </main>
  );
}
