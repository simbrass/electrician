import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const trust = trustRef.current;
    const image = imageRef.current;

    if (!section || !content || !headline || !sub || !cta || !trust || !image) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Background image scale
      loadTl.fromTo(
        image,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
        0
      );

      // Headline words animation
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(
        words,
        { y: 28, opacity: 0, rotateX: 18 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: 'power2.out',
        },
        0.4
      );

      // Subheadline
      loadTl.fromTo(
        sub,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.7
      );

      // CTAs
      loadTl.fromTo(
        cta.children,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        0.8
      );

      // Trust badge
      loadTl.fromTo(
        trust,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.9
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headline, sub, cta, trust], { opacity: 1, x: 0, y: 0 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        sub,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        trust,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-navy relative z-10"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="/hero_night_work.jpg"
          alt="Electrician at work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/60 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 h-full flex flex-col justify-center px-6 lg:px-[7vw]"
      >
        <div className="max-w-4xl">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8"
          >
            <span className="word inline-block">L'électricité,</span>
            <br />
            <span className="word inline-block">exécutée</span>{' '}
            <span className="word inline-block text-sage">avec</span>{' '}
            <span className="word inline-block text-sage">précision.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-gray-text text-base md:text-lg lg:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Installation, mise aux normes et bornes de recharge pour la Rive-Nord
            — travail propre, sécuritaire et certifié.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16">
            <Button
              onClick={() => scrollToSection('#contact')}
              size="lg"
              className="bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-6 text-base btn-hover group"
            >
              Demander un devis
              <ArrowRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Button>
            <Button
              onClick={() => scrollToSection('#services')}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-base"
            >
              Voir nos services
            </Button>
          </div>

          {/* Trust Badge */}
          <div
            ref={trustRef}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/10">
              <Shield className="text-sage" size={20} />
              <span className="text-white/90 text-sm font-medium">
                RBQ 0000-0000-01
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/10">
              <Award className="text-sage" size={20} />
              <span className="text-white/90 text-sm font-medium">
                CMMTQ certifié
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative electric spark */}
      <div className="absolute right-[20vw] top-[30vh] w-3 h-3 bg-gold rounded-full glow-gold animate-pulse-slow z-20" />
    </section>
  );
}
