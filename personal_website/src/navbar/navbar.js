import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import './navbar.css';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Desktop Navigation Items - Now centered in navbar */}
        <div className="desktop-nav">
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
              className={`nav-link ${isDarkMode ? 'dark' : 'light'}`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side controls */}
        <div className="navbar-controls">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? 
              <X size={24} color={isDarkMode ? '#f5f6fa' : '#333333'} /> : 
              <Menu size={24} color={isDarkMode ? '#f5f6fa' : '#333333'} />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu ${isDarkMode ? 'dark' : 'light'} ${isOpen ? 'open' : ''}`}
          style={{
            top: isScrolled ? '56px' : '64px'
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
              className={`mobile-nav-link ${isDarkMode ? 'dark' : 'light'}`}
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