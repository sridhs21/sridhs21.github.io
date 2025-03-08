//repos.js
import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, FileCode, ExternalLink } from 'lucide-react';
import './repos.css';

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

  const getAnimationDelay = (index) => `${index * 0.1}s`;
  const themeClass = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className={`repos-container ${themeClass}`}>
      <div className="repos-content">
        <h1 className={`repos-header ${themeClass}`}>
          <Github size={28} className="animate-bounce" />
          GitHub Repositories
        </h1>

        {loading ? (
          <div className="loading-container">
            <div className="spinner" />
          </div>
        ) : error ? (
          <div className="error-message">
            {error}
          </div>
        ) : (
          <div className="repos-grid">
            {repos.map((repo, index) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link"
                style={{ animationDelay: getAnimationDelay(index) }}
                onMouseEnter={() => setHoveredRepo(repo.id)}
                onMouseLeave={() => setHoveredRepo(null)}
              >
                <div className={`repo-card ${themeClass}`}>
                  <div className="repo-header">
                    <div className="repo-name-container">
                      <FileCode 
                        size={20} 
                        className="repo-icon"
                        style={{ 
                          transform: hoveredRepo === repo.id ? 'rotate(360deg)' : 'rotate(0)'
                        }} 
                      />
                      <h3 className={`repo-name ${themeClass}`}>
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink 
                      size={16} 
                      className="external-icon"
                      style={{ 
                        transform: hoveredRepo === repo.id ? 'translateX(3px)' : 'translateX(0)'
                      }} 
                    />
                  </div>

                  {repo.description && (
                    <p className={`repo-description ${themeClass}`}>
                      {repo.description}
                    </p>
                  )}

                  <div className="repo-footer">
                    {repo.language && (
                      <div className="repo-language">
                        <span 
                          className="language-dot"
                          style={{
                            backgroundColor: getLanguageColor(repo.language)
                          }}
                        />
                        <span className={`language-name ${themeClass}`}>
                          {repo.language}
                        </span>
                      </div>
                    )}

                    <div className="repo-stats">
                      <div className={`stat-item ${themeClass}`}>
                        <Star 
                          size={16} 
                          className="stat-icon"
                          style={{
                            transform: hoveredRepo === repo.id ? 'scale(1.2)' : 'scale(1)'
                          }}
                        />
                        {repo.stargazers_count}
                      </div>
                      <div className={`stat-item ${themeClass}`}>
                        <GitFork 
                          size={16}
                          className="stat-icon"
                          style={{
                            transform: hoveredRepo === repo.id ? 'scale(1.2)' : 'scale(1)'
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