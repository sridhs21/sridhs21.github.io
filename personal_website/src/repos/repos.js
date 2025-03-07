//repos.js
import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, FileCode, ExternalLink } from 'lucide-react';

function Repos({ isDarkMode }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredRepo, setHoveredRepo] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sridhs21/repos?sort=updated&per_page=100');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        
        const sortedRepos = data
          .filter(repo => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        setRepos(sortedRepos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f7df1e',
      Python: '#3572A5',
      Java: '#b07219',
      TypeScript: '#2b7489',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Ruby: '#701516',
      Go: '#00ADD8',
    };
    return colors[language] || '#6d1f7e';
  };

  // Animation for cards appearing on load
  const getAnimationDelay = (index) => `${index * 0.1}s`;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkMode ? '#0f0f0f' : '#ffffff',
      transition: 'background-color 0.3s ease',
      overflowY: 'auto',
      marginTop: '64px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        minHeight: '100%'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: isDarkMode ? '#ffffff' : '#e5e5e5',
          animation: 'slideInDown 0.5s ease-out'
        }}>
          <Github size={28} className="animate-bounce" />
          GitHub Repositories
        </h1>

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '4rem'
          }}>
            <div className="spinner" />
          </div>
        ) : error ? (
          <div style={{
            color: '#ef4444',
            padding: '1rem',
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            {error}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <style>
              {`
                @keyframes slideInDown {
                  from {
                    transform: translateY(-20px);
                    opacity: 0;
                  }
                  to {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes scaleIn {
                  from {
                    transform: scale(0.95);
                    opacity: 0;
                  }
                  to {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
                @keyframes pulse {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                  100% { transform: scale(1); }
                }
                .language-dot {
                  transition: transform 0.3s ease;
                }
                .language-dot:hover {
                  transform: scale(1.5);
                }
              `}
            </style>
            {repos.map((repo, index) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  animation: 'scaleIn 0.5s ease-out forwards',
                  animationDelay: getAnimationDelay(index),
                  opacity: 0
                }}
                onMouseEnter={() => setHoveredRepo(repo.id)}
                onMouseLeave={() => setHoveredRepo(null)}
              >
                <div style={{
                  background: isDarkMode ? 'rgba(15, 15, 15, 0.5)' : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isDarkMode 
                    ? '0 4px 6px rgba(0, 0, 0, 0.2)' 
                    : '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: isDarkMode 
                    ? '1px solid rgba(255, 255, 255, 0.1)' 
                    : '1px solid rgba(0, 0, 0, 0.05)',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <FileCode 
                        size={20} 
                        style={{ 
                          color: '#6d1f7e',
                          transform: hoveredRepo === repo.id ? 'rotate(360deg)' : 'rotate(0)',
                          transition: 'transform 0.5s ease'
                        }} 
                      />
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: isDarkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                        margin: 0,
                        transition: 'color 0.3s ease'
                      }}>
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink 
                      size={16} 
                      style={{ 
                        color: '#6d1f7e',
                        transform: hoveredRepo === repo.id ? 'translateX(3px)' : 'translateX(0)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </div>

                  {repo.description && (
                    <p style={{
                      fontSize: '0.95rem',
                      color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
                      marginBottom: '1rem',
                      flex: 1,
                      transition: 'color 0.3s ease'
                    }}>                    
                      {repo.description}
                    </p>
                  )}

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto'
                  }}>
                    {repo.language && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span 
                          className="language-dot"
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: getLanguageColor(repo.language)
                          }}
                        />
                        <span style={{
                          fontSize: '0.9rem',
                          color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'
                        }}>
                          {repo.language}
                        </span>
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.9rem',
                        color: isDarkMode ? '#cbd5e1' : '#a0aec0'
                      }}>
                        <Star 
                          size={16} 
                          style={{
                            transition: 'transform 0.3s ease',
                            transform: hoveredRepo === repo.id ? 'scale(1.2)' : 'scale(1)',
                            color: '#6d1f7e'
                          }}
                        />
                        {repo.stargazers_count}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.9rem',
                        color: isDarkMode ? '#cbd5e1' : '#a0aec0'
                      }}>
                        <GitFork 
                          size={16}
                          style={{
                            transition: 'transform 0.3s ease',
                            transform: hoveredRepo === repo.id ? 'scale(1.2)' : 'scale(1)',
                            color: '#6d1f7e'
                          }}
                        />
                        {repo.forks_count}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Repos;