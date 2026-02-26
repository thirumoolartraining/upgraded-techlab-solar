import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const mainServices = [
  {
    title: "Residential Solar Infrastructure",
    size: "col-span-3",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80",
    tag: "Residential",
    desc: "Engineered rooftop systems delivering maximum power density per square meter. Grid-tied and off-grid configurations for homes and housing complexes across India.",
    specs: ["Up to 30kW capacity", "Tier-1 panel supply chain", "Structural load certified", "Net metering compliant"],
  },
  {
    title: "Industrial & Commercial Solar",
    size: "col-span-2",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
    tag: "Industrial",
    desc: "Scalable solar infrastructure for factories, warehouses, and commercial campuses. Full ROI analysis and grid integration engineering.",
    specs: ["100kW – 5MW+", "MNRE approved EPC", "Substation integration", "Carbon credit advisory"],
  },
];

const subServices = [
  {
    title: "Battery Storage Systems",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
    desc: "BESS integration for energy resilience — peak shaving, backup power, and grid independence at commercial and industrial scale.",
  },
  {
    title: "Energy Audits",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&q=80",
    desc: "Comprehensive facility energy audits using thermal imaging, load profiling, and consumption analytics to identify optimization opportunities.",
  },
  {
    title: "Monitoring & Maintenance",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    desc: "Lifetime O&M contracts with remote monitoring dashboards, predictive alerts, and scheduled preventive maintenance protocols.",
  },
];

export default function Services() {
  return (
    <main className="bg-[#030303] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="font-inter text-xs tracking-[0.3em] uppercase text-amber mb-4">What We Do</p>
        <h1 className="font-outfit font-black text-5xl md:text-8xl uppercase text-foreground mb-16 leading-[0.85] tracking-tighter">
          Services
        </h1>

        {/* Main Grid */}
        <div className="grid md:grid-cols-5 gap-4 mb-4">
          {mainServices.map((service, i) => (
            <div
              key={i}
              className={`md:col-span-${service.size === "col-span-3" ? "3" : "2"} glass-card-hover rounded-sm overflow-hidden min-h-[560px] flex flex-col justify-end relative`}
              style={{
                backgroundImage: `linear-gradient(to top, rgba(3,3,3,0.97) 35%, rgba(3,3,3,0.1) 100%), url(${service.image}&sat=-20)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(0.8)",
              }}
            >
              <div className="p-10">
                <span className="font-inter text-xs tracking-widest uppercase text-amber mb-3 block">{service.tag}</span>
                <h2 className="font-outfit font-bold text-3xl uppercase text-foreground mb-3">{service.title}</h2>
                <p className="font-inter text-sm text-[#B7B7BE] leading-relaxed mb-6 max-w-lg">{service.desc}</p>
                <ul className="space-y-1">
                  {service.specs.map((spec, j) => (
                    <li key={j} className="flex items-center gap-2 font-inter text-xs text-[#B7B7BE]">
                      <span className="w-1 h-1 rounded-full bg-amber flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Sub Services */}
        <div className="grid md:grid-cols-3 gap-4">
          {subServices.map((s, i) => (
            <div
              key={i}
              className="glass-card-hover rounded-sm overflow-hidden min-h-[400px] flex flex-col justify-end relative"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(3,3,3,0.97) 40%, rgba(3,3,3,0.2) 100%), url(${s.image}&sat=-20)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(0.8)",
              }}
            >
              <div className="p-8">
                <h3 className="font-outfit font-bold text-2xl uppercase text-foreground mb-2">{s.title}</h3>
                <p className="font-inter text-sm text-[#B7B7BE] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-outfit font-black text-4xl md:text-6xl uppercase text-foreground leading-[0.85] tracking-tighter">
            Ready to engineer<br />your energy future?
          </h2>
          <Link
            to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-amber text-[#050505] font-outfit font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber/90 transition-colors group"
          >
            Request Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

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
