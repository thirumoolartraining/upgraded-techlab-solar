import { useState } from "react";
import { MapPin, Mail, Phone, Clock, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const officeDetails = [
  { icon: MapPin, label: "Address", value: "Techlab Solars Pvt. Ltd.\n18, CBI Colony Main Rd, Kandhanchavadi\nPerungudi, Chennai — 600096\nTamil Nadu, India" },
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
    <main className="bg-[#050505] min-h-screen pt-32 perpetual-pixel">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-geist text-[10px] tracking-[0.4em] uppercase text-amber mb-6 font-bold flex items-center gap-3">
            <span className="w-8 h-[1px] bg-amber/40" />
            Get In Touch
          </p>
          <h1 className="font-outfit font-black text-6xl md:text-9xl uppercase text-foreground mb-20 leading-[0.8] tracking-tighter">
            Contact.
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-24">
          {/* Left: Office Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-outfit font-black text-2xl uppercase text-foreground mb-12 tracking-tight">Our Office</h2>

            <div className="space-y-10">
              {officeDetails.map((detail, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 glass-refraction rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber group-hover:text-black transition-spring group-hover:scale-110">
                    <detail.icon className="w-5 h-5 transition-colors" />
                  </div>
                  <div>
                    <p className="font-geist text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 font-bold">{detail.label}</p>
                    <p className="font-geist text-sm text-foreground whitespace-pre-line leading-relaxed">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promise Block */}
            <div className="mt-16 glass-refraction p-10 rounded-[2rem] border-amber/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber" />
              <p className="font-outfit font-black text-xl uppercase text-foreground mb-4">The Techlab Promise</p>
              <p className="font-geist text-sm text-muted-foreground leading-relaxed">
                Every inquiry receives a dedicated response within 24 hours from a senior project engineer — not a salesperson. We assess your site, your load profile, and your financial goals before we recommend anything.
              </p>
            </div>

            {/* Map placeholder */}
            <div
              className="mt-12 h-64 rounded-[2.5rem] overflow-hidden border border-white/5 relative group cursor-crosshair"
              role="img"
              aria-label="Map location of Techlab Solars Headquarters in Chennai"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 saturate-[0.1] group-hover:saturate-100"
                style={{
                  backgroundImage: `linear-gradient(rgba(5,5,5,0.7), rgba(5,5,5,0.8)), url(https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80&fm=webp)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-amber flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(255,184,0,0.5)]">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <p className="mt-4 font-geist text-[10px] tracking-[0.3em] uppercase text-foreground font-bold">Chennai HQ</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="font-outfit font-black text-2xl uppercase text-foreground mb-12 tracking-tight">Request a Proposal</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-refraction rounded-[2.5rem] p-12 text-center border-amber/20"
                role="alert"
                aria-live="polite"
              >
                <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,184,0,0.3)]">
                  <Zap className="w-8 h-8 text-black" fill="currentColor" />
                </div>
                <h3 className="font-outfit font-black text-2xl uppercase text-foreground mb-4">Inquiry Routed.</h3>
                <p className="font-geist text-sm text-muted-foreground leading-relaxed">
                  A Techlab project engineer will contact you within 24 hours to schedule your grid-compatibility assessment.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-10 font-geist text-[10px] tracking-widest uppercase text-amber hover:text-white transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="font-geist text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-3 font-bold">Name *</label>
                    <input
                      id="name"
                      required
                      aria-required="true"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl text-foreground font-geist text-sm px-6 py-4 focus:outline-none focus:border-amber/50 placeholder-muted-foreground/30 transition-spring focus:bg-white/[0.05]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-geist text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-3 font-bold">Email *</label>
                    <input
                      id="email"
                      required
                      type="email"
                      aria-required="true"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl text-foreground font-geist text-sm px-6 py-4 focus:outline-none focus:border-amber/50 placeholder-muted-foreground/30 transition-spring focus:bg-white/[0.05]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="font-geist text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-3 font-bold">Company</label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company or Organization"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl text-foreground font-geist text-sm px-6 py-4 focus:outline-none focus:border-amber/50 placeholder-muted-foreground/30 transition-spring focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label htmlFor="usage" className="font-geist text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-3 font-bold">Monthly Electricity Usage (kWh)</label>
                  <input
                    id="usage"
                    type="number"
                    value={form.usage}
                    onChange={(e) => setForm({ ...form, usage: e.target.value })}
                    placeholder="e.g. 5000"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl text-foreground font-geist text-sm px-6 py-4 focus:outline-none focus:border-amber/50 placeholder-muted-foreground/30 transition-spring focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-geist text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-3 font-bold">Message *</label>
                  <textarea
                    id="message"
                    required
                    aria-required="true"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your project, site, and energy goals..."
                    className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] text-foreground font-geist text-sm px-6 py-4 focus:outline-none focus:border-amber/50 placeholder-muted-foreground/30 transition-spring focus:bg-white/[0.05] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber text-black font-outfit font-black text-[10px] tracking-[0.2em] uppercase py-5 rounded-full hover:bg-white transition-spring flex items-center justify-center gap-3 group active:scale-[0.98]"
                >
                  Request Proposal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="font-geist text-[8px] tracking-[0.3em] text-muted-foreground text-center uppercase font-bold opacity-60">
                  Response guaranteed within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
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
