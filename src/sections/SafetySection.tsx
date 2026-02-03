import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const badges = [
  {
    icon: Shield,
    title: 'RBQ 0000-0000-01',
    subtitle: 'Licence valide',
  },
  {
    icon: Award,
    title: 'CMMTQ',
    subtitle: 'Corporation des maîtres électriciens du Québec',
  },
];

const standards = [
  'Conformité C25-01',
  'Travail documenté',
  'Tests et vérifications',
  'Garantie sur tous les travaux',
];

export function SafetySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const badgesEl = badgesRef.current;
    const standardsEl = standardsRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !body || !badgesEl || !standardsEl || !cta) return;

    const badgeItems = badgesEl.querySelectorAll('.badge-item');
    const standardItems = standardsEl.querySelectorAll('.standard-item');

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
        badgeItems,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.06, ease: 'none' },
        0.14
      );

      scrollTl.fromTo(
        standardItems,
        { x: '-4vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.16
      );

      scrollTl.fromTo(
        cta,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        [headline, body, badgesEl, standardsEl],
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cta,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
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
      id="safety"
      className="section-pinned bg-navy relative z-50"
    >
      {/* Blueprint texture background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center px-6 lg:px-[7vw]">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <div>
            <h2
              ref={headlineRef}
              className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6"
            >
              Conformité &
              <br />
              <span className="text-gold">sécurité avant tout.</span>
            </h2>

            <p
              ref={bodyRef}
              className="text-gray-text text-base md:text-lg leading-relaxed mb-8 max-w-lg"
            >
              Nous suivons la C25-01 et les exigences locales. Chaque travail
              est documenté, testé et garanti.
            </p>

            {/* Standards list */}
            <div ref={standardsRef} className="grid grid-cols-2 gap-3 mb-8">
              {standards.map((standard) => (
                <div
                  key={standard}
                  className="standard-item flex items-center gap-2 text-white/80"
                >
                  <CheckCircle className="text-gold flex-shrink-0" size={18} />
                  <span className="text-sm">{standard}</span>
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
                Vérifier mon installation
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </Button>
            </div>
          </div>

          {/* Right column - Badges */}
          <div ref={badgesRef} className="space-y-4">
            {badges.map((badge) => (
              <div
                key={badge.title}
                className="badge-item relative overflow-hidden bg-card/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-shimmer opacity-30" />
                
                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <badge.icon className="text-gold" size={28} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-xl mb-1">
                      {badge.title}
                    </h3>
                    <p className="text-gray-text text-sm">{badge.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust statement */}
            <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 text-center">
              <p className="text-white/80 text-sm">
                <span className="text-gold font-semibold">Assurances complètes</span>{' '}
                et{' '}
                <span className="text-gold font-semibold">garantie décennale</span>{' '}
                pour votre protection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative checkmark line */}
      <div className="absolute right-[15vw] top-1/3 w-px h-1/3 bg-gradient-to-b from-transparent via-gold/30 to-transparent">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <CheckCircle className="text-gold glow-gold" size={24} />
        </div>
      </div>
    </section>
  );
}
