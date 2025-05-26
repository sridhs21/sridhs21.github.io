import React, { useState } from "react";
import { ExternalLink, Github, Search, X, Calendar, Database, Cpu, BookOpen } from "lucide-react";
import "./portfolio.css";

function Portfolio({ isDarkMode }) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProject, setModalProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Magnetic Reconnection Classifier",
      description: "A machine learning classifier for identifying rare magnetic reconnection events in space weather simulation data using subdomain-focused training and specialized techniques for extreme class imbalance.",
      longDescription: "This research project develops a convolutional neural network specifically designed to detect rare magnetic reconnection events in 2D simulation data from the Gkyl analysis code. With reconnection events occurring at only 0.003% of grid points, the system employs a novel subdomain-focused training approach to improve signal-to-noise ratio. The classifier incorporates focal loss functions and class-balancing techniques to handle extreme class imbalance, making it suitable for identifying these critical energy-releasing events that drive space weather phenomena affecting Earth's magnetosphere, satellites, and power grids. Designed as an educational tool for the NASA Heliophysics Summer School, this work builds foundational techniques for future extension to 3D domains where no inexpensive numerical methods currently exist.",
      image: "/images/magnetic-reconnection.jpg",
      technologies: [
        "Python",
        "PyTorch",
        "NumPy",
        "SciPy",
        "scikit-learn",
        "Convolutional Neural Networks",
        "Focal Loss",
        "NVIDIA H100 GPUs"
      ],
      categories: ["machine-learning", "rare-event-detection"],
      githubLink: "https://github.com/SCOREC/reconClassifier",
      demoLink: null,
      featured: true,
      researchDetails: {
        timeline: "10 weeks (Summer 2025)",
        dataset: "150 grids (1024² each) with ~5,000 labeled reconnection points",
        challenge: "Extreme class imbalance (0.003% positive cases)",
        approach: "Subdomain-focused training with specialized loss functions",
        applications: ["Space Weather Prediction", "NASA Heliophysics Education", "3D Extension Research"],
        computeResources: "EmpireAI alpha system with NVIDIA H100 GPUs"
      }
    },
    {
      id: 2,
      title: "FytóSpot",
      description:
        "A computer vision-based plant identification and tracking system using multiple detection methods and machine learning for species classification.",
      longDescription:
        "FytóSpot is a plant identification and tracking system that leverages computer vision and machine learning to detect and identify plants from images and video streams. It supports multiple detection methods including color filtering, texture analysis, and contour detection. The system features real-time plant tracking with temporal filtering and detailed species identification using a ResNet-based neural network model. With both web and desktop interfaces, FytóSpot provides a user experience with visualization tools and confidence metrics for plant identification.",
      image: "/images/fytospot.jpg",
      technologies: [
        "Python",
        "OpenCV",
        "PyTorch",
        "Flask",
        "CustomTkinter",
        "NumPy",
        "Machine Learning"
      ],
      categories: ["computer-vision", "machine-learning"],
      githubLink: "https://github.com/sridhs21/fytospot",
      demoLink: "https://fytospot.onrender.com",
      featured: true,
    },
    {
      id: 3,
      title: "PetCare Vet Finder",
      description:
        "A veterinary search platform that helps pet owners find the perfect veterinarian based on location, pet type, and specialized care requirements.",
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
      categories: ["web"],
      githubLink: "https://github.com/sridhs21/PCVF",
      demoLink: "https://petcare-vet-finder.onrender.com",
      featured: true,
    },
    {
      id: 4,
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
      categories: ["web"],
      githubLink: "https://github.com/sridhs21/parkingavailabilityapp",
      demoLink: "",
      featured: false,
    },
    {
      id: 5,
      title: "Modelex",
      description:
        "Code formatting extension for VS Code that beautifies and standardizes code across multiple programming languages.",
      longDescription:
        "This VS Code extension helps developers maintain clean, consistent code by formatting files according to language-specific best practices. It supports JavaScript, TypeScript, Python, Java, C/C++, HTML, CSS, and JSON, applying indentation, spacing, and comment formatting. The extension preserves logical code structure while removing excessive whitespace and standardizing syntax patterns which improves readability.",
      image: "/images/modelex.png",
      technologies: [
        "JavaScript", 
        "VS Code API", 
        "Node.js", 
        "Regular Expressions", 
        "Language Parsing"
      ],
      categories: ["developer-tools"],
      githubLink: "https://github.com/username/code-beautifier",
      demoLink: "",
      featured: false
    },
    {
      id: 6,
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
      categories: ["machine-learning"],
      githubLink: "https://github.com/sridhs21/TDC-Machine-Learning-Tasks",
      demoLink: "",
      featured: false,
    },
    {
      id: 7,
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
      categories: ["algorithm"],
      githubLink: "",
      demoLink: "",
      featured: false,
    },
    {
      id: 8,
      title: "PartiSim",
      description:
        "Interactive 3D application that visualizes the behavior of atoms, including their subatomic particles (protons, neutrons, electrons), quantum orbitals, and the formation of chemical bonds and molecules.",
      longDescription:
        "PartiSim is an interactive 3D simulation that provides an immersive exploration of atomic behavior. Users can visualize subatomic particles, observe quantum orbital structures, and witness the formation of chemical bonds in real-time. The application serves as an educational tool for understanding fundamental chemistry and physics concepts through interactive visualization.",
      image: "/images/partisim.png",
      technologies: ["Python", "OpenGL", "NumPy", "Physics Simulation", "3D Graphics", "Shader Programming", "Scientific Computing"],
      categories: ["simulation"],
      githubLink: "https://github.com/sridhs21/partisim",
      demoLink: "https://partisim.onrender.com",
      featured: false,
    },
    {
      id: 9,
      title: "Personal Portfolio Website",
      description:
        "Responsive personal website built with React to showcase projects and skills with dark/light mode support.",
      longDescription:
        "A modern, responsive personal portfolio website built with React. Features include dark and light mode, smooth animations, and a clean interface to showcase projects and skills. The site is built with a focus on performance and accessibility.",
      image: "/images/personal_website.png",
      technologies: ["React", "JavaScript", "CSS", "HTML", "Responsive Design"],
      categories: ["web"],
      githubLink: "https://github.com/sridhs21/portfolio",
      demoLink: "https://sridhs21.github.io",
      featured: false,
    }
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === "all" || project.categories.includes(filter);
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
      case "developer-tools":
        return "Developer Tools";
      case "computer-vision":
        return "Computer Vision";
      case "web":
        return "Web Development";
      case "machine-learning":
        return "Machine Learning";
      case "algorithm":
        return "Algorithms & Data Structures";
      case "rare-event-detection":
        return "Rare Event Detection";
      case "simulation":
        return "Simulation";
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
            {["all", "web", "machine-learning", "algorithm", "computer-vision", "developer-tools", "simulation"].map((category) => (
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

                  {/* Category Tags */}
                  <div className="category-tag-container">
                    {project.categories.map((category, index) => (
                      <span key={index} className="category-tag">
                        {getCategoryLabel(category)}
                      </span>
                    ))}
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
                {modalProject.categories.map((category, index) => (
                  <span key={index} className="category-tag">
                    {getCategoryLabel(category)}
                  </span>
                ))}
                {modalProject.featured && (
                  <span className="featured-badge">Featured</span>
                )}
              </div>

              <p className={`modal-description ${themeClass}`}>
                {modalProject.longDescription}
              </p>

              {/* Research Details Section */}
              {modalProject.researchDetails && (
                <div className="research-details-section">
                  <h3 className={`research-details-title ${themeClass}`}>
                    <BookOpen size={20} />
                    Research Details
                  </h3>
                  <div className="research-details-grid">
                    <div className="research-detail-item">
                      <Calendar size={16} />
                      <div>
                        <strong>Timeline:</strong> {modalProject.researchDetails.timeline}
                      </div>
                    </div>
                    <div className="research-detail-item">
                      <Database size={16} />
                      <div>
                        <strong>Dataset:</strong> {modalProject.researchDetails.dataset}
                      </div>
                    </div>
                    <div className="research-detail-item">
                      <Cpu size={16} />
                      <div>
                        <strong>Compute Resources:</strong> {modalProject.researchDetails.computeResources}
                      </div>
                    </div>
                  </div>
                  
                  <div className="research-challenge">
                    <h4 className={`research-subsection-title ${themeClass}`}>Challenge</h4>
                    <p className={`research-detail-text ${themeClass}`}>
                      {modalProject.researchDetails.challenge}
                    </p>
                  </div>

                  <div className="research-approach">
                    <h4 className={`research-subsection-title ${themeClass}`}>Approach</h4>
                    <p className={`research-detail-text ${themeClass}`}>
                      {modalProject.researchDetails.approach}
                    </p>
                  </div>

                  <div className="research-applications">
                    <h4 className={`research-subsection-title ${themeClass}`}>Applications</h4>
                    <div className="application-tags">
                      {modalProject.researchDetails.applications.map((app, index) => (
                        <span key={index} className={`application-tag ${themeClass}`}>
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Publications Section */}
              {modalProject.publications && modalProject.publications.length > 0 && (
                <div className="publications-section">
                  <h3 className={`publications-title ${themeClass}`}>
                    Publications & Presentations
                  </h3>
                  {modalProject.publications.map((pub, index) => (
                    <div key={index} className={`publication-item ${themeClass}`}>
                      <div className="publication-title">{pub.title}</div>
                      <div className="publication-details">
                        <span className={`publication-status ${pub.status.toLowerCase().replace(' ', '-')}`}>
                          {pub.status}
                        </span>
                        <span className={`publication-venue ${themeClass}`}>
                          {pub.venue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

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