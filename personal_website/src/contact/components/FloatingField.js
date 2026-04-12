import React, { useState } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════
   Floating label form field
   ═══════════════════════════════════════════════════ */
export default function FloatingField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  textarea,
  rows,
  fullWidth,
}) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className={`ct__field${fullWidth ? " ct__field--full" : ""}`}>
      <Tag
        className="ct__input"
        name={name}
        id={name}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        required={required}
        rows={textarea ? rows : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
      />
      <label className="ct__label" htmlFor={name}>{label}</label>
      <motion.div
        className="ct__bar"
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
