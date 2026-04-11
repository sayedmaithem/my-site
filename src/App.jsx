import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MessageCircle, Bot, MapPin, Clock, ArrowLeft, ChevronDown, ArrowUpRight } from "lucide-react";

const GOLD = "#D4AF37";
const GOLD_DIM = "#B8860B";
const LOGO_SRC = "data:image/png;base64,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";

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
  { name: "استخراج الأدوات المكسورة", note: "Broken Instrument Retrieval", sessions: "جلسة واحدة", desc: "تقنية متخصصة لإزالة الأدوات المكسورة داخل القنوات بأمان.", price: 150 },
  { name: "فتح وإيجاد القنوات", note: "Canal Location", sessions: "جلسة واحدة", desc: "كشف القنوات الدقيقة ومجاهيلها بالمجهر لضمان علاج متكامل.", price: 100 },
  { name: "تصميم الابتسامة المخصص", note: "E-max", sessions: "جلستان إلى ثلاث", desc: "عدسات تُصنع وتُعدل في مختبرنا لتطابق ملامحك تماماً.", price: 350 },
  { name: "زراعة الأسنان الموجهة", note: "CBCT", sessions: "تحتاج فترة التئام", desc: "تعويض دائم ومدروس عبر تخطيط أشعة CBCT لضمان نجاح الزرعة.", price: 850 },
  { name: "التقويم المتقدم", sessions: "متابعة شهرية", desc: "تصحيح الإطباق بهدوء وفعالية بأحدث التقنيات.", price: 1000 },
  { name: "القلع الجراحي", note: "Surgical Extraction", sessions: "جلسة واحدة", desc: "إزالة الأسنان المعقدة بدقة جراحية وبأقل إزعاج ممكن.", price: 250 },
  { name: "القلع الاعتيادي", note: "Simple Extraction", sessions: "جلسة واحدة", desc: "قلع بسيط وسريع بأيدي خبيرة وبلا ألم.", price: 50 },
];

const stats = [
  { n: "14+", label: "عاماً من الخبرة" },
  { n: "3D", label: "تصوير مقطعي CBCT" },
  { n: "25×", label: "تكبير مجهري" },
  { n: "∞", label: "صحة الأسنان ليست رفاهية" },
];

const features = [
  {
    tag: "Surgical Microscope · 25×",
    title: "دقة لا تُرى بالعين",
    body: "نستخدم التكبير المجهري (25×) لتنظيف أدق القنوات، لإنقاذ سنك بلا ألم وبدقة مطلقة.",
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=85&fit=crop",
    flip: false,
  },
  {
    tag: "مختبر داخل العيادة",
    title: "مختبر داخل العيادة",
    body: "خبير السيراميك يعمل معك وجهاً لوجه لتعديل اللون والشكل فوراً. لن ترتدي ابتسامة لا تشبهك.",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85&fit=crop",
    flip: true,
  },
  {
    tag: "CBCT · 3D Imaging · Zero Wait",
    title: "يقين التشخيص وبروتوكول النخبة",
    body: "ننهي دائرة التخمين بصور الفك ثلاثية الأبعاد. كما نوفر الغاز الضاحك للاسترخاء التام، مع مواعيد دقيقة تلغي فترات الانتظار.",
    img: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=900&q=85&fit=crop",
    flip: false,
  },
];

