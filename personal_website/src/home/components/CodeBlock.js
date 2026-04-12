import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

/* ═══════════════════════════════════════════════════
   CODE BLOCK — with optional run output
   ═══════════════════════════════════════════════════ */
export default function CodeBlock({ file, children, output, externalRan, onToggleRun }) {
  const [internalRan, setInternalRan] = useState(false);

  const ran = externalRan !== undefined ? externalRan : internalRan;
  const toggle = onToggleRun || (() => setInternalRan(!internalRan));

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
            onClick={toggle}
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
