//Navbar.js - Updated
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

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
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        height: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Center navigation items */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          '@media (max-width: 768px)': {
            display: 'none'
          }
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
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle dark mode"
          style={{
            position: 'absolute',
            right: '20px',
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

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-menu-button"
          style={{
            display: 'none',
            padding: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'absolute',
            left: '20px',
            '@media (max-width: 768px)': {
              display: 'block'
            }
          }}
        >
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: isDarkMode ? '#f5f6fa' : '#333333',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              position: 'absolute',
              width: '24px',
              height: '2px',
              backgroundColor: isDarkMode ? '#f5f6fa' : '#333333',
              top: isOpen ? '0' : '-8px',
              transform: isOpen ? 'rotate(45deg)' : 'none',
              transition: 'all 0.3s ease'
            }} />
            <div style={{
              position: 'absolute',
              width: '24px',
              height: '2px',
              backgroundColor: isDarkMode ? '#f5f6fa' : '#333333',
              top: isOpen ? '0' : '8px',
              transform: isOpen ? 'rotate(-45deg)' : 'none',
              transition: 'all 0.3s ease'
            }} />
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            background: isDarkMode ? 'rgba(15, 15, 15, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '16px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            animation: isOpen ? 'fadeIn 0.3s ease-out' : 'none',
            '@media (min-width: 769px)': {
              display: 'none'
            }
          }}
        >
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
                padding: '12px',
                fontSize: '16px',
                color: isDarkMode ? '#f5f6fa' : '#333333',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                ':hover': {
                  color: '#6d1f7e'
                }
              }}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;