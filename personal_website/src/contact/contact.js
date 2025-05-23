import React, { useState, useRef } from "react";
import { Mail, Phone, Linkedin, Github, Send, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import "./contact.css";

function Contact({ isDarkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        console.log("Email sent successfully:", result.text);
        setSubmitStatus({
          success: true,
          message: "Thank you for your message! I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Email sending failed:", error.text);
        setSubmitStatus({
          success: false,
          message:
            "Sorry, there was a problem sending your message. Please try again later.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const themeClass = isDarkMode ? "dark-mode" : "light-mode";

  return (
    <div className={`contact-container ${themeClass}`}>
      <div className="contact-content">
        {/* Header Section */}
        <div className="section-header">
          <h1 className="section-title">Get In Touch</h1>
          <div className="section-divider"></div>
        </div>

        <div className="contact-layout">
          {/* Contact Information */}
          <div className="contact-info">
            <h2 className={`contact-info-title ${themeClass}`}>
              Contact Information
            </h2>

            <div className={`contact-info-card ${themeClass}`}>
              <div className="contact-item">
                <div className="contact-item-header">
                  <Mail size={20} color="#00b4d8" />
                  <h3 className={`contact-item-title ${themeClass}`}>Email</h3>
                </div>
                <a
                  href="mailto:swaroop.sridhar21@gmail.com"
                  className={`contact-link ${themeClass}`}
                >
                  swaroop.sridhar21@gmail.com
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-item-header">
                  <Phone size={20} color="#00b4d8" />
                  <h3 className={`contact-item-title ${themeClass}`}>Phone</h3>
                </div>
                <a
                  href="tel:+17815357045"
                  className={`contact-link ${themeClass}`}
                >
                  +1 (781) 535-7045
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-item-header">
                  <MapPin size={20} color="#00b4d8" />
                  <h3 className={`contact-item-title ${themeClass}`}>
                    Location
                  </h3>
                </div>
                <p className={`contact-text ${themeClass}`}>
                  Nashua, New Hampshire, United States
                </p>
              </div>

              <div>
                <h3 className={`social-media-title ${themeClass}`}>
                  Social Media
                </h3>
                <div className="social-links">
                  <a
                    href="https://linkedin.com/in/swaroop-sridhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${themeClass}`}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/sridhs21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${themeClass}`}
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2 className={`contact-form-title ${themeClass}`}>
              Send Me a Message
            </h2>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`contact-form ${themeClass}`}
            >
              {/* Form Status Message */}
              {submitStatus.message && (
                <div
                  className={`form-status ${
                    submitStatus.success
                      ? "form-status-success"
                      : "form-status-error"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className={`form-label ${themeClass}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${themeClass}`}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className={`form-label ${themeClass}`}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${themeClass}`}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                <label htmlFor="subject" className={`form-label ${themeClass}`}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={`form-control ${themeClass}`}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "2rem" }}>
                <label htmlFor="message" className={`form-label ${themeClass}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-control ${themeClass}`}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;