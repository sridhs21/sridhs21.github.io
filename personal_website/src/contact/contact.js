import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import "./contact.css";

/* ─────────────────────────────────────────────
   Floating label field
   ───────────────────────────────────────────── */
function FloatingField({ label, name, type = "text", value, onChange, required, textarea, rows, fullWidth }) {
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

/* ═════════════════════════════════════════════
   Contact Page
   ═════════════════════════════════════════════ */
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" });
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    emailjs
      .sendForm("service_xl68yuu", "template_doyovp1", formRef.current, "iw2dcI-RAAi9DNiD6")
      .then(() => {
        setSubmitStatus({ success: true, message: "Sent. I'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        setSubmitStatus({ success: false, message: "Something went wrong. Try again." });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="ct">
      <div className="ct__inner">

        {/* ── Header ── */}
        <header className="ct__header">
          <motion.span
            className="ct__eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            say hello
          </motion.span>

          <motion.h1
            className="ct__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            get in touch
          </motion.h1>

          <motion.p
            className="ct__subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            If you want to talk about a project, an idea, or just something interesting, send me a message. I'll get back to you.
          </motion.p>

          <motion.div
            className="ct__header-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </header>

        {/* ── Contact info ── */}
        <section className="ct__info">
          <div className="ct__info-list">
            <a href="mailto:swaroop.sridhar21@gmail.com" className="ct__info-item">
              <Mail size={14} />
              <span>swaroop.sridhar21@gmail.com</span>
              <ArrowUpRight size={12} className="ct__info-arrow" />
            </a>
            <a href="tel:+17815357045" className="ct__info-item">
              <Phone size={14} />
              <span>+1 (781) 535-7045</span>
              <ArrowUpRight size={12} className="ct__info-arrow" />
            </a>
            <span className="ct__info-item ct__info-item--static">
              <MapPin size={14} />
              <span>Nashua, New Hampshire</span>
            </span>
          </div>

          <div className="ct__socials">
            <a href="https://linkedin.com/in/swaroop-sridhar" target="_blank" rel="noopener noreferrer" className="ct__social">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href="https://github.com/sridhs21" target="_blank" rel="noopener noreferrer" className="ct__social">
              <Github size={14} /> GitHub
            </a>
          </div>
        </section>

        {/* ── Form ── */}
        <section className="ct__form-section">
          <h2 className="ct__form-title">Send a message</h2>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="ct__form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <FloatingField label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <FloatingField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <FloatingField label="Subject" name="subject" value={formData.subject} onChange={handleChange} required fullWidth />
            <FloatingField label="Message" name="message" value={formData.message} onChange={handleChange} required textarea rows={6} fullWidth />

            <div className="ct__form-footer">
              <AnimatePresence mode="wait">
                {submitStatus.message ? (
                  <motion.div
                    key="status"
                    className={`ct__status ${submitStatus.success ? "ct__status--ok" : "ct__status--err"}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {submitStatus.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    <span>{submitStatus.message}</span>
                  </motion.div>
                ) : (
                  <motion.span key="hint" className="ct__hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    I usually reply within a day or so
                  </motion.span>
                )}
              </AnimatePresence>

              <button type="submit" disabled={isSubmitting} className="ct__submit">
                {isSubmitting ? (
                  <><span className="ct__spinner" /> Sending…</>
                ) : (
                  <><Send size={15} /> Send</>
                )}
              </button>
            </div>
          </motion.form>
        </section>

      </div>
    </div>
  );
}

export default Contact;
