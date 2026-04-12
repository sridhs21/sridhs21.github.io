import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { LetterTitle } from "../anim/anim";
import TracingBeam from "../home/components/TracingBeam";
import { POSTS } from "./data";
import GTCPost from "./posts/GTCPost";
import "./blog.css";

/* Route post id → the component that renders the post body. */
const POST_COMPONENTS = {
  "nvidia-gtc-2026": GTCPost,
};

/* ═════════════════════════════════════════════
   Blog Page
   ═════════════════════════════════════════════ */
function Blog() {
  const [activePost, setActivePost] = useState(null);

  const openPost = (id) => {
    setActivePost(id);
    window.scrollTo(0, 0);
  };

  const closePost = () => {
    setActivePost(null);
    window.scrollTo(0, 0);
  };

  const PostComponent = activePost ? POST_COMPONENTS[activePost] : null;
  const post = activePost ? POSTS.find((p) => p.id === activePost) : null;

  return (
    <div className="bl">
      <div className="bl__inner">
        {!activePost ? (
          /* ── Post List ── */
          <div key="list">
              <header className="bl__header">
                <motion.span
                  className="bl__label"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  recent
                </motion.span>

                <LetterTitle
                  as="h1"
                  className="bl__title"
                  text="blog"
                  delay={0.15}
                  stagger={0.07}
                />

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
          </div>
        ) : (
          /* ── Single Post ── */
          <div key="post">
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

              <TracingBeam>
                <PostComponent />
              </TracingBeam>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
