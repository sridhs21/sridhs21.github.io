import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, ChevronDown } from "lucide-react";
import { getCategoryLabel } from "../data";

/* ═══════════════════════════════════════════════════
   Portfolio project row (expand/collapse)
   ═══════════════════════════════════════════════════ */
function ProjectRow({ project, index, expanded, onToggle }) {
  return (
    <motion.div
      className="pf__item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pf__item-top" onClick={onToggle}>
        <div className="pf__item-main">
          <h3 className="pf__item-title">{project.title}</h3>
          <p className="pf__item-desc">{project.description}</p>
        </div>
        <div className="pf__item-right">
          <div className="pf__item-cats">
            {project.categories.map((cat) => (
              <span key={cat} className="pf__cat">{getCategoryLabel(cat)}</span>
            ))}
          </div>
          <motion.span
            className="pf__item-chevron"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="pf__item-detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pf__item-detail-inner">
              <p className="pf__item-long">{project.longDescription}</p>

              <div className="pf__item-techs">
                {project.technologies.map((tech) => (
                  <span key={tech} className="pf__tech">{tech}</span>
                ))}
              </div>

              <div className="pf__item-links">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf__link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={14} /> GitHub <ArrowUpRight size={12} />
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf__link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} /> Demo <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* Avoid re-renders when sibling state (e.g. other rows) changes. */
export default React.memo(ProjectRow);
