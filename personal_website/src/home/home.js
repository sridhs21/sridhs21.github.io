import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import AnimatedAscii from "./aboutAscii";
import "./home.css";

const ease = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════════════
   COMPILE EFFECT — canvas binary/hex inside silhouette
   ═══════════════════════════════════════════════════ */
const CANVAS_SCALE = 4;

function CompileCanvas({ width, height, intensityValue }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const timeoutRef = useRef(null);
  const intensityRef = useRef(0);

  const rW = width * CANVAS_SCALE;
  const rH = height * CANVAS_SCALE;

  useMotionValueEvent(intensityValue, "change", (v) => {
    intensityRef.current = v;
  });

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const intensity = intensityRef.current;
    const fontSize = 11 * CANVAS_SCALE;
    const cellW = fontSize;
    const cellH = Math.round(fontSize * 1.36);
    const cols = Math.ceil(rW / cellW);
    const rows = Math.ceil(rH / cellH);

    ctx.clearRect(0, 0, rW, rH);
    ctx.font = `${fontSize}px 'DM Mono', monospace`;
    ctx.textBaseline = "top";

    const brightBoost = intensity * 0.4;
    const redChance = 0.08 + intensity * 0.25;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const roll = Math.random();
        let ch;
        if (roll < 0.65) {
          ch = Math.random() > 0.5 ? "1" : "0";
        } else if (roll < 0.85) {
          ch = "0123456789abcdef"[Math.floor(Math.random() * 16)];
        } else {
          ch = "{}[]();=><+-*/%&|!".charAt(Math.floor(Math.random() * 18));
        }

        const bright = Math.random() + brightBoost;
        if (Math.random() < redChance) {
          ctx.fillStyle = `rgba(192,48,48,${0.5 + intensity * 0.4})`;
        } else if (bright > 0.85) {
          ctx.fillStyle = `rgba(255,255,255,${0.75 + intensity * 0.2})`;
        } else if (bright > 0.5) {
          ctx.fillStyle = `rgba(255,255,255,${0.35 + intensity * 0.25})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${0.12 + intensity * 0.15})`;
        }

        ctx.fillText(ch, c * cellW, r * cellH);
      }
    }

    const delay = Math.max(30, 80 - intensity * 50);
    frameRef.current = requestAnimationFrame(() => {
      timeoutRef.current = setTimeout(() => {
        frameRef.current = requestAnimationFrame(animate);
      }, delay);
    });
  }, [rW, rH]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [animate]);

  return <canvas ref={canvasRef} width={rW} height={rH} className="hm__compile-canvas" />;
}

/* ═══════════════════════════════════════════════════
   CODE BLOCK — with optional run output
   ═══════════════════════════════════════════════════ */
