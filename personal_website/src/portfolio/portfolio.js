import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { LetterTitle, Magnetic, Reveal } from "../anim/anim";
import { PROJECTS, CATEGORIES, getCategoryLabel } from "./data";
import ProjectRow from "./components/ProjectRow";
import "./portfolio.css";

/* ═════════════════════════════════════════════
   Portfolio Page
   ═════════════════════════════════════════════ */
function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

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

  const toggleExpanded = useCallback(
    (id) => setExpandedId((curr) => (curr === id ? null : id)),
    [],
  );

  return (
    <div className="pf">
      <div className="pf__inner">

        {/* ── Header ── */}
        <header className="pf__header">
          <motion.span
            className="pf__label"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            selected work
          </motion.span>

          <LetterTitle
            as="h1"
            className="pf__title"
            text="portfolio"
          />

          <motion.div
            className="pf__header-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </header>

        {/* ── Controls ── */}
        <motion.div
          className="pf__controls"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="pf__filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`pf__chip${filter === cat ? " pf__chip--active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          <div className="pf__search">
            <Search size={14} className="pf__search-icon" />
            <input
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pf__search-input"
            />
            {searchQuery && (
              <button
                className="pf__search-clear"
                onClick={() => setSearchQuery("")}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Project List ── */}
        <section className="pf__list">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, i) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    index={i}
                    expanded={expandedId === project.id}
                    onToggle={() => toggleExpanded(project.id)}
                  />
                ))
              ) : (
                <Reveal>
                  <div className="pf__empty">
                    <p>No projects match that filter.</p>
                    <Magnetic strength={0.4}>
                      <button
                        className="pf__reset"
                        onClick={() => { setFilter("all"); setSearchQuery(""); }}
                      >
                        Reset
                      </button>
                    </Magnetic>
                  </div>
                </Reveal>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
}

export default Portfolio;
