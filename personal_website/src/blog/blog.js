import React, { useState, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import "./blog.css";

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
   Posts Data
   ═════════════════════════════════════════════ */
const POSTS = [
  {
    id: "nvidia-gtc-2026",
    title: "NVIDIA GTC and What Came After",
    date: "March 2026",
    thumb: "/NvidiaGTC/IMG_8040.JPG",
    excerpt:
      "Went to GTC expecting a tech expo. Left thinking about telesurgery, startups, and what I actually want to do after graduation.",
    tags: ["nvidia", "gtc", "career", "healthcare"],
  },
];

/* ═════════════════════════════════════════════
   GTC Post Content
   ═════════════════════════════════════════════ */
function GTCPost() {
  return (
    <div className="bl__body">
      <TextReveal>
        <p>
          I went to NVIDIA GTC without much of a plan. Honestly I just wanted to
          see what direction the industry was heading, maybe sit in on a few
          talks, and hang out in San Jose for a couple days. Figured it would be
          fun and I'd get something out of it. I didn't expect it to actually
          shift how I think about what I want to do.
        </p>
      </TextReveal>

      <TextReveal delay={0.1}>
        <h2>The Student Side</h2>
      </TextReveal>

      <TextReveal delay={0.15}>
        <p>
          We started at San Jose State University for the student program. There
          was a keynote and then a panel talk, and the thing that stuck with me
          was how bluntly they talked about the difference between using AI and
          actually building it. A lot of people can prompt a model or fine-tune
          something off a tutorial; the panel kept coming back to the idea that
          the people who understand the infrastructure, the training pipelines,
          the actual math behind why something works or doesn't, those are the
          ones who end up shaping what gets built. That hit different because I'd
          been going back and forth in my head about whether the stuff I'm
          learning in school matters when everyone and their mom can use ChatGPT
          now. Hearing it framed that way cleared some of that noise up.
        </p>
      </TextReveal>

      <div className="bl__img-row bl__img-row--2">
        <TextReveal delay={0.1}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/image000001.jpg" alt="GTC student event" />
          </div>
        </TextReveal>
        <TextReveal delay={0.15}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/PXL_20260318_022648989.jpg" alt="Group outside venue" />
          </div>
        </TextReveal>
      </div>

      <TextReveal delay={0.1}>
        <h2>The Exhibit Hall</h2>
      </TextReveal>

      <TextReveal delay={0.15}>
        <p>
          The main exhibit hall was a completely different energy. Physical AI,
          edge computing, robotics, health sciences. It wasn't just booths with
          slide decks; people had live demos running. You could see autonomous
          systems responding in real time, edge devices doing inference locally,
          robots navigating environments. I spent a lot of time just walking
          around watching things run.
        </p>
      </TextReveal>

      <TextReveal delay={0.15}>
        <p>
          I talked to a bunch of people who were actually implementing NVIDIA's
          products in production. Not researchers, not evangelists; engineers and
          founders who had actual deployment problems and were solving them with
          this stuff. Those conversations were probably more valuable than any
          talk I sat in on. You get a very different picture of a technology when
          someone explains the parts that don't work well yet.
        </p>
      </TextReveal>

      <div className="bl__img-row bl__img-row--2">
        <TextReveal delay={0.1}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/IMG_9577.jpg" alt="Exhibit hall AI presentation" />
          </div>
        </TextReveal>
        <TextReveal delay={0.15}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/IMG_8040.JPG" alt="Group photo at GTC stage" />
          </div>
        </TextReveal>
      </div>

      <TextReveal delay={0.1}>
        <h2>Telesurgery</h2>
      </TextReveal>

      <TextReveal delay={0.15}>
        <p>
          The thing that genuinely stopped me in my tracks was the XRlabs
          telesurgery demo. They had a setup where a surgeon could operate
          remotely with haptic feedback and real-time video, and it just worked.
          Not like a concept video; it was right there running in front of me. I
          stood at that booth for way longer than I should have, asking questions
          about latency, about how they handle the feedback loop, about what
          happens when the connection degrades.
        </p>
      </TextReveal>

      <TextReveal delay={0.15}>
        <p>
          I've spent most of my time building ML models and computer vision
          pipelines, but seeing that demo made something click. Healthcare is
          where I want to apply this stuff. Not in a vague "AI for good" way;
          specifically, the intersection of real-time systems, computer vision,
          and surgical robotics. The technical problems are genuinely hard and the
          stakes are high. If the model is wrong, someone gets hurt. That kind of
          constraint forces you to actually understand what you're building
          instead of shipping something that works 90% of the time and calling it
          done.
        </p>
      </TextReveal>

      <div className="bl__img-row bl__img-row--1">
        <TextReveal delay={0.1}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/IMG_9648.jpg" alt="XRlabs telesurgery display" />
          </div>
          <p className="bl__img-caption">XRlabs surgical robotics demo at GTC</p>
        </TextReveal>
      </div>

      <TextReveal delay={0.1}>
        <h2>What I Took Away</h2>
      </TextReveal>

      <TextReveal delay={0.15}>
        <p>
          After GTC I spent a lot of time thinking. The job market right now is
          rough, and I'd been feeling a lot of pressure to just land something
          and figure the rest out later. But seeing what people are building, and
          more importantly how they got there, changed my perspective a bit. A
          lot of the founders I talked to didn't follow the standard path. They
          found a problem they actually cared about and built around it.
        </p>
      </TextReveal>

      <TextReveal delay={0.15}>
        <p>
          I keep coming back to the idea of starting something. A startup, or at
          least some kind of venture where I'm building toward a thing I actually
          believe in rather than optimizing someone else's ad pipeline. I know
          I'd need to learn a lot beyond just the engineering side; business,
          fundraising, hiring, all of it. But the technical foundation is there,
          and now I have a clearer picture of the domain I want to work in.
        </p>
      </TextReveal>

      <TextReveal delay={0.15}>
        <p>
          For the first time in a while I feel like I have a direction. Not a
          plan exactly, more like a heading. Telesurgery, healthcare AI, embedded
          systems. The specifics will change but the general area feels right.
          GTC didn't teach me that; it just made it harder to ignore.
        </p>
      </TextReveal>

      <TextReveal delay={0.15}>
        <p>
          Oh, and because of how much this conference got into my head, I ended
          up buying a robot. But that's a whole other story.
        </p>
      </TextReveal>

      <div className="bl__img-row bl__img-row--1">
        <TextReveal delay={0.1}>
          <div className="bl__img-wrap bl__img-wrap--tall">
            <img src="/NvidiaGTC/IMG20260317174337.jpg" alt="San Jose" />
          </div>
        </TextReveal>
      </div>

    </div>
  );
}

/* ═════════════════════════════════════════════
   Blog Component
   ═════════════════════════════════════════════ */
function Blog() {
  const [activePost, setActivePost] = useState(null);

  const postContent = {
    "nvidia-gtc-2026": GTCPost,
  };

  const openPost = (id) => {
    setActivePost(id);
    window.scrollTo(0, 0);
  };

  const closePost = () => {
    setActivePost(null);
    window.scrollTo(0, 0);
  };

  const PostComponent = activePost ? postContent[activePost] : null;
  const post = activePost ? POSTS.find((p) => p.id === activePost) : null;

  return (
    <div className="bl">
      <div className="bl__inner">
        <AnimatePresence mode="wait">
          {!activePost ? (
            /* ── Post List ── */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <header className="bl__header">
                <motion.span
                  className="bl__label"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  recent
                </motion.span>

                <motion.h1
                  className="bl__title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  blog
                </motion.h1>

                <motion.div
                  className="bl__header-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </header>

              <div className="bl__posts">
                {POSTS.map((p, i) => (
                  <motion.div
                    key={p.id}
                    className="bl__post-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => openPost(p.id)}
                  >
                    <img className="bl__post-thumb" src={p.thumb} alt={p.title} />
                    <div className="bl__post-info">
                      <span className="bl__post-date">{p.date}</span>
                      <h2 className="bl__post-title">{p.title}</h2>
                      <p className="bl__post-excerpt">{p.excerpt}</p>
                      <div className="bl__post-tags">
                        {p.tags.map((t) => (
                          <span key={t} className="bl__post-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Single Post ── */
            <motion.div
              key="post"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className="bl__back" onClick={closePost}>
                <ArrowLeft size={14} /> back to posts
              </button>

              <header className="bl__article-header">
                <motion.span
                  className="bl__article-date"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {post.date}
                </motion.span>

                <motion.h1
                  className="bl__article-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {post.title}
                </motion.h1>

                <div className="bl__article-tags">
                  {post.tags.map((t) => (
                    <span key={t} className="bl__post-tag">{t}</span>
                  ))}
                </div>

                <motion.div
                  className="bl__article-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </header>

              <PostComponent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Blog;
