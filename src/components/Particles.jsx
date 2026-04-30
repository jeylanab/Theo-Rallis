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

export default Particles;
