import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send, MapPin } from 'lucide-react';

function Contact({ isDarkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send this data to a server
    console.log("Form submitted:", formData);
    // For now, just show an alert
    alert("Thank you for your message! I'll get back to you soon.");
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
      padding: '2rem 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            color: '#6d1f7e',
            fontWeight: '700',
            fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
          }}>
            Get In Touch
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#6d1f7e',
            margin: '0 auto 2rem',
            borderRadius: '2px'
          }}></div>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Contact Information */}
          <div style={{
            flex: '1 1 350px',
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
              fontWeight: '600'
            }}>
              Contact Information
            </h2>

            <div style={{
              backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
            }}>
              <div style={{
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  <Mail size={20} color="#6d1f7e" />
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  }}>
                    Email
                  </h3>
                </div>
                <a href="mailto:contact@swaroopsridhar.com" style={{
                  textDecoration: 'none',
                  color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
                  fontSize: '1rem',
                  transition: 'color 0.3s ease'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#6d1f7e'} onMouseLeave={(e) => e.currentTarget.style.color = isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'}>
                  contact@swaroopsridhar.com
                </a>
              </div>

              <div style={{
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  <Phone size={20} color="#6d1f7e" />
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  }}>
                    Phone
                  </h3>
                </div>
                <a href="tel:+11234567890" style={{
                  textDecoration: 'none',
                  color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
                  fontSize: '1rem',
                  transition: 'color 0.3s ease'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#6d1f7e'} onMouseLeave={(e) => e.currentTarget.style.color = isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'}>
                  +1 (123) 456-7890
                </a>
              </div>

              <div style={{
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  <MapPin size={20} color="#6d1f7e" />
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  }}>
                    Location
                  </h3>
                </div>
                <p style={{
                  color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
                  fontSize: '1rem',
                }}>
                  Troy, New York, United States
                </p>
              </div>

              <div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  marginBottom: '1rem'
                }}>
                  Social Media
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <a href="https://linkedin.com/in/swaroop-sridhar" target="_blank" rel="noopener noreferrer" style={{
                    backgroundColor: isDarkMode ? 'rgba(25, 25, 25, 0.6)' : 'rgba(240, 240, 240, 0.6)',
                    color: '#6d1f7e',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.backgroundColor = '#6d1f7e'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(25, 25, 25, 0.6)' : 'rgba(240, 240, 240, 0.6)'; e.currentTarget.style.color = '#6d1f7e'; }}>
                    <Linkedin size={20} />
                  </a>
                  <a href="https://github.com/sridhs21" target="_blank" rel="noopener noreferrer" style={{
                    backgroundColor: isDarkMode ? 'rgba(25, 25, 25, 0.6)' : 'rgba(240, 240, 240, 0.6)',
                    color: '#6d1f7e',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.backgroundColor = '#6d1f7e'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(25, 25, 25, 0.6)' : 'rgba(240, 240, 240, 0.6)'; e.currentTarget.style.color = '#6d1f7e'; }}>
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            flex: '1 1 500px',
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
              fontWeight: '600'
            }}>
              Send Me a Message
            </h2>

            <form onSubmit={handleSubmit} style={{
              backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  flex: '1 1 200px'
                }}>
                  <label htmlFor="name" style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  }}>Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                      backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                      color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
                <div style={{
                  flex: '1 1 200px'
                }}>
                  <label htmlFor="email" style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  }}>Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                      backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                      color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              </div>

              <div style={{
                marginBottom: '1.5rem'
              }}>
                <label htmlFor="subject" style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                }}>Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                    backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                    color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              <div style={{
                marginBottom: '2rem'
              }}>
                <label htmlFor="message" style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                }}>Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  required
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                    backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                    color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                    fontSize: '1rem',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                ></textarea>
              </div>

              <button 
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: '#6d1f7e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.9rem 1.8rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
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
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          input:focus, textarea:focus {
            border-color: #6d1f7e !important;
            box-shadow: 0 0 0 2px rgba(109, 31, 126, 0.1) !important;
          }
        `}
      </style>
    </div>
  );
}

export default Contact;