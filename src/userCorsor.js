import React, { useEffect, useRef } from 'react';

const RippleCursor = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      containerRef.current.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none overflow-hidden"
    >
      <style>{`
        .ripple {
          position: absolute;
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #a855f7, #ffffff);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: rippleEffect 0.6s ease-out;
          box-shadow: 0 0 15px #a855f7aa;
        }

        @keyframes rippleEffect {
          from {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.9;
          }
          to {
            transform: translate(-50%, -50%) scale(3.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RippleCursor;
