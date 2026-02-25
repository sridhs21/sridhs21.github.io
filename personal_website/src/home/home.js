import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useScroll,
  useInView,
  animate,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Server,
  Layout,
  Database,
  Terminal,
  Cloud,
  Brain,
  MapPin,
  Sparkles,
  Compass,
  Pencil,
  Hammer,
  CheckCircle,
} from "lucide-react";
import "./home.css";

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */
const ROLES = [
  "Machine Learning Engineer",
  "Data Analyst",
  "AI Developer",
  "Data Scientist",
];

const SKILLS = [
  {
    id: "ml",
    icon: <Brain size={17} />,
    title: "Machine Learning & AI",
    desc: "Developing AI models for data analysis, prediction, and optimization with a focus on practical applications.",
    tech: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "CatBoost", "XGBoost", "OpenCV"],
  },
  {
    id: "frontend",
    icon: <Layout size={17} />,
    title: "Frontend Development",
    desc: "Creating responsive and intuitive user interfaces using modern web technologies.",
    tech: ["React.js", "JavaScript", "TypeScript", "HTML5/CSS3", "Bootstrap", "TailwindCSS", "Next.js"],
  },
  {
    id: "backend",
    icon: <Server size={17} />,
    title: "Backend & APIs",
    desc: "Building robust server-side applications with a focus on performance, security, and scalability.",
    tech: ["Python", "Flask", "Node.js", "REST APIs", "Java", "PHP", "MongoDB", "MySQL"],
  },
  {
    id: "programming",
    icon: <Terminal size={17} />,
    title: "Programming Languages",
    desc: "Proficient in multiple programming paradigms and languages for software development.",
    tech: ["Python", "Java", "C/C++", "JavaScript", "Assembly", "Haskell", "Erlang", "Prolog"],
  },
  {
    id: "data",
    icon: <Database size={17} />,
    title: "Data Science & Analytics",
    desc: "Working with data storage, analysis, and visualization to extract meaningful insights.",
    tech: ["SQL", "MongoDB", "Data Analysis", "Pandas", "Matplotlib", "Seaborn"],
  },
  {
    id: "cloud",
    icon: <Cloud size={17} />,
    title: "Cloud & DevOps",
    desc: "Leveraging cloud platforms and development operations for efficient deployment and scaling.",
    tech: ["Microsoft Azure", "Git", "GitHub", "CI/CD", "Heroku", "Agile/Scrum"],
  },
];

const PROJECTS = [
  {
    title: "Fyt\u00f3Spot",
    desc: "A computer vision-based plant identification and tracking system using multiple detection methods and ML for species classification.",
    image: "/images/fytospot.jpg",
    tags: ["Python", "OpenCV", "PyTorch", "Flask", "ML"],
  },
  {
    title: "PetCare Vet Finder",
    desc: "A veterinary search platform helping pet owners find the perfect vet based on location, pet type, and specialized care.",
    image: "/images/PCVF.png",
    tags: ["Python", "Flask", "JavaScript", "NLTK", "pandas"],
  },
];

const TECH_MARQUEE = [
  "Python", "PyTorch", "TensorFlow", "React", "Node.js", "Flask",
  "OpenCV", "Pandas", "SQL", "Azure", "TypeScript", "Java", "C++",
  "MongoDB", "XGBoost",
];

const VALUE_PILLARS = [
  {
    id: "ai-systems",
    icon: <Brain size={20} />,
    title: "Applied AI Systems",
    desc: "From data preprocessing to deployment, I build end-to-end ML systems that are practical, measurable, and production-minded.",
  },
  {
    id: "fullstack",
    icon: <Layout size={20} />,
    title: "Product-Focused Full Stack",
    desc: "I design and ship clean user experiences with robust APIs, making technical depth usable for real users.",
  },
  {
    id: "infra",
    icon: <Cloud size={20} />,
    title: "Scalable Engineering",
    desc: "I prioritize maintainability, performance, and deployment discipline so projects stay reliable as they grow.",
  },
];

const BUILD_PROCESS = [
  { step: "01", title: "Discover", icon: <Compass size={18} />, desc: "Clarify goals, constraints, and success metrics so the solution is scoped to deliver impact quickly." },
  { step: "02", title: "Design", icon: <Pencil size={18} />, desc: "Define architecture, data flow, and model or product strategy before implementation starts." },
  { step: "03", title: "Build", icon: <Hammer size={18} />, desc: "Implement iteratively with a focus on correctness, observability, and clean interfaces." },
  { step: "04", title: "Validate", icon: <CheckCircle size={18} />, desc: "Benchmark quality, test reliability, and refine UX to ensure the final output is genuinely usable." },
];

