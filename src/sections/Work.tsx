import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'Orbital', category: 'Immersive Web Experience', image: '/images/work-1.jpg' },
  { id: 2, title: 'Nebula', category: 'Game Development', image: '/images/work-2.jpg' },
  { id: 3, title: 'Pulse', category: 'Brand Identity', image: '/images/work-3.jpg' },
  { id: 4, title: 'Vertex', category: 'Web Application', image: '/images/work-4.jpg' },
  { id: 5, title: 'Echo', category: 'Interactive Installation', image: '/images/work-5.jpg' },
  { id: 6, title: 'Prism', category: 'Mobile Experience', image: '/images/work-6.jpg' },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
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
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
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
      id="work"
      ref={sectionRef}
      className="w-full bg-black"
      style={{ padding: '120px 0' }}
    >
      <div className="px-6 md:px-20" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h2
          ref={headingRef}
          className="mb-16 opacity-0"
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: 'clamp(36px, 4vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#ffffff',
          }}
        >
          Selected Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="group relative overflow-hidden opacity-0 cursor-pointer"
              style={{
                aspectRatio: '3/2',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                }}
              >
                <div className="transform translate-y-5 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p
                    className="mb-1"
                    style={{
                      fontFamily: "'Funnel Display', sans-serif",
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {project.category}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Funnel Display', sans-serif",
                      fontSize: '30px',
                      fontWeight: 400,
                      lineHeight: 1.1,
                      color: '#ffffff',
                    }}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
