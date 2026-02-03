import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Plug, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Lightbulb,
    text: 'Éclairage architectural & LED',
  },
  {
    icon: Plug,
    text: 'Circuits dédiés (cuisine, bureau, atelier)',
  },
  {
    icon: ShieldCheck,
    text: 'Tableaux électriques & protection',
  },
];

export function ResidentialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const featuresList = featuresRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !headline || !body || !featuresList || !cta) return;

    const featureItems = featuresList.querySelectorAll('li');

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
        { scale: 1.1, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headline,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        body,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        featureItems,
        { x: '-6vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.04, ease: 'none' },
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
        [headline, body, featuresList],
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.75
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
      id="residential"
      className="section-pinned relative z-30"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="/living_room_lighting.jpg"
          alt="Modern living room lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center px-6 lg:px-[7vw]">
        <div className="max-w-2xl">
          <h2
            ref={headlineRef}
            className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6"
          >
            Chez vous,
            <br />
            <span className="text-gold">tout fonctionne.</span>
          </h2>

          <p
            ref={bodyRef}
            className="text-gray-text text-base md:text-lg leading-relaxed mb-8 max-w-lg"
          >
            Éclairage bien pensé, circuits sécuritaires et tableaux modernisés
            pour votre tranquillité d'esprit.
          </p>

          {/* Features */}
          <ul ref={featuresRef} className="space-y-4 mb-10">
            {features.map((feature) => (
              <li
                key={feature.text}
                className="flex items-center gap-4 text-white/90"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="text-gold" size={20} />
                </div>
                <span className="text-base">{feature.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div ref={ctaRef}>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-6 text-base btn-hover group"
            >
              Planifier une visite
              <ArrowRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative spark line on right */}
      <div className="absolute right-[10vw] top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold rounded-full glow-gold animate-pulse-slow" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold rounded-full glow-gold animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
}
