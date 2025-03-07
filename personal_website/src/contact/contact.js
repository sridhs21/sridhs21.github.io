import React from 'react';

function Contact({ isDarkMode }) {
  return (
    <div className="page-container">
      <h1 className="page-title">Contact</h1>
      <div className="page-content" style={{ color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)' }}>
        <p>Get in touch with me for collaborations and opportunities.</p>
      </div>
    </div>
  );
}

export default Contact;