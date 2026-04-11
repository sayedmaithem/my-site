import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ChevronDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GOLD, GOLD_DIM, LOGO_SRC } from "../constants";

function Reveal({ children, delay = 0, y = 40, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    >{children}</motion.div>
  );
}

const services = [
  { name: "الحشوات الضوئية التجميلية", sessions: "جلسة واحدة", desc: "مواد تحاكي شفافية أسنانك الطبيعية بحيث لا يمكن تمييزها.", price: 100 },
  { name: "بروتوكول التنظيف السويسري", note: "GBT", sessions: "جلسة واحدة", desc: "إزالة عميقة للتصبغات بتدفق الهواء الدافئ، بدون أدوات كاشطة.", price: 125 },
  { name: "تنظيف الأسنان الاعتيادي", note: "Routine Cleaning", sessions: "جلسة واحدة", desc: "إزالة الجير والتصبغات للحفاظ على صحة اللثة واللمعة الطبيعية.", price: 50 },
  { name: "التجميل اللاجراحي", note: "Botox & Filler", sessions: "جلسة واحدة", desc: "لمسات طبية لإبراز جمال ملامحك وإخفاء خطوط التوتر.", price: 150 },
  { name: "تغليف الزيركون", note: "Zirconia", sessions: "جلستان", desc: "تيجان صلبة مصممة حاسوبياً للأسنان الخلفية لتتحمل قوة المضغ.", price: 250 },
  { name: "علاج العصب المجهري", sessions: "جلسة إلى جلستين", desc: "إنقاذ السن التالف بدقة المايكروسكوب، لتنظيف كامل وبدون ألم.", price: 300 },
];

