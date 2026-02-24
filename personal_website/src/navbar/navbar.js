import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";

var NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Repos", path: "/repos" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function Navbar(props) {
  var _open = useState(false);
  var isOpen = _open[0];
  var setIsOpen = _open[1];

  var _scroll = useState(false);
  var isScrolled = _scroll[0];
  var setIsScrolled = _scroll[1];

  var _hover = useState(null);
  var hoveredIdx = _hover[0];
  var setHoveredIdx = _hover[1];

  /* dot indicator position */
  var _dot = useState({ x: 0, show: false });
  var dot = _dot[0];
  var setDot = _dot[1];

  var linksRef = useRef(null);
  var navigate = useNavigate();
  var location = useLocation();

  var go = function (path) {
    navigate(path);
    setIsOpen(false);
  };

  /* scroll listener */
  useEffect(function () {
    var tick = function () { setIsScrolled(window.scrollY > 30); };
    window.addEventListener("scroll", tick, { passive: true });
    return function () { window.removeEventListener("scroll", tick); };
  }, []);

  /* close on route */
  useEffect(function () { setIsOpen(false); }, [location.pathname]);

  /* body lock */
  useEffect(function () {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return function () { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* position the active dot under the active link */
  var syncDot = useCallback(function () {
    if (!linksRef.current) return;
    var box = linksRef.current;
    var el = box.querySelector(".e-link--active");
    if (el) {
      var bRect = box.getBoundingClientRect();
      var eRect = el.getBoundingClientRect();
      setDot({ x: eRect.left - bRect.left + eRect.width / 2, show: true });
    } else {
      setDot({ x: 0, show: false });
    }
  }, []);

  useEffect(function () {
    syncDot();
    window.addEventListener("resize", syncDot);
    return function () { window.removeEventListener("resize", syncDot); };
  }, [location.pathname, syncDot]);

  useEffect(function () {
    var t = setTimeout(syncDot, 80);
    return function () { clearTimeout(t); };
  }, [location.pathname, syncDot]);

  var cls = "e-nav" +
    (isScrolled ? " e-nav--solid" : "") +
    (isOpen ? " e-nav--open" : "");

  return React.createElement(
    React.Fragment, null,

    /* ═══ NAV BAR ═══ */
    React.createElement(
      "nav", { className: cls },
      React.createElement(
        "div", { className: "e-nav__inner" },

        /* brand */
        React.createElement(
          Link,
          { to: "/", className: "e-brand", onClick: function () { go("/"); } },
          "ss"
        ),

        /* center links with slash separators */
        React.createElement(
          "div", { className: "e-links", ref: linksRef },

          /* floating dot indicator */
          dot.show && React.createElement("span", {
            className: "e-dot",
            style: { left: dot.x + "px" },
          }),

          NAV_ITEMS.map(function (item, i) {
            var isActive = location.pathname === item.path ||
              (item.path === "/" && location.pathname === "/home");
            return React.createElement(
              React.Fragment, { key: item.label },
              i > 0 && React.createElement("span", { className: "e-sep" }, "/"),
              React.createElement(
                Link,
                {
                  to: item.path,
                  className: "e-link" + (isActive ? " e-link--active" : ""),
                  onClick: function () { go(item.path); },
                  onMouseEnter: function () { setHoveredIdx(i); },
                  onMouseLeave: function () { setHoveredIdx(null); },
                },
                item.label.toLowerCase()
              )
            );
          })
        ),

        /* right side */
        React.createElement(
          "div", { className: "e-actions" },

          /* resume */
          React.createElement(
            "a",
            {
              className: "e-resume",
              href: "/files/Swaroop_Sridhar_Resume.pdf",
              target: "_blank",
              rel: "noopener noreferrer",
            },
            "r\u00E9sum\u00E9"
          ),
          React.createElement(
            "a",
            {
              className: "e-resume",
              href: "/files/SwaroopSridhar_CV.pdf",
              target: "_blank",
              rel: "noopener noreferrer",
            },
            "curr\u00EDculum vitae"
          ),

          /* toggle button — circle that becomes ring */
          React.createElement(
            "button",
            {
              className: "e-toggle" + (isOpen ? " e-toggle--open" : ""),
              onClick: function () { setIsOpen(!isOpen); },
              "aria-label": isOpen ? "Close" : "Menu",
            },
            React.createElement("span", { className: "e-toggle__dot" })
          )
        )
      )
    ),

    /* ═══ BOTTOM SHEET MOBILE MENU ═══ */
    React.createElement(
      "div", { className: "e-sheet" + (isOpen ? " e-sheet--open" : "") },

      /* backdrop */
      React.createElement("div", {
        className: "e-sheet__backdrop",
        onClick: function () { setIsOpen(false); },
      }),

      /* sheet panel */
      React.createElement(
        "div", { className: "e-sheet__panel" },

        /* drag handle */
        React.createElement("div", { className: "e-sheet__handle" }),

        /* links */
        React.createElement(
          "div", { className: "e-sheet__links" },
          NAV_ITEMS.map(function (item, i) {
            var isActive = location.pathname === item.path ||
              (item.path === "/" && location.pathname === "/home");
            return React.createElement(
              Link,
              {
                key: item.label,
                to: item.path,
                className: "e-sheet__link" + (isActive ? " e-sheet__link--active" : ""),
                onClick: function () { go(item.path); },
                style: { transitionDelay: isOpen ? (i * 0.04 + 0.2) + "s" : "0s" },
              },
              React.createElement("span", { className: "e-sheet__link-text" }, item.label),
              isActive && React.createElement("span", { className: "e-sheet__link-dot" })
            );
          }),
          React.createElement(
            "a",
            {
                className: "e-sheet__link",
                href: "/files/Swaroop_Sridhar_Resume.pdf",
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: function () { setIsOpen(false); },
                style: { transitionDelay: isOpen ? (NAV_ITEMS.length * 0.04 + 0.2) + "s" : "0s" },
              },
              React.createElement("span", { className: "e-sheet__link-text" }, "R\u00E9sum\u00E9"),
              React.createElement("span", { className: "e-sheet__link-arrow" }, "\u2197")
            ),
            React.createElement(
              "a",
              {
                className: "e-sheet__link",
                href: "/files/SwaroopSridhar_CV.pdf",
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: function () { setIsOpen(false); },
                style: { transitionDelay: isOpen ? (NAV_ITEMS.length * 0.04 + 0.25) + "s" : "0s" },
              },
              React.createElement("span", { className: "e-sheet__link-text" }, "curr\u00EDculum vitae"),
              React.createElement("span", { className: "e-sheet__link-arrow" }, "\u2197")
          )
        ),

        /* footer */
        React.createElement(
          "div",
          {
            className: "e-sheet__footer",
            style: { transitionDelay: isOpen ? "0.5s" : "0s" },
          },
          "\u00A9 2026"
        )
      )
    )
  );
}

export default Navbar;
