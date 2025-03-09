import React, { useState, useEffect } from 'react';
import VantaBackground from './background/VantaBackground';
import { ArrowRight, Server, Layout, Database, Terminal, Cloud, Brain } from 'lucide-react';
import './home.css';

function Home({ isDarkMode }) {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      const opacity = Math.max(0, 1 - (window.scrollY - 50) / 150);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mobile-specific values
  const isMobile = windowWidth <= 768;
  const isSmallMobile = windowWidth <= 480;

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

  const coreSkills = [
    {
      category: "Languages",
      skills: [
        { name: "Python", level: "Intermediate" },
        { name: "JavaScript", level: "Intermediate" },
        { name: "Java", level: "Intermediate" },
        { name: "C/C++", level: "Advanced" },
        { name: "HTML/CSS", level: "Advanced" }
      ]
    },
    {
      category: "Machine Learning & AI",
      skills: [
        { name: "PyTorch", level: "Basic" },
        { name: "Scikit-learn", level: "Basic" },
        { name: "Data Analysis", level: "Basic" },
        { name: "CatBoost/XGBoost", level: "Basic" },
        { name: "Pandas/NumPy", level: "Basic" }
      ]
    },
    {
      category: "Web Development",
      skills: [
        { name: "React.js", level: "Intermediate" },
        { name: "Flask", level: "Beginner" },
        { name: "REST APIs", level: "Intermediate" },
        { name: "Full-Stack Dev", level: "Intermediate" },
        { name: "Responsive Design", level: "Intermediate" }
      ]
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git/GitHub", level: "Intermediate" },
        { name: "Microsoft Azure", level: "Basic" },
        { name: "SQL", level: "Basic" },
        { name: "Agile/Scrum", level: "Basic" },
        { name: "Version Control", level: "Intermediate" }
      ]
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
        <div className="hero-content" style={{ 
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left',
          gap: isMobile ? '1rem' : '2rem',
        }}>
          {/* Profile Image */}
          <div className="profile-container" style={{
            transform: isSmallMobile ? 'scale(0.7)' : isMobile ? 'scale(0.8)' : 'scale(1)',
            margin: isMobile ? '0 auto 1rem' : '0 auto',
          }}>
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
          <div className="hero-text" style={{
            display: isMobile ? 'flex' : 'block',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-start',
            maxWidth: isMobile ? '100%' : '500px',
          }}>
            <h1 style={{ 
              color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
              fontSize: isSmallMobile ? '2rem' : isMobile ? '2.5rem' : '3rem',
              textAlign: isMobile ? 'center' : 'left',
            }}>
              Swaroop Sridhar
            </h1>
            <h2 style={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
            }}>
              Computer Science Student & Developer
            </h2>
            <p style={{ 
              color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
              fontSize: isMobile ? '1rem' : '1.1rem',
              textAlign: isMobile ? 'center' : 'left',
            }}>
              Aspiring Computer Scientist at RPI with a focus on Machine Learning, Generative AI, and Full Stack Development. Passionate about solving complex problems with elegant solutions.
            </p>
            <div className="hero-buttons" style={{
              flexDirection: isSmallMobile ? 'column' : 'row',
              width: isSmallMobile ? '100%' : 'auto',
            }}>
              <a 
                href="/#/contact"
                className="primary-button"
                style={{
                  width: isSmallMobile ? '100%' : 'auto',
                  justifyContent: isSmallMobile ? 'center' : 'flex-start',
                }}
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
                style={{ 
                  color: isDarkMode ? '#f5f6fa' : '#333333',
                  width: isSmallMobile ? '100%' : 'auto',
                  justifyContent: isSmallMobile ? 'center' : 'flex-start',
                }}
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
            opacity: scrollOpacity,
            display: isSmallMobile ? 'none' : 'block', // Hide on very small screens
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
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
            }}>Skills & Technologies</h2>
            <div className="section-divider"></div>
            <p style={{ 
              color: isDarkMode ? '#f5f6fa' : '#333333',
              fontSize: isMobile ? '1rem' : '1.1rem',
            }}>
              Here are some of the skills I've acquired on my journey!
            </p>
          </div>

          {/* Expertise Areas */}
          <div className="skills-grid" style={{
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
          }}>
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
                <h3 style={{ 
                  color: isDarkMode ? '#f5f6fa' : '#333333',
                  fontSize: isMobile ? '1.2rem' : '1.25rem',
                }}>
                  {skill.title}
                </h3>
                <p style={{ 
                  color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
                  fontSize: isMobile ? '0.9rem' : '0.95rem',
                }}>
                  {skill.description}
                </p>
                <div className="tech-tags" style={{
                  maxHeight: isSmallMobile ? '100px' : 'auto',
                  overflowY: isSmallMobile ? 'auto' : 'visible',
                }}>
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

          <div className="tech-proficiency-header">
            <h3 style={{ 
              color: isDarkMode ? '#f5f6fa' : '#333333',
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              textAlign: 'center',
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              Technology Proficiency
            </h3>
          </div>

          {/* Simple Skills Categories */}
          <div className="simple-skills-container">
            {coreSkills.map((skillGroup, idx) => (
              <div 
                key={idx}
                className="simple-skill-card"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                  boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="simple-skill-title" style={{ color: isDarkMode ? '#f5f6fa' : '#333333' }}>
                  {skillGroup.category}
                </h3>
                <div className="simple-skills-list">
                  {skillGroup.skills.map((skill, skillIdx) => (
                    <div 
                      key={skillIdx} 
                      className={`simple-skill-tag ${skill.level.toLowerCase()}`}
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(109, 31, 126, 0.1)' : 'rgba(109, 31, 126, 0.1)',
                        color: '#6d1f7e'
                      }}
                    >
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Section*/}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto 6rem',
          padding: '0 1rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              color: '#6d1f7e',
              marginBottom: '1.5rem',
              fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
              fontWeight: '700'
            }}>
              Featured Projects
            </h2>
            <div style={{
              width: '60px',
              height: '4px',
              backgroundColor: '#6d1f7e',
              marginBottom: '2rem',
              borderRadius: '2px'
            }}></div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(500px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {featuredProjects.map((project, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  width: '100%'
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
                <div style={{
                  width: '100%',
                  height: isSmallMobile ? '200px' : '250px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
                <div style={{
                  padding: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.1rem' : '1.25rem',
                    color: isDarkMode ? '#f5f6fa' : '#333333',
                    marginBottom: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: isMobile ? '0.9rem' : '0.95rem',
                    color: isDarkMode ? '#cbd5e1' : '#667085',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    {project.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    maxHeight: isSmallMobile ? '80px' : 'auto',
                    overflowY: isSmallMobile ? 'auto' : 'visible'
                  }}>
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} style={{
                        display: 'inline-block',
                        backgroundColor: isDarkMode ? 'rgba(109, 31, 126, 0.1)' : 'rgba(109, 31, 126, 0.1)',
                        color: '#6d1f7e',
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.75rem',
                        borderRadius: '50px',
                        border: '1px solid #6d1f7e'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
          }}>
            <a 
              href="/#/about"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isSmallMobile ? 'center' : 'flex-start',
                gap: '0.5rem',
                backgroundColor: 'transparent',
                border: '1px solid #6d1f7e',
                color: '#6d1f7e',
                borderRadius: '4px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                width: isSmallMobile ? '100%' : 'auto',
              }}
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