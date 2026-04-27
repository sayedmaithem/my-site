import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, CircleCheck, MessageCircle } from "lucide-react";
import { CONTACT, GOLD } from "../constants";
import { getArticleBySlugs, getCategoryBySlug } from "../data/articleLibrary";

export default function ArticleDetail() {
  const { categorySlug, articleSlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  const article = getArticleBySlugs(categorySlug, articleSlug);

  if (!category || !article) {
    return (
      <div dir="rtl" style={{ fontFamily: "'Alexandria', sans-serif", background: "#050505", color: "#fff", minHeight: "100vh", paddingTop: "100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>المقال غير موجود</h1>
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
        .prose-grid { display: grid; gap: 18px; }
        @media (min-width: 768px) {
          .prose-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 58% at 50% 0%, rgba(27,22,18,0.78) 0%, #050505 62%)" }} />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "0 1.25rem 6rem" }}>
        <section style={{ padding: "2.8rem 0 2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", color: GOLD, fontSize: 12, marginBottom: "1rem", flexWrap: "wrap" }}>
            <Link to="/article" style={{ color: GOLD, textDecoration: "none" }}>المقالات</Link>
            <ChevronRight size={14} />
            <Link to={`/article/${category.slug}`} style={{ color: GOLD, textDecoration: "none" }}>{category.shortTitle}</Link>
            <ChevronRight size={14} />
            <span>{article.title}</span>
          </div>

          <div style={{ background: "linear-gradient(180deg, rgba(16,16,16,0.98) 0%, rgba(10,10,10,0.98) 100%)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 28, overflow: "hidden", boxShadow: "0 30px 90px rgba(0,0,0,0.3)" }}>
            <div style={{ padding: "1.25rem 1.25rem 0" }}>
              <div style={{ borderRadius: 22, padding: "1.35rem", background: "radial-gradient(circle at top right, rgba(212,175,55,0.14), transparent 38%), linear-gradient(180deg, rgba(18,18,18,0.95), rgba(12,12,12,0.92))", border: "1px solid rgba(212,175,55,0.12)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", marginBottom: "1rem" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.42rem 0.8rem", borderRadius: 999, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.16)", color: GOLD, fontSize: 11 }}>
                    <BookOpen size={13} />
                    {article.categoryTitle}
                  </span>
                  <span style={{ padding: "0.42rem 0.8rem", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", color: "#A1A1AA", fontSize: 11 }}>
                    مقال تعليمي
                  </span>
                </div>

                <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                  style={{ fontWeight: 800, fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: "0.9rem" }}>
                  {article.title}
                  <br />
                  <span style={{ color: GOLD, fontWeight: 300, fontStyle: "italic" }}>{article.subtitle}</span>
                </motion.h1>

                <p style={{ color: "#B3B3BC", fontSize: 15, lineHeight: 2, fontWeight: 300, maxWidth: 760 }}>
                  {article.intro}
                </p>
              </div>
            </div>

            <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
              <div style={{ background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 22, padding: "1.4rem", marginBottom: "1.2rem" }}>
                <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.16em", marginBottom: "0.9rem" }}>أهم النقاط</p>
                <div style={{ display: "grid", gap: "0.8rem" }}>
                  {article.points.map((point) => (
                    <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <CircleCheck size={17} color={GOLD} style={{ flexShrink: 0, marginTop: 3 }} />
                      <p style={{ color: "#D4D4D8", fontSize: 14, lineHeight: 1.9, fontWeight: 300 }}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="prose-grid">
                {article.sections.map((section, index) => (
                  <motion.section
                    key={section.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    style={{ height: "100%", background: index % 2 === 0 ? "#0D0D0D" : "#101010", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "1.3rem" }}
                  >
                    <h3 style={{ fontSize: "1.02rem", fontWeight: 700, marginBottom: "0.7rem", color: "#fff" }}>{section.title}</h3>
                    <p style={{ color: "#A1A1AA", fontSize: 14, lineHeight: 2, fontWeight: 300 }}>{section.body}</p>
                  </motion.section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: "2rem", background: "#0D0D0D", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "1.4rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.16em", marginBottom: "0.5rem" }}>إذا عندك سؤال عن حالتك</p>
            <p style={{ color: "#D4D4D8", lineHeight: 1.9, fontSize: 14, fontWeight: 300 }}>
              هذه المقالات للتوعية والتعليم، لكن التشخيص الدقيق دائماً يحتاج فحص مباشر حسب حالتك.
            </p>
          </div>
          <a
            href={CONTACT.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", background: GOLD, color: "#050505", minHeight: 50, borderRadius: 999, padding: "0 1.4rem", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}
          >
            <MessageCircle size={16} />
            احجز استشارة عبر واتساب
          </a>
        </section>
      </main>
    </div>
  );
}
