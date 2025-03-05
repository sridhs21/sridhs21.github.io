// AnimatedBackground.js
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      backgroundColor: '#ffffff',
      overflow: 'hidden'
    }}>
      <style>
        {`
          @keyframes gradientMove {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 100% 100%;
            }
          }
        `}
      </style>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(45deg, rgba(255,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(255,0,0,0.02) 75%, rgba(255,0,0,0.02)),
          linear-gradient(45deg, rgba(255,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(255,0,0,0.02) 75%, rgba(255,0,0,0.02))
        `,
        backgroundSize: '40px 40px',
        animation: 'gradientMove 20s linear infinite'
      }} />
    </div>
  );
};

export default AnimatedBackground;