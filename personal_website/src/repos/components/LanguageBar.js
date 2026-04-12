import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { langColor } from '../constants';

/* ═══════════════════════════════════════════════════
   LANGUAGE DISTRIBUTION BAR  (spring-animated segs)
   ═══════════════════════════════════════════════════ */
export default function LanguageBar({ stats }) {
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
