import React from 'react';

/* ═══════════════════════════════════════════════════
   SHIMMER SKELETON GRID
   ═══════════════════════════════════════════════════ */
export default function SkeletonGrid() {
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
