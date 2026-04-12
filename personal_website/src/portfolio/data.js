/* ═══════════════════════════════════════════════════
   Portfolio project data + category labels
   ═══════════════════════════════════════════════════ */

export const PROJECTS = [
  {
    id: 1,
    title: "Magnetic Reconnection Classifier",
    description:
      "CNN that finds magnetic reconnection events in space weather simulations. The positive class is 0.003% of the data so standard training just says no to everything.",
    longDescription:
      "Built a CNN to detect magnetic reconnection events in 2D simulation data from the Gkyl framework. Reconnection happens at roughly 0.003% of grid points, so if you train normally the model just predicts 'no' every time and says it's 99.997% accurate. I used subdomain focused training to boost the signal to noise ratio and focal loss to make the model actually pay attention to the rare positives. Processes 150 grids at 1024\u00b2 resolution each; trained on NVIDIA H100 GPUs through the EmpireAI cluster. Built this for the NASA Heliophysics Summer School as a starting point for extending to 3D.",
    technologies: [
      "Python", "PyTorch", "NumPy", "SciPy", "scikit-learn",
      "CNNs", "Focal Loss", "NVIDIA H100 GPUs",
    ],
    categories: ["machine-learning"],
    githubLink: "https://github.com/SCOREC/reconClassifier",
    demoLink: null,
  },
  {
    id: 2,
    title: "Fyt\u00f3Spot",
    description:
      "Point your camera at a plant and it tells you what species it is. Color filtering, contour detection, and a ResNet classifier. Runs on web and desktop.",
    longDescription:
      "Fyt\u00f3Spot detects and identifies plants from images and video streams. I built a few different detection approaches; color filtering, texture analysis, contour detection, then a ResNet neural network for species classification. It tracks plants across video frames with temporal filtering so it doesn't freak out when the camera shakes. Ships as both a Flask web app and a CustomTkinter desktop app, and it shows confidence scores so you know when the model is just guessing.",
    technologies: [
      "Python", "OpenCV", "PyTorch", "Flask",
      "CustomTkinter", "NumPy", "Machine Learning",
    ],
    categories: ["computer-vision", "machine-learning"],
    githubLink: "https://github.com/sridhs21/fytospot",
    demoLink: "https://fytospot.onrender.com",
  },
  {
    id: 3,
    title: "PetCare Vet Finder",
    description:
      "Search engine for vets. Filters by pet type, specialty, location, and uses NLP on reviews to pull out what actually matters instead of just star ratings.",
    longDescription:
      "Flask web app that aggregates vet clinic data and lets pet owners search by what they actually care about; species, specialty, distance, price. The interesting part is the NLP layer. It processes reviews with NLTK to extract relevant sentiment and match recommendations to each search query instead of just showing star ratings. Frontend has interactive filtering and detailed clinic profiles that explain why each result was surfaced.",
    technologies: [
      "Python", "Flask", "JavaScript", "Bootstrap",
      "NLTK", "pandas", "API Integration",
    ],
    categories: ["web"],
    githubLink: "https://github.com/sridhs21/PCVF",
    demoLink: "https://petcare-vet-finder.onrender.com",
  },
  {
    id: 4,
    title: "RPI Campus Availability App",
    description:
      "Campus parking tracker. Shows real time availability and predicts open spots using ML trained on historical patterns.",
    longDescription:
      "Built this because parking at RPI is genuinely terrible. The app pulls real time data and uses ML trained on historical patterns to predict which lots will have spots open. You can check before you leave instead of circling for 20 minutes. Frontend is a Leaflet.js map overlay and the prediction model runs on TensorFlow.",
    technologies: ["Python", "Flask", "JavaScript", "Leaflet.js", "TensorFlow"],
    categories: ["web"],
    githubLink: "https://github.com/sridhs21/parkingavailabilityapp",
    demoLink: "",
  },
  {
    id: 5,
    title: "Modelex",
    description:
      "VS Code extension that auto formats code across 8+ languages. Indentation, spacing, comment cleanup.",
    longDescription:
      "Built this because I got tired of inconsistent formatting across different files in the same project. Supports JavaScript, TypeScript, Python, Java, C/C++, HTML, CSS, and JSON. It applies language specific indentation, spacing, and comment formatting rules. Strips excess whitespace and standardizes syntax patterns without breaking the actual logic.",
    technologies: [
      "JavaScript", "VS Code API", "Node.js",
      "Regular Expressions", "Language Parsing",
    ],
    categories: ["developer-tools"],
    githubLink: "https://github.com/username/code-beautifier",
    demoLink: "",
  },
  {
    id: 6,
    title: "AI-Driven Drug Discovery",
    description:
      "ML models that predict how drug molecules interact with target proteins. Ran them on Therapeutics Data Commons benchmarks.",
    longDescription:
      "Trained models on molecular structure datasets to predict drug protein interactions; basically asking 'will this molecule bind to that target?' Used RDKit for molecular featurization and PyTorch/Scikit-learn for the prediction pipeline. Applied to TDC benchmark tasks, which are standardized challenges used in computational pharma research.",
    technologies: [
      "Python", "PyTorch", "Scikit-learn",
      "Pandas", "RDKit", "Molecular Visualization",
    ],
    categories: ["machine-learning"],
    githubLink: "https://github.com/sridhs21/TDC-Machine-Learning-Tasks",
    demoLink: "",
  },
  {
    id: 7,
    title: "ADT Graph Algorithms Library",
    description:
      "Graph algorithms library in Java. Dijkstra, A*, Bellman Ford; all built around an ADT inheritance hierarchy.",
    longDescription:
      "Java library focused on shortest path algorithms. Dijkstra's, A*, and Bellman Ford with an ADT based inheritance hierarchy to keep things organized. The implementations use priority queues and adjacency structures tuned for performance on larger network datasets. Also has utility functions for graph I/O and visualization through JavaFX.",
    technologies: [
      "Java", "JavaFX", "Data Structures",
      "Algorithms", "Graph Theory",
    ],
    categories: ["algorithm"],
    githubLink: "",
    demoLink: "",
  },
  {
    id: 8,
    title: "PartiSim",
    description:
      "3D particle simulator. Atoms, quantum orbitals, chemical bonds forming in real time. OpenGL and Python.",
    longDescription:
      "PartiSim renders atoms and their subatomic particles in 3D so you can watch quantum orbitals take shape and chemical bonds form in real time. Built it as an educational tool; the idea was to make abstract physics and chemistry concepts feel tangible by letting people interact with them directly. OpenGL for rendering with custom shaders, NumPy for the physics calculations.",
    technologies: [
      "Python", "OpenGL", "NumPy", "Physics Simulation",
      "3D Graphics", "Shader Programming", "Scientific Computing",
    ],
    categories: ["simulation"],
    githubLink: "https://github.com/sridhs21/partisim",
    demoLink: "https://partisim.onrender.com",
  },
  {
    id: 9,
    title: "Personal Portfolio Website",
    description:
      "This website. React, Framer Motion, and a lot of CSS. You're looking at it.",
    longDescription:
      "The site you're on right now. React and Framer Motion for animations, plain CSS for everything else. No Tailwind, no component library. Monochrome with minimal color. Deployed on GitHub Pages. Built it to represent myself honestly, not to pretend I'm a frontend developer.",
    technologies: [
      "React", "JavaScript", "CSS", "HTML", "Responsive Design",
    ],
    categories: ["web"],
    githubLink: "https://github.com/sridhs21/portfolio",
    demoLink: "https://sridhs21.github.io",
  },
];

export const CATEGORIES = [
  "all",
  "machine-learning",
  "computer-vision",
  "web",
  "algorithm",
  "developer-tools",
  "simulation",
];

export const CATEGORY_LABELS = {
  all: "All",
  "developer-tools": "Dev Tools",
  "computer-vision": "Computer Vision",
  web: "Web",
  "machine-learning": "ML",
  algorithm: "Algorithms",
  simulation: "Simulation",
};

export const getCategoryLabel = (cat) => CATEGORY_LABELS[cat] || cat;
