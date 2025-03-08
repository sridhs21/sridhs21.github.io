// home.js - Updated with light mode changes and modified projects/skills
import React, { useState, useEffect } from 'react';
import VantaBackground from './background/VantaBackground';
import { ArrowRight, Server, Layout, Database, Terminal, Cloud, Brain } from 'lucide-react';
import './home.css';

function Home({ isDarkMode }) {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const opacity = Math.max(0, 1 - (window.scrollY - 50) / 150);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { 
      id: 'frontend', 
      icon: <Layout size={28} />, 
      title: 'Frontend Development', 
      description: 'Creating responsive and intuitive user interfaces using modern web technologies.', 
      technologies: ['React.js', 'JavaScript', 'TypeScript', 'HTML5/CSS3', 'Bootstrap', 'TailwindCSS', 'jQuery', 'Next.js'] 
    },
    { 
      id: 'backend', 
      icon: <Server size={28} />, 
      title: 'Backend Development', 
      description: 'Building robust server-side applications with a focus on performance, security, and scalability.', 
      technologies: ['Python', 'Flask', 'Node.js', 'REST APIs', 'Java', 'PHP', 'MongoDB', 'MySQL'] 
    },
    { 
      id: 'ml', 
      icon: <Brain size={28} />, 
      title: 'Machine Learning', 
      description: 'Developing AI models for data analysis, prediction, and optimization with a focus on practical applications.', 
      technologies: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'CatBoost', 'XGBoost', 'OpenCV'] 
    },
    { 
      id: 'programming', 
      icon: <Terminal size={28} />, 
      title: 'Programming Languages', 
      description: 'Proficient in multiple programming paradigms and languages for software development.', 
      technologies: ['Python', 'Java', 'C/C++', 'JavaScript', 'Assembly', 'Haskell', 'Erlang', 'Prolog'] 
    },
    { 
      id: 'database', 
      icon: <Database size={28} />, 
      title: 'Database & Data Science', 
      description: 'Working with data storage, analysis, and visualization to extract meaningful insights.', 
      technologies: ['SQL', 'MongoDB', 'Data Analysis', 'Pandas', 'Matplotlib', 'Seaborn', 'Data Visualization'] 
    },
    { 
      id: 'cloud', 
      icon: <Cloud size={28} />, 
      title: 'Cloud & DevOps', 
      description: 'Leveraging cloud platforms and development operations for efficient deployment and scaling.', 
      technologies: ['Microsoft Azure', 'Git', 'GitHub', 'Version Control', 'CI/CD', 'Heroku', 'Agile/Scrum'] 
    }
  ];

  const featuredProjects = [
    {
      title: "RPI Campus Availability Application",
      description: "A full-stack web application utilizing REST API architecture to track and predict real-time parking availability across campus using Python Flask backend and JavaScript frontend. Created a predictive algorithm incorporating multiple factors (time, weather, events, seasonality) to estimate parking occupancy.",
      image: "/images/parking_application.png",
      tags: ["Python", "Flask", "JavaScript", "Leaflet.js", "Google Maps API", "REST API"]
    },
    {
      title: "AI-Driven Drug Discovery",
      description: "Developed AI models to predict drug interactions with proteins and analyze immune system responses by processing complex biological data. Built predictive models to improve gene editing outcomes by analyzing DNA sequences and their modifications. Created comprehensive data visualizations to present scientific findings.",
      image: "/images/drug_discovery.jpg",
      tags: ["Python", "Machine Learning", "CatBoost", "Random Forest", "XGBoost", "Data Analysis"]
    }
  ];

  return (
    <div className="home-container">
      {/* Fixed Background */}
      <div className="fixed-background">
        <VantaBackground isDarkMode={isDarkMode} />
      </div>

      {/* Blur overlay for scroll */}
      <div 
        className="blur-overlay" 
        style={{
          backgroundColor: isDarkMode 
            ? 'rgba(15, 15, 15, 0.85)' 
            : 'rgba(255, 255, 255, 0.85)', 
          opacity: Math.min(1, scrollY / 300)
        }} 
      />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          {/* Profile Image */}
          <div className="profile-container">
            <div className="orbit orbit-1">
              <div className="orbit-dot"></div>
            </div>
            <div className="orbit orbit-2">
              <div className="orbit-dot"></div>
            </div>
            <div className="profile-glow"></div>
            <div className="profile-image-container">
              <img 
                src="/images/profile.jpg"
                alt="Profile"
              />
            </div>
          </div>
          
          {/* Hero Text */}
          <div className="hero-text">
            <h1 style={{ color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)' }}>
              Swaroop Sridhar
            </h1>
            <h2>
              Computer Science Student & Developer
            </h2>
            <p style={{ color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)' }}>
              Aspiring Computer Scientist at RPI with a focus on Machine Learning, Generative AI, and Full Stack Development. Passionate about solving complex problems with elegant solutions.
            </p>
            <div className="hero-buttons">
              <a 
                href="/#/contact"
                className="primary-button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.backgroundColor = '#8f3ba0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = '#6d1f7e';
                }}
              >
                Get in Touch
              </a>
              <a 
                href="/#/about"
                className="secondary-button"
                style={{ color: isDarkMode ? '#f5f6fa' : '#333333' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.backgroundColor = '#6d1f7e';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isDarkMode ? '#f5f6fa' : '#333333';
                }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator" 
          style={{
            opacity: scrollOpacity
          }}
        >
          <div className="scroll-mouse" style={{ border: `2px solid ${isDarkMode ? '#f5f6fa' : '#333333'}` }}>
            <div className="scroll-wheel" style={{ backgroundColor: isDarkMode ? '#f5f6fa' : '#333333' }}/>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="content-sections">
        {/* Skills & Tech Stack Section */}
        <section className="skills-section">
          <div className="section-header">
            <h2>Skills & Technologies</h2>
            <div className="section-divider"></div>
            <p style={{ color: isDarkMode ? '#f5f6fa' : '#333333' }}>
              Here are some of the skills I've acquired on my journey!
            </p>
          </div>

          {/* Expertise Areas */}
          <div className="skills-grid">
            {skills.map((skill) => (
              <div 
                key={skill.id}
                className="skill-card"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                  boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 16px 48px rgba(0, 0, 0, 0.3)' 
                    : '0 16px 48px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
                    : '0 8px 32px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div className="skill-icon">
                  {skill.icon}
                </div>
                <h3 style={{ color: isDarkMode ? '#f5f6fa' : '#333333' }}>
                  {skill.title}
                </h3>
                <p style={{ color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
                  {skill.description}
                </p>
                <div className="tech-tags">
                  {skill.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="tech-tag"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#6d1f7e';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(109, 31, 126, 0.1)' : 'rgba(109, 31, 126, 0.1)';
                        e.currentTarget.style.color = '#6d1f7e';
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Proficiency */}
          <div 
            className="tech-proficiency"
            style={{
              backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
              boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
            }}
          >
            <h3>Technology Proficiency</h3>
            
            <div className="proficiency-grid">
              {[
                { name: 'Python', level: 95 },
                { name: 'Java', level: 90 },
                { name: 'JavaScript', level: 85 },
                { name: 'C/C++', level: 85 },
                { name: 'HTML/CSS', level: 90 },
                { name: 'Machine Learning', level: 85 },
                { name: 'React', level: 80 },
                { name: 'Flask', level: 85 },
                { name: 'Data Analysis', level: 82 },
                { name: 'REST APIs', level: 88 },
                { name: 'Git/GitHub', level: 90 },
                { name: 'Algorithms', level: 85 }
              ].map((tech, index) => (
                <div key={index} className="proficiency-item">
                  <div className="proficiency-header">
                    <span style={{ color: isDarkMode ? '#f5f6fa' : '#333333' }}>
                      {tech.name}
                    </span>
                    <span className="proficiency-percentage">
                      {tech.level}%
                    </span>
                  </div>
                  <div className="proficiency-bar">
                    <div 
                      className="proficiency-fill"
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="projects-section">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <div className="section-divider"></div>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project, index) => (
              <div 
                key={index}
                className="project-card"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                  boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 16px 48px rgba(0, 0, 0, 0.3)' 
                    : '0 16px 48px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
                    : '0 8px 32px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
                <div className="project-content">
                  <h3 style={{ color: isDarkMode ? '#f5f6fa' : '#333333' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#667085' }}>
                    {project.description}
                  </p>
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="project-tag"
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(109, 31, 126, 0.1)' : 'rgba(109, 31, 126, 0.1)',
                          color: '#6d1f7e'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="more-info-button">
            <a 
              href="/#/about"
              className="learn-more-button"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6d1f7e';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6d1f7e';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Learn More About Me
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;