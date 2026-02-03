import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ElectricLineProps {
  sectionIndex: number;
}

export function ElectricLine({ sectionIndex }: ElectricLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!pathRef.current || !sparkRef.current || !containerRef.current) return;

    const path = pathRef.current;
    const spark = sparkRef.current;
    const pathLength = path.getTotalLength();

    // Set up initial state
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current.parentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'none',
    });

    // Animate spark along path
    gsap.to(spark, {
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
      },
      scrollTrigger: {
        trigger: containerRef.current.parentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [sectionIndex]);

  // Different paths for different sections
  const getPath = () => {
    switch (sectionIndex) {
      case 1: // Hero - draws from right side downward
        return 'M 1200 300 Q 1100 400 1150 500 T 1100 700';
      case 2: // Services - weaves left of cards
        return 'M 100 100 Q 150 300 100 500 T 150 700';
      case 3: // Residential - down right side
        return 'M 1400 100 Q 1350 300 1400 500 T 1380 700';
      case 4: // Commercial - down left side then to stats
        return 'M 80 100 Q 120 300 80 500 Q 200 600 300 650';
      case 5: // Safety - center-right to badges
        return 'M 1000 100 Q 950 300 1000 500 Q 900 600 800 680';
      case 6: // EV - to plug icon
        return 'M 1200 100 Q 1150 300 1200 500 T 1180 680';
      default:
        return 'M 100 100 L 100 700';
    }
  };

  return (
    <svg
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id={`glow-${sectionIndex}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Main electric line */}
      <path
        ref={pathRef}
        d={getPath()}
        fill="none"
        stroke="#F2B33D"
        strokeWidth="2"
        filter={`url(#glow-${sectionIndex})`}
        className="glow-line"
      />
      
      {/* Spark dot at leading edge */}
      <circle
        ref={sparkRef}
        r="6"
        fill="#F2B33D"
        filter={`url(#glow-${sectionIndex})`}
        className="animate-pulse-slow"
      />
    </svg>
  );
}
