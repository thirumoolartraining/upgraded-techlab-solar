import { Link } from "react-router-dom";

const projects = [
  {
    id: "ALPHA",
    capacity: "500 kW",
    location: "Coimbatore",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80",
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
    beforeImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
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
    beforeImage: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
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
    <main className="bg-[#050505] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="font-inter text-xs tracking-[0.3em] uppercase text-amber mb-4">Deployments</p>
        <h1 className="font-outfit font-black text-5xl md:text-8xl uppercase text-foreground mb-4 leading-tight">
          Project Log
        </h1>
        <p className="font-inter text-sm text-[#B7B7BE] mb-16 max-w-lg">
          A field record of deployed solar infrastructure across Tamil Nadu and beyond.
        </p>

        {/* Project List Header */}
        <div className="hidden md:grid grid-cols-4 border-b border-white/10 pb-3 mb-2">
          <span className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE]">Project ID</span>
          <span className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE]">Capacity</span>
          <span className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE]">Location</span>
          <span className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE]">Status</span>
        </div>
        {projects.map((p) => (
          <div key={p.id} className="grid md:grid-cols-4 items-center border-b border-white/10 py-4 hover:bg-white/[0.02] px-2 transition-colors">
            <span className="font-outfit font-bold text-xl text-foreground">PROJECT {p.id}</span>
            <span className="font-outfit font-bold text-xl text-amber">{p.capacity}</span>
            <span className="font-inter text-sm text-[#B7B7BE]">{p.location}</span>
            <span className="font-inter text-xs tracking-widest uppercase text-green-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Operational
            </span>
          </div>
        ))}
      </div>

      {/* Project Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-16 space-y-8">
        <h2 className="font-outfit font-black text-3xl uppercase text-foreground mb-8">Detailed Reports</h2>
        {projects.map((p) => (
          <div key={p.id} className="glass-card rounded-sm overflow-hidden">
            {/* Hero image */}
            <div
              className="h-64 md:h-96 w-full relative"
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent 40%, rgba(5,5,5,1) 100%), url(${p.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute top-6 left-6">
                <span className="font-outfit font-black text-xs tracking-widest uppercase bg-amber text-[#050505] px-3 py-1">
                  PROJECT {p.id}
                </span>
              </div>
            </div>

            <div className="p-8 grid md:grid-cols-2 gap-8">
              <div>
                <p className="font-inter text-xs tracking-widest uppercase text-amber mb-2">{p.location}</p>
                <h3 className="font-outfit font-bold text-2xl uppercase text-foreground mb-4">
                  {p.capacity} Solar Installation
                </h3>
                <p className="font-inter text-sm text-[#B7B7BE] leading-relaxed mb-6">{p.desc}</p>

                {/* Specs */}
                <div className="border border-white/10 divide-y divide-white/10">
                  {Object.entries(p.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between px-4 py-3">
                      <span className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE]">{key}</span>
                      <span className="font-outfit font-bold text-sm text-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before / After */}
              <div>
                <p className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE] mb-4">Before / After</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div
                      className="h-40 rounded-sm mb-2"
                      style={{
                        backgroundImage: `url(${p.beforeImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <span className="font-inter text-xs text-[#B7B7BE] tracking-widest uppercase">Before</span>
                  </div>
                  <div>
                    <div
                      className="h-40 rounded-sm mb-2 ring-1 ring-amber/30"
                      style={{
                        backgroundImage: `url(${p.afterImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <span className="font-inter text-xs text-amber tracking-widest uppercase">After</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
