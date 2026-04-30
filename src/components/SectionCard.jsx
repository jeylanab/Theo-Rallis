import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionCard = ({ section, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax on the image only
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 70, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        // Full-bleed tall card — Apple style
        height: 'clamp(340px, 38vw, 520px)',
        width: '100%',
        cursor: 'pointer',
        // Lift + shadow on hover
        boxShadow: hovered
          ? `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.35), 0 0 60px rgba(201,168,76,0.12)`
          : `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.12)`,
        transition: 'box-shadow 0.5s ease',
      }}
    >
      {/* ── FULL-BLEED PARALLAX IMAGE ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-12%',
          y: imgY,
        }}
      >
        <motion.img
          src={section.image}
          alt={section.title}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
          onError={e => {
            e.target.parentElement.style.background =
              'linear-gradient(135deg, #150d22 0%, #2a1545 100%)';
            e.target.style.display = 'none';
          }}
        />
      </motion.div>

      {/* ── BASE GRADIENT (always visible, subtle) ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(
          180deg,
          rgba(13,6,18,0.05)  0%,
          rgba(13,6,18,0.08)  40%,
          rgba(13,6,18,0.65)  72%,
          rgba(13,6,18,0.95) 100%
        )`,
        zIndex: 1,
      }} />

      {/* ── HOVER OVERLAY (deepens on hover so text pops) ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            180deg,
            rgba(13,6,18,0.15)  0%,
            rgba(42,21,69,0.35) 40%,
            rgba(13,6,18,0.75)  72%,
            rgba(13,6,18,0.98) 100%
          )`,
          zIndex: 2,
        }}
      />

      {/* ── TOP GOLD LINE (animated width on hover) ── */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${section.accent}, transparent)`,
          transformOrigin: 'center',
          zIndex: 10,
        }}
      />

      {/* ── CATEGORY CHIP (top-left, always visible) ── */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -6 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute',
          top: '24px',
          left: '28px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: section.accent,
          boxShadow: `0 0 10px ${section.accent}`,
        }} />
        <span style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.7)',
        }}>
          {section.hasPlay ? 'Free Content' : 'Explore'}
        </span>
      </motion.div>

      {/* ── PLAY ICON for videos (top-right always) ── */}
      {section.hasPlay && (
        <motion.div
          animate={{ scale: hovered ? 1.15 : 1, opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            zIndex: 10,
            width: '44px', height: '44px',
            borderRadius: '50%',
            border: `1.5px solid rgba(201,168,76,0.5)`,
            backdropFilter: 'blur(12px)',
            background: 'rgba(13,6,18,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill={section.accent}>
            <path d="M2 1.5l11 6.5-11 6.5V1.5z" />
          </svg>
        </motion.div>
      )}

      {/* ── CONTENT BLOCK (slides up on hover) ── */}
      <motion.div
        animate={{ y: hovered ? 0 : '28px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          zIndex: 10,
          padding: 'clamp(24px, 3vw, 40px) clamp(24px, 3.5vw, 44px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Title */}
        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
          fontWeight: 700,
          letterSpacing: '0.04em',
          lineHeight: 1.1,
          margin: 0,
          background: `linear-gradient(135deg, ${section.accent} 0%, #f5f0e8 45%, ${section.accent} 100%)`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'goldShimmer 5s linear infinite',
          textShadow: 'none',
        }}>
          {section.title}
        </h2>

        {/* Description — fades & slides in on hover */}
        <motion.p
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 12,
            height: hovered ? 'auto' : 0,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: hovered ? 0.05 : 0 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.08rem)',
            lineHeight: 1.75,
            color: 'rgba(245,240,232,0.88)',
            maxWidth: '580px',
            margin: 0,
            textShadow: '0 1px 12px rgba(13,6,18,0.9)',
            overflow: 'hidden',
          }}
        >
          {section.description}
        </motion.p>

        {/* CTA Row */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: hovered ? 0.1 : 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            paddingTop: '4px',
          }}
        >
          {/* Primary button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: `0 0 30px rgba(201,168,76,0.4)` }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: `linear-gradient(135deg, rgba(154,122,46,0.9), rgba(201,168,76,0.9), rgba(232,201,106,0.9))`,
              color: '#0d0612',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '11px 26px',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            {section.hasPlay ? 'Watch Now' : 'Explore'}
          </motion.button>

          {/* Arrow link */}
          <motion.div
            whileHover={{ x: 5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(201,168,76,0.8)',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Learn more
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path d="M1 5h15M11 1l5 4-5 4" stroke="rgba(201,168,76,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── CORNER ACCENTS (Apple-style geometry) ── */}
      {[
        { top: '12px', left: '12px', borderTop: true, borderLeft: true },
        { top: '12px', right: '12px', borderTop: true, borderRight: true },
        { bottom: '12px', left: '12px', borderBottom: true, borderLeft: true },
        { bottom: '12px', right: '12px', borderBottom: true, borderRight: true },
      ].map((corner, i) => (
        <motion.div
          key={i}
          animate={{ opacity: hovered ? 0.9 : 0.3, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            width: '14px', height: '14px',
            borderTop: corner.borderTop ? `1.5px solid ${section.accent}` : 'none',
            borderBottom: corner.borderBottom ? `1.5px solid ${section.accent}` : 'none',
            borderLeft: corner.borderLeft ? `1.5px solid ${section.accent}` : 'none',
            borderRight: corner.borderRight ? `1.5px solid ${section.accent}` : 'none',
            zIndex: 10,
            ...corner,
          }}
        />
      ))}
    </motion.div>
  );
};

export default SectionCard;
