import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, image: '/project_thumb_01.jpg', title: 'Tableau électrique moderne', category: 'Résidentiel' },
  { id: 2, image: '/project_thumb_02.jpg', title: 'Éclairage cuisine LED', category: 'Résidentiel' },
  { id: 3, image: '/project_thumb_03.jpg', title: 'Éclairage paysager', category: 'Extérieur' },
  { id: 4, image: '/project_thumb_04.jpg', title: 'Installation commerciale', category: 'Commercial' },
  { id: 5, image: '/project_thumb_05.jpg', title: 'Borne de recharge VE', category: 'VE' },
  { id: 6, image: '/project_thumb_06.jpg', title: 'Commande intelligente', category: 'Résidentiel' },
];

const testimonials = [
  {
    text: "Travail nickel, tableau propre et explications claires. Je recommande.",
    author: 'Marc L.',
    location: 'Rosemère',
  },
  {
    text: "Installation de borne rapide, aucune surprise. Top.",
    author: 'Sarah T.',
    location: 'Laval',
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    const testimonialsEl = testimonialsRef.current;
    const trust = trustRef.current;

    if (!section || !heading || !grid || !testimonialsEl || !trust) return;

    const cards = grid.querySelectorAll('.project-card');
    const testimonialCards = testimonialsEl.querySelectorAll('.testimonial-card');

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        cards,
        { y: 40, scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Testimonials animation
      gsap.fromTo(
        testimonialCards,
        { x: (i) => (i === 0 ? -30 : 30), opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: testimonialsEl,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Trust bar animation
      gsap.fromTo(
        trust,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: trust,
            start: 'top 85%',
            end: 'top 70%',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % projects.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-navy py-20 lg:py-32 z-[70]"
    >
      {/* Heading */}
      <div ref={headingRef} className="px-6 lg:px-[7vw] mb-12">
        <span className="font-mono text-gold text-xs tracking-[0.12em] uppercase mb-4 block">
          Portfolio
        </span>
        <h2 className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-4">
          Réalisations récentes
        </h2>
        <p className="text-gray-text text-base md:text-lg max-w-xl">
          Quelques chantiers sur la Rive-Nord.
        </p>
      </div>

      {/* Projects Grid */}
      <div
        ref={gridRef}
        className="px-6 lg:px-[7vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card group relative overflow-hidden rounded-2xl cursor-pointer card-hover"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-gold text-xs font-mono uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="font-heading font-bold text-white text-lg">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div
        ref={testimonialsRef}
        className="px-6 lg:px-[7vw] grid md:grid-cols-2 gap-6 mb-16"
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.author}
            className="testimonial-card bg-card/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8"
          >
            <Quote className="text-gold mb-4" size={32} />
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">
                  {testimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-white font-medium">{testimonial.author}</div>
                <div className="text-gray-text text-sm">{testimonial.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Bar */}
      <div
        ref={trustRef}
        className="px-6 lg:px-[7vw]"
      >
        <div className="bg-card/40 border border-white/10 rounded-2xl py-6 px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              RBQ 0000-0000-01
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              CMMTQ
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Assurances
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Garantie
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-lg flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
          >
            <ChevronRight size={40} />
          </button>

          <div
            className="max-w-5xl max-h-[80vh] px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={projects[currentImage].image}
              alt={projects[currentImage].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <span className="text-gold text-xs font-mono uppercase tracking-wider">
                {projects[currentImage].category}
              </span>
              <h3 className="font-heading font-bold text-white text-xl mt-1">
                {projects[currentImage].title}
              </h3>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? 'bg-gold' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
