import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <nav style={{
      backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderBottom: `1px solid ${isDarkMode ? '#333' : '#e5e5e5'}`,
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0,
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      height: isScrolled ? '56px' : '64px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Logo/Brand */}
        <div 
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#6d1f7e',
            cursor: 'pointer'
          }}
          onClick={() => handleNavigation('/')}
        >
          SS
        </div>
        
        {/* Desktop Navigation Items - Hide on mobile */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            {[
              { label: 'Home', path: '/' },
              { label: 'Portfolio', path: '/portfolio' },
              { label: 'Repos', path: '/repos' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' }
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="nav-link"
                style={{
                  fontSize: '14px',
                  padding: '8px 0',
                  color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right side controls */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle dark mode"
            style={{
              color: isDarkMode ? '#f5f6fa' : '#333333',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '8px'
            }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile menu button - Only show on mobile */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex'
              }}
            >
              {isOpen ? 
                <X size={24} color={isDarkMode ? '#f5f6fa' : '#333333'} /> : 
                <Menu size={24} color={isDarkMode ? '#f5f6fa' : '#333333'} />
              }
            </button>
          )}
        </div>

        {/* Mobile Menu - Improved */}
        {isMobile && (
          <div
            style={{
              position: 'fixed',
              top: isScrolled ? '56px' : '64px',
              left: 0,
              right: 0,
              height: isOpen ? 'auto' : '0',
              background: isDarkMode ? 'rgba(15, 15, 15, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'height 0.3s ease',
              overflow: 'hidden',
              zIndex: 999
            }}
          >
            {isOpen && (
              <div>
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Portfolio', path: '/portfolio' },
                  { label: 'Repos', path: '/repos' },
                  { label: 'About', path: '/about' },
                  { label: 'Contact', path: '/contact' }
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    style={{
                      padding: '1rem 1.5rem',
                      fontSize: '1rem',
                      color: isDarkMode ? '#f5f6fa' : '#333333',
                      textDecoration: 'none',
                      borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                      display: 'block'
                    }}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;