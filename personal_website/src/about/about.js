//about.js
import React from 'react';
import { BookOpen, Download, Mail } from 'lucide-react';

function About({ isDarkMode }) {
  // Education from resume
  const education = [
    {
      year: '2022 - 2026',
      degree: 'Bachelor of Science in Computer Science and Information Technology and Web Science',
      concentration: 'Machine Learning',
      school: 'Rensselaer Polytechnic Institute – School of Science',
      location: 'Troy, NY',
      description: 'Relevant Courses: Data Structures, Introduction to Algorithms, Operating Systems, Principles of Software, Machine Learning and Optimization, AI For Science'
    }
  ];

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      paddingTop: '2rem',
      backgroundColor: isDarkMode ? '#0f0f0f' : '#ffffff',
      color: isDarkMode ? '#f5f6fa' : '#333333',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            color: '#6d1f7e',
            fontWeight: '700',
            fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
          }}>
            About Me
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#6d1f7e',
            margin: '0 auto 2rem',
            borderRadius: '2px'
          }}></div>
        </div>
        {/* Personal Bio Section */}
        <section style={{
          marginBottom: '5rem',
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Image Section */}
            <div style={{
              flex: '1 1 350px',
            }}>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: isDarkMode ? '0 12px 40px rgba(0, 0, 0, 0.3)' : '0 12px 40px rgba(0, 0, 0, 0.1)',
              }}>
                <img 
                  src="/api/placeholder/500/600" 
                  alt="Swaroop Sridhar"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(to top, rgba(109, 31, 126, 0.8), transparent)',
                }}></div>
              </div>
            </div>
            
            {/* Bio Section */}
            <div style={{
              flex: '1 1 500px',
            }}>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: isDarkMode ? '#f5f6fa' : '#e5e5e5',
                fontWeight: '600'
              }}>
                My Journey
              </h2>
              
              <p style={{
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                lineHeight: '1.8',
                color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
              }}>
                I'm Swaroop Sridhar, an aspiring Computer Scientist with a strong interest in Machine Learning, Generative AI, and Data Science. Currently pursuing my Bachelor of Science in Computer Science and Information Technology and Web Science at Rensselaer Polytechnic Institute with a concentration in Machine Learning.
              </p>
              
              <p style={{
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                lineHeight: '1.8',
                color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
              }}>
                I'm passionate about applying my knowledge of Neural Network training, Object-Oriented Programming, Cloud Computing, Web Development, and Robotics in real-world settings. My academic journey has equipped me with strong foundational knowledge in algorithms, data structures, and software engineering principles.
              </p>
              
              <p style={{
                fontSize: '1.1rem',
                marginBottom: '2rem',
                lineHeight: '1.8',
                color: isDarkMode ? '#cbd5e1' : '#a0aec0',
              }}>
                I've gained hands-on experience through various projects, including developing full-stack web applications, creating AI models for drug discovery, and implementing complex algorithms for data analysis. I'm excited to continue growing my skills and contributing to innovative solutions in the tech industry.
              </p>
              
              <div style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: '#6d1f7e',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    15+ <span style={{ fontSize: '1.5rem' }}>Languages</span>
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: isDarkMode ? '#cbd5e1' : '#a0aec0',
                  }}>Programming & Markup</p>
                </div>
                
                <div>
                  <h3 style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: '#6d1f7e',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    3+ <span style={{ fontSize: '1.5rem' }}>Projects</span>
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: isDarkMode ? '#cbd5e1' : '#a0aec0',
                  }}>Completed</p>
                </div>
                
                <div>
                  <h3 style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: '#6d1f7e',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    2026 <span style={{ fontSize: '1.5rem' }}>Graduation</span>
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: isDarkMode ? '#cbd5e1' : '#a0aec0',
                  }}>Expected</p>
                </div>
              </div>
              
              <div style={{
                marginTop: '2rem'
              }}>
                <a 
                  href="/files/resume.pdf" 
                  target="_blank"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    backgroundColor: '#6d1f7e',
                    color: 'white',
                    padding: '0.9rem 1.8rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 14px rgba(109, 31, 126, 0.25)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8f3ba0';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(109, 31, 126, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#6d1f7e';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(109, 31, 126, 0.25)';
                  }}
                >
                  <Download size={20} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Education Section */}
        <section style={{
          marginBottom: '5rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            <BookOpen size={28} color="#6d1f7e" />
            <h2 style={{
              fontSize: '1.8rem',
              color: '#6d1f7e',
              fontWeight: '600',
            }}>
              Education
            </h2>
          </div>
          
          <div style={{
            backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          }}>
            {education.map((item, index) => (
              <div 
                key={index} 
                style={{
                  marginBottom: index === education.length - 1 ? 0 : '2rem',
                  paddingBottom: index === education.length - 1 ? 0 : '2rem',
                  borderBottom: index === education.length - 1 ? 'none' : isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.75rem',
                }}>
                  <h3 style={{
                    fontSize: '1.35rem',
                    color: isDarkMode ? '#f5f6fa' : '#e5e5e5',
                    fontWeight: '600',
                  }}>
                    {item.degree}
                  </h3>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#6d1f7e',
                    fontWeight: '500',
                    backgroundColor: 'rgba(109, 31, 126, 0.1)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '4px',
                  }}>
                    {item.year}
                  </span>
                </div>
                
                <h4 style={{
                  fontSize: '1.1rem',
                  color: isDarkMode ? '#f8fafc' : '#e5e5e5',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                }}>
                  {item.school}
                </h4>
                
                <h5 style={{
                  fontSize: '1rem',
                  color: '#6d1f7e',
                  fontWeight: '500',
                  marginBottom: '1rem',
                }}>
                  Concentration: {item.concentration}
                </h5>
                
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  color: isDarkMode ? '#cbd5e1' : '#a0aec0',
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Page animations */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            section {
              animation: fadeIn 0.8s ease-out forwards;
              opacity: 0;
            }
            
            section:nth-child(1) { animation-delay: 0.1s; }
            section:nth-child(2) { animation-delay: 0.3s; }
            section:nth-child(3) { animation-delay: 0.5s; }
          `}
        </style>
      </div>
    </div>
  );
}

export default About;