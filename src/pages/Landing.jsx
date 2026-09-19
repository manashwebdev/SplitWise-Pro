import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-violet-600/25 blur-[180px]" />

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-600/15 blur-[180px]" />

      </div>

      {/* Content */}
      <div className="relative z-10">

        <Navbar />

        <Hero />

        <div id="features">
          <Features />
        </div>

        <div id="dashboard-preview">
          <DashboardPreview />
        </div>

        <div id="cta">
          <CTA />
        </div>

        <Footer />

      </div>

    </div>
  );
}