const IMPACT_METRICS = [
  { value: 15,  suffix: "+", label: "Technologies",  detail: "Across AI, engineering & cloud" },
  { value: 10,  suffix: "+", label: "Projects",      detail: "ML, research & full-stack" },
  { value: 4,   suffix: "+", label: "Core Roles",    detail: "ML · CV · AI · Data" },
  { value: 100, suffix: "%", label: "Ownership",     detail: "Ideation to deployment" },
];

const CURRENT_FOCUS = [
  "Production-ready computer vision pipelines",
  "Practical LLM and AI tooling for developer workflows",
  "Data-centric model evaluation and performance tuning",
  "Scalable full-stack apps with measurable user outcomes",
];

/* ═══════════════════════════════════════════════════
   SHARED ANIMATION HELPERS
   ═══════════════════════════════════════════════════ */
const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger = (d = 0.08, cd = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: d, delayChildren: cd } },
});

/* ═══════════════════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════════════════ */
function Typewriter({ words }) {
  const idx = useRef(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDel(true); }, 2200);
      return () => clearTimeout(t);
    }
    const word = words[idx.current];
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setPaused(true);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); idx.current = (idx.current + 1) % words.length; }
      }
    }, del ? 40 : 90);
    return () => clearTimeout(t);
  }, [text, del, paused, words]);

  return <>{text}<span className="hm__tw-cursor" /></>;
}

/* ═══════════════════════════════════════════════════
   MAGNETIC PORTRAIT (hero only)
   ═══════════════════════════════════════════════════ */
