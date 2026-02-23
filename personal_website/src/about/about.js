import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  School,
  MapPin,
  Award,
  Code2,
  Calendar,
  ChevronDown,
} from "lucide-react";
import "./about.css";

/* ─────────────────────────────────────────────
   Magnetic Portrait — 3-D tilt + cursor spotlight
   ───────────────────────────────────────────── */
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

  function handleMouse(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    spotX.set(px * 100);
    spotY.set(py * 100);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    spotX.set(50);
    spotY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      className="ab__portrait-3d"
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="ab__portrait-spotlight"
        style={{ background: spotlight }}
      />
      <motion.div
        className="ab__portrait"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/images/about.jpg" alt={alt} />
      </motion.div>

      {/* decorative accent bars */}
      <motion.div
        className="ab__portrait-deco ab__portrait-deco--top"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      />
      <motion.div
        className="ab__portrait-deco ab__portrait-deco--bottom"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   AnimatedCounter — ease-out count-up
   ───────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);
  const numericValue = parseInt(value, 10);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(numericValue * eased));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, numericValue]);

  return (
    <span ref={ref} className="ab__stat-num">
      {display}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   TextReveal — blur-slide entrance per block
   ───────────────────────────────────────────── */
function TextReveal({ children, delay = 0 }) {
  return (
    <motion.div
      className="ab__text-reveal"
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SectionDivider — animated line
   ───────────────────────────────────────────── */
function SectionDivider() {
  return (
    <motion.div
      className="ab__divider"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

/* ─────────────────────────────────────────────
   EduPanel — immersive 3-D glass education card
   ───────────────────────────────────────────── */
function EduPanel({ item, index, isExpanded, onToggle }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], [3, -3]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-3, 3]);
  const sRX = useSpring(rotX, { stiffness: 120, damping: 25 });
  const sRY = useSpring(rotY, { stiffness: 120, damping: 25 });

  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);
  const spot = useMotionTemplate`radial-gradient(550px circle at ${cursorX}% ${cursorY}%, rgba(201,168,76,0.07), transparent 60%)`;

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
    cursorX.set(px * 100);
    cursorY.set(py * 100);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
    cursorX.set(50);
    cursorY.set(50);
  }

  /* derive short year for watermark e.g. "'22 – '26" */
  const years = item.year.match(/\d{4}/g) || [];
  const shortYear = years.map((y) => "'" + y.slice(-2)).join(" – ");

  return (
    <motion.div
      ref={ref}
      className="ab__panel"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sRX, rotateY: sRY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* cursor spotlight */}
      <motion.div className="ab__panel-spot" style={{ background: spot }} />

      {/* animated border glow on hover */}
      <div className="ab__panel-glow" />

      {/* watermark year */}
      <motion.span
        className="ab__panel-watermark"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.3 + index * 0.2,
          duration: 0.9,
          ease: "easeOut",
        }}
      >
        {shortYear}
      </motion.span>

      {/* ── Main content ── */}
      <div className="ab__panel-body">
        {/* Head: logo + meta + year badge */}
        <div className="ab__panel-head">
          <motion.div
            className="ab__panel-logo"
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img
              src={item.logo}
              alt={`${item.school} logo`}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="ab__panel-icon-fb">
              {item.type === "university" ? (
                <GraduationCap size={24} />
              ) : (
                <School size={24} />
              )}
            </div>
          </motion.div>

          <div className="ab__panel-meta">
            {/* status beacon */}
            <div className="ab__panel-status">
              <span
                className={`ab__beacon${item.active ? " ab__beacon--live" : ""}`}
              />
              <span className="ab__beacon-label">
                {item.active ? "In Progress" : "Completed"}
              </span>
            </div>

            <h3 className="ab__panel-degree">{item.degree}</h3>

            <h4 className="ab__panel-school">
              {item.school}
              {item.department && (
                <span className="ab__panel-dept"> — {item.department}</span>
              )}
            </h4>

            {item.concentration && (
              <motion.span
                className="ab__panel-conc"
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "auto" }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
              >
                <Code2 size={11} /> {item.concentration}
              </motion.span>
            )}

            <span className="ab__panel-loc">
              <MapPin size={11} /> {item.location}
            </span>
          </div>

          <div className="ab__panel-year-badge">
            <Calendar size={12} />
            <span>{item.year}</span>
          </div>
        </div>

        {/* Honors + toggle row */}
        <div className="ab__panel-actions">
          {item.honors && (
            <motion.div
              className="ab__panel-honors"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.2 }}
            >
              <Award size={14} />
              <span>{item.honors}</span>
            </motion.div>
          )}

          <motion.button
            className="ab__panel-toggle"
            onClick={onToggle}
            whileHover={{ color: "#f0f0f0" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{isExpanded ? "Hide Details" : "View Courses"}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ display: "inline-flex" }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </motion.button>
        </div>

        {/* Expandable course pills */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="ab__panel-courses"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="ab__panel-courses-inner">
                {item.courses.map((course, i) => (
                  <motion.span
                    key={i}
                    className="ab__pill"
                    initial={{ opacity: 0, scale: 0.7, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      delay: i * 0.04,
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    whileHover={{
                      y: -2,
                      borderColor: "rgba(201, 168, 76, 0.3)",
                      color: "#f0f0f0",
                      transition: { duration: 0.15 },
                    }}
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════
   About Page
   ═════════════════════════════════════════════ */
function About() {
  const [expandedCard, setExpandedCard] = useState(null);

  /* data */
  const education = [
    {
      type: "university",
      active: true,
      year: "2022 - 2026",
      degree:
        "Bachelor of Science in Computer Science and Information Technology and Web Science",
      concentration: "Machine Learning",
      school: "Rensselaer Polytechnic Institute",
      department: "School of Science",
      location: "Troy, NY",
      logo: "/images/rpi_logo.png",
      honors: "Dean's List - Fall 2024",
      courses: [
        "Data Structures",
        "Intro to Algorithms",
        "Operating Systems",
        "Principles of Software",
        "ML & Optimization",
        "AI For Science",
      ],
    },
    {
      type: "highschool",
      active: false,
      year: "2013 - 2022",
      degree: "High School Diploma",
      school: "Academy for Science and Design",
      location: "Nashua, NH",
      logo: "/images/asd_logo.png",
      courses: [
        "Advanced CS (Java/C++)",
        "Advanced Calculus 1",
        "Advanced Calculus 2",
        "Physics 1",
      ],
    },
  ];

  const stats = [
    { value: 5, suffix: "+", label: "Languages", sub: "Programming & Markup" },
    { value: 3, suffix: "+", label: "Projects", sub: "Completed" },
    { value: 2026, suffix: "", label: "Graduation", sub: "Expected" },
  ];

  const titleText = "about";

  return (
    <div className="ab">
      <div className="ab__inner">
        {/* ── Header ── */}
        <header className="ab__header">
          <motion.span
            className="ab__label"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            background
          </motion.span>

          <h1 className="ab__title" aria-label={titleText}>
            {titleText.split("").map((char, i) => (
              <motion.span
                key={i}
                className="ab__title-char"
                initial={{ opacity: 0, rotateX: -90, y: 40 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className="ab__header-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </header>

        {/* ── Bio Section ── */}
        <section className="ab__bio">
          <div className="ab__bio-grid">
            {/* Portrait */}
            <div className="ab__portrait-wrap">
              <MagneticPortrait
                src="/images/about.jpg"
                alt="Swaroop Sridhar"
              />

              {/* quick-info tags */}
              <motion.div
                className="ab__quick-tags"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span className="ab__tag">
                  <MapPin size={12} /> Troy, NY
                </span>
                <span className="ab__tag">
                  <Code2 size={12} /> CS &amp; ITWS
                </span>
                <span className="ab__tag">
                  <Calendar size={12} /> Class of 2026
                </span>
              </motion.div>
            </div>

            {/* Text */}
            <div className="ab__bio-text">
              <TextReveal delay={0.1}>
                <h2 className="ab__bio-heading">My Journey</h2>
              </TextReveal>

              <TextReveal delay={0.2}>
                <p>
                  Hey there! I'm Swaroop Sridhar, a tech enthusiast and budding
                  Computer Scientist who gets genuinely excited about Machine
                  Learning, Generative AI, and making sense of data! When I'm
                  not coding, you can find me enjoying various outdoor activities
                  and spending time with friends or with my dog. I'm currently
                  pursuing my Bachelor's at RPI in Computer Science and ITWS,
                  where I've found my passion in Machine Learning and can't wait
                  to see where it takes me!
                </p>
              </TextReveal>

              <TextReveal delay={0.3}>
                <p>
                  My friends tell me I light up when talking about Neural
                  Networks or solving tricky programming challenges! Beyond my
                  technical interests, I've got a creative side too - whether I'm
                  designing intuitive user interfaces, visualizing complex data
                  in compelling ways, or bringing artistic elements into my
                  projects. I find that this blend of logical and creative
                  thinking helps me approach problems from multiple angles. My
                  journey through college has been a mix of late-night coding
                  sessions, unforgettable hackathons, and gradually building a
                  toolkit of algorithms, data structures, and software
                  engineering practices.
                </p>
              </TextReveal>

              <TextReveal delay={0.4}>
                <p>
                  I've had a blast working on projects that actually make a
                  difference—from building web apps, to designing AI models that
                  could have real-world impact, or to tackling algorithm puzzles
                  that challenge my thinking! Looking forward, I'm thrilled to
                  build on what I've learned and dive into the evolving tech
                  landscape. Whether it's pushing the boundaries of responsible
                  AI, developing sustainable tech solutions, or creating more
                  accessible digital tools, I see endless possibilities. I'm
                  pumped about making tech that actually helps people and can't
                  wait to team up on cool projects that'll change how we use
                  digital stuff every day!
                </p>
              </TextReveal>

              {/* Stats grid */}
              <motion.div
                className="ab__stats"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    className="ab__stat"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                    <span className="ab__stat-label">{s.label}</span>
                    <span className="ab__stat-sub">{s.sub}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ── Education ── */}
        <section className="ab__edu">
          <motion.div
            className="ab__edu-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen size={20} />
            <h2>Education</h2>
          </motion.div>

          <div className="ab__panels">
            {education.map((item, index) => (
              <React.Fragment key={index}>
                <EduPanel
                  item={item}
                  index={index}
                  isExpanded={expandedCard === index}
                  onToggle={() =>
                    setExpandedCard(expandedCard === index ? null : index)
                  }
                />
                {/* connector between cards */}
                {index < education.length - 1 && (
                  <motion.div
                    className="ab__connector"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="ab__connector-line" />
                    <div className="ab__connector-dot" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
