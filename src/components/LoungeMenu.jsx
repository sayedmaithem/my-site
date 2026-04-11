import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Leaf, Waves, Sparkles } from "lucide-react";

/* ─── Google Font: Alexandria ─── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #050505; }

    .lounge-root {
      font-family: 'Alexandria', sans-serif;
      background: #050505;
      min-height: 100vh;
      color: #ffffff;
      direction: rtl;
      max-width: 430px;
      margin: 0 auto;
      position: relative;
      overflow-x: hidden;
    }

    /* Subtle grain texture overlay */
    .lounge-root::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: 0.4;
    }

    .lounge-content { position: relative; z-index: 1; }

    /* Gold divider line */
    .gold-rule {
      border: none;
      height: 1px;
      background: linear-gradient(90deg, transparent, #B8860B55, #B8860B, #B8860B55, transparent);
      margin: 0 auto;
    }

    /* Category tabs */
    .tab-btn {
      background: transparent;
      border: 1px solid #1f1f1f;
      color: #9CA3AF;
      font-family: 'Alexandria', sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      padding: 8px 18px;
      border-radius: 100px;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      letter-spacing: 0.03em;
    }
    .tab-btn:hover {
      border-color: #B8860B55;
      color: #d4a30d;
    }
    .tab-btn.active {
      background: linear-gradient(135deg, #B8860B22, #B8860B11);
      border-color: #B8860B;
      color: #d4a30d;
      box-shadow: 0 0 16px #B8860B22, inset 0 0 12px #B8860B0a;
    }

    /* Menu item card */
    .menu-card {
      background: linear-gradient(135deg, #0d0d0d, #0a0a0a);
      border: 1px solid #1a1a1a;
      border-radius: 16px;
      padding: 20px 22px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s ease;
    }
    .menu-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, #B8860B33, transparent);
    }
    .menu-card:hover {
      border-color: #B8860B44;
    }

    /* Icon wrapper */
    .icon-dot {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #B8860B22, #B8860B0a);
      border: 1px solid #B8860B44;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #050505; }
    ::-webkit-scrollbar-thumb { background: #B8860B55; border-radius: 10px; }
  `}</style>
);

/* ─── Data ─── */
const CATEGORIES = [
  {
    id: "coffee",
    label: "القهوة",
    fullLabel: "القهوة المختصة",
    englishLabel: "Specialty Coffee",
    Icon: Coffee,
    items: [
      { name: "إسبريسو", desc: "تحميص غني وقوام مخملي لنشاط متجدد." },
      { name: "أمريكانو", desc: "قهوة كلاسيكية ناعمة وموزونة." },
      { name: "كابتشينو", desc: "توازن مثالي بين الإسبريسو ورغوة الحليب الغنية." },
      { name: "لاتيه", desc: "لمسة ناعمة من الحليب الدافئ مع القهوة الفاخرة." },
    ],
  },
  {
    id: "tea",
    label: "الشاي",
    fullLabel: "شاي النخبة",
    englishLabel: "Premium Tea",
    Icon: Leaf,
    items: [
      { name: "شاي أسود كلاسيكي", desc: "أوراق منتقاة بعناية لنكهة أصيلة." },
      { name: "شاي أخضر بالياسمين", desc: "عبير مهدئ يساعد على الاسترخاء الذهني." },
    ],
  },
  {
    id: "relax",
    label: "الاسترخاء",
    fullLabel: "ركن الاسترخاء",
    englishLabel: "Relaxation",
    Icon: Waves,
    items: [
      { name: "شاي البابونج", desc: "مزيج خاص لتهدئة الأعصاب وإزالة التوتر قبل العلاج." },
      { name: "مياه معدنية", desc: "نقية ومنعشة." },
    ],
  },
];

/* ─── Animation Variants ─── */
const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const tabsVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.35, ease: "easeOut" } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

const categoryHeaderVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── Sub-components ─── */
function GoldOrnament() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", margin: "12px 0" }}>
      <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, transparent, #B8860B66)" }} />
      <Sparkles size={12} color="#B8860B" />
      <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #B8860B66, transparent)" }} />
    </div>
  );
}

function MenuItem({ item, index }) {
  return (
    <motion.div variants={itemVariants} className="menu-card">
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <div className="icon-dot">
          <Sparkles size={14} color="#B8860B" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: "0.02em",
            marginBottom: "5px",
            lineHeight: 1.4,
          }}>
            {item.name}
          </p>
          <p style={{
            color: "#9CA3AF",
            fontWeight: 300,
            fontSize: "0.82rem",
            lineHeight: 1.7,
          }}>
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function LoungeMenu() {
  const [activeId, setActiveId] = useState("all");

  const visibleCategories =
    activeId === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === activeId);

  return (
    <>
      <FontStyle />
      <div className="lounge-root">
        <div className="lounge-content">

          {/* ── HERO HEADER ── */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            style={{ padding: "48px 28px 28px", textAlign: "center" }}
          >
            {/* Clinic badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "linear-gradient(135deg, #B8860B22, #B8860B0a)",
                border: "1px solid #B8860B55",
                borderRadius: "100px",
                padding: "5px 16px",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "0.68rem", color: "#B8860B", fontWeight: 500, letterSpacing: "0.12em" }}>
                عيادات الموسوي
              </span>
              <Sparkles size={10} color="#B8860B" />
            </motion.div>

            {/* Main Title */}
            <h1 style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
              marginBottom: "6px",
            }}>
              استراحة الموسوي
            </h1>
            <p style={{
              fontSize: "0.72rem",
              color: "#B8860B",
              fontWeight: 400,
              letterSpacing: "0.18em",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}>
              Al-Mousawi Lounge
            </p>

            <GoldOrnament />

            {/* Subtitle */}
            <p style={{
              color: "#9CA3AF",
              fontSize: "0.88rem",
              fontWeight: 300,
              lineHeight: 1.9,
              marginTop: "16px",
              padding: "0 8px",
            }}>
              نؤمن بأن رحلة علاجك تبدأ من الهدوء.<br />
              تفضل باختيار مشروبك المفضل لنحضره لك بكل حب.
            </p>
          </motion.div>

          {/* ── GOLD RULE ── */}
          <hr className="gold-rule" style={{ width: "60%", marginBottom: "28px" }} />

          {/* ── CATEGORY FILTER TABS ── */}
          <motion.div
            variants={tabsVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              padding: "0 24px 20px",
              scrollbarWidth: "none",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[{ id: "all", label: "الكل" }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))].map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeId === tab.id ? "active" : ""}`}
                onClick={() => setActiveId(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* ── MENU SECTIONS ── */}
          <div style={{ padding: "0 20px 60px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {visibleCategories.map((cat) => {
                  const CatIcon = cat.Icon;
                  return (
                    <motion.div key={cat.id} variants={itemVariants} style={{ marginBottom: "36px" }}>

                      {/* Category Header */}
                      <motion.div
                        variants={categoryHeaderVariants}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "16px",
                          padding: "0 4px",
                        }}
                      >
                        <div style={{
                          width: "42px", height: "42px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #B8860B33, #B8860B0a)",
                          border: "1px solid #B8860B55",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <CatIcon size={18} color="#B8860B" />
                        </div>
                        <div>
                          <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.2 }}>
                            {cat.fullLabel}
                          </p>
                          <p style={{ color: "#B8860B88", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.1em" }}>
                            {cat.englishLabel}
                          </p>
                        </div>
                      </motion.div>

                      {/* Items */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {cat.items.map((item, i) => (
                          <MenuItem key={item.name} item={item} index={i} />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── FOOTER ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              borderTop: "1px solid #1a1a1a",
              padding: "24px 28px 40px",
              textAlign: "center",
            }}
          >
            <GoldOrnament />
            <p style={{ color: "#3a3a3a", fontSize: "0.72rem", marginTop: "14px", letterSpacing: "0.08em" }}>
              هذه الخدمة مُقدَّمة بالكامل على حسابنا — بكل فخر وتقدير
            </p>
          </motion.div>

        </div>
      </div>
    </>
  );
}
