import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { GOLD, SERVICES } from "../constants";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >{children}</motion.div>
  );
}

const CATEGORIES = [
  { id: "all", label: "الكل" },
  { id: "cosmetic", label: "التجميل" },
  { id: "root", label: "علاج العصب" },
  { id: "surgery", label: "الجراحة" },
  { id: "cleaning", label: "التنظيف" },
];

const SERVICE_CATEGORIES = {
  "الحشوات الضوئية التجميلية": "cosmetic",
  "بروتوكول التنظيف السويسري": "cleaning",
  "تنظيف الأسنان الاعتيادي": "cleaning",
  "التجميل اللاجراحي": "cosmetic",
  "تغليف الزيركون": "cosmetic",
  "علاج العصب المجهري": "root",
  "استخراج الأدوات المكسورة": "root",
  "فتح وإيجاد القنوات": "root",
  "تصميم الابتسامة المخصص": "cosmetic",
  "زراعة الأسنان الموجهة": "surgery",
  "التقويم المتقدم": "cosmetic",
  "القلع الجراحي": "surgery",
  "القلع الاعتيادي": "surgery",
};

export default function Services() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? SERVICES
    : SERVICES.filter(s => SERVICE_CATEGORIES[s.name] === activeCategory);

  return (
    <div dir="rtl" style={{ fontFamily: "'Alexandria', sans-serif", background: "#050505", color: "#fff", minHeight: "100vh", paddingTop: "90px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@200;300;400;500;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .service-row { flex-wrap: wrap !important; gap: 0.5rem !important; }
        .service-price-col { min-width: auto !important; text-align: right !important; }
        @media (min-width: 768px) {
          .service-row { flex-wrap: nowrap !important; }
          .service-price-col { min-width: 100px !important; }
        }
      `}</style>

      {/* Ambient */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(26,20,18,0.7) 0%, #050505 60%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 8rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "3rem 0 4rem" }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>الخدمات الطبية</p>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.5rem,6vw,5rem)", color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              قائمة<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: GOLD }}>الامتياز</span>
            </h1>
            <p style={{ fontSize: "clamp(0.9rem,1.3vw,1.05rem)", fontWeight: 300, color: "#9CA3AF", lineHeight: 1.9, maxWidth: 520, margin: "0 auto" }}>
              كل خدمة مصممة لتقديم أعلى معايير الجودة والدقة.<br />
              الأسعار تقريبية وقد تختلف حسب الحالة.
            </p>
          </Reveal>
        </div>

        {/* Filter tabs */}
        <Reveal delay={0.15}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setExpandedRow(null); }}
                style={{
                  background: activeCategory === cat.id ? `rgba(212,175,55,0.1)` : "transparent",
                  border: `1px solid ${activeCategory === cat.id ? GOLD : "#222"}`,
                  color: activeCategory === cat.id ? GOLD : "#9CA3AF",
                  fontFamily: "'Alexandria', sans-serif",
                  fontSize: 13,
                  fontWeight: 400,
                  padding: "0.5rem 1.2rem",
                  borderRadius: 100,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >{cat.label}</button>
            ))}
          </div>
        </Reveal>

        {/* Services list */}
        <motion.div layout>
          {filtered.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04}>
              <motion.div
                layout
                onHoverStart={() => setHoveredRow(i)}
                onHoverEnd={() => setHoveredRow(null)}
                onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                className="service-row"
                style={{
                  display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                  padding: "1.5rem 0.75rem",
                  borderBottom: "1px solid #161616",
                  borderTop: i === 0 ? "1px solid #161616" : "none",
                  background: hoveredRow === i ? "rgba(20,16,13,0.9)" : "transparent",
                  transition: "background 0.4s ease",
                  cursor: "pointer", gap: "2rem", borderRadius: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flex: 1 }}>
                  <span style={{ fontSize: 11, color: "#222", fontWeight: 300, minWidth: 24, paddingTop: 4 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.7rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                      <span style={{ fontWeight: 500, fontSize: "clamp(0.9rem,1.3vw,1.05rem)", color: "#fff" }}>{s.name}</span>
                      {s.note && <span style={{ fontSize: 11, color: "#374151", fontWeight: 300, letterSpacing: "0.06em" }}>{s.note}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "#374151", fontWeight: 300 }}>{s.sessions}</div>
                    {expandedRow === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 300, lineHeight: 1.8, maxWidth: 480, marginTop: "0.75rem" }}
                      >
                        {s.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div className="service-price-col" style={{ textAlign: "left", flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: "#374151", fontWeight: 300, marginBottom: 4, letterSpacing: "0.12em", textTransform: "uppercase" }}>يبدأ من</div>
                  <motion.div
                    animate={{ color: hoveredRow === i ? GOLD : "#9CA3AF" }}
                    transition={{ duration: 0.3 }}
                    style={{ fontWeight: 700, fontSize: "clamp(1.1rem,1.6vw,1.4rem)", lineHeight: 1 }}
                  >
                    {s.price.toLocaleString("ar-EG")}
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </motion.div>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div style={{
            marginTop: "4rem",
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.12)",
            borderRadius: 16,
            padding: "3rem",
            textAlign: "center",
          }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>الخطوة التالية</p>
            <h3 style={{ fontWeight: 700, fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "#fff", marginBottom: "1rem" }}>
              لكل حالة خطة علاجية مخصصة
            </h3>
            <p style={{ fontSize: 14, color: "#9CA3AF", fontWeight: 300, lineHeight: 1.9, maxWidth: 480, margin: "0 auto 2rem" }}>
              تواصل معنا عبر واتساب لتحديد موعدك والحصول على تقييم أولي مجاني من فريقنا المتخصص.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.a href="https://wa.me/9647731450750" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 16px 50px rgba(212,175,55,0.3)" }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: GOLD, color: "#050505", padding: "0.9rem 2rem", borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: "'Alexandria', sans-serif" }}>
                <MessageCircle size={16} /> احجز عبر واتساب
              </motion.a>
              <motion.a href="https://wa.me/9647762299914" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", border: "1px solid #333", color: "#9CA3AF", padding: "0.9rem 2rem", borderRadius: 100, fontSize: 14, fontWeight: 300, textDecoration: "none", fontFamily: "'Alexandria', sans-serif" }}>
                الحجز الآلي <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
