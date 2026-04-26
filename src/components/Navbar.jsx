import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { GOLD, LOGO_SRC } from "../constants";

const NAV_LINKS = [
  { label: "الرئيسية", to: "/" },
  { label: "الخدمات", to: "/services" },
  { label: "عن العيادة", to: "/about" },
  { label: "تواصل معنا", to: "/contact" },
  { label: "الاستراحة", to: "/lounge" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Optimized scroll handler with debouncing
  useEffect(() => {
    let ticking = false;

    const fn = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          setScrolled(isScrolled);
          if (isScrolled) setMenuOpen(false);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "0.8rem clamp(1rem, 4%, 4rem)" : "1.2rem clamp(1rem, 4%, 4rem)",
          background: scrolled ? "rgba(5,5,5,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
          transition: "all 0.5s ease",
          fontFamily: "'Alexandria', sans-serif",
          flexWrap: window.innerWidth < 768 ? "wrap" : "nowrap",
          width: "100%",
        }}
        className="nav-pad"
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.65rem", textDecoration: "none" }}>
          <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.25 }}>
            <img src={LOGO_SRC} alt="logo" style={{ width: 50, height: 50, objectFit: "contain" }} />
          </motion.div>
          <span style={{ fontWeight: 500, fontSize: 15, color: "#fff", letterSpacing: "0.02em" }}>
            عيادات الموسوي
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: 13,
                fontWeight: isActive(link.to) ? 500 : 300,
                color: isActive(link.to) ? GOLD : "rgba(255,255,255,0.6)",
                textDecoration: "none",
                padding: "0.4rem 0.9rem",
                borderRadius: 100,
                background: isActive(link.to) ? "rgba(212,175,55,0.1)" : "transparent",
                border: isActive(link.to) ? "1px solid rgba(212,175,55,0.2)" : "1px solid transparent",
                transition: "all 0.3s ease",
                fontFamily: "'Alexandria', sans-serif",
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.to)) {
                  e.target.style.color = "rgba(255,255,255,0.9)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.to)) {
                  e.target.style.color = "rgba(255,255,255,0.6)";
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.a
          href="https://wa.me/9647731450750"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta-desktop"
          whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(212,175,55,0.25)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: window.innerWidth < 768 ? "none" : "flex",
            alignItems: "center", gap: 7,
            background: GOLD, color: "#050505",
            padding: window.innerWidth < 768 ? "0.5rem 0.8rem" : "0.55rem 1.3rem",
            borderRadius: 100,
            fontSize: window.innerWidth < 768 ? 12 : 13,
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "'Alexandria', sans-serif",
            whiteSpace: "nowrap",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <MessageCircle size={window.innerWidth < 768 ? 12 : 14} /> احجز الآن
        </motion.a>

        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label="القائمة"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            width: 40, height: 40,
            display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            gap: 5, cursor: "pointer",
            willChange: "transform",
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={menuOpen ? (i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 8 } : { rotate: -45, y: -8 }) : { rotate: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: "block", width: 18, height: 1.5, background: "#fff", borderRadius: 2, willChange: "transform" }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu - Optimized */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mobile-menu-overlay"
              onClick={() => setMenuOpen(false)}
              style={{ willChange: "opacity" }}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="mobile-menu"
              style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 195,
                background: "rgba(7,7,7,0.98)",
                backdropFilter: "blur(32px)",
                borderBottom: "1px solid rgba(212,175,55,0.12)",
                padding: "5.5rem 2rem 2.5rem",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      fontSize: 18,
                      fontWeight: isActive(link.to) ? 600 : 300,
                      color: isActive(link.to) ? GOLD : "rgba(255,255,255,0.75)",
                      textDecoration: "none",
                      padding: "0.9rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      fontFamily: "'Alexandria', sans-serif",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="https://wa.me/9647731450750"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: GOLD, color: "#050505",
                  padding: "0.9rem 2rem", borderRadius: 100,
                  fontSize: 15, fontWeight: 700, textDecoration: "none",
                  marginTop: "1.5rem",
                  fontFamily: "'Alexandria', sans-serif",
                  willChange: "transform, opacity",
                }}
              >
                <MessageCircle size={16} /> احجز عبر واتساب
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
