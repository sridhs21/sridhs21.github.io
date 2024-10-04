import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AnimatedBackground from './AnimatedBackground';
import Home from './home/home';
import Portfolio from './portfolio/portfolio';
import Repos from './repos/repos';
import About from './about/about';
import Contact from './contact/contact';

function App() {
  return (
    <Router>
      <div className="App" style={{ minHeight: '100vh', position: 'relative' }}>
        <Navbar />
        <AnimatedBackground />
        <main style={{ 
          padding: '20px', 
          position: 'relative',
          zIndex: 1,
          color: '#FFFFFF',
        }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/repos" element={<Repos />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;