import React, { useState, useEffect } from 'react';
import VantaBackground from './VantaBackground';
import { ArrowRight, Code, Server, Layout, Database } from 'lucide-react';
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
      description: 'Creating responsive and intuitive user interfaces using modern technologies like React, Vue, and Angular.', 
      technologies: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'SASS'] 
    },
    { 
      id: 'backend', 
      icon: <Server size={28} />, 
      title: 'Backend Development', 
      description: 'Building robust server-side applications with a focus on performance, security, and scalability.', 
      technologies: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs'] 
    },
    { 
      id: 'database', 
      icon: <Database size={28} />, 
      title: 'Database Design', 
      description: 'Designing efficient database schemas and writing optimized queries for both SQL and NoSQL databases.', 
      technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL'] 
    },
    { 
      id: 'coding', 
      icon: <Code size={28} />, 
      title: 'Software Architecture', 
      description: 'Developing clean, maintainable code with a focus on design patterns and best practices.', 
      technologies: ['System Design', 'Microservices', 'Cloud Architecture', 'CI/CD Pipelines'] 
    }
  ];

  const featuredProjects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with payment integration and inventory management.",
      image: "/api/placeholder/500/300",
      tags: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: "Task Management App",
      description: "A collaborative project management tool with real-time updates and analytics.",
      image: "/api/placeholder/500/300",
      tags: ["Vue.js", "Firebase", "Tailwind CSS"]
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
        backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.85)' : 'rgba(26, 26, 26, 0.85)',
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
                src="/api/placeholder/400/400"
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
              color: isDarkMode ? '#f5f6fa' : '#e5e5e5',
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
              Full Stack Developer
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: isDarkMode ? '#f5f6fa' : '#e5e5e5',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              I build engaging digital experiences that combine elegant frontend interfaces with robust backend solutions. Let's create something amazing together.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <a 
                href="/contact"
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
                href="/about"
                style={{
                  backgroundColor: 'transparent',
                  color: isDarkMode ? '#f5f6fa' : '#e5e5e5',
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
                  e.currentTarget.style.color = isDarkMode ? '#f5f6fa' : '#e5e5e5';
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
            border: `2px solid ${isDarkMode ? '#f5f6fa' : '#e5e5e5'}`,
            borderRadius: '15px',
            position: 'relative'
          }}>
            <div style={{
              width: '4px',
              height: '8px',
              backgroundColor: isDarkMode ? '#f5f6fa' : '#e5e5e5',
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
              color: isDarkMode ? '#f5f6fa' : '#e5e5e5',
              marginBottom: '2rem'
            }}>
              Core competencies and technologies I use to build exceptional digital experiences
            </p>
          </div>

          {/* Expertise Areas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {skills.map((skill) => (
              <div 
                key={skill.id}
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(26, 26, 26, 0.6)',
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
                  color: isDarkMode ? '#f5f6fa' : '#e5e5e5',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {skill.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: isDarkMode ? '#cbd5e1' : '#a0aec0',
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
            backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
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
                { name: 'React', level: 95 },
                { name: 'JavaScript', level: 90 },
                { name: 'TypeScript', level: 85 },
                { name: 'Node.js', level: 88 },
                { name: 'Express', level: 85 },
                { name: 'MongoDB', level: 82 },
                { name: 'PostgreSQL', level: 80 },
                { name: 'AWS', level: 75 },
                { name: 'Docker', level: 78 }
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
                      color: isDarkMode ? '#f5f6fa' : '#e5e5e5'
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
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)',
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {featuredProjects.map((project, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(26, 26, 26, 0.6)',
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
                  height: '200px',
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
                    color: isDarkMode ? '#f5f6fa' : '#e5e5e5',
                    marginBottom: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: isDarkMode ? '#cbd5e1' : '#a0aec0',
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
              href="/portfolio"
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
              View All Projects
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