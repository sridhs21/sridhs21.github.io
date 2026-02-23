import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
  useInView,
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
   Magnetic cursor dot for submit button
   ───────────────────────────────────────────── */
function MagneticButton({ children, className, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   FloatingField — grid-based floating label
   ───────────────────────────────────────────── */
function FloatingField({ label, name, type = "text", value, onChange, required, textarea, rows, fullWidth }) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <motion.div
      className={`ct__field-wrap${fullWidth ? " ct__field-wrap--full" : ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Tag
        className="ct__field-input"
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
      <label className="ct__field-label" htmlFor={name}>
        {label}
      </label>
      <motion.div
        className="ct__field-bar"
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Contact Strip Row
   ───────────────────────────────────────────── */
function ContactStrip({ num, icon: Icon, label, value, href, children, extraClass = "", index = 0 }) {
  return (
    <motion.div
      className={`ct__strip ${extraClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="ct__strip-num">{num}</span>

      <span className="ct__strip-label">
        <span className="ct__strip-icon">
          <Icon size={14} />
        </span>
        {label}
      </span>

      <div className="ct__strip-value-area">
        {children ? (
          <div className="ct__strip-value">{children}</div>
        ) : href ? (
          <a href={href} className="ct__strip-value">
            {value}
          </a>
        ) : (
          <span className="ct__strip-value">{value}</span>
        )}
      </div>

      {href && (
        <div className="ct__strip-arrow">
          <ArrowUpRight size={16} />
        </div>
      )}
      {!href && !children && <div style={{ width: 36 }} />}
      {children && <div style={{ width: 36 }} />}
    </motion.div>
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

    const serviceId = "service_xl68yuu";
    const templateId = "template_doyovp1";
    const publicKey = "iw2dcI-RAAi9DNiD6";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        setSubmitStatus({ success: true, message: "Message sent — I'll be in touch soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        setSubmitStatus({ success: false, message: "Something went wrong. Please try again." });
      })
      .finally(() => setIsSubmitting(false));
  };

  const titleWord1 = "get in";
  const titleWord2 = "touch.";

  /* stagger delay for title chars */
  let charIndex = 0;

  return (
    <div className="ct">
      {/* ════════════════════ HERO ════════════════════ */}
      <section className="ct__hero">
        {/* watermark bg text */}
        <motion.div
          className="ct__hero-bg-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          aria-hidden="true"
        >
          CONTACT
        </motion.div>

        <div className="ct__hero-inner">
          {/* eyebrow */}
          <motion.div
            className="ct__eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="ct__eyebrow-line" />
            <span className="ct__eyebrow-text">Let's connect</span>
          </motion.div>

          {/* hero title — two lines with char animation */}
          <h1 className="ct__hero-title" aria-label="get in touch">
            {/* line 1 */}
            {titleWord1.split("").map((char, i) => {
              const delay = 0.1 + charIndex++ * 0.04;
              return (
                <motion.span
                  key={`w1-${i}`}
                  className="ct__hero-title-char"
                  initial={{ opacity: 0, y: 60, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char === " " ? "\u00a0" : char}
                </motion.span>
              );
            })}

            {/* force newline */}
            <span style={{ flexBasis: "100%", height: 0 }} aria-hidden="true" />

            {/* line 2 italic gold */}
            <em aria-hidden="true">
              {titleWord2.split("").map((char, i) => {
                const delay = 0.1 + charIndex++ * 0.04;
                return (
                  <motion.span
                    key={`w2-${i}`}
                    className="ct__hero-title-char"
                    initial={{ opacity: 0, y: 60, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char === " " ? "\u00a0" : char}
                  </motion.span>
                );
              })}
            </em>
          </h1>

          {/* subline */}
          <motion.div
            className="ct__hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="ct__hero-desc">
              Open to new opportunities, collaborations, and interesting conversations. Drop me a line — I respond to everything.
            </p>
            <div className="ct__hero-scroll">
              <motion.div
                className="ct__scroll-dot"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              <span>Scroll to form</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ DIVIDER ════════════════════ */}
      <div className="ct__divider">
        <motion.div
          className="ct__divider-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left center" }}
        />
      </div>

      {/* ════════════════════ STRIPS ════════════════════ */}
      <div className="ct__strips">
        <ContactStrip
          num="01"
          icon={Mail}
          label="Email"
          value="swaroop.sridhar21@gmail.com"
          href="mailto:swaroop.sridhar21@gmail.com"
          index={0}
        />
        <ContactStrip
          num="02"
          icon={Phone}
          label="Phone"
          value="+1 (781) 535-7045"
          href="tel:+17815357045"
          index={1}
        />
        <ContactStrip
          num="03"
          icon={MapPin}
          label="Location"
          value="Nashua, New Hampshire, United States"
          index={2}
        />
        <ContactStrip
          num="04"
          icon={Linkedin}
          label="Social"
          extraClass="ct__strip--socials"
          index={3}
        >
          <a
            href="https://linkedin.com/in/swaroop-sridhar"
            target="_blank"
            rel="noopener noreferrer"
            className="ct__social-pill"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/sridhs21"
            target="_blank"
            rel="noopener noreferrer"
            className="ct__social-pill"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
        </ContactStrip>
      </div>

      {/* ════════════════════ FORM ════════════════════ */}
      <section className="ct__form-section">
        <motion.div
          className="ct__form-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="ct__form-heading">
            Send a <em>message.</em>
          </h2>
          <p className="ct__form-note">
            All fields<br />are required
          </p>
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="ct__form"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <FloatingField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FloatingField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FloatingField
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            fullWidth
          />
          <FloatingField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            textarea
            rows={7}
            fullWidth
          />

          {/* footer */}
          <div className="ct__form-footer">
            <AnimatePresence mode="wait">
              {submitStatus.message ? (
                <motion.div
                  key="status"
                  className={`ct__status ${submitStatus.success ? "ct__status--ok" : "ct__status--err"}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  {submitStatus.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  <span>{submitStatus.message}</span>
                </motion.div>
              ) : (
                <motion.span
                  key="hint"
                  className="ct__form-note"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "left" }}
                >
                  I typically reply<br />within 24 hours
                </motion.span>
              )}
            </AnimatePresence>

            <MagneticButton
              type="submit"
              disabled={isSubmitting}
              className="ct__submit"
            >
              {isSubmitting ? (
                <>
                  <span className="ct__spinner" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </MagneticButton>
          </div>
        </motion.form>
      </section>
    </div>
  );
}

export default Contact;