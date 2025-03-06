import React, { useEffect, useRef, useState } from 'react';

const VantaBackground = ({ isDarkMode }) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const animationFrame = useRef(null);
  
  // Main color: purple 0x6d1f7e
  const mainColor = 0x6d1f7e;
  // Background color: black 0x0 for dark mode, lighter for light mode
  const darkBgColor = 0x0;
  const lightBgColor = 0x111111;

  const [params, setParams] = useState({
    scale: 1.00,
    scaleMobile: 1.00,
    color: mainColor,
    backgroundColor: isDarkMode ? darkBgColor : lightBgColor
  });

  useEffect(() => {
    const loadScripts = async () => {
      // Load p5.js first
      const p5Script = document.createElement('script');
      p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js';
      document.head.appendChild(p5Script);

      p5Script.onload = () => {
        // Then load three.js
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        document.head.appendChild(threeScript);

        threeScript.onload = () => {
          // Finally load vanta topology
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js';
          document.head.appendChild(vantaScript);

          vantaScript.onload = initVanta;
        };
      };
    };

    loadScripts();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    if (vantaEffect.current) {
      vantaEffect.current.setOptions({
        color: mainColor,
        backgroundColor: isDarkMode ? darkBgColor : lightBgColor
      });
    }
  }, [isDarkMode]);

  const initVanta = () => {
    if (!vantaEffect.current && window.VANTA) {
      vantaEffect.current = window.VANTA.TOPOLOGY({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
        scale: 1.00,
        scaleMobile: 1.00,
        color: mainColor,
        backgroundColor: isDarkMode ? darkBgColor : lightBgColor
      });

      const handleResize = () => {
        if (vantaEffect.current) {
          vantaEffect.current.resize();
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  };

  return (
    <div 
      ref={vantaRef}
      className="vanta-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0,
        transition: 'background-color 0.3s ease'
      }}
    />
  );
};

export default VantaBackground;