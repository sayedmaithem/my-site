import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, BookOpen, CircleCheck } from "lucide-react";
import { GOLD } from "../constants";
import { ARTICLE_CATEGORIES, getArticlesByCategorySlug } from "../data/articleLibrary";

function Reveal({ children, delay = 0, y = 26 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Articles() {
  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Alexandria', sans-serif",
        background: "#050505",
        color: "#fff",
        minHeight: "100vh",
        paddingTop: "90px",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@200;300;400;500;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .category-grid { display: grid; gap: 16px; }
        @media (min-width: 768px) {
          .category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 58% at 50% 0%, rgba(27,22,18,0.78) 0%, #050505 62%)",
        }}
      />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "0 1.25rem 7rem" }}>
        <section style={{ textAlign: "center", maxWidth: 760, margin: "0 auto", padding: "2.8rem 0 4rem" }}>
          <Reveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: 999,
                padding: "0.45rem 1rem",
                color: GOLD,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              <BookOpen size={15} />
              مساحة توعوية لمرضى العيادة
            </div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.3rem, 6vw, 4.8rem)", lineHeight: 1.08, margin: "1.3rem 0 1rem" }}>
              أقسام
              <br />
              <span style={{ color: GOLD, fontWeight: 300, fontStyle: "italic" }}>المقالات</span>
            </h1>
            <p style={{ color: "#A1A1AA", fontSize: "clamp(0.95rem, 1.6vw, 1.08rem)", lineHeight: 1.95, fontWeight: 300 }}>
              اختر القسم الذي يهمك، وبعدها تنتقل إلى المقالات الموجودة داخله، ثم تختار المقال التعليمي الذي تحتاجه.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "1.3rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.18em", marginBottom: "0.6rem" }}>تصنيفات المقالات</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700 }}>مكتبة منظمة حسب نوع العلاج</h2>
              </div>
              <Link to="/services" style={{ color: GOLD, textDecoration: "none", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
                خدمات العيادة <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="category-grid">
            {ARTICLE_CATEGORIES.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.06}>
                <Link
                  to={`/article/${category.slug}`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    height: "100%",
                    background: "rgba(212,175,55,0.04)",
                    border: "1px solid rgba(212,175,55,0.12)",
                    borderRadius: 22,
                    padding: "1.5rem",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: "1rem", fontSize: 11, color: GOLD }}>
                    <CircleCheck size={14} />
                    {getArticlesByCategorySlug(category.slug).length} مقال
                  </span>
                  <h3 style={{ fontSize: "1.12rem", fontWeight: 700, marginBottom: "0.7rem", color: "#fff" }}>{category.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.9, fontWeight: 300 }}>{category.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