export default function Home() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroO = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const R = (s) => ({ fontFamily: "'Alexandria', sans-serif", ...s });

  return (
    <div dir="rtl" style={R({ background: "#050505", color: "#fff", overflowX: "hidden", position: "relative", minHeight: "100vh" })}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@200;300;400;500;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 2px; }
        ::selection { background: #D4AF37; color: #050505; }
        img { display: block; }

        .bento-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .bento-large { grid-column: span 1; }
        .bento-lab-card { flex-direction: column !important; }
        .bento-lab-image { width: 100% !important; height: 200px !important; }
        .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        .nav-links-desktop { display: none !important; }
        .nav-cta-desktop { display: none !important; }
        .hero-buttons { flex-direction: column !important; align-items: center !important; }
        .section-pad { padding: 4rem 1.25rem !important; }
        .section-pad-sm { padding: 3rem 1.25rem !important; }
        .footer-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        .service-row { flex-wrap: wrap !important; gap: 0.5rem !important; }
        .service-price-col { min-width: auto !important; text-align: right !important; }
        .promise-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        .nav-pad { padding: 1rem 1.25rem !important; }
        .hamburger-btn { display: flex !important; }

        @media (min-width: 768px) {
          .bento-grid { grid-template-columns: repeat(3,1fr); gap: 14px; }
          .bento-large { grid-column: span 2; }
          .bento-lab-card { flex-direction: row !important; }
          .bento-lab-image { width: 45% !important; height: 100% !important; min-height: 260px; }
          .stats-grid { grid-template-columns: repeat(4,1fr) !important; }
          .nav-links-desktop { display: flex !important; }
          .nav-cta-desktop { display: flex !important; }
          .hero-buttons { flex-direction: row !important; align-items: center !important; }
          .section-pad { padding: 8rem 4rem !important; }
          .section-pad-sm { padding: 5rem 4rem !important; }
          .footer-grid { grid-template-columns: 2fr 1fr 1fr !important; gap: 4rem !important; }
          .service-row { flex-wrap: nowrap !important; }
          .service-price-col { min-width: 100px !important; }
          .promise-grid { grid-template-columns: 1.2fr 1fr !important; gap: 6rem !important; }
          .nav-pad { padding: 1.5rem 4rem !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>

      {/* ── FIXED AMBIENTS ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(26,20,18,0.8) 0%, #050505 65%)" }} />
      <div style={{ position: "fixed", top: "20%", right: "-5%", width: "45vw", height: "45vw", borderRadius: "50%", background: "rgba(184,134,11,0.025)", filter: "blur(140px)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "10%", left: "-10%", width: "35vw", height: "35vw", borderRadius: "50%", background: "rgba(26,20,18,0.6)", filter: "blur(120px)", zIndex: 0, pointerEvents: "none" }} />

      {/* ════════════ HERO ════════════ */}
      <section ref={heroRef} style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", paddingTop: "80px" }}>
        <motion.div style={{ y: heroY, opacity: heroO, position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center 30%", filter: "brightness(0.18) saturate(0.6)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.6) 60%, #050505 100%)" }} />
        </motion.div>

        <motion.div style={{ opacity: heroO }} className="section-pad" style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center", padding: "0 1.25rem" }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 100, padding: "0.4rem 1.2rem", marginBottom: "2.5rem" }}>
            <span style={{ fontSize: 11, color: GOLD, fontWeight: 500, letterSpacing: "0.2em" }}>كربلاء · حي التعاون</span>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD }} />
            <span style={{ fontSize: 11, color: GOLD, fontWeight: 300, letterSpacing: "0.08em" }}>١١ص — ١٠م يومياً</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontWeight: 900, fontSize: "clamp(2.8rem, 8vw, 7rem)", lineHeight: 1.05, letterSpacing: "-0.01em", color: "#fff", marginBottom: "1.8rem" }}>
            عيادات<br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: GOLD, fontSize: "0.82em" }}>الموسوي</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
            style={{ fontWeight: 300, fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)", lineHeight: 2, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto 3rem" }}>
            حيث تلتقي دقة الجراحة المجهرية بفن تصميم الابتسامة.<br />
            <span style={{ color: "rgba(212,175,55,0.7)" }}>تجربتك الأولى ستكون الأخيرة التي تحتاجها.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75 }}
            className="hero-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <motion.a href="https://wa.me/9647731450750" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: `0 20px 60px rgba(212,175,55,0.35)` }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: GOLD, color: "#050505", padding: "1rem 2.2rem", borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: "'Alexandria', sans-serif" }}>
              <MessageCircle size={16} /> احجز الآن
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/services"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "1rem 2.2rem", borderRadius: 100, fontSize: 14, fontWeight: 300, textDecoration: "none", fontFamily: "'Alexandria', sans-serif" }}>
                قائمة الخدمات <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}
            onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}>
            <span style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>اكتشف</span>
            <ChevronDown size={18} color="rgba(255,255,255,0.3)" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section id="stats" style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }} className="section-pad-sm">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem" }}>
          <div className="stats-grid" style={{ display: "grid", gap: "1px", background: "#111" }}>
            {[
              { n: "14+", label: "عاماً من الخبرة" },
              { n: "3D", label: "تصوير مقطعي CBCT" },
              { n: "25×", label: "تكبير مجهري" },
              { n: "∞", label: "صحة الأسنان ليست رفاهية" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: "2.5rem 2rem", background: "#050505", textAlign: "center" }}>
                  <motion.div whileHover={{ color: GOLD }} style={{ fontWeight: 900, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1, marginBottom: "0.5rem" }}>
                    {s.n}
                  </motion.div>
                  <div style={{ fontSize: 12, color: "#4B5563", fontWeight: 300, letterSpacing: "0.06em" }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section id="features" style={{ position: "relative", zIndex: 1 }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem" }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "0.8rem" }}>مزايانا</p>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#fff", marginBottom: "4rem" }}>
              ليست مجرد عيادة
            </h2>
          </Reveal>

          <div className="bento-grid" style={{ display: "grid" }}>
            {/* CARD 1 — Scanner */}
            <Reveal delay={0.05}>
              <motion.div whileHover={{ y: -4, borderColor: "rgba(184,134,11,0.45)" }} transition={{ duration: 0.4 }}
                style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 28, padding: "2.5rem", position: "relative", overflow: "hidden", height: "100%", minHeight: 260 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", display: "block", marginBottom: "0.8rem" }}>Surgical Microscope · 25×</span>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,1.4vw,1.2rem)", color: "#fff", marginBottom: "0.7rem", lineHeight: 1.3 }}>دقة لا تُرى بالعين</h3>
                  <p style={{ fontWeight: 300, fontSize: 13, color: "#9CA3AF", lineHeight: 1.85 }}>نستخدم التكبير المجهري (25×) لتنظيف أدق القنوات وإنقاذ سنك بلا ألم ودقة مطلقة.</p>
                </div>
              </motion.div>
            </Reveal>

            {/* CARD 2 — Lab */}
            <Reveal delay={0.12}>
              <motion.div whileHover={{ y: -4, borderColor: "rgba(184,134,11,0.45)" }} transition={{ duration: 0.4 }}
                className="bento-large bento-lab-card"
                style={{ background: "#111111", border: "1px solid #222222", borderRadius: 28, overflow: "hidden", position: "relative", display: "flex" }}>
                <div style={{ padding: "2.5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>مختبر داخل العيادة</span>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1.4rem,2vw,1.9rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.25 }}>المختبر الداخلي</h3>
                  <p style={{ fontWeight: 300, fontSize: 14, color: "#9CA3AF", lineHeight: 1.95, maxWidth: 380 }}>هويتك الحقيقية تُصنع هنا. خبير السيراميك يعمل معك لتعديل اللون والشكل فوراً. لن ترتدي ابتسامة لا تشبهك.</p>
                </div>
              </motion.div>
            </Reveal>

            {/* CARD 3 — CBCT */}
            <Reveal delay={0.18}>
              <motion.div whileHover={{ y: -4, borderColor: "rgba(184,134,11,0.45)" }} transition={{ duration: 0.4 }}
                style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 28, padding: "2.5rem", position: "relative", overflow: "hidden", height: "100%", minHeight: 260 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", display: "block", marginBottom: "0.8rem" }}>CBCT · 3D Imaging</span>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,1.4vw,1.2rem)", color: "#fff", marginBottom: "0.7rem", lineHeight: 1.3 }}>يقين التشخيص</h3>
                  <p style={{ fontWeight: 300, fontSize: 13, color: "#9CA3AF", lineHeight: 1.85 }}>ننهي دائرة التخمين بصور الفك ثلاثية الأبعاد لضمان أدق تشخيص وأفضل خطة علاجية.</p>
                </div>
              </motion.div>
            </Reveal>

            {/* CARD 4 — 3D Scanner */}
            <Reveal delay={0.24}>
              <motion.div whileHover={{ y: -4, borderColor: "rgba(184,134,11,0.45)" }} transition={{ duration: 0.4 }}
                style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 28, padding: "2.5rem", position: "relative", overflow: "hidden", height: "100%", minHeight: 260 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", display: "block", marginBottom: "0.8rem" }}>3D Intraoral Scanner</span>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,1.4vw,1.2rem)", color: "#fff", marginBottom: "0.7rem", lineHeight: 1.3 }}>الماسح الضوئي 3D</h3>
                  <p style={{ fontWeight: 300, fontSize: 13, color: "#9CA3AF", lineHeight: 1.85 }}>مقاسات رقمية سريعة ومريحة. وداعاً لطبعات العجين المزعجة.</p>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ SERVICES PREVIEW ════════════ */}
      <section id="services" style={{ position: "relative", zIndex: 1, background: "rgba(8,8,8,0.8)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "8rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem" }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "0.8rem" }}>قائمة الخدمات</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "clamp(2rem,3.5vw,3rem)", color: "#fff" }}>قائمة الامتياز</h2>
              <Link to="/services" style={{ fontSize: 13, color: GOLD, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                عرض الكل <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>

          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <motion.div
                onHoverStart={() => setHoveredRow(i)}
                onHoverEnd={() => setHoveredRow(null)}
                onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                className="service-row"
                style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "1.5rem 0.5rem", borderBottom: "1px solid #161616", borderTop: i === 0 ? "1px solid #161616" : "none", background: hoveredRow === i ? "rgba(20,16,13,0.8)" : "transparent", transition: "background 0.4s ease", cursor: "pointer", gap: "2rem", borderRadius: 4 }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flex: 1 }}>
                  <span style={{ fontSize: 11, color: "#222", fontWeight: 300, minWidth: 22, paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.7rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                      <span style={{ fontWeight: 500, fontSize: "clamp(0.9rem,1.3vw,1.05rem)", color: "#fff" }}>{s.name}</span>
                      {s.note && <span style={{ fontSize: 11, color: "#374151", fontWeight: 300, letterSpacing: "0.06em" }}>{s.note}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "#374151", fontWeight: 300, marginBottom: expandedRow === i ? "0.7rem" : 0 }}>{s.sessions}</div>
                    {expandedRow === i && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 300, lineHeight: 1.8, maxWidth: 480 }}>
                        {s.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div className="service-price-col" style={{ textAlign: "left", flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: "#374151", fontWeight: 300, marginBottom: 4, letterSpacing: "0.12em", textTransform: "uppercase" }}>يبدأ من</div>
                  <motion.div animate={{ color: hoveredRow === i ? GOLD : "#9CA3AF" }} transition={{ duration: 0.3 }}
                    style={{ fontWeight: 700, fontSize: "clamp(1.1rem,1.6vw,1.4rem)", lineHeight: 1 }}>
                    {s.price.toLocaleString("ar-EG")}
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div style={{ marginTop: "4rem", padding: "2.5rem", border: "1px solid #1A1A1A", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
              <div>
                <p style={{ fontSize: "clamp(0.95rem,1.3vw,1.1rem)", color: "#fff", fontWeight: 400 }}>احجز الآن وابدأ رحلتك</p>
                <p style={{ fontSize: 12, color: "#374151", marginTop: "0.3rem", fontWeight: 300 }}>الأسعار تقريبية وقد تختلف حسب الحالة</p>
              </div>
              <motion.a href="https://wa.me/9647731450750" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: `0 16px 50px rgba(212,175,55,0.3)` }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: GOLD, color: "#050505", padding: "0.9rem 2rem", borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: "'Alexandria', sans-serif" }}>
                <MessageCircle size={16} /> احجز عبر واتساب
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ PROMISE ════════════ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem" }}>
          <div className="promise-grid" style={{ display: "grid", alignItems: "center" }}>
            <Reveal>
              <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "1.2rem" }}>وعدنا لكم</p>
              <h2 style={{ fontWeight: 700, fontSize: "clamp(2rem,3.5vw,3rem)", color: "#fff", lineHeight: 1.25, marginBottom: "2rem" }}>
                وراء كل ابتسامة<br />
                <span style={{ fontWeight: 300, color: GOLD, fontStyle: "italic", fontSize: "0.82em" }}>فريق متناغم.</span>
              </h2>
              <p style={{ fontWeight: 300, fontSize: "clamp(0.9rem,1.2vw,1.05rem)", lineHeight: 2, color: "#9CA3AF", maxWidth: 500 }}>
                وراء كل ابتسامة طبيعية تغادر عيادتنا، فريق متناغم يجمع بين الأطباء الأخصائيين وفناني السيراميك. نحن نضمن لك ديمومة المواد وعناية تفوق توقعاتك.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#161616" }}>
                {[
                  { n: "14+", l: "سنة خبرة" }, { n: "25×", l: "تكبير مجهري" },
                  { n: "3D", l: "تصوير مقطعي" }, { n: "∞", l: "صحة الأسنان ليست رفاهية" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "2.5rem 2rem", background: "#050505", textAlign: "center" }}>
                    <div style={{ fontWeight: 900, fontSize: "clamp(1.8rem,2.5vw,2.8rem)", color: GOLD, lineHeight: 1, marginBottom: "0.4rem" }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: "#4B5563", fontWeight: 300 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ FLOATING CTA ════════════ */}
      <motion.a href="https://wa.me/9647731450750" target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        style={{ position: "fixed", bottom: "1.8rem", left: "1.8rem", zIndex: 300, display: "flex", alignItems: "center", gap: 10, background: "rgba(8,8,8,0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(212,175,55,0.25)", color: GOLD, padding: "0.7rem 1.4rem 0.7rem 0.8rem", borderRadius: 100, fontSize: 13, fontWeight: 500, textDecoration: "none", boxShadow: "0 8px 40px rgba(0,0,0,0.7)", fontFamily: "'Alexandria', sans-serif" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <MessageCircle size={16} color={GOLD} />
        </div>
        <div>
          <p style={{ fontSize: 10, color: "#374151", lineHeight: 1.2, marginBottom: 1 }}>احجز الآن</p>
          <p style={{ fontSize: 13, fontWeight: 500, lineHeight: 1, color: GOLD }}>07731450750</p>
        </div>
        <motion.div
          style={{ position: "absolute", inset: 0, borderRadius: 100, border: `1px solid rgba(212,175,55,0.25)` }}
          animate={{ scale: [1, 1.28], opacity: [0.5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.a>
    </div>
  );
}
