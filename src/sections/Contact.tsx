import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    color: '#ffffff',
    fontFamily: "'Funnel Display', sans-serif",
    fontSize: '16px',
    padding: '12px 0',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s',
    letterSpacing: '0.5px',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full bg-black"
      style={{ padding: '120px 0' }}
    >
      <div className="px-6 md:px-20" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h2
          className="text-center mb-16"
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: 'clamp(36px, 4vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#ffffff',
          }}
        >
          Let's Create Together
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-8 opacity-0"
          >
            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderBottomColor = '#6466e9')}
                onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
                required
              />
            </div>

            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderBottomColor = '#6466e9')}
                onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
                required
              />
            </div>

            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Project Type
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='1.5'%3E%3Cpath d='M3 5l3 3 3-3'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0 center',
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#6466e9')}
                onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
              >
                <option value="" style={{ background: '#000' }}>Select a type</option>
                <option value="web-experience" style={{ background: '#000' }}>Web Experience</option>
                <option value="game" style={{ background: '#000' }}>Game</option>
                <option value="brand" style={{ background: '#000' }}>Brand Identity</option>
                <option value="webapp" style={{ background: '#000' }}>Web App</option>
                <option value="installation" style={{ background: '#000' }}>Installation</option>
                <option value="mobile" style={{ background: '#000' }}>Mobile</option>
                <option value="other" style={{ background: '#000' }}>Other</option>
              </select>
            </div>

            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='1.5'%3E%3Cpath d='M3 5l3 3 3-3'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0 center',
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#6466e9')}
                onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
              >
                <option value="" style={{ background: '#000' }}>Select a range</option>
                <option value="5k-15k" style={{ background: '#000' }}>$5,000 - $15,000</option>
                <option value="15k-50k" style={{ background: '#000' }}>$15,000 - $50,000</option>
                <option value="50k-100k" style={{ background: '#000' }}>$50,000 - $100,000</option>
                <option value="100k+" style={{ background: '#000' }}>$100,000+</option>
              </select>
            </div>

            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#6466e9')}
                onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 text-white font-bold transition-all hover:opacity-90"
              style={{
                background: '#6466e9',
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: '16px',
                letterSpacing: '0.5px',
              }}
            >
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-10 opacity-0">
            <div>
              <p
                className="mb-2"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Email
              </p>
              <a
                href="mailto:hello@brc7.studio"
                className="text-white hover:text-[#6466e9] transition-colors duration-300"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '18px',
                  letterSpacing: '0.5px',
                }}
              >
                hello@brc7.studio
              </a>
            </div>

            <div>
              <p
                className="mb-2"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Phone
              </p>
              <a
                href="tel:+15552345678"
                className="text-white hover:text-[#6466e9] transition-colors duration-300"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '18px',
                  letterSpacing: '0.5px',
                }}
              >
                +1 (555) 234-5678
              </a>
            </div>

            <div>
              <p
                className="mb-2"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Location
              </p>
              <p
                className="text-white"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '18px',
                  letterSpacing: '0.5px',
                }}
              >
                Los Angeles, CA
              </p>
            </div>

            <div>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Social
              </p>
              <div className="flex flex-col gap-3">
                {['Twitter', 'GitHub', 'Dribbble'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="relative text-white/70 hover:text-white transition-colors duration-300 inline-block w-fit group"
                    style={{
                      fontFamily: "'Funnel Display', sans-serif",
                      fontSize: '16px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {social}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
