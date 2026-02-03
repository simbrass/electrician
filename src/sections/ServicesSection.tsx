import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, ClipboardCheck, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Home,
    title: 'Installation résidentielle',
    description: 'Tableaux, éclairage, prises, circuits dédiés.',
    features: ['Tableaux électriques', 'Éclairage LED', 'Prises et circuits'],
  },
  {
    icon: ClipboardCheck,
    title: 'Mise aux normes',
    description: 'Vérification, correction, conformité C25-01.',
    features: ['Inspection complète', 'Correction de défauts', 'Certification'],
  },
  {
    icon: Zap,
    title: 'Bornes de recharge VE',
    description: 'Bornes murales et sur pied, câblage 240V, recommandations.',
    features: ['Installation 240V', 'Conseil borne', 'Gaine dissimulée'],
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cards = cardsRef.current;

    if (!section || !label || !headline || !body || !cards) return;

    const cardElements = cards.querySelectorAll('.service-card');

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
        [label, headline],
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        body,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        cardElements,
        { x: '18vw', opacity: 0, rotateZ: 2 },
        {
          x: 0,
          opacity: 1,
          rotateZ: 0,
          stagger: 0.06,
          ease: 'none',
        },
        0.1
      );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardElements,
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [label, headline, body],
        { x: 0, opacity: 1 },
        { x: '-8vw', opacity: 0, ease: 'power2.in' },
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
      id="services"
      className="section-pinned bg-navy relative z-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,10,18,0.4)_100%)]" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center px-6 lg:px-[7vw]">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Text */}
          <div className="max-w-xl">
            <span
              ref={labelRef}
              className="font-mono text-gold text-xs tracking-[0.12em] uppercase mb-4 block"
            >
              Services
            </span>
            <h2
              ref={headlineRef}
              className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6"
            >
              Une solution complète,
              <br />
              <span className="text-gold">du panneau à la prise.</span>
            </h2>
            <p
              ref={bodyRef}
              className="text-gray-text text-base md:text-lg leading-relaxed"
            >
              Nous concevons, installons et maintenons des systèmes fiables
              — résidentiels et commerciaux — sur la Rive-Nord.
            </p>
          </div>

          {/* Right column - Cards */}
          <div ref={cardsRef} className="space-y-4">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="service-card group bg-card/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover cursor-pointer"
                style={{
                  marginLeft: index === 1 ? '-1rem' : '0',
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <service.icon className="text-gold" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-white text-lg mb-2 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-text text-sm mb-3">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight
                    className="text-white/30 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0"
                    size={20}
                  />
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <Button
              onClick={scrollToContact}
              className="w-full bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 hover:border-gold/50 font-semibold py-6 mt-4 btn-hover group"
            >
              Obtenir un devis gratuit
              <ArrowRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative line element */}
      <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
