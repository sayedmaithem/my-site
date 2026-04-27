import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Lounge from "./pages/Lounge";
import Video from "./pages/Video";
import Articles from "./pages/Articles";
import ArticleCategory from "./pages/ArticleCategory";
import ArticleDetail from "./pages/ArticleDetail";

// Pages that should NOT show the shared Footer
const NO_FOOTER = ["/lounge"];

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const showFooter = !NO_FOOTER.includes(location.pathname);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/lounge" element={<PageWrapper><Lounge /></PageWrapper>} />
          <Route path="/video" element={<PageWrapper><Video /></PageWrapper>} />
          <Route path="/article" element={<PageWrapper><Articles /></PageWrapper>} />
          <Route path="/article/:categorySlug" element={<PageWrapper><ArticleCategory /></PageWrapper>} />
          <Route path="/article/:categorySlug/:articleSlug" element={<PageWrapper><ArticleDetail /></PageWrapper>} />
          <Route path="/articles" element={<PageWrapper><Articles /></PageWrapper>} />
          {/* 404 fallback */}
          <Route path="*" element={
            <PageWrapper>
              <div dir="rtl" style={{ fontFamily: "'Alexandria', sans-serif", background: "#050505", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", paddingTop: "80px", textAlign: "center" }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;700&display=swap');`}</style>
                <h1 style={{ fontSize: "6rem", fontWeight: 900, color: "#D4AF37", lineHeight: 1 }}>404</h1>
                <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "#9CA3AF" }}>الصفحة غير موجودة</p>
                <a href="/" style={{ marginTop: "1rem", color: "#D4AF37", textDecoration: "none", fontSize: 14, border: "1px solid rgba(212,175,55,0.3)", padding: "0.6rem 1.5rem", borderRadius: 100 }}>العودة للرئيسية</a>
              </div>
            </PageWrapper>
          } />
        </Routes>
      </AnimatePresence>
      {showFooter && (
        <div dir="rtl" style={{ background: "#050505", position: "relative", zIndex: 1 }}>
          <Footer />
        </div>
      )}
    </>
  );
}
