import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#6466e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="14" />
        <path d="M16 2v28M2 16h28M6 6l20 20M26 6L6 26" />
      </svg>
    ),
    title: 'Web Experiences',
    description:
      'Immersive websites that push the boundaries of what a browser can do. WebGL, Three.js, GSAP — we craft digital environments that feel alive.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#6466e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="24" height="16" rx="2" />
        <path d="M10 14h4M10 18h8M20 14h2" />
        <circle cx="22" cy="18" r="1" fill="#6466e9" />
      </svg>
    ),
    title: 'Game Development',
    description:
      'From concept to playable. We build games for web, mobile, and desktop using Unity, Unreal, and custom engines.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#6466e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 28l6-16 6 10 6-8 6 14H4z" />
        <circle cx="24" cy="6" r="3" />
      </svg>
    ),
    title: 'Brand Identity',
    description:
      'Visual systems that tell your story. Logo design, motion identity, brand guidelines, and digital-first aesthetics.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#6466e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8,24 8,8 24,8" />
        <polyline points="24,16 24,24 16,24" />
        <path d="M4 4l6 6M28 4l-6 6M4 28l6-6M28 28l-6-6" />
      </svg>
    ),
    title: 'Web Applications',
    description:
      'Full-stack applications with beautiful frontends and robust backends. React, Node, PostgreSQL, AWS.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#6466e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="10" height="10" rx="1" />
        <rect x="18" y="4" width="10" height="10" rx="1" />
        <rect x="4" y="18" width="10" height="10" rx="1" />
        <rect x="18" y="18" width="10" height="10" rx="1" />
      </svg>
    ),
    title: 'Interactive Installations',
    description:
      'Physical spaces meet digital art. Projection mapping, sensor integration, and real-time generative visuals.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#6466e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="16" height="28" rx="3" />
        <path d="M13 26h6" />
      </svg>
    ),
    title: 'Mobile Experiences',
    description:
      'Native and cross-platform mobile apps that deliver smooth, polished user experiences on iOS and Android.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full"
      style={{ background: '#1b1e26', padding: '120px 0' }}
    >
      <div className="px-6 md:px-20" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div ref={headingRef} className="mb-16 opacity-0">
          <h2
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            What We Do
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.5px',
            }}
          >
            End-to-end creative technology services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="group p-10 bg-black opacity-0 transition-colors duration-300 hover:bg-white/5"
              style={{
                borderTop: '2px solid #6466e9',
              }}
            >
              <div className="mb-6">{service.icon}</div>
              <h3
                className="mb-4"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '30px',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: '#ffffff',
                }}
              >
                {service.title}
              </h3>
              <p
                className="mb-6"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '16px',
                  lineHeight: 1.5,
                  letterSpacing: '0.5px',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {service.description}
              </p>
              <button
                className="relative text-white/70 hover:text-white transition-colors duration-300 group/link"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                }}
              >
                Learn More
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover/link:w-full transition-all duration-300" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
