import React from 'react';
import { BookOpen } from 'lucide-react';
import './about.css';

function About({ isDarkMode }) {
  const education = [
    {
      year: '2022 - 2026',
      degree: 'Bachelor of Science in Computer Science and Information Technology and Web Science',
      concentration: 'Machine Learning',
      school: 'Rensselaer Polytechnic Institute – School of Science',
      location: 'Troy, NY',
      description: 'Relevant Courses: Data Structures, Introduction to Algorithms, Operating Systems, Principles of Software, Machine Learning and Optimization, AI For Science'
    }, 
    {
      year: '2013 - 2022',
      degree: '',
      concentration: '',
      school: 'Academy for Science and Design',
      location: 'Troy, NY',
      description: 'Relevant Courses: Advanced Computer Science (Java/C++)'
    }
  ];

  const themeClass = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className={`about-container ${themeClass}`}>
      <div className="about-content">
        {/* Header Section */}
        <div className="section-header">
          <h1 className="section-title">About Me</h1>
          <div className="section-divider"></div>
        </div>

        {/* Personal Bio Section */}
        <section className="bio-section animate-fade-in animate-delay-1">
          <div className="bio-container">
            {/* Image Section */}
            <div className="bio-image-container">
              <div className={`bio-image-wrapper ${themeClass}`}>
                <img 
                  src="/images/about.jpg" 
                  alt="Swaroop Sridhar"
                  className="bio-image"
                />
                <div className="bio-image-gradient"></div>
              </div>
            </div>
            
            {/* Bio Section */}
            <div className="bio-content">
              <h2 className={`bio-heading ${themeClass}`}>My Journey</h2>
              
              <p className={`bio-paragraph ${themeClass}`}>
                Hey there! I'm Swaroop Sridhar, a tech enthusiast and budding Computer Scientist who gets genuinely excited about Machine Learning, Generative AI, and making sense of data! When I'm not coding, you can find me enjoying various outdoor activities and spending time with friends or with my dog. I'm currently pursuing my Bachelor's at RPI in Computer Science and ITWS, where I've found my passion in Machine Learning and can't wait to see where it takes me!
              </p>
              
              <p className={`bio-paragraph ${themeClass}`}>
                My friends tell me I light up when talking about Neural Networks or solving tricky programming challenges! Beyond my technical interests, I've got a creative side too - whether I'm designing intuitive user interfaces, visualizing complex data in compelling ways, or bringing artistic elements into my projects. I find that this blend of logical and creative thinking helps me approach problems from multiple angles. My journey through college has been a mix of late-night coding sessions, unforgettable hackathons, and gradually building a toolkit of algorithms, data structures, and software engineering practices.
              </p>
              
              <p className={`bio-paragraph ${themeClass}`}>
                I've had a blast working on projects that actually make a difference—from building web apps, to designing AI models that could have real-world impact, or to tackling algorithm puzzles that challenge my thinking! Looking forward, I'm thrilled to build on what I've learned and dive into the evolving tech landscape. Whether it's pushing the boundaries of responsible AI, developing sustainable tech solutions, or creating more accessible digital tools, I see endless possibilities. I'm pumped about making tech that actually helps people and can't wait to team up on cool projects that'll change how we use digital stuff every day!
              </p>
              
              <div className="stats-container">
                <div className="stat-item">
                  <h3 className="stat-number">
                    15+ <span className="stat-label">Languages</span>
                  </h3>
                  <p className={`stat-sublabel ${themeClass}`}>Programming & Markup</p>
                </div>
                
                <div className="stat-item">
                  <h3 className="stat-number">
                    3+ <span className="stat-label">Projects</span>
                  </h3>
                  <p className={`stat-sublabel ${themeClass}`}>Completed</p>
                </div>
                
                <div className="stat-item">
                  <h3 className="stat-number">
                    2026 <span className="stat-label">Graduation</span>
                  </h3>
                  <p className={`stat-sublabel ${themeClass}`}>Expected</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="education-section animate-fade-in animate-delay-2">
          <div className="section-header-with-icon">
            <BookOpen size={28} color="#6d1f7e" />
            <h2>Education</h2>
          </div>
          
          <div className={`education-card ${themeClass}`}>
            {education.map((item, index) => (
              <div 
                key={index} 
                className={`education-item ${index === education.length - 1 ? 'last-item' : ''} ${themeClass}`}
              >
                <div className="education-header">
                  <h3 className={`education-degree ${themeClass}`}>
                    {item.degree}
                  </h3>
                  <span className="education-year">
                    {item.year}
                  </span>
                </div>
                
                <h4 className={`education-school ${themeClass}`}>
                  {item.school}
                </h4>
                
                <h5 className="education-concentration">
                  Concentration: {item.concentration}
                </h5>
                
                <p className={`education-description ${themeClass}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;