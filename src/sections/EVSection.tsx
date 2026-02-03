import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Plug, FileText, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    text: 'Installation 240V',
  },
  {
    icon: FileText,
    text: 'Conseil borne & subventions',
  },
  {
    icon: Eye,
    text: 'Gaine dissimulée',
  },
];

export function EVSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const featuresEl = featuresRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !headline || !body || !featuresEl || !cta) return;

    const featureItems = featuresEl.querySelectorAll('.feature-chip');

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
        featureItems,
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
        [featuresEl, cta],
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
      id="ev-charging"
      className="section-pinned relative z-[60]"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="/ev_charging_night.jpg"
          alt="EV charging at night"
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
            La recharge,
            <br />
            <span className="text-gold">simple et rapide.</span>
          </h2>

          <p
            ref={bodyRef}
            className="text-gray-text text-base md:text-lg leading-relaxed mb-8 max-w-lg"
          >
            Nous installons votre borne de recharge avec câblage adapté,
            gaine propre et mise en service complète.
          </p>

          {/* Feature chips */}
          <div
            ref={featuresRef}
            className="flex flex-wrap gap-3 mb-10"
          >
            {features.map((feature) => (
              <div
                key={feature.text}
                className="feature-chip flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-white/10 rounded-full px-5 py-3"
              >
                <feature.icon className="text-gold" size={18} />
                <span className="text-white/90 text-sm font-medium">
                  {feature.text}
                </span>
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
              Prévoir mon installation
              <ArrowRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative plug icon */}
      <div className="absolute right-[15vw] bottom-[20vh]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center animate-pulse-slow">
            <Plug className="text-gold" size={32} />
          </div>
          <div className="absolute inset-0 rounded-full border border-gold/30 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute right-[18vw] top-1/4 bottom-1/3 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
