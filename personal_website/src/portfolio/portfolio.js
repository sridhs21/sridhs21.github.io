import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useScroll,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ExternalLink,
  Github,
  Search,
  X,
  Calendar,
  Database,
  Cpu,
  BookOpen,
  ArrowUpRight,
  Layers,
  Sparkles,
} from "lucide-react";
import "./portfolio.css";

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1,
    title: "Magnetic Reconnection Classifier",
    description:
      "A machine learning classifier for identifying rare magnetic reconnection events in space weather simulation data using subdomain-focused training and specialized techniques for extreme class imbalance.",
    longDescription:
      "This research project develops a convolutional neural network specifically designed to detect rare magnetic reconnection events in 2D simulation data from the Gkyl analysis code. With reconnection events occurring at only 0.003% of grid points, the system employs a novel subdomain-focused training approach to improve signal-to-noise ratio. The classifier incorporates focal loss functions and class-balancing techniques to handle extreme class imbalance, making it suitable for identifying these critical energy-releasing events that drive space weather phenomena affecting Earth\u2019s magnetosphere, satellites, and power grids. Designed as an educational tool for the NASA Heliophysics Summer School, this work builds foundational techniques for future extension to 3D domains where no inexpensive numerical methods currently exist.",
    image: "/images/magnetic-reconnection.jpg",
    technologies: [
      "Python",
      "PyTorch",
      "NumPy",
      "SciPy",
      "scikit-learn",
      "CNNs",
      "Focal Loss",
      "NVIDIA H100 GPUs",
    ],
    categories: ["machine-learning", "rare-event-detection"],
    githubLink: "https://github.com/SCOREC/reconClassifier",
    demoLink: null,
    featured: true,
    researchDetails: {
      timeline: "10 weeks (Summer 2025)",
      dataset: "150 grids (1024\u00b2 each) with ~5,000 labeled reconnection points",
      challenge: "Extreme class imbalance (0.003% positive cases)",
      approach: "Subdomain-focused training with specialized loss functions",
      applications: [
        "Space Weather Prediction",
        "NASA Heliophysics Education",
        "3D Extension Research",
      ],
      computeResources: "EmpireAI alpha system with NVIDIA H100 GPUs",
    },
  },
  {
    id: 2,
    title: "Fyt\u00f3Spot",
    description:
      "A computer vision-based plant identification and tracking system using multiple detection methods and machine learning for species classification.",
    longDescription:
      "Fyt\u00f3Spot is a plant identification and tracking system that leverages computer vision and machine learning to detect and identify plants from images and video streams. It supports multiple detection methods including color filtering, texture analysis, and contour detection. The system features real-time plant tracking with temporal filtering and detailed species identification using a ResNet-based neural network model. With both web and desktop interfaces, Fyt\u00f3Spot provides a user experience with visualization tools and confidence metrics for plant identification.",
    image: "/images/fytospot.jpg",
    technologies: [
      "Python",
      "OpenCV",
      "PyTorch",
      "Flask",
      "CustomTkinter",
      "NumPy",
      "Machine Learning",
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
    technologies: ["Python", "Flask", "JavaScript", "Leaflet.js", "TensorFlow"],
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
      "Language Parsing",
    ],
    categories: ["developer-tools"],
    githubLink: "https://github.com/username/code-beautifier",
    demoLink: "",
    featured: false,
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
      "This library provides efficient implementations of various graph algorithms, focusing particularly on shortest path problems. It includes optimized versions of Dijkstra\u2019s algorithm, A* search, and Bellman-Ford, along with several utility functions for handling large network datasets. The implementation uses advanced data structures to reduce computational complexity.",
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
      "Interactive 3D application that visualizes the behavior of atoms, including their subatomic particles, quantum orbitals, and the formation of chemical bonds and molecules.",
    longDescription:
      "PartiSim is an interactive 3D simulation that provides an immersive exploration of atomic behavior. Users can visualize subatomic particles, observe quantum orbital structures, and witness the formation of chemical bonds in real-time. The application serves as an educational tool for understanding fundamental chemistry and physics concepts through interactive visualization.",
    image: "/images/partisim.png",
    technologies: [
      "Python",
      "OpenGL",
      "NumPy",
      "Physics Simulation",
      "3D Graphics",
      "Shader Programming",
      "Scientific Computing",
    ],
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
    technologies: [
      "React",
      "JavaScript",
      "CSS",
      "HTML",
      "Responsive Design",
    ],
    categories: ["web"],
    githubLink: "https://github.com/sridhs21/portfolio",
    demoLink: "https://sridhs21.github.io",
    featured: false,
  },
];

