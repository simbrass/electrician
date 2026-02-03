import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { ResidentialSection } from './sections/ResidentialSection';
import { CommercialSection } from './sections/CommercialSection';
import { SafetySection } from './sections/SafetySection';
import { EVSection } from './sections/EVSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <ServicesSection />
        <ResidentialSection />
        <CommercialSection />
        <SafetySection />
        <EVSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
