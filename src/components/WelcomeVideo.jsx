import { useState } from 'react';
import { motion } from 'framer-motion';
import heroImg from '../assets/hero.jpeg';

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
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.5,
            }}
          />
          {/* Play button */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(201,168,76,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              boxShadow: '0 0 20px rgba(201,168,76,0.6)',
            }}
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="#0d0612">
              <path d="M2 1.5l9 5-9 5V1.5z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Corner accents */}
      <div style={{
        position: 'absolute',
        top: '-3px',
        left: '-3px',
        width: '16px',
        height: '16px',
        borderTop: '2px solid #c9a84c',
        borderLeft: '2px solid #c9a84c',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-3px',
        right: '-3px',
        width: '16px',
        height: '16px',
        borderBottom: '2px solid #c9a84c',
        borderRight: '2px solid #c9a84c',
      }} />
    </motion.div>
  );
};

export default WelcomeVideo;
