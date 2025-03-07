// VantaBackground.js - Completely rebuilt for proper theme switching
import React, { useEffect, useRef } from 'react';

const VantaBackground = ({ isDarkMode }) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  
  // Main color: purple 0x6d1f7e
  const mainColor = 0x6d1f7e;
  // Background colors (using hex for THREE.js)
  const darkBgColor = 0x0f0f0f;  // dark background
  const lightBgColor = 0xffffff; // white background

  // This is the key change - completely destroy and recreate the effect on theme change
  useEffect(() => {
    let isComponentMounted = true;

    const loadScriptsAndInitialize = async () => {
      // Load required libraries if they're not already loaded
      if (!window.THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        document.head.appendChild(threeScript);
        await new Promise(resolve => { threeScript.onload = resolve; });
      }

      if (!window.p5) {
        const p5Script = document.createElement('script');
        p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js';
        document.head.appendChild(p5Script);
        await new Promise(resolve => { p5Script.onload = resolve; });
      }

      if (!window.VANTA) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js';
        document.head.appendChild(vantaScript);
        await new Promise(resolve => { vantaScript.onload = resolve; });
      }

      // If component is still mounted after scripts load, initialize Vanta
      if (isComponentMounted && window.VANTA) {
        // First clean up any existing effect
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        }

        // Create a new effect with the current theme's background color
        console.log(`Creating new VANTA effect with isDarkMode=${isDarkMode}, backgroundColor=${isDarkMode ? darkBgColor : lightBgColor}`);
        
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
      }
    };

    loadScriptsAndInitialize();

    // Clean up function
    return () => {
      isComponentMounted = false;
      if (vantaEffect.current) {
        console.log("Destroying VANTA effect");
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [isDarkMode]); // Re-run the entire effect when isDarkMode changes

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect.current) {
        vantaEffect.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        backgroundColor: isDarkMode ? '#0f0f0f' : '#ffffff',
        transition: 'background-color 0.3s ease'
      }}
    />
  );
};

export default VantaBackground;