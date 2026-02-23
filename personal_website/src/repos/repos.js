import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
  animate,
} from 'framer-motion';
import { Github, Star, GitFork, X, ArrowUpRight } from 'lucide-react';
import './repos.css';

/* ═══════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════ */
const LANG_COLORS = {
  JavaScript: '#f7df1e', Python: '#3572A5', Java: '#b07219',
  TypeScript: '#2b7489', HTML: '#e34c26', CSS: '#563d7c',
  Ruby: '#701516', Go: '#00ADD8', 'C++': '#f34b7d', C: '#555555',
  Haskell: '#5e5086', Erlang: '#B83998', Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B', Prolog: '#74283c',
};
const langColor = (lang) => LANG_COLORS[lang] || '#666';

/* ═══════════════════════════════════════════════════
   ANIMATED COUNTER  (useMotionValue + animate)
   ═══════════════════════════════════════════════════ */
function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => ctrl.stop();
  }, [inView, value, mv]);

  return <span ref={ref}>{display}</span>;
}

/* ═══════════════════════════════════════════════════
   3-D TILT CARD  (useMotionValue / useSpring /
   useTransform / useMotionTemplate / whileHover)
   ═══════════════════════════════════════════════════ */
function TiltCard({ children, className, onClick }) {
  const cardRef = useRef(null);

  /* normalised cursor position (0-100) */
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  /* tilt via springs */
  const rawRx = useTransform(spotY, [0, 100], [5, -5]);
  const rawRy = useTransform(spotX, [0, 100], [-5, 5]);
  const rotateX = useSpring(rawRx, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawRy, { stiffness: 220, damping: 22 });

  /* spotlight gradient that follows the cursor */
  const spotlight = useMotionTemplate`radial-gradient(
    600px circle at ${spotX}% ${spotY}%,
    rgba(255,255,255,0.04) 0%,
    transparent 65%
  )`;

  const onMove = useCallback(
    (e) => {
      const r = cardRef.current?.getBoundingClientRect();
      if (!r) return;
      spotX.set(((e.clientX - r.left) / r.width) * 100);
      spotY.set(((e.clientY - r.top) / r.height) * 100);
    },
    [spotX, spotY],
  );

  const onLeave = useCallback(() => {
    spotX.set(50);
    spotY.set(50);
  }, [spotX, spotY]);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.018 }}
      whileTap={{ scale: 0.985 }}
    >
      <motion.div className="rp__spotlight" style={{ background: spotlight }} />
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   SHIMMER SKELETON GRID
   ═══════════════════════════════════════════════════ */
