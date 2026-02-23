import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./navbar/navbar";
import Home from "./home/home";
import Portfolio from "./portfolio/portfolio";
import Repos from "./repos/repos";
import About from "./about/about";
import Contact from "./contact/contact";
import LoadingScreen from "./loading_screen/loading_screen";
import "./App.css";

// ScrollToTop component that will reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = "#060606";

    const checkResourcesLoaded = () => {
      if (document.readyState === "complete") {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    checkResourcesLoaded();
    window.addEventListener("load", checkResourcesLoaded);

    return () => {
      window.removeEventListener("load", checkResourcesLoaded);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#060606",
        minHeight: "100vh",
      }}
    >
      <LoadingScreen isLoading={isLoading} />
      <Router>
        <div
          className="app"
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.5s ease-out",
            visibility: isLoading ? "hidden" : "visible",
            backgroundColor: "#060606",
          }}
        >
          {/* Add ScrollToTop component inside Router */}
          <ScrollToTop />
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/repos" element={<Repos />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;