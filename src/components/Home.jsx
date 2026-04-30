import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '../assets/hero.jpeg';

import Particles from './Particles';
import WelcomeVideo from './WelcomeVideo';
import SectionCard from './SectionCard';
import sections from '../data/sectionsData';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--purple-deep)' }}>
      <Particles />

      {/* ══════════════ HERO SECTION ══════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Parallax background */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '-10%',
            y: heroY,
            scale: heroScale,
          }}
        >
          <img
            src={heroImg}
            alt="Cityscape"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => {
              e.target.parentElement.style.background =
                'linear-gradient(135deg, #0d0612 0%, #2a1545 50%, #0d0612 100%)';
              e.target.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Vignette & overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at center, rgba(13,6,18,0.1) 0%, rgba(13,6,18,0.7) 100%),
            linear-gradient(180deg, rgba(13,6,18,0.6) 0%, rgba(13,6,18,0.2) 40%, rgba(13,6,18,0.8) 100%)
          `,
        }} />

        {/* Purple glow from bottom */}
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(107,63,160,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />

        <WelcomeVideo />

        {/* Hero content */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 5,
            textAlign: 'center',
            opacity: heroOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '0 20px',
          }}
        >
          {/* Decorative top line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
              marginBottom: '8px',
            }}
          />

          {/* Main headline */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textShadow: '0 4px 60px rgba(0,0,0,0.8)',
              }}
            >
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #9a7a2e 0%, #c9a84c 30%, #e8c96a 50%, #c9a84c 70%, #9a7a2e 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'goldShimmer 3s linear infinite',
              }}>
                Success
              </span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #9a7a2e 0%, #c9a84c 30%, #e8c96a 50%, #c9a84c 70%, #9a7a2e 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'goldShimmer 3s linear infinite',
              }}>
                Lies Within
              </span>
            </motion.h1>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              position: 'absolute',
              bottom: '-120px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.4em',
              color: 'rgba(201,168,76,0.5)',
              textTransform: 'uppercase',
            }}>
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(180deg, rgba(201,168,76,0.6), transparent)',
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════ SECTIONS GRID ══════════════ */}
      <section style={{
        padding: 'clamp(40px, 7vw, 90px) clamp(16px, 3vw, 48px)',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        {sections.map((section, i) => (
          <SectionCard key={section.id} section={section} index={i} />
        ))}
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer style={{
        borderTop: '1px solid rgba(201,168,76,0.1)',
        padding: '30px clamp(20px, 5vw, 80px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'rgba(201,168,76,0.5)',
          textTransform: 'uppercase',
        }}>
          © 2025 Theo Rallis · All Rights Reserved
        </div>
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: 'rgba(245,240,232,0.25)',
          textTransform: 'uppercase',
        }}>
          Success · Money · Relationships
        </div>
      </footer>
    </div>
  );
}
