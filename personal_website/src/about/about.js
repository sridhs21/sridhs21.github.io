import React, { useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  MapPin,
  Code2,
  Calendar,
  ChevronDown,
  Award,
} from "lucide-react";
import "./about.css";
import { useRef } from "react";

/* ─────────────────────────────────────────────
   Text Reveal
   ───────────────────────────────────────────── */
function TextReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ═════════════════════════════════════════════
   About Page
   ═════════════════════════════════════════════ */
function About() {
  const [expandedCard, setExpandedCard] = useState(null);

  const education = [
    {
      active: true,
      year: "2022 – 2026",
      degree: "B.S. Computer Science & Information Technology and Web Science",
      concentration: "Machine Learning",
      school: "Rensselaer Polytechnic Institute",
      location: "Troy, NY",
      logo: "/images/rpi_logo.png",
      honors: "Dean's List – Fall 2024",
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
      active: false,
      year: "2013 – 2022",
      degree: "High School Diploma",
      school: "Academy for Science and Design",
      location: "Nashua, NH",
      logo: "/images/asd_logo.png",
      courses: [
        "Advanced CS (Java/C++)",
        "Advanced Calculus 1 & 2",
        "Physics 1",
      ],
    },
  ];

  return (
    <div className="ab">
      <div className="ab__inner">

        {/* ── Header ── */}
        <header className="ab__header">
          <motion.span
            className="ab__label"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            background
          </motion.span>

          <motion.h1
            className="ab__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            about
          </motion.h1>

          <motion.div
            className="ab__header-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </header>

        {/* ── Bio ── */}
        <section className="ab__bio">
          <div className="ab__bio-layout">
            {/* Image */}
            <div className="ab__portrait-wrap">
              <motion.div
                className="ab__portrait"
                initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src="/images/about.jpg" alt="Swaroop Sridhar" loading="lazy" />
              </motion.div>

              <motion.div
                className="ab__quick-tags"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="ab__tag"><MapPin size={12} /> Troy, NY</span>
                <span className="ab__tag"><Code2 size={12} /> CS & ITWS</span>
                <span className="ab__tag"><Calendar size={12} /> Class of 2026</span>
              </motion.div>
            </div>

            {/* Text */}
            <div className="ab__bio-text">
              <TextReveal delay={0.1}>
                <p>
                  I'm Swaroop. CS and ITWS dual major at RPI, concentrating in
                  machine learning. Got into CS because I wanted to understand how
                  things actually work, and honestly the problems just kept getting
                  harder in a good way so I stuck around. When I'm not staring at
                  a terminal I'm usually outside with my dog or doing something
                  that has nothing to do with a screen.
                </p>
              </TextReveal>

              <TextReveal delay={0.2}>
                <p>
                  Most of what I work on is ML and computer vision; training
                  classifiers, building detection pipelines, that kind of thing.
                  But I also like the full stack side. Writing a Flask API, putting
                  together a React frontend, getting the whole thing to talk to a
                  database without falling over. Learned a lot of it from late night
                  debugging sessions and hackathons where nothing works until 3 AM
                  and then suddenly all of it does.
                </p>
              </TextReveal>

              <TextReveal delay={0.3}>
                <p>
                  Mostly I just want to build stuff that works. Not another
                  proof of concept sitting in a Jupyter notebook forever, but
                  real tools that take real inputs and do something useful with
                  them. The messy part where research actually has to run in
                  production; that's what I want to be doing.
                </p>
              </TextReveal>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <motion.div
          className="ab__divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ── Education ── */}
        <section className="ab__edu">
          <TextReveal>
            <h2 className="ab__section-title">Education</h2>
          </TextReveal>

          <div className="ab__edu-list">
            {education.map((item, i) => (
              <motion.div
                key={i}
                className="ab__edu-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="ab__edu-top">
                  <div className="ab__edu-logo">
                    <img
                      src={item.logo}
                      alt={`${item.school} logo`}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                  <div className="ab__edu-meta">
                    <div className="ab__edu-row">
                      <h3 className="ab__edu-degree">{item.degree}</h3>
                      {item.active && <span className="ab__edu-status">In progress</span>}
                    </div>
                    <p className="ab__edu-school">{item.school}</p>
                    <div className="ab__edu-details">
                      <span><MapPin size={11} /> {item.location}</span>
                      <span><Calendar size={11} /> {item.year}</span>
                      {item.concentration && (
                        <span className="ab__edu-conc"><Code2 size={11} /> {item.concentration}</span>
                      )}
                    </div>
                    {item.honors && (
                      <span className="ab__edu-honors"><Award size={12} /> {item.honors}</span>
                    )}
                  </div>
                </div>

                {/* Courses toggle */}
                <button
                  className="ab__edu-toggle"
                  onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                >
                  <span>{expandedCard === i ? "Hide courses" : "View courses"}</span>
                  <motion.span
                    animate={{ rotate: expandedCard === i ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ display: "inline-flex" }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {expandedCard === i && (
                    <motion.div
                      className="ab__edu-courses"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="ab__edu-courses-inner">
                        {item.courses.map((course, ci) => (
                          <span key={ci} className="ab__edu-pill">{course}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
