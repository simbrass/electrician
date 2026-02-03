import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Building2,
    value: '180+',
    label: 'projets livrés',
  },
  {
    icon: Clock,
    value: '4 200+',
    label: "heures d'intervention",
  },
  {
    icon: Users,
    value: '92%',
    label: 'clients récurrents',
  },
];

export function CommercialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const statsEl = statsRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !headline || !body || !statsEl || !cta) return;

    const statItems = statsEl.querySelectorAll('.stat-item');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        image,
        { scale: 1.08, opacity: 0.8 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headline,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        body,
        { x: '-6vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        statItems,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, ease: 'none' },
        0.14
      );

      scrollTl.fromTo(
        cta,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        [headline, body],
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [statsEl, cta],
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="commercial"
      className="section-pinned relative z-40"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="/commercial_panels.jpg"
          alt="Commercial electrical installation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center px-6 lg:px-[7vw]">
        <div className="max-w-3xl">
          <h2
            ref={headlineRef}
            className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6"
          >
            Infrastructure fiable
            <br />
            <span className="text-sage">pour votre activité.</span>
          </h2>

          <p
            ref={bodyRef}
            className="text-gray-text text-base md:text-lg leading-relaxed mb-10 max-w-xl"
          >
            Nous installons et modernisons tableaux, éclairage et distribution
            — avec planning respecté et chantier propre.
          </p>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-4 lg:gap-8 mb-10"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-item bg-card/60 backdrop-blur-sm border border-white/10 rounded-2xl p-4 lg:p-6 text-center"
              >
                <stat.icon
                  className="text-sage mx-auto mb-3"
                  size={24}
                />
                <div className="font-heading font-black text-white text-2xl lg:text-4xl mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-text text-xs lg:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef}>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-6 text-base btn-hover group"
            >
              Demander une estimation
              <ArrowRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative line on left */}
      <div className="absolute left-[5vw] top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
