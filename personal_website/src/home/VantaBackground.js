import React, { useEffect, useRef, useState } from 'react';

const VantaBackground = ({ isDarkMode }) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const animationFrame = useRef(null);
  
  const [params, setParams] = useState({
    spacing: 17,
    points: 20,
    maxDistance: 21,
  });

  const ranges = {
    spacing: { min: 17, max: 20, speed: 0.1 },
    points: { min: 18, max: 22, speed: 0.05 },
    maxDistance: { min: 20, max: 23, speed: 0.08 }
  };

  const directions = useRef({
    spacing: 1,
    points: 1,
    maxDistance: 1
  });

  useEffect(() => {
    const loadScripts = async () => {
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      document.head.appendChild(threeScript);

      threeScript.onload = () => {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
        document.head.appendChild(vantaScript);

        vantaScript.onload = initVanta;
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
        color: isDarkMode ? 0x4ade80 : 0x86efac,
        backgroundColor: isDarkMode ? 0x2d3436 : 0xf3f4f6 // Darker grey for light mode
      });
    }
  }, [isDarkMode]);

  const animate = () => {
    setParams(prevParams => {
      const newParams = { ...prevParams };
      
      Object.keys(ranges).forEach(key => {
        const range = ranges[key];
        const dir = directions.current[key];
        const newValue = prevParams[key] + (range.speed * dir);
        
        if (newValue >= range.max) {
          directions.current[key] = -1;
        } else if (newValue <= range.min) {
          directions.current[key] = 1;
        }
        
        newParams[key] = Math.max(range.min, Math.min(range.max, newValue));
      });
      
      return newParams;
    });

    if (vantaEffect.current) {
      vantaEffect.current.setOptions(params);
    }

    animationFrame.current = requestAnimationFrame(animate);
  };

  const initVanta = () => {
    if (!vantaEffect.current && window.VANTA) {
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
        scale: 1.00,
        scaleMobile: 1.00,
        color: isDarkMode ? 0x4ade80 : 0x86efac,
        backgroundColor: isDarkMode ? 0x2d3436 : 0xf3f4f6, // Darker grey for light mode
        ...params
      });

      animate();

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