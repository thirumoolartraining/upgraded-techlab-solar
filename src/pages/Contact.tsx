import { useState } from "react";
import { MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react";

const officeDetails = [
  { icon: MapPin, label: "Address", value: "Techlab Solars Pvt. Ltd.\n42, Industrial Phase 2\nAmbattur Estate, Chennai — 600 058\nTamil Nadu, India" },
  { icon: Mail, label: "Email", value: "projects@techlabsolars.in" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: Clock, label: "Response", value: "Within 24 hours of inquiry submission" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    usage: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-[#050505] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="font-inter text-xs tracking-[0.3em] uppercase text-amber mb-4">Get In Touch</p>
        <h1 className="font-outfit font-black text-5xl md:text-8xl uppercase text-foreground mb-16 leading-tight">
          Contact
        </h1>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Office Info */}
          <div>
            <h2 className="font-outfit font-bold text-xl uppercase text-foreground mb-8">Our Office</h2>

            <div className="space-y-6">
              {officeDetails.map((detail, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                    <detail.icon className="w-4 h-4 text-amber" />
                  </div>
                  <div>
                    <p className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE] mb-1">{detail.label}</p>
                    <p className="font-inter text-sm text-foreground whitespace-pre-line">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promise Block */}
            <div className="mt-12 border-l-2 border-amber pl-6">
              <p className="font-outfit font-bold text-lg uppercase text-foreground mb-2">The Techlab Promise</p>
              <p className="font-inter text-sm text-[#B7B7BE] leading-relaxed">
                Every inquiry receives a dedicated response within 24 hours from a senior project engineer — not a salesperson. We assess your site, your load profile, and your financial goals before we recommend anything.
              </p>
            </div>

            {/* Map placeholder */}
            <div
              className="mt-10 h-48 rounded-sm border border-white/10 flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(rgba(5,5,5,0.8), rgba(5,5,5,0.8)), url(https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80)`,
                backgroundSize: "cover",
              }}
            >
              <div className="text-center">
                <MapPin className="w-6 h-6 text-amber mx-auto mb-2" />
                <p className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE]">Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="font-outfit font-bold text-xl uppercase text-foreground mb-8">Request a Proposal</h2>

            {submitted ? (
              <div className="glass-card rounded-sm p-10 text-center">
                <div className="w-12 h-12 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-5 h-5 text-amber" />
                </div>
                <h3 className="font-outfit font-bold text-xl uppercase text-foreground mb-2">Proposal Request Received</h3>
                <p className="font-inter text-sm text-[#B7B7BE]">
                  A Techlab project engineer will contact you within 24 hours to schedule your site assessment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE] block mb-2">Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full bg-[#111114] border border-white/10 text-foreground font-inter text-sm px-4 py-3 focus:outline-none focus:border-amber/50 placeholder-[#B7B7BE]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE] block mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full bg-[#111114] border border-white/10 text-foreground font-inter text-sm px-4 py-3 focus:outline-none focus:border-amber/50 placeholder-[#B7B7BE]/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE] block mb-2">Company</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company or Organization"
                    className="w-full bg-[#111114] border border-white/10 text-foreground font-inter text-sm px-4 py-3 focus:outline-none focus:border-amber/50 placeholder-[#B7B7BE]/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE] block mb-2">Monthly Electricity Usage (kWh)</label>
                  <input
                    type="number"
                    value={form.usage}
                    onChange={(e) => setForm({ ...form, usage: e.target.value })}
                    placeholder="e.g. 5000"
                    className="w-full bg-[#111114] border border-white/10 text-foreground font-inter text-sm px-4 py-3 focus:outline-none focus:border-amber/50 placeholder-[#B7B7BE]/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-inter text-xs tracking-widest uppercase text-[#B7B7BE] block mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your project, site, and energy goals..."
                    className="w-full bg-[#111114] border border-white/10 text-foreground font-inter text-sm px-4 py-3 focus:outline-none focus:border-amber/50 placeholder-[#B7B7BE]/40 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber text-[#050505] font-outfit font-bold text-xs tracking-widest uppercase py-4 hover:bg-amber/90 transition-colors flex items-center justify-center gap-3 group"
                >
                  Request Proposal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="font-inter text-xs text-[#B7B7BE] text-center">
                  Response guaranteed within 24 hours from a senior project engineer.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-[#B7B7BE] tracking-widest uppercase">© 2024 Techlab Solars — Chennai, India</p>
          <p className="font-inter text-xs text-[#B7B7BE]">Energy Infrastructure Powerhouse</p>
        </div>
      </footer>
    </main>
  );
}
