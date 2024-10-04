import React, { useState } from 'react';

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const primaryColor = '#2A3F5F'; 
  const secondaryColor = '#5BC0BE';
  const accentColor = '#0B132B';
  const textColor = '#FFFFFF';
  const shadowColor = 'rgba(11, 19, 43, 0.3)';

  return (
    <nav style={{
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
      color: textColor,
      padding: '15px 5%',
      boxShadow: `0 4px 20px ${shadowColor}`,
      position: 'relative',
      zIndex: 1000,
      overflow: 'hidden',
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap');
          
          nav {
            font-family: 'Montserrat', sans-serif;
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px ${secondaryColor}, 0 0 10px ${secondaryColor}; }
            50% { box-shadow: 0 0 20px ${secondaryColor}, 0 0 30px ${secondaryColor}; }
          }

          .nav-link {
            color: ${textColor};
            text-decoration: none;
            padding: 10px 15px;
            border-radius: 25px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            font-weight: 400;
            letter-spacing: 1px;
          }

          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${secondaryColor};
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }

          .nav-link:hover::before {
            opacity: 0.2;
          }

          .nav-link:hover {
            transform: translateY(-3px);
            color: ${textColor};
          }

          .navbar-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 10% 20%, ${secondaryColor}22 0%, transparent 20%),
              radial-gradient(circle at 90% 80%, ${secondaryColor}22 0%, transparent 20%);
            opacity: 0.1;
            z-index: -1;
          }

          .search-input {
            background: rgba(255,255,255,0.1);
            border: 2px solid ${secondaryColor};
            color: ${textColor};
            padding: 10px 15px;
            border-radius: 25px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 300;
            transition: all 0.3s ease;
          }

          .search-input:focus {
            outline: none;
            box-shadow: 0 0 15px ${secondaryColor}66;
          }

          .search-button {
            background: ${secondaryColor};
            color: ${accentColor};
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px ${shadowColor};
          }

          .search-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 8px ${shadowColor};
            background: ${textColor};
            color: ${accentColor};
          }
        `}
      </style>
      <div className="navbar-background"></div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
      }}>
        <a href="/" style={{ 
          fontSize: '1.8rem', 
          fontWeight: '600', 
          color: textColor,
          textDecoration: 'none',
          letterSpacing: '2px',
          marginRight: '20px',
          fontFamily: "'Montserrat', sans-serif",
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" style={{marginRight: '10px'}}>
            <circle cx="15" cy="15" r="13" fill="none" stroke={secondaryColor} strokeWidth="2"/>
            <path d="M15 7 L15 23 M7 15 L23 15" stroke={secondaryColor} strokeWidth="2"/>
          </svg>
          Nexus
        </a>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          {['Home', 'Portfolio', 'Repos', 'About', 'Contact'].map((item, index) => (
            <a 
              key={index}
              href={`/${item.toLowerCase()}`} 
              className="nav-link"
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                transform: hoveredLink === index ? 'translateY(-3px)' : 'none',
                boxShadow: hoveredLink === index ? `0 5px 15px ${shadowColor}` : 'none'
              }}
            >
              {item}
            </a>
          ))}
        </div>
        <form style={{ display: 'flex', marginTop: '10px', flexGrow: 1, maxWidth: '300px' }} onSubmit={(e) => e.preventDefault()}>
          <input 
            type="search" 
            placeholder="Search..." 
            className="search-input"
            style={{ width: '100%', marginRight: '10px' }}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;