function MagneticPortrait({ src, alt }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${spotX}% ${spotY}%, rgba(201,168,76,0.08), transparent 70%)`;

  const handleMouse = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(px - 0.5); y.set(py - 0.5);
    spotX.set(px * 100); spotY.set(py * 100);
  };
  const handleLeave = () => { x.set(0); y.set(0); spotX.set(50); spotY.set(50); };

  return (
    <motion.div ref={ref} className="hm__portrait-3d" onMouseMove={handleMouse} onMouseLeave={handleLeave}
      style={{ rotateX: springRX, rotateY: springRY, transformStyle: "preserve-3d" }}>
      <motion.div className="hm__portrait-spot" style={{ background: spotlight }} />
      <div className="hm__portrait"><img src={src} alt={alt} /></div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════════════════ */
function Marquee({ items }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="hm__marquee-wrap">
      <div className="hm__marquee">
        <div className="hm__marquee-track">
          {tripled.map((item, i) => <span key={i} className="hm__marquee-item">{item}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   COUNTER
   ═══════════════════════════════════════════════════ */
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, value, { duration: 1.4, ease, onUpdate: (v) => setDisplay(Math.round(v)) });
    return ctrl.stop;
  }, [inView, value]);

  return <span ref={ref}>{display}<span className="ns__stat-suffix">{suffix}</span></span>;
}

/* ═══════════════════════════════════════════════════
   REVEAL WRAPPER — triggers children on scroll
   ═══════════════════════════════════════════════════ */
function Reveal({ children, className = "", delay = 0.08 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger(delay)}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION LABEL
   ═══════════════════════════════════════════════════ */
function SectionLabel({ text, num }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className="ns__label-row" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease }}>
      <span className="ns__label-num">{num}</span>
      <motion.span className="ns__label-line" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.7, ease, delay: 0.15 }} />
      <span className="ns__label-text">{text}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   TILT CARD — 3D tilt + radial glow on mouse
   ═══════════════════════════════════════════════════ */
function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const sx = useMotionValue(50);
  const sy = useMotionValue(50);
  const rx = useSpring(useTransform(sy, [0, 100], [4, -4]), { stiffness: 200, damping: 24 });
  const ry = useSpring(useTransform(sx, [0, 100], [-4, 4]), { stiffness: 200, damping: 24 });
  const glow = useMotionTemplate`radial-gradient(500px circle at ${sx}% ${sy}%, rgba(201,168,76,0.045), transparent 65%)`;

  const move = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    sx.set(((e.clientX - r.left) / r.width) * 100);
    sy.set(((e.clientY - r.top) / r.height) * 100);
  }, [sx, sy]);

  const leave = useCallback(() => { sx.set(50); sy.set(50); }, [sx, sy]);

  return (
    <motion.div ref={ref} className={`ns__tilt ${className}`} onMouseMove={move} onMouseLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
      <motion.div className="ns__glow" style={{ background: glow }} />
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   IMAGE REVEAL
   ═══════════════════════════════════════════════════ */
function ImageReveal({ src, alt }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <motion.div style={{ width: "100%", height: "100%", overflow: "hidden" }}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
        <img src={src} alt={alt} className="ns__proj-img" />
      </motion.div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════
   ██  HOME COMPONENT  ██
   ═══════════════════════════════════════════════════ */
function Home() {
  /* ── hero parallax ── */
  const heroRef = useRef(null);
  const heroScroll = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroNameY = useTransform(heroScroll.scrollYProgress, [0, 0.5], ["0%", "-12%"]);
  const heroNameOp = useTransform(heroScroll.scrollYProgress, [0, 0.45], [1, 0]);
  const portraitY = useTransform(heroScroll.scrollYProgress, [0, 0.6], ["0%", "-8%"]);
  const portraitOp = useTransform(heroScroll.scrollYProgress, [0, 0.5], [1, 0]);
  const scrollFade = useTransform(heroScroll.scrollYProgress, [0, 0.12], [1, 0]);
  const globalScroll = useScroll();
  const scaleX = useSpring(globalScroll.scrollYProgress, { stiffness: 60, damping: 30 });

  return (
    <div className="hm">
      <motion.div className="hm__progress" style={{ scaleX }} />

      <div className="hm__inner">

        {/* ══════════════════ HERO (kept intact) ══════════════════ */}
        <section ref={heroRef} className="hm__hero">
          <div className="hm__hero-grid">
            <motion.div className="hm__hero-left" style={{ y: heroNameY, opacity: heroNameOp }}>
              
              {/* 1. Primary Name (Kept exact same font/style) */}
              <motion.h1 className="hm__name" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1, ease }}>
                <span className="hm__name-first">Swaroop&nbsp;</span><span className="hm__name-last">Sridhar</span>
              </motion.h1>
              
              {/* 2. Prominent Typing Text */}
              <motion.div className="hm__dynamic-role" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.35, ease }}>
                <Typewriter words={ROLES} />
              </motion.div>
              
              {/* 3. Refined Bio Paragraph */}
              <motion.p className="hm__bio-modern" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <span className="hm__bio-highlight">CS & ITWS Dual Major concentrating in Machine Learning.</span> Building intelligent systems that learn, adapt, and solve.
              </motion.p>
              
              {/* 4. Streamlined CTAs */}
              <motion.div className="hm__ctas" initial="hidden" animate="show" variants={stagger(0.1, 0.6)}>
                <motion.a
                  href="/files/Swaroop_Sridhar_Resume.pdf"
                  className="hm__btn hm__btn--primary hm__btn--lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  Resume <ArrowUpRight size={14} />
                </motion.a>
                <motion.a
                  href="/files/SwaroopSridhar_CV.pdf"
                  className="hm__btn hm__btn--ghost hm__btn--lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  Curriculum Vitae
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div className="hm__hero-right" style={{ y: portraitY, opacity: portraitOp }}>
              <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.3, ease }}>
                <MagneticPortrait src="/images/profile4.png" alt="Swaroop Sridhar" />
              </motion.div>
              <motion.div className="hm__details" initial="hidden" animate="show" variants={stagger(0.1, 0.62)}>
                {[
                  { dot: true, content: "Available" },
                  { icon: <MapPin size={10} />, content: "Troy, NY" },
                  { icon: <Sparkles size={10} />, content: "ML · AI · CV" },
                ].map(({ dot, icon, content }, i) => (
                  <motion.span key={i} className="hm__detail" variants={fadeUp}>
                    {dot ? <span className="hm__detail-dot hm__detail-dot--pulse" /> : icon}{content}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div className="hm__scroll" style={{ opacity: scrollFade }}>
            <motion.div className="hm__scroll-line" initial={{ height: 0 }} animate={{ height: 48 }} transition={{ duration: 0.9, delay: 1.1 }} />
            <span className="hm__scroll-label">Scroll</span>
          </motion.div>
        </section>

        {/* ══════════════════ MARQUEE ══════════════════ */}
        <Marquee items={TECH_MARQUEE} />


        {/* ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            EVERYTHING BELOW IS BRAND NEW — "ns__" prefix
           ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */}

        {/* ══════════════════ SKILLS ══════════════════ */}
        <section className="ns__section">
          <SectionLabel num="01" text="Skills & Technologies" />
          <Reveal className="ns__skills-grid" delay={0.07}>
            {SKILLS.map((skill, i) => (
              <motion.div key={skill.id} variants={fadeUp}>
                <Tilt className="ns__skill-card">
                  <div className="ns__skill-content">
                    <div className="ns__skill-top">
                      <span className="ns__skill-icon">{skill.icon}</span>
                      <span className="ns__skill-idx">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="ns__skill-title">{skill.title}</h3>
                    <p className="ns__skill-desc">{skill.desc}</p>
                    <div className="ns__skill-chips">
                      {skill.tech.map((t) => <span key={t} className="ns__chip">{t}</span>)}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </Reveal>
        </section>

        {/* ══════════════════ PILLARS ══════════════════ */}
        <section className="ns__section">
          <SectionLabel num="02" text="Why Work With Me" />
          <Reveal className="ns__pillars" delay={0.12}>
            {VALUE_PILLARS.map((p) => (
              <motion.div key={p.id} className="ns__pillar" variants={fadeUp}>
                <div className="ns__pillar-icon-wrap">
                  <motion.span className="ns__pillar-icon" whileHover={{ scale: 1.15, rotate: -8 }} transition={{ type: "spring", stiffness: 280, damping: 16 }}>
                    {p.icon}
                  </motion.span>
                </div>
                <div className="ns__pillar-body">
                  <h3 className="ns__pillar-title">{p.title}</h3>
                  <p className="ns__pillar-desc">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </Reveal>
        </section>

        {/* ══════════════════ PROCESS ══════════════════ */}
        <section className="ns__section">
          <SectionLabel num="03" text="Build Process" />
          <Reveal className="ns__process" delay={0.1}>
            {BUILD_PROCESS.map((item, i) => (
              <motion.div key={i} className="ns__step" variants={fadeUp}>
                <div className="ns__step-connector">
                  <span className="ns__step-dot" />
                  {i < BUILD_PROCESS.length - 1 && <span className="ns__step-line" />}
                </div>
                <div className="ns__step-card">
                  <div className="ns__step-header">
                    <span className="ns__step-icon">{item.icon}</span>
                    <span className="ns__step-num">{item.step}</span>
                  </div>
                  <h4 className="ns__step-title">{item.title}</h4>
                  <p className="ns__step-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </Reveal>
        </section>

        {/* ══════════════════ PROJECTS ══════════════════ */}
        <section className="ns__section">
          <SectionLabel num="04" text="Featured Work" />
          <div className="ns__projects">
            {PROJECTS.map((project, i) => (
              <motion.div key={i} className={`ns__proj ${i % 2 !== 0 ? "ns__proj--flip" : ""}`}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: i * 0.12, ease }}>
                <div className="ns__proj-visual">
                  <ImageReveal src={project.image} alt={project.title} />
                  <div className="ns__proj-overlay" />
                  <motion.span className="ns__proj-badge" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                    Featured
                  </motion.span>
                </div>
                <div className="ns__proj-info">
                  <span className="ns__proj-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="ns__proj-title">{project.title}</h3>
                  <p className="ns__proj-desc">{project.desc}</p>
                  <div className="ns__proj-tags">
                    {project.tags.map((t) => <span key={t} className="ns__chip">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="ns__center" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.a href="/projects" className="hm__btn hm__btn--ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              View All Projects <ArrowUpRight size={13} />
            </motion.a>
          </motion.div>
        </section>

        {/* ══════════════════ STATS ══════════════════ */}
        <section className="ns__section">
          <SectionLabel num="05" text="Snapshot Metrics" />
          <Reveal className="ns__stats" delay={0.1}>
            {IMPACT_METRICS.map((m, i) => (
              <motion.div key={i} className="ns__stat" variants={fadeUp}>
                <div className="ns__stat-value"><Counter value={m.value} suffix={m.suffix} /></div>
                <div className="ns__stat-label">{m.label}</div>
                <div className="ns__stat-detail">{m.detail}</div>
              </motion.div>
            ))}
          </Reveal>
        </section>

        {/* ══════════════════ FOCUS ══════════════════ */}
        <section className="ns__section">
          <SectionLabel num="06" text="Current Focus" />
          <Reveal className="ns__focus" delay={0.08}>
            {CURRENT_FOCUS.map((item, i) => (
              <motion.div key={i} className="ns__focus-item" variants={fadeUp}>
                <span className="ns__focus-idx">{String(i + 1).padStart(2, "0")}</span>
                <ArrowRight size={13} className="ns__focus-arrow" />
                <span className="ns__focus-text">{item}</span>
              </motion.div>
            ))}
          </Reveal>
        </section>

        {/* ══════════════════ CTA ══════════════════ */}
        <section className="ns__section ns__cta-section">
          <motion.h2 className="ns__cta-title" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }}>
            Let's build something intelligent.
          </motion.h2>
          <motion.a href="/contact" className="hm__btn hm__btn--primary hm__btn--lg"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            Get in Touch <ArrowUpRight size={14} />
          </motion.a>
        </section>

      </div>
    </div>
  );
}

export default Home;