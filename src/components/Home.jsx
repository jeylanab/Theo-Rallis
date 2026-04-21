import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import heroImg from '../assets/hero.jpeg';
import aboutImg from '../assets/about.jpeg';
import successImg from '../assets/success.jpeg';
import moneyImg from '../assets/money.jpeg';
import relationshipsImg from '../assets/relationships.jpeg';
import videosImg from '../assets/videos.jpeg';

// Floating particles
const Particles = () => (
  <div className="particles-container">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${8 + Math.random() * 15}s`,
          animationDelay: `${Math.random() * 10}s`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          opacity: 0.3 + Math.random() * 0.5,
        }}
      />
    ))}
  </div>
);

// Welcome video embed (top-left corner)
const WelcomeVideo = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      style={{
        position: 'absolute',
        top: '80px',
        left: '20px',
        width: '160px',
        zIndex: 10,
        cursor: 'pointer',
      }}
      onClick={() => setPlaying(!playing)}
    >
      <div style={{
        border: '1.5px solid rgba(201,168,76,0.6)',
        borderRadius: '4px',
        overflow: 'hidden',
        background: 'rgba(13,6,18,0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.2)',
        position: 'relative',
      }}>
        {/* Video thumbnail / play area */}
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #150d22, #2a1545)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img
            src={heroImg}
            alt="Welcome"
            style={{
              position: 'absolute',
              inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: 0.5,
            }}
          />
          {/* Play button */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              width: '34px', height: '34px',
              borderRadius: '50%',
              background: 'rgba(201,168,76,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 2,
              boxShadow: '0 0 20px rgba(201,168,76,0.6)',
            }}
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="#0d0612">
              <path d="M2 1.5l9 5-9 5V1.5z" />
            </svg>
          </motion.div>
        </div>
        {/* Label */}
        <div style={{
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <div style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: '#c9a84c',
            animation: 'pulseGlow 2s infinite',
          }} />
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.6rem',
            color: 'rgba(201,168,76,0.9)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Welcome Video
          </span>
        </div>
      </div>
      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        top: '-3px', left: '-3px',
        width: '16px', height: '16px',
        borderTop: '2px solid #c9a84c',
        borderLeft: '2px solid #c9a84c',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-3px', right: '-3px',
        width: '16px', height: '16px',
        borderBottom: '2px solid #c9a84c',
        borderRight: '2px solid #c9a84c',
      }} />
    </motion.div>
  );
};

// Section cards data
const sections = [
  {
    id: 'about',
    title: 'About',
    image: aboutImg,
    description: 'Discover the mind behind the movement. Theo Rallis brings decades of mastery in human potential, wealth creation, and the pursuit of excellence — guiding thousands to transform ambition into reality.',
    accent: '#c9a84c',
  },
  {
    id: 'success',
    title: 'Success',
    image: successImg,
    description: 'Unlock the pathways to achievement and prosperity. Discover battle-tested strategies that elevate your mindset and fulfil your highest ambitions in the modern metropolis.',
    accent: '#c9a84c',
  },
  {
    id: 'money',
    title: 'Money · Money · Money',
    image: moneyImg,
    description: 'Master the flow of wealth and financial abundance. Learn the secrets of accumulation, preservation, and exponential growth in the modern age.',
    accent: '#e8c96a',
  },
  {
    id: 'relationships',
    title: 'Relationships',
    image: relationshipsImg,
    description: 'Forge meaningful connections and alliances. Navigate the social landscape with grace and build networks that propel your journey to lasting success.',
    accent: '#c9a84c',
  },
  {
    id: 'videos',
    title: 'Free Videos',
    image: videosImg,
    description: 'Access exclusive visual content and tutorials. Watch and learn from Theo who has mastered the art of thriving in the modern world.',
    accent: '#c9a84c',
    hasPlay: true,
  },
];

// Individual section card
const SectionCard = ({ section, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="section-card"
      style={{
        position: 'relative',
        borderRadius: '6px',
        overflow: 'hidden',
        minHeight: '220px',
        cursor: 'pointer',
      }}
    >
      {/* Background image with parallax */}
      <motion.div style={{ y, position: 'absolute', inset: '-20px' }}>
        <img
          src={section.image}
          alt={section.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
          onError={e => { e.target.style.opacity = 0; }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, rgba(13,6,18,0.9) 0%, rgba(42,21,69,0.7) 100%)`,
      }} />

      {/* Top gold line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${section.accent}, transparent)`,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '40px 44px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {section.hasPlay && (
          <div style={{
            width: '50px', height: '50px',
            borderRadius: '50%',
            border: `1.5px solid ${section.accent}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '4px',
          }}>
            <svg width="16" height="18" viewBox="0 0 16 18" fill={section.accent}>
              <path d="M3 2l12 7-12 7V2z" />
            </svg>
          </div>
        )}

        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
          fontWeight: 700,
          letterSpacing: '0.05em',
          background: `linear-gradient(135deg, ${section.accent}, #f5f0e8, ${section.accent})`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'goldShimmer 5s linear infinite',
        }}>
          {section.title}
        </h2>

        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.05rem',
          lineHeight: 1.7,
          color: 'rgba(245,240,232,0.75)',
          maxWidth: '520px',
        }}>
          {section.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.03, x: 4 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'none',
            border: `1px solid rgba(201,168,76,0.4)`,
            color: section.accent,
            fontFamily: 'Cinzel, serif',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            padding: '10px 24px',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          Explore
          <svg width="12" height="8" viewBox="0 0 12 8" fill={section.accent}>
            <path d="M8 0l4 4-4 4M0 4h11" stroke={section.accent} strokeWidth="1" fill="none" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--purple-deep)' }}>
      <Particles />

      {/* ═══════════════════════════════ HERO SECTION ═══════════════════════════════ */}
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
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
            }}
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
          width: '800px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(107,63,160,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />

        {/* Welcome video - top left */}
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
              width: '80px', height: '1px',
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
              marginBottom: '8px',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.5em',
              color: 'rgba(201,168,76,0.8)',
              textTransform: 'uppercase',
            }}
          >
            Theo Rallis Welcomes You
          </motion.p>

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
                background: 'linear-gradient(135deg, #f5f0e8 0%, #ffffff 50%, #f5f0e8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: 'rgba(245,240,232,0.7)',
              letterSpacing: '0.05em',
              maxWidth: '500px',
              fontStyle: 'italic',
            }}
          >
            Master your mindset. Build your wealth. Live with purpose.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(201,168,76,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#videos')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(201,168,76,0.4)',
                color: 'rgba(201,168,76,0.9)',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                padding: '14px 36px',
                cursor: 'pointer',
                borderRadius: '2px',
                textTransform: 'uppercase',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
            >
              ▶  Free Videos
            </motion.button>
          </motion.div>

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
            }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                width: '1px', height: '40px',
                background: 'linear-gradient(180deg, rgba(201,168,76,0.6), transparent)',
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════ VIDEO FEATURE SECTION ═══════════════════════ */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        background: 'linear-gradient(180deg, var(--purple-deep) 0%, rgba(42,21,69,0.3) 50%, var(--purple-deep) 100%)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.5em',
              color: 'rgba(201,168,76,0.6)',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Experience The Pulse of Success
            </div>
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }} className="gold-text">
              Featured Content
            </h2>
            <div style={{
              width: '60px', height: '1px',
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
              margin: '20px auto 0',
            }} />
          </motion.div>

          {/* Video player mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(201,168,76,0.25)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.1)',
              background: '#000',
              aspectRatio: '16/7',
              maxHeight: '520px',
            }}
          >
            <img
              src={heroImg}
              alt="Featured Video"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
              onError={e => { e.target.style.display = 'none'; }}
            />

            {/* Video overlay content */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(13,6,18,0.6), rgba(42,21,69,0.4))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '20px',
            }}>
              {/* Big play button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ['0 0 30px rgba(201,168,76,0.3)', '0 0 70px rgba(201,168,76,0.6)', '0 0 30px rgba(201,168,76,0.3)'] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                style={{
                  width: '80px', height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(201,168,76,0.15)',
                  border: '2px solid rgba(201,168,76,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
                  <path d="M5 3l22 13L5 29V3z" fill="#c9a84c" />
                </svg>
              </motion.div>

              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: 'rgba(201,168,76,0.8)',
                textTransform: 'uppercase',
              }}>
                Play Intro
              </div>
            </div>

            {/* Video progress bar decoration */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '3px',
              background: 'rgba(255,255,255,0.1)',
            }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '35%' }}
                transition={{ delay: 1, duration: 2, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #9a7a2e, #c9a84c)',
                }}
              />
            </div>

            {/* Corner decorations */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => (
              <div key={corner} style={{
                position: 'absolute',
                ...(corner.includes('top') ? { top: '12px' } : { bottom: '12px' }),
                ...(corner.includes('left') ? { left: '12px' } : { right: '12px' }),
                width: '20px', height: '20px',
                borderTop: corner.includes('top') ? '1.5px solid rgba(201,168,76,0.6)' : 'none',
                borderBottom: corner.includes('bottom') ? '1.5px solid rgba(201,168,76,0.6)' : 'none',
                borderLeft: corner.includes('left') ? '1.5px solid rgba(201,168,76,0.6)' : 'none',
                borderRight: corner.includes('right') ? '1.5px solid rgba(201,168,76,0.6)' : 'none',
              }} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTIONS GRID ═══════════════════════════════ */}
      <section style={{
        padding: 'clamp(40px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {sections.map((section, i) => (
          <SectionCard key={section.id} section={section} index={i} />
        ))}
      </section>

      {/* ═══════════════════════════════ FOOTER CTA ═══════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(107,63,160,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />

        <div style={{
          position: 'relative',
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
        }}>
          <div style={{
            width: '40px', height: '1px',
            background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
          }} />

          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
            fontWeight: 700,
            letterSpacing: '0.06em',
          }} className="gold-text">
            Begin Your Journey
          </h2>

          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            color: 'rgba(245,240,232,0.65)',
            fontStyle: 'italic',
          }}>
            Join thousands who have already discovered the power within. Your transformation starts with a single step.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(201,168,76,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold"
            style={{ fontSize: '0.85rem', padding: '16px 50px' }}
          >
            Start Today — It's Free
          </motion.button>

          <div style={{
            width: '40px', height: '1px',
            background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
          }} />
        </div>
      </motion.section>

      {/* Footer */}
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