function CodeBlock({ file, children, output }) {
  const [ran, setRan] = useState(false);

  return (
    <div className="hm__code-block">
      <div className="hm__code-block-header">
        <span className="hm__code-block-dot" />
        <span className="hm__code-block-dot" />
        <span className="hm__code-block-dot" />
        <span className="hm__code-block-file">{file}</span>
        {output && (
          <button
            className={`hm__run-btn${ran ? " hm__run-btn--ran" : ""}`}
            onClick={() => setRan(!ran)}
          >
            <Play size={10} /> {ran ? "Hide" : "Run"}
          </button>
        )}
      </div>
      <div className="hm__code-block-body">
        {children}
      </div>
      <AnimatePresence>
        {ran && output && (
          <motion.div
            className="hm__run-output"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hm__run-output-inner">
              <div className="hm__run-output-bar">
                <span className="hm__cl--out-val">$ python {file}</span>
              </div>
              {output}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════ */
function Home() {
  const spacerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 45,
    restDelta: 0.001,
  });

  /* ── Phase 1: Static hero, then photo → outline ── */
  const photoOpacity    = useTransform(smooth, [0.06, 0.19], [1, 0]);
  const outlineOpacity  = useTransform(smooth, [0.08, 0.20], [0, 1]);

  /* ── Phase 2: Compile fills silhouette, fades fast ── */
  const compileOpacity    = useTransform(smooth, [0.16, 0.24, 0.32, 0.38], [0, 1, 1, 0]);
  const compileIntensity  = useTransform(smooth, [0.24, 0.32], [0, 1]);

  /* ── Phase 3: Side text fades, zoom ramps ── */
  const sideTextOpacity = useTransform(smooth, [0.22, 0.38], [1, 0]);
  const imageScale      = useTransform(smooth, [0.32, 0.78], [1, 15]);

  /* ── Phase 4: Outline fades ── */
  const outlineLateOpacity = useTransform(smooth, [0.46, 0.58], [1, 0]);
  const combinedOutlineOpacity = useTransform(
    [outlineOpacity, outlineLateOpacity],
    ([fadeIn, fadeOut]) => fadeIn * fadeOut
  );

  /* ── Phase 5: Cinematic curtain fades, scripts revealed ── */
  const cinematicOpacity = useTransform(smooth, [0.55, 0.72], [1, 0]);
  const cinematicPointerEvents = useTransform(cinematicOpacity, (v) => v < 0.05 ? "none" : "auto");

  /* Scripts scale in as curtain lifts */
  const scriptsScale   = useTransform(smooth, [0.50, 0.75], [0.4, 1]);
  const scriptsOpacity = useTransform(smooth, [0.50, 0.65], [0, 1]);

  /* scroll hint */
  const scrollHintOpacity = useTransform(smooth, [0, 0.05], [1, 0]);

  /* global progress bar */
  const globalScroll = useScroll();
  const progressScaleX = useSpring(globalScroll.scrollYProgress, { stiffness: 60, damping: 30 });

  return (
    <div className="hm">
      <motion.div className="hm__progress" style={{ scaleX: progressScaleX }} />

      {/* ══════════ SCROLL SPACER — drives animation ══════════ */}
      <div ref={spacerRef} className="hm__spacer" />

      {/* ══════════ FIXED CINEMATIC OVERLAY ══════════ */}
      <motion.div
        className="hm__cinematic"
        style={{ opacity: cinematicOpacity, pointerEvents: cinematicPointerEvents }}
      >
        <motion.div className="hm__cinematic-inner">

          {/* Left: Name + Title */}
          <motion.div className="hm__side hm__side--left" style={{ opacity: sideTextOpacity }}>
            <motion.h1
              className="hm__name"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
            >
              <span className="hm__name-first">Swaroop</span>
              <span className="hm__name-last">Sridhar</span>
            </motion.h1>

            <motion.div
              className="hm__role"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
            >
              Machine Learning<br />Engineer
            </motion.div>

            <motion.div
              className="hm__tags"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="hm__tag">CS & ITWS</span>
              <span className="hm__tag">RPI '26</span>
            </motion.div>
          </motion.div>

          {/* Center: Image layers */}
          <motion.div className="hm__center" style={{ scale: imageScale }}>
            <div className="hm__center-layers">
              <motion.img
                className="hm__photo"
                src="/images/profile4_nobg.png"
                alt="Swaroop Sridhar"
                style={{ opacity: photoOpacity }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease }}
              />
              <motion.img
                className="hm__outline"
                src="/images/profile4_outline.png"
                alt=""
                style={{ opacity: combinedOutlineOpacity }}
              />
              <motion.div
                className="hm__code-mask"
                style={{
                  opacity: compileOpacity,
                  WebkitMaskImage: "url(/images/profile4_nobg.png)",
                  WebkitMaskSize: "100% auto",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "top center",
                  maskImage: "url(/images/profile4_nobg.png)",
                  maskSize: "100% auto",
                  maskRepeat: "no-repeat",
                  maskPosition: "top center",
                }}
              >
                <CompileCanvas width={500} height={750} intensityValue={compileIntensity} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio + CTAs */}
          <motion.div className="hm__side hm__side--right" style={{ opacity: sideTextOpacity }}>
            <motion.p
              className="hm__bio"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
            >
              I like knowing how things actually work under the hood. Most of what I do
              is ML and computer vision; training classifiers, building detection
              pipelines, staring at a loss curve for an hour trying to figure out
              why it did something weird at epoch 47.
            </motion.p>

            <motion.div
              className="hm__ctas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <a href="/files/Swaroop_Sridhar_Resume.pdf" className="hm__btn hm__btn--primary" target="_blank" rel="noopener noreferrer">
                Resume <ArrowUpRight size={14} />
              </a>
              <a href="/files/SwaroopSridhar_CV.pdf" className="hm__btn hm__btn--ghost" target="_blank" rel="noopener noreferrer">
                CV
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div className="hm__scroll-hint" style={{ opacity: scrollHintOpacity }}>
            <motion.div
              className="hm__scroll-line"
              initial={{ height: 0 }}
              animate={{ height: 40 }}
              transition={{ duration: 0.9, delay: 0.9 }}
            />
            <span className="hm__scroll-label">Scroll</span>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* ══════════ ALL SCRIPTS — normal flow, revealed as curtain fades ══════════ */}
      <div className="hm__below hm__circuit-bg">
        <motion.div
          className="hm__below-grid"
          style={{ scale: scriptsScale, opacity: scriptsOpacity }}
        >

          {/* ── Row 1: ASCII art + bio script (2-col) ── */}
          <div className="hm__about-ascii">
            <AnimatedAscii />
          </div>

          <CodeBlock file="bio.py" output={
            <>
              <p>I'm Swaroop. CS and ITWS dual major at RPI, concentrating in machine learning. Got into CS because I wanted to understand how things actually work, stayed because the problems just kept getting harder in a good way.</p>
              <p>Spend most of my time on ML and computer vision. But I also like the full stack side of things; writing Flask APIs, putting together React frontends, getting a database to not fall over. Picked up a lot of it from late night debugging honestly.</p>
              <p>Mostly I just want to build stuff that works. Not another Jupyter notebook that never leaves my laptop, but something real that takes real inputs and does something useful with them.</p>
            </>
          }>
            <div className="hm__cl hm__cl--cm"># who is this guy</div>
            <div className="hm__cl hm__cl--kw">class</div>
            <div className="hm__cl">  <span className="hm__cl--fn">Swaroop</span>:</div>
            <div className="hm__cl hm__cl--empty" />
            <div className="hm__cl">  <span className="hm__cl--fn">school</span>  = <span className="hm__cl--st">"RPI '26"</span></div>
            <div className="hm__cl">  <span className="hm__cl--fn">major</span>   = [<span className="hm__cl--st">"CS"</span>, <span className="hm__cl--st">"ITWS"</span>]</div>
            <div className="hm__cl">  <span className="hm__cl--fn">focus</span>   = <span className="hm__cl--st">"machine learning"</span></div>
            <div className="hm__cl hm__cl--empty" />
            <div className="hm__cl">  <span className="hm__cl--kw">def</span> <span className="hm__cl--fn">interests</span>(self):</div>
            <div className="hm__cl">    <span className="hm__cl--kw">return</span> [</div>
            <div className="hm__cl">      <span className="hm__cl--st">"ml & computer vision"</span>,</div>
            <div className="hm__cl">      <span className="hm__cl--st">"full-stack builds"</span>,</div>
            <div className="hm__cl">      <span className="hm__cl--st">"late-night debugging"</span>,</div>
            <div className="hm__cl">      <span className="hm__cl--st">"dogs &gt; screens"</span>,</div>
            <div className="hm__cl">    ]</div>
          </CodeBlock>

          {/* ── Row 2: education + projects + tools (3-col) ── */}
          <div className="hm__below-triple">
            <CodeBlock file="education.py" output={
              <>
                <p><strong>Rensselaer Polytechnic Institute</strong> B.S. in Computer Science & ITWS with an ML concentration. Dean's List Fall 2024. Troy, NY; 2022 to 2026.</p>
                <p><strong>Courses:</strong> Data Structures, Intro to Algorithms, Operating Systems, Principles of Software, ML & Optimization, AI For Science.</p>
                <p><strong>Academy for Science and Design</strong> High school. Nashua, NH; 2013 to 2022. Did advanced CS in Java and C++, calc, physics.</p>
              </>
            }>
              <div className="hm__cl hm__cl--cm"># education</div>
              <div className="hm__cl"><span className="hm__cl--fn">transcript</span> = [</div>
              <div className="hm__cl">  {"{"} <span className="hm__cl--st">"RPI"</span>: <span className="hm__cl--st">"BS"</span>,</div>
              <div className="hm__cl">    <span className="hm__cl--kw">major</span>: [<span className="hm__cl--st">"CS"</span>, <span className="hm__cl--st">"ITWS"</span>],</div>
              <div className="hm__cl">    <span className="hm__cl--kw">conc</span>:  <span className="hm__cl--st">"ML"</span>,</div>
              <div className="hm__cl">    <span className="hm__cl--kw">year</span>:  <span className="hm__cl--rd">2026</span>,</div>
              <div className="hm__cl">    <span className="hm__cl--kw">honors</span>: <span className="hm__cl--st">"Dean's List"</span> {"}"},</div>
              <div className="hm__cl">  {"{"} <span className="hm__cl--st">"ASD"</span>: <span className="hm__cl--st">"HS"</span>,</div>
              <div className="hm__cl">    <span className="hm__cl--kw">year</span>:  <span className="hm__cl--rd">2022</span> {"}"},</div>
              <div className="hm__cl">]</div>
            </CodeBlock>

            <CodeBlock file="projects.py" output={
              <>
                <p><strong>Magnetic Reconnection Classifier</strong> CNN that finds rare events in space weather sims. The positive class is 0.003% of the data so that was fun. PyTorch, focal loss, H100 GPUs.</p>
                <p><strong>FytoSpot</strong> Point your camera at a plant and it tells you what it is. OpenCV + ResNet; runs on web and desktop.</p>
                <p><strong>PartiSim</strong> 3D atom simulator. You can watch quantum orbitals form and bonds happen in real time. OpenGL.</p>
                <p><strong>Drug Discovery</strong> Predicting drug protein interactions on TDC benchmarks. PyTorch and RDKit.</p>
              </>
            }>
              <div className="hm__cl hm__cl--cm"># selected work</div>
              <div className="hm__cl"><span className="hm__cl--fn">projects</span> = [</div>
              <div className="hm__cl">  {"{"} <span className="hm__cl--st">"reconClassifier"</span>,</div>
              <div className="hm__cl">    <span className="hm__cl--kw">gpu</span>: <span className="hm__cl--st">"H100"</span> {"}"},</div>
              <div className="hm__cl">  {"{"} <span className="hm__cl--st">"fytospot"</span>,</div>
              <div className="hm__cl">    <span className="hm__cl--kw">stack</span>: [<span className="hm__cl--st">"CV"</span>, <span className="hm__cl--st">"ResNet"</span>] {"}"},</div>
              <div className="hm__cl">  {"{"} <span className="hm__cl--st">"partisim"</span>,</div>
              <div className="hm__cl">    <span className="hm__cl--kw">render</span>: <span className="hm__cl--st">"OpenGL"</span> {"}"},</div>
              <div className="hm__cl">  {"{"} <span className="hm__cl--st">"drug_discovery"</span>,</div>
              <div className="hm__cl">    <span className="hm__cl--kw">bench</span>: <span className="hm__cl--st">"TDC"</span> {"}"},</div>
              <div className="hm__cl">]</div>
            </CodeBlock>

            <CodeBlock file="requirements.txt" output={
              <>
                <p><strong>Core:</strong> Python 3.11, PyTorch 2.1, TensorFlow 2.15, OpenCV 4.9</p>
                <p><strong>Languages:</strong> C/C++, Java, Haskell, Assembly, Prolog</p>
                <p><strong>Web:</strong> React 18, Flask 3, Node.js 20</p>
                <p><strong>Data:</strong> SQL, MongoDB, Azure</p>
              </>
            }>
              <div className="hm__cl hm__cl--cm"># core</div>
              <div className="hm__cl">python==<span className="hm__cl--rd">3.11</span></div>
              <div className="hm__cl">pytorch==<span className="hm__cl--rd">2.1</span></div>
              <div className="hm__cl">tensorflow==<span className="hm__cl--rd">2.15</span></div>
              <div className="hm__cl">opencv==<span className="hm__cl--rd">4.9</span></div>
              <div className="hm__cl hm__cl--empty" />
              <div className="hm__cl hm__cl--cm"># languages</div>
              <div className="hm__cl">c/c++ / java</div>
              <div className="hm__cl">haskell / prolog</div>
              <div className="hm__cl">assembly</div>
              <div className="hm__cl hm__cl--empty" />
              <div className="hm__cl hm__cl--cm"># web & data</div>
              <div className="hm__cl">react / flask / node</div>
              <div className="hm__cl">sql / mongodb / azure</div>
            </CodeBlock>
          </div>

          {/* ── Row 3: main.py (full width) ── */}
          <div className="hm__below-full">
            <CodeBlock file="main.py" output={
              <>
                <p>If you want to work on something together or just want to talk about ML and computer vision, shoot me a message. I'm usually up for interesting problems.</p>
                <div className="hm__run-links">
                  <a href="/#/portfolio" className="hm__btn hm__btn--ghost">All projects <ArrowUpRight size={13} /></a>
                  <a href="/#/contact" className="hm__btn hm__btn--primary">Get in Touch <ArrowUpRight size={14} /></a>
                </div>
              </>
            }>
              <div className="hm__cl hm__cl--kw">from</div>
              <div className="hm__cl">  swaroop <span className="hm__cl--kw">import</span> <span className="hm__cl--fn">Portfolio</span>, <span className="hm__cl--fn">Contact</span></div>
              <div className="hm__cl hm__cl--empty" />
              <div className="hm__cl hm__cl--kw">if</div>
              <div className="hm__cl">  __name__ == <span className="hm__cl--st">"__main__"</span>:</div>
              <div className="hm__cl">  portfolio = <span className="hm__cl--fn">Portfolio</span>.<span className="hm__cl--fn">load</span>()</div>
              <div className="hm__cl">  portfolio.<span className="hm__cl--fn">display</span>()</div>
              <div className="hm__cl hm__cl--empty" />
              <div className="hm__cl">  <span className="hm__cl--cm"># want to build something?</span></div>
              <div className="hm__cl">  <span className="hm__cl--fn">Contact</span>.<span className="hm__cl--fn">reach_out</span>()</div>
            </CodeBlock>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default Home;
