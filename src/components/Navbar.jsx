import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const navItems = [
  { name: 'About', href: '#about', icon: '◆' },
  { name: 'Success', href: '#success', icon: '◆' },
  { name: 'Money · Money · Money', href: '#money', icon: '◆' },
  { name: 'Relationships', href: '#relationships', icon: '◆' },
  { name: 'Free Videos', href: '#videos', icon: '◆' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 40px' : '20px 40px',
          background: scrolled
            ? 'linear-gradient(180deg, rgba(13,6,18,0.98) 0%, rgba(13,6,18,0.95) 100%)'
            : 'linear-gradient(180deg, rgba(13,6,18,0.85) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
          transition: 'all 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div style={{
            width: '44px', height: '44px',
            borderRadius: '50%',
            border: '1.5px solid rgba(201,168,76,0.6)',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(201,168,76,0.3)',
          }}>
            <img src={logo} alt="Theo Rallis" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.8)',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>Theo Rallis</div>
          </div>
        </motion.div>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          listStyle: 'none',
        }}>
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
            >
              <button
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  color: activeItem === item.name ? '#c9a84c' : 'rgba(245,240,232,0.75)',
                  textTransform: 'uppercase',
                  padding: '8px 16px',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                }}
              >
                {item.name}
                {activeItem === item.name && (
                  <motion.div
                    layoutId="navUnderline"
                    style={{
                      position: 'absolute',
                      bottom: '2px', left: '16px', right: '16px',
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            </motion.div>
          ))}

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,168,76,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick('#videos')}
            style={{
              background: 'linear-gradient(135deg, #9a7a2e, #c9a84c, #e8c96a)',
              color: '#0d0612',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '10px 22px',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              marginLeft: '8px',
              transition: 'all 0.3s ease',
            }}
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid rgba(201,168,76,0.4)',
            padding: '8px 12px',
            cursor: 'pointer',
            flexDirection: 'column',
            gap: '5px',
            borderRadius: '2px',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '22px', height: '1.5px',
              background: '#c9a84c',
              transition: 'all 0.3s ease',
              transform: isOpen
                ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '80vw', maxWidth: '320px',
              height: '100vh',
              background: 'linear-gradient(135deg, rgba(13,6,18,0.99), rgba(42,21,69,0.99))',
              backdropFilter: 'blur(30px)',
              zIndex: 2000,
              padding: '80px 40px 40px',
              borderRight: '1px solid rgba(201,168,76,0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {/* Decorative lines */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '2px',
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
            }} />

            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              color: 'rgba(201,168,76,0.5)',
              textTransform: 'uppercase',
              marginBottom: '24px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}>Navigation</div>

            {navItems.map((item, i) => (
              <motion.button
                key={item.name}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                onClick={() => handleNavClick(item.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  padding: '16px 0',
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(201,168,76,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.3s ease',
                  width: '100%',
                }}
              >
                <span style={{ opacity: 0.4, fontSize: '0.7rem' }}>{item.icon}</span>
                {item.name}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: '40px',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: 'rgba(245,240,232,0.4)',
                background: 'none',
                border: '1px solid rgba(201,168,76,0.2)',
                padding: '12px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                borderRadius: '2px',
              }}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              zIndex: 1999,
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