export default function AlMousawi() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroO = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 50); if (window.scrollY > 50) setMenuOpen(false); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const R = (s) => ({ fontFamily: "'Alexandria', sans-serif", ...s });

  return (
    <div dir="rtl" style={R({
      background: "#050505", color: "#fff",
      overflowX: "hidden", position: "relative",
      minHeight: "100vh",
    })}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@200;300;400;500;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 2px; }
        ::selection { background: #D4AF37; color: #050505; }
        img { display: block; }

        /* ── RESPONSIVE ── */
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
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
        .hamburger-btn {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          cursor: pointer;
          z-index: 210;
          position: relative;
        }
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 190;
          background: rgba(5,5,5,0.6);
          backdrop-filter: blur(4px);
        }
        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 195;
          background: rgba(10,10,10,0.98);
          backdrop-filter: blur(32px);
          border-bottom: 1px solid rgba(212,175,55,0.15);
          padding: 5.5rem 2rem 2.5rem;
        }
      `}</style>

      {/* ── FIXED AMBIENTS ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(26,20,18,0.8) 0%, #050505 65%)",
      }} />
      <div style={{
        position: "fixed", top: "20%", right: "-5%", width: "45vw", height: "45vw",
        borderRadius: "50%", background: "rgba(184,134,11,0.025)",
        filter: "blur(140px)", zIndex: 0, pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "10%", left: "-10%", width: "35vw", height: "35vw",
        borderRadius: "50%", background: "rgba(26,20,18,0.6)",
        filter: "blur(120px)", zIndex: 0, pointerEvents: "none",
      }} />

      {/* ════════════ NAV ════════════ */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "0.9rem 4rem" : "1.5rem 4rem",
          background: scrolled ? "rgba(5,5,5,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", zIndex: 210 }}>
          <img src={LOGO_SRC} alt="عيادات الموسوي"
            style={{ width: 40, height: 40, objectFit: "contain" }}
          />
          <span style={{ fontWeight: 500, fontSize: 15, color: "#fff", letterSpacing: "0.02em" }}>
            عيادات الموسوي
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {[["التقنيات","#features"],["الأسعار","#services"],["تواصل","#contact"]].map(([t,h]) => (
            <motion.a key={t} href={h}
              style={{ fontSize: 13, color: "#6B7280", textDecoration: "none", fontWeight: 300 }}
              whileHover={{ color: GOLD }} transition={{ duration: 0.2 }}
            >{t}</motion.a>
          ))}

          {/* Lounge Menu Dropdown */}
          <div style={{ position: "relative" }}>
            <motion.button
              onMouseEnter={() => {
                const dropdown = document.getElementById("lounge-dropdown");
                if (dropdown) dropdown.style.display = "block";
              }}
              onMouseLeave={() => {
                const dropdown = document.getElementById("lounge-dropdown");
                if (dropdown) dropdown.style.display = "none";
              }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, color: "#6B7280", padding: "0 0.5rem",
                display: "flex", alignItems: "center", gap: "0.3rem",
                fontFamily: "inherit", fontWeight: 300
              }}
              whileHover={{ color: GOLD }}
              transition={{ duration: 0.2 }}
            >
              استراحة الموسوي <span style={{ fontSize: 11 }}>▼</span>
            </motion.button>

            <motion.div
              id="lounge-dropdown"
              onMouseEnter={() => {
                const dropdown = document.getElementById("lounge-dropdown");
                if (dropdown) dropdown.style.display = "block";
              }}
              onMouseLeave={() => {
                const dropdown = document.getElementById("lounge-dropdown");
                if (dropdown) dropdown.style.display = "none";
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "none",
                position: "absolute", top: "100%", right: 0,
                background: "#0d0d0d", border: `1px solid ${GOLD_DIM}`,
                borderRadius: 8, marginTop: "0.5rem",
                minWidth: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                zIndex: 1000
              }}
            >
              <a href="/lounge.html"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "1rem 1.2rem",
                  color: "#fff", textDecoration: "none", fontSize: 13,
                  borderBottom: `1px solid rgba(${GOLD_DIM},0.1)`,
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.color = GOLD}
                onMouseLeave={(e) => e.target.style.color = "#fff"}
              >
                ☕ قائمة المشروبات
              </a>
              <a href="/lounge.html"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "1rem 1.2rem",
                  color: "#9CA3AF", textDecoration: "none", fontSize: 12,
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.color = GOLD}
                onMouseLeave={(e) => e.target.style.color = "#9CA3AF"}
              >
                خدمة VVIP تفضيلية
              </a>
            </motion.div>
          </div>
        </div>

        {/* Desktop CTA */}
        <motion.a href="https://wa.me/9647731450750" className="nav-cta-desktop"
          whileHover={{ scale: 1.04, background: GOLD_DIM }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: GOLD, color: "#050505",
            padding: "0.6rem 1.6rem", borderRadius: 100,
            fontSize: 13, fontWeight: 700, textDecoration: "none",
            transition: "background 0.3s",
          }}
        >
          <MessageCircle size={14} />
          احجز الآن
        </motion.a>

        {/* Hamburger button — mobile only */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="القائمة الرئيسية"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? GOLD : "#9CA3AF", borderRadius: 2 }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: "block", width: 14, height: 1.5, background: "#9CA3AF", borderRadius: 2 }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? GOLD : "#9CA3AF", borderRadius: 2 }}
          />
        </button>
      </motion.nav>

      {/* ════════ MOBILE MENU OVERLAY ════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
            >
              {/* Menu items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "2rem" }}>
                {[
                  ["التقنيات والبروتوكول", "#features"],
                  ["قائمة الخدمات والأسعار", "#services"],
                  ["استراحة الموسوي", "/lounge.html"],
                  ["تواصل وحجز", "#contact"],
                ].map(([label, href], i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "1.1rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      textDecoration: "none",
                      color: "#fff", fontSize: 16, fontWeight: 400,
                    }}
                    whileHover={{ color: GOLD }}
                  >
                    {label}
                    <span style={{ color: GOLD, fontSize: 18, fontWeight: 300 }}>←</span>
                  </motion.a>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(212,175,55,0.15)", marginBottom: "1.8rem" }} />

              {/* Contact quick links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "1.8rem" }}>
                <a href="https://wa.me/9647731450750"
                  style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#9CA3AF", fontSize: 14 }}
                >
                  <MessageCircle size={15} color={GOLD} />
                  <span>واتساب: 07731450750</span>
                </a>
                <a href="https://wa.me/9647762299914"
                  style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#9CA3AF", fontSize: 14 }}
                >
                  <Bot size={15} color={GOLD} />
                  <span>الحجز الآلي: 07762299914</span>
                </a>
              </div>

              {/* CTA */}
              <motion.a
                href="https://wa.me/9647731450750"
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: GOLD, color: "#050505",
                  padding: "1rem", borderRadius: 100,
                  fontSize: 15, fontWeight: 700, textDecoration: "none",
                  width: "100%",
                }}
              >
                <MessageCircle size={17} />
                ابدأ رحلة التغيير
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════ HERO ════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "8rem 2rem 4rem",
        overflow: "hidden",
      }}>
        {/* grain */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }} />
        {/* grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        <motion.div style={{ y: heroY, opacity: heroO, position: "relative", zIndex: 2, maxWidth: 860 }}>
          {/* Hero Logo — PNG has black bg, fits perfectly */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.15, ease: "easeOut" }}
            style={{ marginBottom: "2.5rem" }}
          >
            <img src={LOGO_SRC} alt="logo"
              style={{
                width: 110, height: 110, objectFit: "contain",
                margin: "0 auto",

              }}
            />
          </motion.div>

          {/* pre-label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontSize: 11, letterSpacing: "0.32em", color: "#4B5563",
              textTransform: "uppercase", fontWeight: 300, marginBottom: "2rem",
            }}
          >
            <span style={{ width: 30, height: 0.5, background: GOLD, display: "block" }} />
            كربلاء · حي التعاون
            <span style={{ width: 30, height: 0.5, background: GOLD, display: "block" }} />
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.55, ease: "easeOut" }}
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)",
              lineHeight: 1.18, letterSpacing: "-0.02em",
              color: "#fff", marginBottom: "1.8rem",
            }}
          >
            عيادات الموسوي
            <span style={{ display: "block", fontWeight: 300, fontSize: "0.58em", color: "#9CA3AF", marginTop: "0.4em" }}>
              حيث ينتهي القلق، وتبدأ الثقة.
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.78, ease: "easeOut" }}
            style={{
              fontWeight: 300, fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
              lineHeight: 2, color: "#6B7280",
              maxWidth: 640, margin: "0 auto 3.5rem",
            }}
          >
            بيئة علاجية تدمج بين دقة التشخيص المجهري ثلاثي الأبعاد واللمسة الفنية الخبيرة، لتجربة هادئة ونتائج تنتمي إليك وحدك.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.98, ease: "easeOut" }}
            className="hero-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.a href="https://wa.me/9647731450750"
              whileHover={{ scale: 1.04, boxShadow: `0 20px 60px rgba(212,175,55,0.4)` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: GOLD, color: "#050505",
                padding: "1rem 2.5rem", borderRadius: 100,
                fontSize: 15, fontWeight: 700, textDecoration: "none",
              }}
            >
              ابدأ رحلة التغيير <ArrowLeft size={16} />
            </motion.a>
            <motion.a href="https://wa.me/9647762299914"
              whileHover={{ borderColor: GOLD, color: GOLD }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "transparent", color: "#6B7280",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "1rem 2.5rem", borderRadius: 100,
                fontSize: 15, fontWeight: 300, textDecoration: "none",
                transition: "all 0.3s",
              }}
            >
              <Bot size={16} /> الحجز الآلي
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
        >
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={18} color="rgba(255,255,255,0.15)" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(10,10,10,0.5)",
      }}>
        <div className="stats-grid" style={{
          maxWidth: 1100, margin: "0 auto", padding: "5rem 1.25rem",
          display: "grid", gap: "1rem",
        }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center", padding: "1rem 0", borderRight: i < 3 ? "1px solid #1A1A1A" : "none" }}>
                <div style={{
                  fontWeight: 900, fontSize: "clamp(3rem,5vw,4.5rem)",
                  color: GOLD, lineHeight: 1, marginBottom: "0.6rem",
                  letterSpacing: "-0.02em",
                }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 300 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ QUOTE ════════════ */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", fontWeight: 300, lineHeight: 1.75, color: "#fff" }}>
              "صحة الأسنان
              <em style={{ fontStyle: "normal", color: GOLD }}> ليست رفاهية.</em>"
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ width: 36, height: 1, background: GOLD, margin: "3rem auto 0" }} />
          </Reveal>
        </div>
      </section>

      {/* ════════════ BENTO BOX — VVIP PROTOCOL & TECH ════════════ */}
      <section id="features" style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "8rem 0",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem" }}>

          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "0.8rem" }}>
              تقنياتنا الحصرية
            </p>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "#fff", marginBottom: "3.5rem" }}>
              تقنياتنا الحصرية
            </h2>
          </Reveal>

          {/* ── BENTO GRID ── */}
          <div className="bento-grid" style={{
            display: "grid",
            gap: "14px",
          }}>

            {/* CARD 1 — Large, image, col-span 2 */}
            <Reveal delay={0.05} className="">
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(184,134,11,0.45)" }}
                transition={{ duration: 0.4 }}
                className="bento-large" style={{
                  background: "#111111",
                  border: "1px solid #222222",
                  borderRadius: 28,
                  overflow: "hidden",
                  position: "relative",
                  minHeight: 380,
                  display: "flex", flexDirection: "column",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 220, overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=80&fit=crop"
                    alt="microscope"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.8)" }}
                    onError={e => { e.target.style.background = "#1a1a1a"; e.target.src = ""; }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, transparent 40%, #111111 100%)",
                  }} />
                  <span style={{
                    position: "absolute", top: "1.2rem", right: "1.4rem",
                    fontSize: 10, letterSpacing: "0.22em", color: GOLD,
                    textTransform: "uppercase", fontWeight: 400,
                  }}>Surgical Microscope · 25×</span>
                </div>
                {/* Text */}
                <div style={{ padding: "1.8rem 2rem 2.2rem", flex: 1 }}>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1.3rem,2vw,1.7rem)", color: "#fff", marginBottom: "0.8rem" }}>
                    دقة المايكروسكوب
                  </h3>
                  <p style={{ fontWeight: 300, fontSize: 14, color: "#9CA3AF", lineHeight: 1.85 }}>
                    نستخدم التكبير المجهري (25×) لإنقاذ سنك بلا ألم وبدقة مطلقة لا تراها العين.
                  </p>
                </div>
              </motion.div>
            </Reveal>

            {/* CARD 3 — CBCT with image */}
            <Reveal delay={0.1}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(184,134,11,0.45)" }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "#111111",
                  border: "1px solid #222222",
                  borderRadius: 28,
                  minHeight: 380,
                  display: "flex", flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 180, overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&fit=crop"
                    alt="CBCT scanner"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.7)" }}
                    onError={e => { e.target.style.background = "#1a1a1a"; e.target.src = ""; }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #111111 100%)" }} />
                  <span style={{
                    position: "absolute", top: "1rem", right: "1.2rem",
                    fontSize: 10, letterSpacing: "0.2em", color: GOLD,
                    textTransform: "uppercase", fontWeight: 400,
                  }}>CBCT · 3D Imaging</span>
                </div>
                {/* Text */}
                <div style={{ padding: "1.4rem 1.8rem 2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1.05rem,1.4vw,1.25rem)", color: "#fff", marginBottom: "0.6rem", lineHeight: 1.3 }}>
                    تصوير مقطعي (CBCT)
                  </h3>
                  <p style={{ fontWeight: 300, fontSize: 13, color: "#9CA3AF", lineHeight: 1.85 }}>
                    ننهي دائرة التخمين بصور الفك ثلاثية الأبعاد لزراعة وعلاج آمن 100%.
                  </p>
                </div>
              </motion.div>
            </Reveal>

            {/* CARD 4 — Nitrous with image */}
            <Reveal delay={0.15}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(184,134,11,0.45)" }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "#111111",
                  border: "1px solid #222222",
                  borderRadius: 28,
                  display: "flex", flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 180, overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src="https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=600&q=80&fit=crop"
                    alt="sedation nitrous"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.45) saturate(0.6)" }}
                    onError={e => { e.target.style.background = "#1a1a1a"; e.target.src = ""; }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #111111 100%)" }} />
                  <span style={{
                    position: "absolute", top: "1rem", right: "1.2rem",
                    fontSize: 10, letterSpacing: "0.2em", color: GOLD,
                    textTransform: "uppercase", fontWeight: 400,
                  }}>Laughing Gas · Sedation</span>
                </div>
                {/* Text */}
                <div style={{ padding: "1.4rem 1.8rem 2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,1.4vw,1.2rem)", color: "#fff", marginBottom: "0.6rem", lineHeight: 1.3 }}>
                    الغاز الضاحك
                  </h3>
                  <p style={{ fontWeight: 300, fontSize: 13, color: "#9CA3AF", lineHeight: 1.85 }}>
                    استرخاء تام. انفصل عن القلق وعش تجربة علاجية هادئة تحترم مشاعرك.
                  </p>
                </div>
              </motion.div>
            </Reveal>

            {/* CARD 5 — Small, 3D Scanner */}
            <Reveal delay={0.2}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(184,134,11,0.45)" }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "#111111",
                  border: "1px solid #222222",
                  borderRadius: 28,
                  padding: "2.2rem 2rem",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", display: "block", marginBottom: "0.8rem" }}>
                    3D Intraoral Scanner
                  </span>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,1.4vw,1.2rem)", color: "#fff", marginBottom: "0.7rem", lineHeight: 1.3 }}>
                    الماسح الضوئي 3D
                  </h3>
                  <p style={{ fontWeight: 300, fontSize: 13, color: "#9CA3AF", lineHeight: 1.85 }}>
                    مقاسات رقمية سريعة ومريحة. وداعاً لطبعات العجين المزعجة.
                  </p>
                </div>
              </motion.div>
            </Reveal>

            {/* CARD 2 — Large, In-House Lab, col-span 2 */}
            <Reveal delay={0.12}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(184,134,11,0.45)" }}
                transition={{ duration: 0.4 }}
                className="bento-large bento-lab-card" style={{
                  background: "#111111",
                  border: "1px solid #222222",
                  borderRadius: 28,
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                }}
              >
                {/* Text only — no image */}
                <div style={{ padding: "2.5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
                    مختبر داخل العيادة
                  </span>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1.4rem,2vw,1.9rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.25 }}>
                    المختبر الداخلي
                  </h3>
                  <p style={{ fontWeight: 300, fontSize: 14, color: "#9CA3AF", lineHeight: 1.95, maxWidth: 380 }}>
                    هويتك الحقيقية تُصنع هنا. خبير السيراميك يعمل معك لتعديل اللون والشكل فوراً. لن ترتدي ابتسامة لا تشبهك.
                  </p>
                </div>
              </motion.div>
            </Reveal>

          </div>{/* end bento grid */}
        </div>
      </section>

      {/* ════════════ SERVICES ════════════ */}
      <section id="services" style={{
        position: "relative", zIndex: 1,
        background: "rgba(8,8,8,0.8)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "8rem 0",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem" }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "0.8rem" }}>قائمة الخدمات</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "clamp(2rem,3.5vw,3rem)", color: "#fff" }}>قائمة الامتياز</h2>
              <p style={{ fontSize: 13, color: "#4B5563", fontWeight: 300, maxWidth: 360, lineHeight: 1.8 }}>
                الأسعار تقريبية وقد تختلف حسب الحالة.
              </p>
            </div>
          </Reveal>

          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <motion.div
                onHoverStart={() => setHoveredRow(i)}
                onHoverEnd={() => setHoveredRow(null)}
                onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                className="service-row" style={{
                  display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                  padding: "1.5rem 0.5rem",
                  borderBottom: "1px solid #161616",
                  borderTop: i === 0 ? "1px solid #161616" : "none",
                  background: hoveredRow === i ? "rgba(20,16,13,0.8)" : "transparent",
                  transition: "background 0.4s ease",
                  cursor: "pointer", gap: "2rem", borderRadius: 4,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flex: 1 }}>
                  <span style={{ fontSize: 11, color: "#222", fontWeight: 300, minWidth: 22, paddingTop: 4 }}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.7rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                      <span style={{ fontWeight: 500, fontSize: "clamp(0.9rem,1.3vw,1.05rem)", color: "#fff" }}>
                        {s.name}
                      </span>
                      {s.note && (
                        <span style={{ fontSize: 11, color: "#374151", fontWeight: 300, letterSpacing: "0.06em" }}>{s.note}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#374151", fontWeight: 300, marginBottom: expandedRow === i ? "0.7rem" : 0 }}>
                      {s.sessions}
                    </div>
                    {expandedRow === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 300, lineHeight: 1.8, maxWidth: 480 }}
                      >
                        {s.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div className="service-price-col" style={{ textAlign: "left", flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: "#374151", fontWeight: 300, marginBottom: 4, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    يبدأ من
                  </div>
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

          <Reveal delay={0.3}>
            <div style={{
              marginTop: "4rem", padding: "2.5rem 2.5rem",
              border: "1px solid #1A1A1A", borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "1.5rem",
            }}>
              <div>
                
                <p style={{ fontSize: "clamp(0.95rem,1.3vw,1.1rem)", color: "#fff", fontWeight: 400 }}>احجز الآن وابدأ رحلتك</p>
              </div>
              <motion.a href="https://wa.me/9647731450750"
                whileHover={{ scale: 1.04, boxShadow: `0 16px 50px rgba(212,175,55,0.3)` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: GOLD, color: "#050505",
                  padding: "0.9rem 2rem", borderRadius: 100,
                  fontSize: 14, fontWeight: 700, textDecoration: "none",
                }}
              >
                <MessageCircle size={16} /> احجز عبر واتساب
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ PROMISE ════════════ */}
      <section style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "5rem 0",
      }}>
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
                ].map((s,i) => (
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

      {/* ════════════ FOOTER ════════════ */}
      <footer id="contact" style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid #111",
        padding: "4rem 1.25rem 3rem",
        maxWidth: 1100, margin: "0 auto",
      }}>
        <div className="footer-grid" style={{ display: "grid", marginBottom: "4rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.5rem" }}>
              <img src={LOGO_SRC} alt="logo"
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
              <span style={{ fontWeight: 500, fontSize: 16, color: "#fff" }}>عيادات الموسوي</span>
            </div>
            <p style={{ fontWeight: 300, fontSize: 14, color: "#4B5563", lineHeight: 1.9, maxWidth: 320 }}>
              بيئة علاجية تدمج بين دقة التشخيص المجهري واللمسة الفنية الخبيرة.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, textTransform: "uppercase", marginBottom: "1.2rem" }}>تواصل</p>
            {[
              { Icon: MessageCircle, label: "واتساب المباشر", val: "07731450750", href: "https://wa.me/9647731450750" },
              { Icon: Bot, label: "الحجز الآلي", val: "07762299914", href: "https://wa.me/9647762299914" },
            ].map(({Icon,label,val,href},i) => (
              <a key={i} href={href} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem", textDecoration:"none" }}>
                <Icon size={13} color={GOLD} />
                <div>
                  <p style={{ fontSize:10, color:"#374151", fontWeight:300, marginBottom:1 }}>{label}</p>
                  <p style={{ fontSize:14, fontWeight:400, color:"#9CA3AF", direction:"ltr" }}>{val}</p>
                </div>
              </a>
            ))}
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize:10, letterSpacing:"0.25em", color:GOLD, textTransform:"uppercase", marginBottom:"1.2rem" }}>الزيارة</p>
            {[
              { Icon: MapPin, text: "كربلاء، حي التعاون، مقابل فلكة النافورة" },
              { Icon: Clock, text: "١١ صباحاً — ١٠ مساءً يومياً" },
            ].map(({Icon,text},i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:"1rem" }}>
                <Icon size={13} color={GOLD} style={{ flexShrink:0, marginTop:2 }} />
                <span style={{ fontSize:13, fontWeight:300, color:"#9CA3AF", lineHeight:1.7 }}>{text}</span>
              </div>
            ))}
          </Reveal>
        </div>
        <Reveal>
          <div style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            paddingTop:"2rem", borderTop:"1px solid #0F0F0F",
            flexWrap:"wrap", gap:"1rem",
          }}>
            <p style={{ fontSize:12, color:"#1F1F1F", fontWeight:300 }}>© 2025 عيادات الموسوي · جميع الحقوق محفوظة</p>
            <p style={{ fontSize:11, color:"#1F1F1F", letterSpacing:"0.15em" }}>Excellence · Precision · Trust</p>
          </div>
        </Reveal>
      </footer>

      {/* ════════════ FLOATING CTA ════════════ */}
      <motion.a
        href="https://wa.me/9647731450750"
        initial={{ scale:0, opacity:0 }}
        animate={{ scale:1, opacity:1 }}
        transition={{ type:"spring", stiffness:200, damping:18, delay:2 }}
        whileHover={{ scale:1.1 }}
        whileTap={{ scale:0.93 }}
        style={{
          position:"fixed", bottom:"1.8rem", left:"1.8rem", zIndex:300,
          display:"flex", alignItems:"center", gap:10,
          background:"rgba(8,8,8,0.92)",
          backdropFilter:"blur(20px)",
          border:"1px solid rgba(212,175,55,0.25)",
          color:GOLD,
          padding:"0.7rem 1.4rem 0.7rem 0.8rem",
          borderRadius:100,
          fontSize:13, fontWeight:500,
          textDecoration:"none",
          boxShadow:"0 8px 40px rgba(0,0,0,0.7)",
        }}
      >
        <div style={{
          width:32, height:32, borderRadius:"50%",
          background:"rgba(212,175,55,0.08)",
          border:"1px solid rgba(212,175,55,0.25)",
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
        }}>
          <MessageCircle size={16} color={GOLD} />
        </div>
        <div>
          <p style={{ fontSize:10, color:"#374151", lineHeight:1.2, marginBottom:1 }}>احجز الآن</p>
          <p style={{ fontSize:13, fontWeight:500, lineHeight:1, color:GOLD }}>07731450750</p>
        </div>
        <motion.div
          style={{ position:"absolute", inset:0, borderRadius:100, border:`1px solid rgba(212,175,55,0.25)` }}
          animate={{ scale:[1,1.28], opacity:[0.5,0] }}
          transition={{ duration:2.5, repeat:Infinity, ease:"easeOut" }}
        />
      </motion.a>
    </div>
  );
}