import React from 'react';

const LoadingScreen = ({ isDarkMode, isLoading }) => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDarkMode ? '#0f0f0f' : '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: isLoading ? 1 : 0,
        visibility: isLoading ? 'visible' : 'hidden',
        transition: 'opacity 0.5s ease-out, visibility 0.5s ease-out',
        pointerEvents: isLoading ? 'all' : 'none',
      }}
    >
      <style>
        {`
          @keyframes logoAnimation {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          .loading-dot {
            width: 8px;
            height: 8px;
            margin: 0 4px;
            border-radius: 50%;
            background-color: #6d1f7e;
            animation: bounce 0.5s ease-in-out infinite;
          }

          .loading-dot:nth-child(1) { animation-delay: 0s; }
          .loading-dot:nth-child(2) { animation-delay: 0.1s; }
          .loading-dot:nth-child(3) { animation-delay: 0.2s; }
        `}
      </style>

      {/* Logo or Brand Icon */}
      <div style={{
        marginBottom: '2rem',
        animation: 'logoAnimation 0.8s ease-out forwards',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#6d1f7e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          <span style={{
            fontSize: '2rem',
            color: 'white',
            fontWeight: 'bold',
          }}>
            S
          </span>
        </div>
      </div>

      {/* Loading Dots */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1rem',
      }}>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;