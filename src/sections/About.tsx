import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expandableTopics = [
  {
    title: 'Our Vision',
    content:
      'BRC7 envisions a future where technology and creativity merge seamlessly. We believe every digital product should be an experience — not just a tool. Our goal is to push the boundaries of what is possible on the web, in games, and across all digital platforms. We strive to create work that inspires, engages, and transforms how people interact with technology.',
  },
  {
    title: 'Our Process',
    content:
      'Every project at BRC7 begins with deep discovery. We immerse ourselves in your brand, your audience, and your goals. From there, our design team crafts visual concepts while our engineering team prototypes technical solutions. We iterate rapidly, test thoroughly, and launch with confidence. Post-launch, we provide ongoing support and optimization to ensure long-term success.',
  },
  {
    title: 'Our Expertise',
    content:
      'Our team brings together expertise in frontend engineering, backend architecture, game design, 3D graphics, motion design, and brand strategy. We are proficient in modern frameworks like React, Vue, and Svelte; game engines like Unity and Unreal; and creative tools like Figma, Blender, and After Effects. This multidisciplinary approach allows us to tackle projects of any complexity.',
  },
  {
    title: 'Our Culture',
    content:
      'BRC7 is built on a culture of curiosity, collaboration, and continuous learning. We encourage experimentation and celebrate creative risks. Every team member has a voice, and every idea is valued. We are remote-first, globally distributed, and united by our passion for building extraordinary digital experiences.',
  },
  {
    title: 'Why BRC7?',
    content:
      'The name BRC7 represents our seven core principles: Boldness, Reliability, Creativity, Collaboration, Craftsmanship, Curiosity, and Commitment. These values guide every decision we make and every product we build. When you work with BRC7, you are not just hiring a vendor — you are partnering with a team that genuinely cares about your success.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full"
      style={{ background: '#1b1e26', padding: '120px 0', minHeight: '80vh' }}
    >
      <div
        className="px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16"
        style={{ maxWidth: '1440px', margin: '0 auto' }}
      >
        {/* Left Column */}
        <div ref={leftRef} className="opacity-0">
          <h2
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            Built by a team that believes technology should feel magical.
          </h2>
        </div>

        {/* Right Column */}
        <div ref={rightRef} className="opacity-0">
          <div className="space-y-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <p
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: '16px',
                lineHeight: 1.8,
                letterSpacing: '0.5px',
              }}
            >
              BRC7 was founded in 2025 by Fahz-TeamOFFC, a collective of developers, designers, and dreamers who saw the web as a canvas for art, not just information.
            </p>
            <p
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: '16px',
                lineHeight: 1.8,
                letterSpacing: '0.5px',
              }}
            >
              We specialize in the intersection of design and engineering — where beautiful visuals meet bulletproof code. Every project is a collaboration, every pixel is intentional.
            </p>
            <p
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: '16px',
                lineHeight: 1.8,
                letterSpacing: '0.5px',
              }}
            >
              From WebGL experiences to full-stack applications, from game worlds to brand identities — we build digital products that leave a lasting impression.
            </p>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-6 mt-10"
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <span>47 Projects</span>
            <span>|</span>
            <span>12 Awards</span>
            <span>|</span>
            <span>6 Team Members</span>
          </div>

          {/* Expandable Topics */}
          <div className="mt-12 space-y-4">
            {expandableTopics.map((topic, index) => (
              <div
                key={topic.title}
                className="border-b border-white/10"
              >
                <button
                  className="w-full flex items-center justify-between py-4 text-left group"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <span
                    className="text-white group-hover:text-[#6466e9] transition-colors duration-300"
                    style={{
                      fontFamily: "'Funnel Display', sans-serif",
                      fontSize: '18px',
                      fontWeight: 400,
                    }}
                  >
                    {topic.title}
                  </span>
                  <span
                    className="text-white/50 transition-transform duration-300"
                    style={{
                      transform: expandedIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                      fontSize: '24px',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: expandedIndex === index ? '300px' : '0',
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                >
                  <p
                    className="pb-6"
                    style={{
                      fontFamily: "'Funnel Display', sans-serif",
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,0.5)',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {topic.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
