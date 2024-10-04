import React from 'react';
import Navbar from './Navbar';
import AnimatedBackground from './AnimatedBackground';

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <AnimatedBackground />
      <main style={{ 
        padding: '20px', 
        position: 'relative',
        zIndex: 1,
        color: '#FFFFFF',
      }}>
        <h1>Welcome</h1>
        <p>Your stuff goes here bub.</p>
      </main>
    </div>
  );
}

export default App;