function SkeletonGrid() {
  return (
    <div className="rp__grid">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className={`rp__skeleton${i === 0 ? ' rp__skeleton--feat' : ''}`}
        >
          <div className="rp__sk-line rp__sk-line--title" />
          <div className="rp__sk-line rp__sk-line--desc" />
          <div className="rp__sk-line rp__sk-line--desc rp__sk-line--short" />
          <div className="rp__sk-line rp__sk-line--foot" />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LANGUAGE DISTRIBUTION BAR  (spring-animated segs)
   ═══════════════════════════════════════════════════ */
function LanguageBar({ stats }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="rp__lang-bar">
      {stats.map((s, i) => (
        <motion.div
          key={s.lang}
          className="rp__lang-seg"
          style={{ backgroundColor: langColor(s.lang) }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${s.pct}%` } : {}}
          transition={{
            duration: 0.8,
            delay: i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          title={`${s.lang}: ${s.count} repos`}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   REPOS  (main)
   ═══════════════════════════════════════════════════ */
function Repos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  /* ── fetch repos ── */
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          'https://api.github.com/users/sridhs21/repos?sort=updated&per_page=100',
        );
        if (!r.ok) throw new Error('Failed to fetch');
        const data = await r.json();
        setRepos(
          data
            .filter((d) => !d.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ── derived data ── */
  const langStats = useMemo(() => {
    const c = {};
    repos.forEach((r) => {
      if (r.language) c[r.language] = (c[r.language] || 0) + 1;
    });
    return Object.entries(c)
      .sort((a, b) => b[1] - a[1])
      .map(([lang, count]) => ({
        lang,
        count,
        pct: (count / repos.length) * 100,
      }));
  }, [repos]);

  const languages = useMemo(
    () => ['All', ...langStats.map((s) => s.lang)],
    [langStats],
  );
  const filtered =
    filter === 'All' ? repos : repos.filter((r) => r.language === filter);
  const totalStars = useMemo(
    () => repos.reduce((s, r) => s + r.stargazers_count, 0),
    [repos],
  );
  const totalForks = useMemo(
    () => repos.reduce((s, r) => s + r.forks_count, 0),
    [repos],
  );

  /* ── body-scroll lock + Escape key ── */
  useEffect(() => {
    if (!expanded) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setExpanded(null);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [expanded]);

  /* ── split title chars for letter animation ── */
  const titleChars = 'repositories'.split('');

  /* ═══════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════ */
  return (
    <div className="rp">
      <div className="rp__inner">
        {/* ────── HEADER ────── */}
        <motion.header ref={headerRef} className="rp__header">
          <motion.span
            className="rp__label"
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            open source
          </motion.span>

          {/* Per-letter cascade – rotateX unwrap */}
          <h1 className="rp__title">
            {titleChars.map((ch, i) => (
              <motion.span
                key={i}
                className="rp__title-char"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={
                  headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}
                }
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

          {/* Animated stat counters */}
          {!loading && (
            <motion.div
              className="rp__stats-bar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="rp__stat-block">
                <span className="rp__stat-num">
                  <AnimatedCounter value={repos.length} />
                </span>
                <span className="rp__stat-lbl">repositories</span>
              </div>
              <span className="rp__stat-sep" />
              <div className="rp__stat-block">
                <Star size={14} className="rp__stat-icon" />
                <span className="rp__stat-num">
                  <AnimatedCounter value={totalStars} />
                </span>
                <span className="rp__stat-lbl">stars</span>
              </div>
              <span className="rp__stat-sep" />
              <div className="rp__stat-block">
                <GitFork size={14} className="rp__stat-icon" />
                <span className="rp__stat-num">
                  <AnimatedCounter value={totalForks} />
                </span>
                <span className="rp__stat-lbl">forks</span>
              </div>
            </motion.div>
          )}
        </motion.header>

        {/* ────── LANGUAGE DISTRIBUTION BAR ────── */}
        {!loading && langStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <LanguageBar stats={langStats} />
            <div className="rp__lang-legend">
              {langStats.slice(0, 6).map((s) => (
                <span key={s.lang} className="rp__lang-legend-item">
                  <span
                    className="rp__lang-legend-dot"
                    style={{ backgroundColor: langColor(s.lang) }}
                  />
                  {s.lang}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ────── FILTER PILLS (layoutId sliding indicator) ────── */}
        {!loading && !error && (
          <motion.div
            className="rp__filters"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {languages.map((lang) => (
              <button
                key={lang}
                className={`rp__filter${filter === lang ? ' rp__filter--on' : ''}`}
                onClick={() => setFilter(lang)}
              >
                {lang !== 'All' && (
                  <span
                    className="rp__filter-dot"
                    style={{ backgroundColor: langColor(lang) }}
                  />
                )}
                <span className="rp__filter-text">{lang}</span>
                {filter === lang && (
                  <motion.span
                    className="rp__filter-bg"
                    layoutId="rpFilterPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* ────── CONTENT ────── */}
        {loading ? (
          <SkeletonGrid />
        ) : error ? (
          <div className="rp__error">{error}</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              className="rp__grid"
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {filtered.map((repo, i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const isFeat = i === 0 && filter === 'All';

                return (
                  <motion.div
                    key={repo.id}
                    className={`rp__card-wrap${isFeat ? ' rp__card-wrap--feat' : ''}`}
                    initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 14,
                      delay: row * 0.07 + col * 0.04,
                      filter: { duration: 0.35 },
                    }}
                  >
                    <TiltCard
                      className="rp__card"
                      onClick={() => setExpanded(repo)}
                    >
                      <span className="rp__card-idx">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="rp__card-head">
                        <h3 className="rp__card-name">{repo.name}</h3>
                        <ArrowUpRight size={15} className="rp__card-arrow" />
                      </div>

                      {repo.description && (
                        <p className="rp__card-desc">{repo.description}</p>
                      )}

                      <div className="rp__card-foot">
                        {repo.language && (
                          <span className="rp__card-lang">
                            <span
                              className="rp__card-lang-dot"
                              style={{
                                backgroundColor: langColor(repo.language),
                              }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="rp__card-stats">
                          {repo.stargazers_count > 0 && (
                            <span className="rp__card-stat">
                              <Star size={12} />
                              {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="rp__card-stat">
                              <GitFork size={12} />
                              {repo.forks_count}
                            </span>
                          )}
                        </span>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ────── EXPANDED MODAL ────── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="rp__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setExpanded(null)}
            >
              <motion.div
                className="rp__modal"
                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="rp__modal-close"
                  onClick={() => setExpanded(null)}
                >
                  <X size={18} />
                </button>

                <div className="rp__modal-top">
                  <Github size={28} className="rp__modal-gh" />
                  <div>
                    <h2 className="rp__modal-name">{expanded.name}</h2>
                    {expanded.language && (
                      <span className="rp__modal-lang">
                        <span
                          className="rp__card-lang-dot"
                          style={{
                            backgroundColor: langColor(expanded.language),
                          }}
                        />
                        {expanded.language}
                      </span>
                    )}
                  </div>
                </div>

                {expanded.description && (
                  <p className="rp__modal-desc">{expanded.description}</p>
                )}

                {/* Stat blocks */}
                <motion.div
                  className="rp__modal-stats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <div className="rp__modal-stat">
                    <Star size={16} />
                    <span className="rp__modal-stat-val">
                      {expanded.stargazers_count}
                    </span>
                    <span className="rp__modal-stat-lbl">stars</span>
                  </div>
                  <div className="rp__modal-stat">
                    <GitFork size={16} />
                    <span className="rp__modal-stat-val">
                      {expanded.forks_count}
                    </span>
                    <span className="rp__modal-stat-lbl">forks</span>
                  </div>
                  {expanded.size > 0 && (
                    <div className="rp__modal-stat">
                      <span className="rp__modal-stat-val">
                        {(expanded.size / 1024).toFixed(1)}
                      </span>
                      <span className="rp__modal-stat-lbl">MB</span>
                    </div>
                  )}
                </motion.div>

                {/* Topics with staggered spring entrance */}
                {expanded.topics && expanded.topics.length > 0 && (
                  <div className="rp__modal-topics">
                    {expanded.topics.map((t, ti) => (
                      <motion.span
                        key={t}
                        className="rp__modal-topic"
                        initial={{ opacity: 0, scale: 0.7, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 18,
                          delay: 0.2 + ti * 0.04,
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* Dates */}
                <motion.div
                  className="rp__modal-dates"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <span>
                    Created{' '}
                    {new Date(expanded.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span>
                    Updated{' '}
                    {new Date(expanded.updated_at).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </motion.div>

                {/* CTA button with spring hover/tap */}
                <motion.a
                  href={expanded.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rp__modal-link"
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Github size={16} />
                  View on GitHub
                  <ArrowUpRight size={14} />
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Repos;
