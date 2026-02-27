import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { motion } from "framer-motion";

// Lazy load pages for performance
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const BrandedLoader = () => (
  <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center gap-8 relative overflow-hidden">
    {/* Background Grain */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none perpetual-pixel" />
    
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <div className="w-16 h-16 border border-amber/20 rounded-full flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: 360,
            borderColor: ["rgba(255, 184, 0, 0.2)", "rgba(255, 184, 0, 0.8)", "rgba(255, 184, 0, 0.2)"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-t-2 border-amber rounded-full absolute"
        />
        <img src="/tl%20logo.png" alt="Techlab" className="w-8 h-8 object-contain opacity-50" />
      </div>
    </motion.div>
    
    <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 bg-amber/40"
      />
    </div>
    
    <p className="font-geist text-[8px] tracking-[0.4em] uppercase text-amber/40">Initializing Systems</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Suspense fallback={<BrandedLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
