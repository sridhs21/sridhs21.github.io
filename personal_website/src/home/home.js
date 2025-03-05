import React, { useState, useEffect } from 'react';
import VantaBackground from './VantaBackground';

function Home({ isDarkMode }) {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Start fading out after 50px of scroll, completely gone by 200px
      const opacity = Math.max(0, 1 - (window.scrollY - 50) / 150);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* Banner Section */}
      <section className="banner-section">
        <VantaBackground isDarkMode={isDarkMode} />
        <div className="banner-content" style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          paddingBottom: '15vh'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '20px'
          }}>
            <div className="profile-container" style={{ marginBottom: '2rem' }}>
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
            <h1 style={{
              fontSize: '2.5em',
              color: isDarkMode ? '#f5f6fa' : '#333333',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Hi, I'm Swaroop Sridhar
            </h1>
            <p style={{
              fontSize: '1.2em',
              color: '#4ade80',
              fontWeight: '500'
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
      </section>

      {/* Content Section with Parallax */}
      <section className="content-section" style={{
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
        padding: '4rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          background: isDarkMode 
            ? 'rgba(45, 52, 54, 0.1)'
            : 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8em',
            marginBottom: '25px',
            color: '#4ade80'
          }}>
            Software Developer
          </h2>
          
          <p style={{
            fontSize: '1.1em',
            lineHeight: '1.8',
            color: isDarkMode ? '#f5f6fa' : '#555',
            marginBottom: '30px',
            letterSpacing: '0.3px'
          }}>
            A passionate software developer with expertise in full-stack development,
            focusing on creating efficient and scalable web applications. Experienced
            in modern technologies and best practices in software development.
          </p>

          <div style={{
            display: 'flex',
            gap: '25px',
            marginTop: '30px'
          }}>
            <button 
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
      </section>
    </div>
  );
}

export default Home;