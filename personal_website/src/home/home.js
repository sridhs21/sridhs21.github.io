import React, { useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedAscii from "./aboutAscii";
import CompileCanvas from "./components/CompileCanvas";
import LeakCanvas from "./components/LeakCanvas";
import CodeBlock from "./components/CodeBlock";
import Spotlight from "./components/Spotlight";
import Lamp from "./components/Lamp";
import "./home.css";

const ease = [0.22, 1, 0.36, 1];


/* ═══════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════ */
function Home() {
  const spacerRef = useRef(null);
  const [bioRan, setBioRan] = useState(false);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end end"],
  });

  const sp = scrollYProgress;

  /* ── Phase 1: Static hero, then photo → outline ── */
  const photoOpacity    = useTransform(sp, [0.06, 0.22], [1, 0]);
  const outlineOpacity  = useTransform(sp, [0.06, 0.22], [0, 1]);

  /* ── Phase 2: Compile fills silhouette, fades fast ── */
  const compileOpacity    = useTransform(sp, [0.16, 0.24, 0.42, 0.52], [0, 1, 1, 0]);
  const compileIntensity  = useTransform(sp, [0.24, 0.40], [0, 1]);

  /* ── Phase 3: Side text fades, zoom ramps ── */
  const sideTextOpacity = useTransform(sp, [0.22, 0.38], [1, 0]);
  const imageScale      = useTransform(sp, [0.32, 0.78], [1, 8]);

  /* ── Phase 4: Outline fades ── */
  const outlineLateOpacity = useTransform(sp, [0.46, 0.58], [1, 0]);
  const combinedOutlineOpacity = useTransform(
    [outlineOpacity, outlineLateOpacity],
    ([fadeIn, fadeOut]) => fadeIn * fadeOut
  );

  /* ── Phase 5: Cinematic curtain fades, scripts revealed ── */
  const cinematicOpacity = useTransform(sp, [0.55, 0.72], [1, 0]);
  const cinematicPointerEvents = useTransform(cinematicOpacity, (v) => v < 0.05 ? "none" : "auto");

  /* Scripts scale in as curtain lifts */
  const scriptsScale   = useTransform(sp, [0.50, 0.75], [0.4, 1]);
  const scriptsOpacity = useTransform(sp, [0.50, 0.65], [0, 1]);

  /* scroll hint */
  const scrollHintOpacity = useTransform(sp, [0, 0.05], [1, 0]);

  /* global progress bar */
  const globalScroll = useScroll();
  const progressScaleX = globalScroll.scrollYProgress;

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
        <Spotlight />
        <motion.div className="hm__cinematic-inner">

          {/* Left: Name + Title */}
          <motion.div className="hm__side hm__side--left" style={{ opacity: sideTextOpacity }}>
            <motion.h1
              className="hm__name"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
            >
              <span className="hm__name-first"><span className="hm__shimmer">Swaroop</span></span>
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
                className="hm__photo-color"
                src="/images/profile4_nobg.png"
                alt=""
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
                <CompileCanvas
                  width={500}
                  height={750}
                  intensityValue={compileIntensity}
                  opacityValue={compileOpacity}
                />
              </motion.div>
              <motion.div
                className="hm__code-leak"
                style={{ opacity: compileOpacity }}
              >
                <LeakCanvas width={500} height={300} opacityValue={compileOpacity} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio + CTAs */}
          <motion.div className="hm__side hm__side--right" style={{ opacity: sideTextOpacity }}>
            <motion.p
              className="hm__bio"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.03, delayChildren: 0.4 } },
              }}
            >
              {"I like knowing how things actually work under the hood. Most of what I do is ML and computer vision; training classifiers, building detection pipelines, staring at a loss curve for an hour trying to figure out why it did something weird at epoch 47.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                  variants={{
                    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >{word}</motion.span>
              ))}
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
              <a href="/files/Swaroop_Sridhar_CV.pdf" className="hm__btn hm__btn--ghost" target="_blank" rel="noopener noreferrer">
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
        <Lamp />
        <motion.div
          className="hm__below-grid"
          style={{ scale: scriptsScale, opacity: scriptsOpacity }}
        >

          {/* ── Row 1: ASCII art + bio script (2-col) ── */}
          <div className="hm__about-ascii">
            <AnimatedAscii revealed={bioRan} />
          </div>

          <CodeBlock file="bio.py" externalRan={bioRan} onToggleRun={() => setBioRan(!bioRan)} output={
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
