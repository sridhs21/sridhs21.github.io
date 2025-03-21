import React, { useState } from "react";
import { ExternalLink, Github, Search, X } from "lucide-react";
import "./portfolio.css";

function Portfolio({ isDarkMode }) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProject, setModalProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "PetCare Vet Finder",
      description:
        "A comprehensive veterinary search platform that helps pet owners find the perfect veterinarian based on location, pet type, and specialized care requirements.",
      longDescription:
        "PetCare Vet Finder is a web application designed to connect pet owners with veterinarians that match their specific needs. The platform aggregates data from multiple sources to provide detailed information about veterinary clinics, including services offered, ratings, reviews, and specialties. Users can filter results by pet type (dogs, cats, birds, exotic pets), distance, price range, and specialty services. The application features an interface with interactive filtering and detailed clinic profiles including recommendation reasons tailored to each search.",
      image: "/images/PCVF.png",
      technologies: [
        "Python",
        "Flask",
        "JavaScript",
        "Bootstrap",
        "NLTK",
        "pandas",
        "API Integration",
      ],
      category: "web",
      githubLink: "https://github.com/sridhs21/PCVF",
      demoLink: "https://petcare-vet-finder.onrender.com",
      featured: true,
    },
    {
      id: 2,
      title: "RPI Campus Availability App",
      description:
        "Real-time tracking and prediction of parking availability across campus using IoT sensors and machine learning algorithms.",
      longDescription:
        "This application helps students and faculty find available parking spots on campus in real-time. It uses IoT sensors to collect data and machine learning algorithms to predict future availability based on historical patterns. Users can check the app before arriving on campus to plan their parking strategy.",
      image: "/images/parking_application.png",
      technologies: [
        "Python",
        "Flask",
        "JavaScript",
        "Leaflet.js",
        "TensorFlow",
      ],
      category: "web",
      githubLink: "https://github.com/sridhs21/parkingavailabilityapp",
      demoLink: "",
      featured: true,
    },
    {
      id: 3,
      title: "AI-Driven Drug Discovery",
      description:
        "Machine learning models to predict drug interactions with proteins and analyze molecular interactions for pharmaceutical research.",
      longDescription:
        "This project focuses on using artificial intelligence to accelerate the drug discovery process. By analyzing vast datasets of molecular structures and their interactions with various proteins, the model predicts potential successful drug candidates for specific targets, potentially saving years of laboratory testing.",
      image: "/images/drug_discovery.jpg",
      technologies: [
        "Python",
        "PyTorch",
        "Scikit-learn",
        "Pandas",
        "RDKit",
        "Molecular Visualization",
      ],
      category: "machine-learning",
      githubLink: "https://github.com/sridhs21/TDC-Machine-Learning-Tasks",
      demoLink: "",
      featured: false,
    },
    {
      id: 4,
      title: "ADT Graph Algorithms Library",
      description:
        "Implementation of inheritance hierarchy with optimized shortest path algorithms for large data sets and complex network analysis.",
      longDescription:
        "This library provides efficient implementations of various graph algorithms, focusing particularly on shortest path problems. It includes optimized versions of Dijkstra's algorithm, A* search, and Bellman-Ford, along with several utility functions for handling large network datasets. The implementation uses advanced data structures to reduce computational complexity.",
      image: "/images/adt_graph.jpg",
      technologies: [
        "Java",
        "JavaFX",
        "Data Structures",
        "Algorithms",
        "Graph Theory",
      ],
      category: "algorithm",
      githubLink: "",
      demoLink: "",
      featured: false,
    },
    {
      id: 5,
      title: "Personal Portfolio Website",
      description:
        "Responsive personal website built with React to showcase projects and skills with dark/light mode support.",
      longDescription:
        "A modern, responsive personal portfolio website built with React. Features include dark and light mode, smooth animations, and a clean interface to showcase projects and skills. The site is built with a focus on performance and accessibility.",
      image: "/images/personal_website.png",
      technologies: ["React", "JavaScript", "CSS", "HTML", "Responsive Design"],
      category: "web",
      githubLink: "https://github.com/sridhs21/portfolio",
      demoLink: "https://sridhs21.github.io",
      featured: false,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === "all" || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const openProjectModal = (project) => {
    setModalProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setModalProject(null);
    document.body.style.overflow = "auto";
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "web":
        return "Web Development";
      case "machine-learning":
        return "Machine Learning";
      case "algorithm":
        return "Algorithms & Data Structures";
      default:
        return category;
    }
  };

  const themeClass = isDarkMode ? "dark-mode" : "light-mode";

  return (
    <div className={`portfolio-container ${themeClass}`}>
      <div className="portfolio-content">
        {/* Header Section */}
        <div className="section-header">
          <h1 className="section-title">My Portfolio</h1>
          <div className="section-divider"></div>
          <p className={`section-description ${themeClass}`}>
            Check out some of my projects!
          </p>
        </div>

        {/* Filters and Search */}
        <div className="filters-container">
          {/* Category Filters */}
          <div className="category-filters">
            {["all", "web", "machine-learning", "algorithm"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`filter-button ${
                  filter === category ? "active" : ""
                }`}
              >
                {category === "all"
                  ? "All Projects"
                  : getCategoryLabel(category)}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`search-input ${themeClass}`}
              />
              <Search size={18} className="search-icon" />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectModal(project)}
                className={`project-card ${themeClass}`}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="featured-badge">Featured</div>
                )}

                {/* Project Image */}
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`project-image ${themeClass}`}
                  />
                  <div className="project-image-overlay">
                    <span className="view-details-button">View Details</span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="project-info">
                  <h3 className={`project-title ${themeClass}`}>
                    {project.title}
                  </h3>

                  <p className={`project-description ${themeClass}`}>
                    {project.description}
                  </p>

                  {/* Category Tag */}
                  <div className="category-tag-container">
                    <span className="category-tag">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>

                  {/* Technologies */}
                  <div className="tech-tags">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className={`tech-tag ${themeClass}`}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className={`tech-tag ${themeClass}`}>
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`no-projects ${themeClass}`}>
              <h3 className={`no-projects-title ${themeClass}`}>
                No projects found matching your criteria
              </h3>
              <p className={`no-projects-description ${themeClass}`}>
                Try adjusting your search or filter settings
              </p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
                className="reset-button"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {modalProject && (
        <div className="modal-overlay">
          <div className={`modal-container ${themeClass}`}>
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              className={`modal-close-button ${themeClass}`}
            >
              <X size={20} color={isDarkMode ? "white" : "black"} />
            </button>

            {/* Project Image */}
            <div className="modal-image">
              <img src={modalProject.image} alt={modalProject.title} />
            </div>

            {/* Project Content */}
            <div className="modal-content">
              <h2 className={`modal-title ${themeClass}`}>
                {modalProject.title}
              </h2>

              <div className="modal-tags">
                <span className="category-tag">
                  {getCategoryLabel(modalProject.category)}
                </span>
                {modalProject.featured && (
                  <span className="featured-badge">Featured</span>
                )}
              </div>

              <p className={`modal-description ${themeClass}`}>
                {modalProject.longDescription}
              </p>

              <div className="modal-tech-section">
                <h3 className={`modal-tech-title ${themeClass}`}>
                  Technologies Used
                </h3>
                <div className="modal-tech-tags">
                  {modalProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`modal-tech-tag ${themeClass}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-links">
                {modalProject.githubLink && (
                  <a
                    href={modalProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`github-link ${themeClass}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={17} />
                    View on GitHub
                  </a>
                )}
                {modalProject.demoLink && (
                  <a
                    href={modalProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={17} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;