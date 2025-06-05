import React from "react";
import { BookOpen, GraduationCap, School } from "lucide-react";
import "./about.css";

function About({ isDarkMode }) {
  const education = [
    {
      type: "university",
      year: "2022 - 2026",
      degree: "Bachelor of Science in Computer Science and Information Technology and Web Science",
      concentration: "Machine Learning",
      school: "Rensselaer Polytechnic Institute",
      department: "School of Science",
      location: "Troy, NY",
      logo: "/images/rpi_logo.png", // You'll need to add this image
      description: "Relevant Courses: Data Structures, Introduction to Algorithms, Operating Systems, Principles of Software, Machine Learning and Optimization, AI For Science",
      honors: "Dean's List - Fall 2024"
    },
    {
      type: "highschool",
      year: "2013 - 2022",
      degree: "High School Diploma",
      school: "Academy for Science and Design",
      location: "Nashua, NH",
      logo: "/images/asd_logo.png", // You'll need to add this image
      description: "Relevant Courses: Advanced Computer Science (Java/C++), Advanced Calculus 1/2, Physics 1"
    },
  ];

  const themeClass = isDarkMode ? "dark-mode" : "light-mode";

  return (
    <div className={`about-container ${themeClass}`}>
      <div className="about-content">
        {/* Header Section */}
        <div className="section-header">
          <h1 className="section-title">About Me</h1>
          <div className="section-divider"></div>
        </div>

        {/* Personal Bio Section */}
        <section className="bio-section animate-fade-in animate-delay-1">
          <div className="bio-container">
            {/* Image Section */}
            <div className="bio-image-container">
              <div className={`bio-image-wrapper ${themeClass}`}>
                <img
                  src="/images/about.jpg"
                  alt="Swaroop Sridhar"
                  className="bio-image"
                />
                <div className="bio-image-gradient"></div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bio-content">
              <h2 className={`bio-heading ${themeClass}`}>My Journey</h2>

              <p className={`bio-paragraph ${themeClass}`}>
                Hey there! I'm Swaroop Sridhar, a tech enthusiast and budding
                Computer Scientist who gets genuinely excited about Machine
                Learning, Generative AI, and making sense of data! When I'm not
                coding, you can find me enjoying various outdoor activities and
                spending time with friends or with my dog. I'm currently
                pursuing my Bachelor's at RPI in Computer Science and ITWS,
                where I've found my passion in Machine Learning and can't wait
                to see where it takes me!
              </p>

              <p className={`bio-paragraph ${themeClass}`}>
                My friends tell me I light up when talking about Neural Networks
                or solving tricky programming challenges! Beyond my technical
                interests, I've got a creative side too - whether I'm designing
                intuitive user interfaces, visualizing complex data in
                compelling ways, or bringing artistic elements into my projects.
                I find that this blend of logical and creative thinking helps me
                approach problems from multiple angles. My journey through
                college has been a mix of late-night coding sessions,
                unforgettable hackathons, and gradually building a toolkit of
                algorithms, data structures, and software engineering practices.
              </p>

              <p className={`bio-paragraph ${themeClass}`}>
                I've had a blast working on projects that actually make a
                difference—from building web apps, to designing AI models that
                could have real-world impact, or to tackling algorithm puzzles
                that challenge my thinking! Looking forward, I'm thrilled to
                build on what I've learned and dive into the evolving tech
                landscape. Whether it's pushing the boundaries of responsible
                AI, developing sustainable tech solutions, or creating more
                accessible digital tools, I see endless possibilities. I'm
                pumped about making tech that actually helps people and can't
                wait to team up on cool projects that'll change how we use
                digital stuff every day!
              </p>

              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Languages</div>
                  <div className={`stat-sublabel ${themeClass}`}>
                    Programming & Markup
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Projects</div>
                  <div className={`stat-sublabel ${themeClass}`}>Completed</div>
                </div>

                <div className="stat-item">
                  <div className="stat-number">2026</div>
                  <div className="stat-label">Graduation</div>
                  <div className={`stat-sublabel ${themeClass}`}>Expected</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="education-section animate-fade-in animate-delay-2">
          <div className="section-header-with-icon">
            <BookOpen size={28} color="#00b4d8" />
            <h2>Education</h2>
          </div>

          <div className={`education-card ${themeClass}`}>
            {education.map((item, index) => (
              <div
                key={index}
                className={`education-item ${
                  index === education.length - 1 ? "last-item" : ""
                } ${themeClass}`}
              >
                <div className="education-header">
                  <div className="education-main-info">
                    <div className="education-logo-container">
                      <img 
                        src={item.logo} 
                        alt={`${item.school} logo`}
                        className="education-logo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="education-icon-fallback">
                        {item.type === 'university' ? 
                          <GraduationCap size={24} color="#00b4d8" /> : 
                          <School size={24} color="#00b4d8" />
                        }
                      </div>
                    </div>
                    <div className="education-text-info">
                      <h3 className={`education-degree ${themeClass}`}>
                        {item.degree}
                      </h3>
                      <h4 className={`education-school ${themeClass}`}>
                        {item.school}
                        {item.department && <span className="education-department"> - {item.department}</span>}
                      </h4>
                      {item.concentration && (
                        <h5 className="education-concentration">
                          Concentration: {item.concentration}
                        </h5>
                      )}
                      <div className="education-location">
                        📍 {item.location}
                      </div>
                    </div>
                  </div>
                  <span className="education-year">{item.year}</span>
                </div>

                <div className="education-details">
                  {item.gpa && (
                    <div className="education-gpa">
                      <strong>GPA:</strong> {item.gpa}
                    </div>
                  )}
                  {item.honors && (
                    <div className="education-honors">
                      <strong>Honors:</strong> {item.honors}
                    </div>
                  )}
                  <p className={`education-description ${themeClass} ${item.type === 'highschool' ? 'highschool-description' : ''}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;