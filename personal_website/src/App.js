//App.js
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar/navbar';
import Home from './home/home';
import Portfolio from './portfolio/portfolio';
import Repos from './repos/repos';
import About from './about/about';
import Contact from './contact/contact';
import LoadingScreen from './loading_screen/loading_screen';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : true; 
  });

  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    // Apply dark mode immediately to the entire document
    document.body.style.backgroundColor = isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)';
    document.body.className = isDarkMode ? 'dark-mode' : '';
    
    const checkResourcesLoaded = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    checkResourcesLoaded();
    window.addEventListener('load', checkResourcesLoaded);

    return () => {
      window.removeEventListener('load', checkResourcesLoaded);
    };
  }, [isDarkMode]);

  return (
    <div style={{ 
      backgroundColor: isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>
      <LoadingScreen isDarkMode={isDarkMode} isLoading={isLoading} />
      <Router>
        <div 
          className={`app ${isDarkMode ? 'dark-mode' : ''}`}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.5s ease-out',
            visibility: isLoading ? 'hidden' : 'visible',
            backgroundColor: isDarkMode ? '#0f0f0f' : '#ffffff'
          }}
        >
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <main className="main-content">
            <Routes>
              <Route exact path="/" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/home" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/portfolio" element={<Portfolio isDarkMode={isDarkMode} />} />
              <Route path="/repos" element={<Repos isDarkMode={isDarkMode} />} />
              <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
              <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;