const CATEGORIES = [
  "all",
  "web",
  "machine-learning",
  "algorithm",
  "computer-vision",
  "developer-tools",
  "simulation",
];

const CATEGORY_LABELS = {
  all: "All",
  "developer-tools": "Developer Tools",
  "computer-vision": "Computer Vision",
  web: "Web Development",
  "machine-learning": "Machine Learning",
  algorithm: "Algorithms & DS",
  "rare-event-detection": "Rare Event Detection",
  simulation: "Simulation",
};

const getCategoryLabel = (cat) => CATEGORY_LABELS[cat] || cat;

/* ═══════════════════════════════════════════════════
   3-D TILT CARD (useMotionValue → useSpring chain)
   ═══════════════════════════════════════════════════ */
function TiltCard({ children, className, style, onClick, tiltStrength = 4 }) {
  const ref = useRef(null);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  const rawRx = useTransform(spotY, [0, 100], [tiltStrength, -tiltStrength]);
  const rawRy = useTransform(spotX, [0, 100], [-tiltStrength, tiltStrength]);
  const rotateX = useSpring(rawRx, { stiffness: 200, damping: 24 });
  const rotateY = useSpring(rawRy, { stiffness: 200, damping: 24 });

  const spotlight = useMotionTemplate`radial-gradient(
    650px circle at ${spotX}% ${spotY}%,
    rgba(255,255,255,0.045) 0%,
    transparent 65%
  )`;

  const onMove = useCallback(
    (e) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      spotX.set(((e.clientX - r.left) / r.width) * 100);
      spotY.set(((e.clientY - r.top) / r.height) * 100);
    },
    [spotX, spotY]
  );

  const onLeave = useCallback(() => {
    spotX.set(50);
    spotY.set(50);
  }, [spotX, spotY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        ...style,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
    >
      <motion.div className="pf__spotlight" style={{ background: spotlight }} />
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   IMAGE REVEAL  (clip-path wipe on scroll into view)
   ═══════════════════════════════════════════════════ */
function ImageReveal({ src, alt }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="pf__img-wrap">
      <motion.div
        className="pf__img-mask"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="pf__card-image"
          initial={{ scale: 1.15 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SHIMMER SKELETON
   ═══════════════════════════════════════════════════ */
function SkeletonCard({ isFeat }) {
  return (
    <div className={`pf__skeleton ${isFeat ? "pf__skeleton--feat" : ""}`}>
      <div className="pf__sk-img" />
      <div className="pf__sk-body">
        <div className="pf__sk-line pf__sk-line--title" />
        <div className="pf__sk-line pf__sk-line--desc" />
        <div className="pf__sk-line pf__sk-line--desc pf__sk-line--short" />
        <div className="pf__sk-line pf__sk-line--foot" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FEATURED HERO CARD  (parallax image + scale)
   ═══════════════════════════════════════════════════ */
function FeaturedHero({ project, onClick }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="pf__hero-card"
      style={{ scale: cardScale }}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      <div className="pf__hero-visual">
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: imgY }}
        />
        <div className="pf__hero-overlay" />
        <motion.span
          className="pf__hero-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        >
          <Sparkles size={11} />
          Featured
        </motion.span>
      </div>

      <motion.div
        className="pf__hero-info"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        <div className="pf__hero-cats">
          {project.categories.map((cat, ci) => (
            <motion.span
              key={cat}
              className="pf__cat"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 + ci * 0.06 }}
            >
              {getCategoryLabel(cat)}
            </motion.span>
          ))}
        </div>

        <h2 className="pf__hero-title">{project.title}</h2>
        <p className="pf__hero-desc">{project.description}</p>

        <div className="pf__hero-techs">
          {project.technologies.slice(0, 5).map((tech, ti) => (
            <motion.span
              key={tech}
              className="pf__tech"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.45 + ti * 0.04,
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 5 && (
            <span className="pf__tech pf__tech--more">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <motion.span
          className="pf__hero-cta"
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          View Project <ArrowUpRight size={14} />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   PORTFOLIO  (main)
   ═══════════════════════════════════════════════════ */
function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProject, setModalProject] = useState(null);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  /* scroll progress bar */
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
  });

  /* ── filtering ── */
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return PROJECTS.filter((p) => {
      const matchCat = filter === "all" || p.categories.includes(filter);
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [filter, searchQuery]);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  /* ── Stats ── */
  const techCount = useMemo(() => {
    const s = new Set();
    PROJECTS.forEach((p) => p.technologies.forEach((t) => s.add(t)));
    return s.size;
  }, []);

  const catCount = useMemo(() => {
    const s = new Set();
    PROJECTS.forEach((p) => p.categories.forEach((c) => s.add(c)));
    return s.size;
  }, []);

  /* ── modal body-lock + Escape ── */
  useEffect(() => {
    if (!modalProject) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setModalProject(null);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [modalProject]);

  /* title letter animation */
  const titleChars = "portfolio".split("");

  /* ═══════════════════════════════════════
     RENDER
     ═══════════════════════════════════════ */
  return (
    <div className="pf">
      {/* scroll progress */}
      <motion.div
        className="pf__progress"
        style={{ scaleX: progressScaleX }}
      />

      <div className="pf__inner">
        {/* ────── HEADER ────── */}
        <motion.header ref={headerRef} className="pf__header">
          <motion.span
            className="pf__label"
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            selected work
          </motion.span>

          {/* per-letter cascade */}
          <h1 className="pf__title">
            {titleChars.map((ch, i) => (
              <motion.span
                key={i}
                className="pf__title-char"
                initial={{ opacity: 0, y: 55, rotateX: -90 }}
                animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.04 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          {/* stat counters */}
          <motion.div
            className="pf__stats-row"
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <div className="pf__stat-block">
              <span className="pf__stat-num">{PROJECTS.length}</span>
              <span className="pf__stat-lbl">Projects</span>
            </div>
            <span className="pf__stat-sep" />
            <div className="pf__stat-block">
              <Layers size={14} className="pf__stat-icon" />
              <span className="pf__stat-num">{techCount}</span>
              <span className="pf__stat-lbl">Technologies</span>
            </div>
            <span className="pf__stat-sep" />
            <div className="pf__stat-block">
              <span className="pf__stat-num">{catCount}</span>
              <span className="pf__stat-lbl">Domains</span>
            </div>
          </motion.div>
        </motion.header>

        {/* ────── CONTROLS ────── */}
        <motion.div
          className="pf__controls"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          <div className="pf__filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`pf__chip${filter === cat ? " pf__chip--active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                <span className="pf__chip-text">{getCategoryLabel(cat)}</span>
                {filter === cat && (
                  <motion.span
                    className="pf__chip-bg"
                    layoutId="pfFilterPill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="pf__search">
            <Search size={15} className="pf__search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pf__search-input"
            />
            {searchQuery && (
              <motion.button
                className="pf__search-clear"
                onClick={() => setSearchQuery("")}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <X size={13} />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* ────── FEATURED HEROES ────── */}
        {featuredProjects.length > 0 && filter === "all" && !searchQuery && (
          <section className="pf__featured">
            <motion.span
              className="pf__section-label"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="pf__section-line" />
              featured projects
            </motion.span>

            <div className="pf__featured-list">
              {featuredProjects.map((project) => (
                <FeaturedHero
                  key={project.id}
                  project={project}
                  onClick={() => setModalProject(project)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ────── ALL PROJECTS GRID ────── */}
        <section className="pf__all-section">
          {filter === "all" && !searchQuery && (
            <motion.span
              className="pf__section-label"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="pf__section-line" />
              all projects
            </motion.span>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              className="pf__grid"
              key={filter + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
            >
              {(filter !== "all" || searchQuery
                ? filteredProjects
                : regularProjects
              ).length > 0 ? (
                (filter !== "all" || searchQuery
                  ? filteredProjects
                  : regularProjects
                ).map((project, i) => {
                  const row = Math.floor(i / 3);
                  const col = i % 3;

                  return (
                    <motion.div
                      key={project.id}
                      className="pf__card-wrap"
                      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 14,
                        delay: row * 0.06 + col * 0.03,
                        filter: { duration: 0.35 },
                      }}
                    >
                      <TiltCard
                        className="pf__card"
                        onClick={() => setModalProject(project)}
                      >
                        {project.featured && (
                          <span className="pf__badge">
                            <Sparkles size={10} />
                            Featured
                          </span>
                        )}

                        <ImageReveal
                          src={project.image}
                          alt={project.title}
                        />

                        <div className="pf__card-body">
                          <div className="pf__card-head">
                            <h3 className="pf__card-title">
                              {project.title}
                            </h3>
                            <ArrowUpRight
                              size={15}
                              className="pf__card-arrow"
                            />
                          </div>

                          <p className="pf__card-desc">
                            {project.description}
                          </p>

                          <div className="pf__card-cats">
                            {project.categories.map((cat) => (
                              <span key={cat} className="pf__cat">
                                {getCategoryLabel(cat)}
                              </span>
                            ))}
                          </div>

                          <div className="pf__card-techs">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="pf__tech">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="pf__tech pf__tech--more">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  className="pf__empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3>No projects found</h3>
                  <p>Try adjusting your search or filter settings</p>
                  <motion.button
                    className="pf__reset"
                    onClick={() => {
                      setFilter("all");
                      setSearchQuery("");
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Reset Filters
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      {/* ────── MODAL ────── */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            className="pf__modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setModalProject(null)}
          >
            <motion.div
              className="pf__modal"
              initial={{ opacity: 0, scale: 0.92, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 50 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 26,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="pf__modal-close"
                onClick={() => setModalProject(null)}
              >
                <X size={18} />
              </button>

              {/* hero image with parallax-able container */}
              <div className="pf__modal-img">
                <motion.img
                  src={modalProject.image}
                  alt={modalProject.title}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <div className="pf__modal-body">
                <motion.h2
                  className="pf__modal-title"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  {modalProject.title}
                </motion.h2>

                {/* tags */}
                <motion.div
                  className="pf__modal-tags"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {modalProject.categories.map((cat) => (
                    <span key={cat} className="pf__cat">
                      {getCategoryLabel(cat)}
                    </span>
                  ))}
                  {modalProject.featured && (
                    <span className="pf__badge pf__badge--inline">
                      <Sparkles size={10} />
                      Featured
                    </span>
                  )}
                </motion.div>

                <motion.p
                  className="pf__modal-desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {modalProject.longDescription}
                </motion.p>

                {/* Research Details */}
                {modalProject.researchDetails && (
                  <motion.div
                    className="pf__research"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                  >
                    <h3 className="pf__research-title">
                      <BookOpen size={18} />
                      Research Details
                    </h3>
                    <div className="pf__research-grid">
                      <div className="pf__research-item">
                        <Calendar size={14} />
                        <div>
                          <strong>Timeline:</strong>{" "}
                          {modalProject.researchDetails.timeline}
                        </div>
                      </div>
                      <div className="pf__research-item">
                        <Database size={14} />
                        <div>
                          <strong>Dataset:</strong>{" "}
                          {modalProject.researchDetails.dataset}
                        </div>
                      </div>
                      <div className="pf__research-item">
                        <Cpu size={14} />
                        <div>
                          <strong>Compute:</strong>{" "}
                          {modalProject.researchDetails.computeResources}
                        </div>
                      </div>
                    </div>

                    <div className="pf__research-section">
                      <h4>Challenge</h4>
                      <p>{modalProject.researchDetails.challenge}</p>
                    </div>
                    <div className="pf__research-section">
                      <h4>Approach</h4>
                      <p>{modalProject.researchDetails.approach}</p>
                    </div>
                    <div className="pf__research-section">
                      <h4>Applications</h4>
                      <div className="pf__app-tags">
                        {modalProject.researchDetails.applications.map(
                          (app, ai) => (
                            <motion.span
                              key={app}
                              className="pf__app-tag"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 0.35 + ai * 0.05,
                                type: "spring",
                                stiffness: 260,
                                damping: 18,
                              }}
                            >
                              {app}
                            </motion.span>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Technologies */}
                <div className="pf__modal-techs">
                  <h3>Technologies</h3>
                  <div className="pf__modal-tech-list">
                    {modalProject.technologies.map((tech, ti) => (
                      <motion.span
                        key={tech}
                        className="pf__tech"
                        initial={{ opacity: 0, y: 6, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.3 + ti * 0.03,
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="pf__modal-links">
                  {modalProject.githubLink && (
                    <motion.a
                      href={modalProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf__link pf__link--gh"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      <Github size={16} /> GitHub
                    </motion.a>
                  )}
                  {modalProject.demoLink && (
                    <motion.a
                      href={modalProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf__link pf__link--demo"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      <ExternalLink size={16} /> Live Demo
                      <ArrowUpRight size={13} />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Portfolio;
