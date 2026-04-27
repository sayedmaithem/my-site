import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronRight } from "lucide-react";
import { GOLD } from "../constants";
import { getArticlesByCategorySlug, getCategoryBySlug } from "../data/articleLibrary";

export default function ArticleCategory() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  const articles = getArticlesByCategorySlug(categorySlug);

  if (!category) {
    return (
      <div dir="rtl" style={{ fontFamily: "'Alexandria', sans-serif", background: "#050505", color: "#fff", minHeight: "100vh", paddingTop: "100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>القسم غير موجود</h1>
          <Link to="/article" style={{ color: GOLD, textDecoration: "none" }}>العودة إلى أقسام المقالات</Link>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ fontFamily: "'Alexandria', sans-serif", background: "#050505", color: "#fff", minHeight: "100vh", paddingTop: "90px", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@200;300;400;500;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .article-cards { display: grid; gap: 18px; }
        @media (min-width: 768px) {
          .article-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 58% at 50% 0%, rgba(27,22,18,0.78) 0%, #050505 62%)" }} />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "0 1.25rem 6rem" }}>
        <section style={{ maxWidth: 760, padding: "2.8rem 0 3rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", color: GOLD, fontSize: 12, marginBottom: "1rem" }}>
            <Link to="/article" style={{ color: GOLD, textDecoration: "none" }}>المقالات</Link>
            <ChevronRight size={14} />
            <span>{category.shortTitle}</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ fontWeight: 900, fontSize: "clamp(2.1rem, 5vw, 4.4rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
            {category.title}
          </motion.h1>
          <p style={{ color: "#A1A1AA", lineHeight: 1.95, fontSize: "1rem", fontWeight: 300 }}>{category.desc}</p>
        </section>

        <section className="article-cards">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              style={{ background: "linear-gradient(180deg, rgba(16,16,16,0.98) 0%, rgba(10,10,10,0.98) 100%)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "1.45rem" }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: GOLD, fontSize: 11, marginBottom: "1rem" }}>
                <BookOpen size={14} />
                مقال تعليمي
              </div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.7rem", lineHeight: 1.45 }}>{article.title}</h2>
              <p style={{ color: "#D4AF37", fontSize: 14, marginBottom: "0.8rem" }}>{article.subtitle}</p>
              <p style={{ color: "#A1A1AA", lineHeight: 1.9, fontSize: 14, fontWeight: 300, marginBottom: "1.2rem" }}>{article.teaser}</p>
              <Link
                to={`/article/${category.slug}/${article.slug}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, color: GOLD, textDecoration: "none", fontSize: 14 }}
              >
                اقرأ المقال <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}
