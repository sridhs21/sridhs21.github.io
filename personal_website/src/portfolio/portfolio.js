import React, { useState } from 'react';
import { ExternalLink, Github, Code, Search, X } from 'lucide-react';

function Portfolio({ isDarkMode }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalProject, setModalProject] = useState(null);

  // Portfolio projects data
  const projects = [
    {
      id: 1,
      title: "RPI Campus Availability App",
      description: "Real-time tracking and prediction of parking availability across campus using IoT sensors and machine learning algorithms.",
      longDescription: "This application helps students and faculty find available parking spots on campus in real-time. It uses IoT sensors to collect data and machine learning algorithms to predict future availability based on historical patterns. Users can check the app before arriving on campus to plan their parking strategy.",
      image: "/images/parking_application.png",
      technologies: ["Python", "Flask", "JavaScript", "Leaflet.js", "TensorFlow"],
      category: "web",
      githubLink: "https://github.com/sridhs21/rpi-campus-availability",
      demoLink: "https://campus-availability.demo.com",
      featured: true
    },
    {
      id: 2,
      title: "AI-Driven Drug Discovery",
      description: "Machine learning models to predict drug interactions with proteins and analyze molecular interactions for pharmaceutical research.",
      longDescription: "This project focuses on using artificial intelligence to accelerate the drug discovery process. By analyzing vast datasets of molecular structures and their interactions with various proteins, the model predicts potential successful drug candidates for specific targets, potentially saving years of laboratory testing.",
      image: "/images/drug_discovery.jpg",
      technologies: ["Python", "PyTorch", "Scikit-learn", "Pandas", "RDKit", "Molecular Visualization"],
      category: "machine-learning",
      githubLink: "https://github.com/sridhs21/ai-drug-discovery",
      demoLink: "",
      featured: true
    },
    {
      id: 3,
      title: "ADT Graph Algorithms Library",
      description: "Implementation of inheritance hierarchy with optimized shortest path algorithms for large data sets and complex network analysis.",
      longDescription: "This library provides efficient implementations of various graph algorithms, focusing particularly on shortest path problems. It includes optimized versions of Dijkstra's algorithm, A* search, and Bellman-Ford, along with several utility functions for handling large network datasets. The implementation uses advanced data structures to reduce computational complexity.",
      image: "/images/adt_graph.jpg",
      technologies: ["Java", "JavaFX", "Data Structures", "Algorithms", "Graph Theory"],
      category: "algorithm",
      githubLink: "https://github.com/sridhs21/graph-algorithms",
      demoLink: "",
      featured: true
    },
    {
      id: 4,
      title: "Personal Portfolio Website",
      description: "Responsive personal website built with React to showcase projects and skills with dark/light mode support.",
      longDescription: "A modern, responsive personal portfolio website built with React. Features include dark and light mode, smooth animations, and a clean interface to showcase projects and skills. The site is built with a focus on performance and accessibility.",
      image: "/images/personal_website.png",
      technologies: ["React", "JavaScript", "CSS", "HTML", "Responsive Design"],
      category: "web",
      githubLink: "https://github.com/sridhs21/portfolio",
      demoLink: "https://sridhs21.github.io",
      featured: false
    }
  ];

  // Filter projects based on category and search query
  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openProjectModal = (project) => {
    setModalProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeProjectModal = () => {
    setModalProject(null);
    document.body.style.overflow = 'auto'; // Allow scrolling again
  };

  // Get category label
  const getCategoryLabel = (category) => {
    switch(category) {
      case 'web': return 'Web Development';
      case 'machine-learning': return 'Machine Learning';
      case 'algorithm': return 'Algorithms & Data Structures';
      default: return category;
    }
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
            My Portfolio
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#6d1f7e',
            margin: '0 auto 2rem',
            borderRadius: '2px'
          }}></div>
          <p style={{
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto',
            color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
            lineHeight: '1.8'
          }}>
            Check out some of my projects!
          </p>
        </div>

        {/* Filters and Search */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {/* Category Filters */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            {['all', 'web', 'machine-learning', 'algorithm'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                style={{
                  backgroundColor: filter === category 
                    ? '#6d1f7e' 
                    : isDarkMode ? 'rgba(30, 30, 30, 0.5)' : 'rgba(240, 240, 240, 0.7)',
                  color: filter === category 
                    ? 'white' 
                    : isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (filter !== category) {
                    e.currentTarget.style.backgroundColor = isDarkMode 
                      ? 'rgba(40, 40, 40, 0.7)' 
                      : 'rgba(230, 230, 230, 0.9)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== category) {
                    e.currentTarget.style.backgroundColor = isDarkMode 
                      ? 'rgba(30, 30, 30, 0.5)' 
                      : 'rgba(240, 240, 240, 0.7)';
                  }
                }}
              >
                {category === 'all' ? 'All Projects' : getCategoryLabel(category)}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
            }}>
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  borderRadius: '8px',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                  color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
              />
              <Search 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6d1f7e',
                }}
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectModal(project)}
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  animation: 'fadeIn 0.6s ease-out',
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
                {/* Featured Badge */}
                {project.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: '#6d1f7e',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    zIndex: 1,
                  }}>
                    Featured
                  </div>
                )}

                {/* Project Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                      filter: isDarkMode ? 'brightness(0.85)' : 'brightness(1)',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(109, 31, 126, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}>
                    <span style={{
                      backgroundColor: '#6d1f7e',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                    }}>
                      View Details
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div style={{
                  padding: '1.5rem',
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
                    marginBottom: '1.2rem',
                    lineHeight: '1.6',
                  }}>
                    {project.description}
                  </p>

                  {/* Category Tag */}
                  <div style={{
                    marginBottom: '1rem',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(109, 31, 126, 0.1)',
                      color: '#6d1f7e',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                    }}>
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>

                  {/* Technologies */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}>
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} style={{
                        display: 'inline-block',
                        backgroundColor: isDarkMode ? 'rgba(40, 40, 40, 0.6)' : 'rgba(240, 240, 240, 0.6)',
                        color: isDarkMode ? '#cbd5e1' : '#6d1f7e',
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.75rem',
                        borderRadius: '50px',
                        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                      }}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: isDarkMode ? 'rgba(40, 40, 40, 0.6)' : 'rgba(240, 240, 240, 0.6)',
                        color: isDarkMode ? '#cbd5e1' : '#6d1f7e',
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.75rem',
                        borderRadius: '50px',
                        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                      }}>
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem',
              backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px',
              boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                marginBottom: '1rem',
              }}>
                No projects found matching your criteria
              </h3>
              <p style={{
                color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
              }}>
                Try adjusting your search or filter settings
              </p>
              <button 
                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#6d1f7e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.6rem 1.2rem',
                  cursor: 'pointer',
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal - SIZE BETWEEN ORIGINAL AND REDUCED */}
        {modalProject && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            paddingTop: '5rem', /* Keep the padding to position it lower */
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-out',
          }}>
            <div style={{
              backgroundColor: isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '800px', /* Halfway between 700px and 900px */
              maxHeight: '85vh', /* Halfway between 80vh and 90vh */
              overflow: 'auto',
              position: 'relative',
              animation: 'scaleIn 0.3s ease-out',
              marginTop: '30px', /* Keep this to ensure it stays below navbar */
            }}>
              {/* Close Button */}
              <button 
                onClick={closeProjectModal}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(240, 240, 240, 0.8)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6d1f7e';
                  e.currentTarget.querySelector('svg').style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(240, 240, 240, 0.8)';
                  e.currentTarget.querySelector('svg').style.color = isDarkMode ? 'white' : 'black';
                }}
              >
                <X size={20} color={isDarkMode ? 'white' : 'black'} style={{ transition: 'color 0.3s ease' }}/>
              </button>

              {/* Project Image */}
              <div style={{
                width: '100%',
                height: '275px', /* Halfway between 250px and 300px */
                overflow: 'hidden',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}>
                <img 
                  src={modalProject.image} 
                  alt={modalProject.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Project Content */}
              <div style={{
                padding: '1.75rem', /* Halfway between 1.5rem and 2rem */
              }}>
                <h2 style={{
                  fontSize: '1.7rem', /* Halfway between 1.6rem and 1.8rem */
                  color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                  marginBottom: '0.9rem', /* Halfway between 0.75rem and 1rem */
                  fontWeight: '600',
                }}>
                  {modalProject.title}
                </h2>

                <div style={{
                  marginBottom: '1.4rem', /* Halfway between 1.25rem and 1.5rem */
                }}>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(109, 31, 126, 0.1)',
                    color: '#6d1f7e',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.88rem', /* Halfway between 0.85rem and 0.9rem */
                    fontWeight: '500',
                  }}>
                    {getCategoryLabel(modalProject.category)}
                  </span>
                  {modalProject.featured && (
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: '#6d1f7e',
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '4px',
                      fontSize: '0.88rem', /* Halfway between 0.85rem and 0.9rem */
                      fontWeight: '500',
                      marginLeft: '0.5rem',
                    }}>
                      Featured
                    </span>
                  )}
                </div>

                <p style={{
                  fontSize: '1.03rem', /* Halfway between 1rem and 1.05rem */
                  color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
                  marginBottom: '1.75rem', /* Halfway between 1.5rem and 2rem */
                  lineHeight: '1.65', /* Halfway between 1.6 and 1.7 */
                }}>
                  {modalProject.longDescription}
                </p>

                <div style={{
                  marginBottom: '1.75rem', /* Halfway between 1.5rem and 2rem */
                }}>
                  <h3 style={{
                    fontSize: '1.15rem', /* Halfway between 1.1rem and 1.2rem */
                    color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                    marginBottom: '0.9rem', /* Halfway between 0.75rem and 1rem */
                    fontWeight: '600',
                  }}>
                    Technologies Used
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.7rem', /* Halfway between 0.6rem and 0.8rem */
                  }}>
                    {modalProject.technologies.map((tech, index) => (
                      <span key={index} style={{
                        display: 'inline-block',
                        backgroundColor: isDarkMode ? 'rgba(40, 40, 40, 0.6)' : 'rgba(240, 240, 240, 0.6)',
                        color: isDarkMode ? '#cbd5e1' : '#6d1f7e',
                        padding: '0.35rem 0.75rem', /* Halfway between 0.3rem 0.7rem and 0.4rem 0.8rem */
                        fontSize: '0.83rem', /* Halfway between 0.8rem and 0.85rem */
                        borderRadius: '50px',
                        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}>
                  {modalProject.githubLink && (
                    <a 
                      href={modalProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(240, 240, 240, 0.8)',
                        color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                        padding: '0.75rem 1.15rem', /* Halfway between 0.7rem 1.1rem and 0.8rem 1.2rem */
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        fontSize: '0.95rem', /* Halfway between 0.9rem and 1rem */
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#333';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(240, 240, 240, 0.8)';
                        e.currentTarget.style.color = isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)';
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={17} /> {/* Halfway between 16 and 18 */}
                      View on GitHub
                    </a>
                  )}
                  {modalProject.demoLink && (
                    <a 
                      href={modalProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: '#6d1f7e',
                        color: 'white',
                        padding: '0.75rem 1.15rem', /* Halfway between 0.7rem 1.1rem and 0.8rem 1.2rem */
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        fontSize: '0.95rem', /* Halfway between 0.9rem and 1rem */
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#8f3ba0';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#6d1f7e';
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={17} /> {/* Halfway between 16 and 18 */}
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          
          /* Hover effect for project cards */
          div:hover > div > img {
            transform: scale(1.1);
          }
          
          div:hover > div > div {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}

export default Portfolio;