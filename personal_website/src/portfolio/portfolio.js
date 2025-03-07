import React from 'react';

function Portfolio({ isDarkMode }) {
  return (
    <div className="page-container">
      <h1 className="page-title">Portfolio</h1>
      <div className="page-content" style={{ 
        color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
        fontSize: '1.1rem',
        lineHeight: '1.8'
      }}>
        <p>Explore my latest projects and work examples.</p>
      </div>
    </div>
  );
}

export default Portfolio;