// home.js - Updated with light mode changes and modified projects/skills
import React, { useState, useEffect } from 'react';
import VantaBackground from './VantaBackground';
import { ArrowRight, Code, Server, Layout, Database, Terminal, Cloud, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home({ isDarkMode }) {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [activeSkill, setActiveSkill] = useState(null);

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
    <div style={{ 
      width: '100%',
      margin: 0,
      padding: 0,
      position: 'relative',
      minHeight: '300vh'
    }}>
      {/* Fixed Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <VantaBackground isDarkMode={isDarkMode} />
      </div>

      {/* Blur overlay for scroll */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: isDarkMode 
          ? 'rgba(15, 15, 15, 0.85)' 
          : 'rgba(255, 255, 255, 0.85)', 
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 1,
        opacity: Math.min(1, scrollY / 300),
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }} />

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        paddingBottom: '15vh'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          padding: '20px',
          width: '100%',
          maxWidth: '1000px'
        }}>
          {/* Profile Image */}
          <div className="profile-container" style={{ 
            flexShrink: 0
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
          <div style={{
            textAlign: 'left',
            maxWidth: '500px'
          }}>
            <h1 style={{
              fontSize: '3rem',
              color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
              marginBottom: '1rem',
              fontWeight: '700',
              fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
              letterSpacing: '-0.5px',
              lineHeight: '1.2'
            }}>
              Swaroop Sridhar
            </h1>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#6d1f7e',
              fontWeight: '600',
              marginBottom: '1.5rem',
              fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
              letterSpacing: '0.5px'
            }}>
              Computer Science Student & Developer
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Aspiring Computer Scientist at RPI with a focus on Machine Learning, Generative AI, and Full Stack Development. Passionate about solving complex problems with elegant solutions.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <a 
                href="/#/contact"
                style={{
                  backgroundColor: '#6d1f7e',
                  color: 'white',
                  borderRadius: '4px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
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
                style={{
                  backgroundColor: 'transparent',
                  color: isDarkMode ? '#f5f6fa' : '#333333',
                  borderRadius: '4px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  border: '1px solid #6d1f7e',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
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
            position: 'absolute',
            bottom: '15vh',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            opacity: scrollOpacity,
            transition: 'opacity 0.2s ease-out'
          }}
        >
          <div style={{
            width: '30px',
            height: '50px',
            border: `2px solid ${isDarkMode ? '#f5f6fa' : '#333333'}`,
            borderRadius: '15px',
            position: 'relative'
          }}>
            <div style={{
              width: '4px',
              height: '8px',
              backgroundColor: isDarkMode ? '#f5f6fa' : '#333333',
              borderRadius: '2px',
              position: 'absolute',
              left: '50%',
              top: '8px',
              transform: 'translateX(-50%)',
              animation: 'scrollBounce 1.5s infinite'
            }}/>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div style={{ 
        position: 'relative',
        zIndex: 2,
        padding: '2rem 0 6rem',
        width: '100%'
      }}>
        {/* Skills & Tech Stack Section */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto 6rem',
          padding: '0 2rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              color: '#6d1f7e',
              marginBottom: '1.5rem',
              fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
              fontWeight: '700'
            }}>
              Skills & Technologies
            </h2>
            <div style={{
              width: '60px',
              height: '4px',
              backgroundColor: '#6d1f7e',
              marginBottom: '2rem',
              borderRadius: '2px'
            }}></div>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              maxWidth: '700px',
              color: isDarkMode ? '#f5f6fa' : '#333333',
              marginBottom: '2rem'
            }}>
              Here are some of the skills I've acquired on my journey!
            </p>
          </div>

          {/* Expertise Areas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {skills.map((skill) => (
              <div 
                key={skill.id}
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  padding: '2rem',
                  borderRadius: '12px',
                  boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  setActiveSkill(skill.id);
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 16px 48px rgba(0, 0, 0, 0.3)' 
                    : '0 16px 48px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  setActiveSkill(null);
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
                    : '0 8px 32px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  color: '#6d1f7e'
                }}>
                  {skill.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  color: isDarkMode ? '#f5f6fa' : '#333333',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {skill.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {skill.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: 'auto'
                }}>
                  {skill.technologies.map((tech, index) => (
                    <span key={index} style={{
                      display: 'inline-block',
                      backgroundColor: isDarkMode ? 'rgba(109, 31, 126, 0.1)' : 'rgba(109, 31, 126, 0.1)',
                      color: '#6d1f7e',
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.8rem',
                      borderRadius: '50px',
                      border: '1px solid #6d1f7e',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#6d1f7e';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(109, 31, 126, 0.1)' : 'rgba(109, 31, 126, 0.1)';
                      e.currentTarget.style.color = '#6d1f7e';
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Proficiency */}
          <div style={{
            backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#6d1f7e',
              marginBottom: '2rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Technology Proficiency
            </h3>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem'
            }}>
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
                <div key={index} style={{
                  width: '180px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: isDarkMode ? '#f5f6fa' : '#333333'
                    }}>
                      {tech.name}
                    </span>
                    <span style={{
                      fontSize: '0.85rem',
                      color: '#6d1f7e',
                      fontWeight: '600'
                    }}>
                      {tech.level}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${tech.level}%`,
                      height: '100%',
                      backgroundColor: '#6d1f7e',
                      borderRadius: '4px',
                      transition: 'width 1.5s ease-in-out'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto 6rem',
          padding: '0 2rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
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
                  cursor: 'pointer'
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
                  height: '250px',
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
                    fontSize: '1.25rem',
                    color: isDarkMode ? '#f5f6fa' : '#333333',
                    marginBottom: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: isDarkMode ? '#cbd5e1' : '#667085',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    {project.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
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
                transition: 'all 0.3s ease'
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
      
      {/* Add animations for the scroll indicator */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }
          
          @keyframes scrollBounce {
            0%, 20%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(10px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;