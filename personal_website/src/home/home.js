import React, { useState, useEffect } from 'react';
import VantaBackground from './VantaBackground';

function Home({ isDarkMode }) {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Update current scroll position
      setScrollY(window.scrollY);
      
      // Update scroll indicator opacity
      const opacity = Math.max(0, 1 - (window.scrollY - 50) / 150);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ 
      width: '100%',
      margin: 0,
      padding: 0,
      position: 'relative',
      minHeight: '200vh' // Make page scrollable
    }}>
      {/* Fixed VantaBackground that stays in place */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <VantaBackground isDarkMode={isDarkMode} />
      </div>

      {/* Blur overlay that becomes visible on scroll */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: isDarkMode ? 'rgba(26, 32, 33, 0.85)' : 'rgba(240, 240, 240, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 1,
        opacity: Math.min(1, scrollY / 300), // Gradually appear as user scrolls
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none' // Allow clicking through this layer
      }} />

      {/* Banner Content */}
      <div style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        paddingBottom: '15vh'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '20px',
          width: '100%',
          maxWidth: '900px'
        }}>
          {/* Profile container */}
          <div className="profile-container" style={{ 
            marginBottom: 0,
            flexShrink: 0
          }}>
            <div className="orbit orbit-1">
              <div className="orbit-dot"></div>
            </div>
            <div className="orbit orbit-2">
              <div className="orbit-dot"></div>
            </div>
            <div className="profile-glow"></div>
            <div className="profile-image-container">
              <img 
                src="/images/profile.jpg"
                alt="Profile"
              />
            </div>
          </div>
          
          {/* Text content */}
          <div style={{
            textAlign: 'left',
            maxWidth: '450px'
          }}>
            <h1 style={{
              fontSize: '2.5em',
              color: isDarkMode ? '#f5f6fa' : '#333333',
              marginBottom: '1rem',
              fontWeight: '700',
              fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
              letterSpacing: '-0.5px',
              lineHeight: '1.2'
            }}>
              Swaroop Sridhar
            </h1>
            <p style={{
              fontSize: '1.2em',
              color: '#4ade80',
              fontWeight: '500',
              marginBottom: '1rem',
              fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
              letterSpacing: '0.5px'
            }}>
              Building digital experiences that matter
            </p>
          </div>
        </div>
        <div 
          className="scroll-indicator" 
          style={{
            position: 'absolute',
            bottom: '15vh',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            opacity: scrollOpacity,
            transition: 'opacity 0.2s ease-out'
          }}
        >
          <div style={{
            width: '30px',
            height: '50px',
            border: `2px solid ${isDarkMode ? '#f5f6fa' : '#333333'}`,
            borderRadius: '15px',
            position: 'relative'
          }}>
            <div style={{
              width: '4px',
              height: '8px',
              backgroundColor: isDarkMode ? '#f5f6fa' : '#333333',
              borderRadius: '2px',
              position: 'absolute',
              left: '50%',
              top: '8px',
              transform: 'translateX(-50%)',
              animation: 'scrollBounce 1.5s infinite'
            }}/>
          </div>
        </div>
      </div>

      {/* Content section with description and buttons */}
      <div style={{ 
        height: '100vh', 
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          padding: '0 40px',
          color: isDarkMode ? '#f5f6fa' : '#333',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px'
        }}>
          <h2 style={{
            fontSize: '2em',
            marginBottom: '10px',
            color: '#4ade80',
            fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
            width: '100%'
          }}>
            Software Developer
          </h2>
          <p style={{
            fontSize: '1.1em',
            lineHeight: '1.8',
            letterSpacing: '0.3px',
            marginBottom: '10px',
            width: '100%',
            maxWidth: '1100px'
          }}>
            A passionate software developer with expertise in full-stack development,
            focusing on creating efficient and scalable web applications. Experienced
            in modern technologies and best practices in software development.
          </p>
          
          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '25px',
            marginTop: '20px'
          }}>
            <button 
              onClick={() => window.location.href = '/portfolio'}
              style={{
                backgroundColor: '#4ade80',
                color: '#ffffff',
                padding: '12px 25px',
                fontSize: '0.9em',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#86efac';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#4ade80';
              }}
            >
              View Portfolio
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              style={{
                backgroundColor: 'transparent',
                color: isDarkMode ? '#f5f6fa' : '#333333',
                padding: '12px 25px',
                fontSize: '0.9em',
                border: '1px solid #4ade80',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#4ade80';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = isDarkMode ? '#f5f6fa' : '#333333';
              }}
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;