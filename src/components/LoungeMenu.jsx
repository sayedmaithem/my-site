import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Leaf, Waves, Sparkles, Shield, Heart, Star, ChevronDown, Phone } from "lucide-react";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&display=swap');

    .lounge-root {
      font-family: 'Alexandria', sans-serif;
      background: #050505;
      min-height: 100vh;
      color: #ffffff;
      direction: rtl;
      width: 100%;
      position: relative;
      overflow-x: hidden;
    }

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

    .lounge-inner {
      max-width: 680px;
      margin: 0 auto;
      width: 100%;
    }

    .gold-rule {
      border: none;
      height: 1px;
      background: linear-gradient(90deg, transparent, #B8860B55, #B8860B, #B8860B55, transparent);
      margin: 0 auto;
    }

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
    .tab-btn:hover { border-color: #B8860B55; color: #d4a30d; }
    .tab-btn.active {
      background: linear-gradient(135deg, #B8860B22, #B8860B11);
      border-color: #B8860B;
      color: #d4a30d;
      box-shadow: 0 0 16px #B8860B22, inset 0 0 12px #B8860B0a;
    }

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
    .menu-card:hover { border-color: #B8860B44; }

    .tip-card {
      background: linear-gradient(135deg, #0d0d0d, #0a0a0a);
      border: 1px solid #1a1a1a;
      border-radius: 16px;
      padding: 18px 20px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s ease;
    }
    .tip-card:hover { border-color: #B8860B33; }

    .faq-item {
      border-bottom: 1px solid #111;
      overflow: hidden;
    }
    .faq-btn {
      width: 100%;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 4px;
      font-family: 'Alexandria', sans-serif;
      direction: rtl;
      text-align: right;
      gap: 12px;
    }

    .icon-dot {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #B8860B22, #B8860B0a);
      border: 1px solid #B8860B44;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    @media (min-width: 768px) {
      .tips-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
      }
    }
  `}</style>
);

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

const PATIENT_TIPS = [
  {
    id: "postcare",
    icon: Shield,
    color: "#3B82F6",
    title: "بعد العلاج",
    englishTitle: "Post-Treatment Care",
    tips: [
      { label: "بعد الحشوة", text: "تجنب الطعام الصلب والسكريات لمدة ساعتين، وراجعنا إن استمر الألم." },
      { label: "بعد القلع", text: "عض على الشاش بلطف ٣٠ دقيقة، لا تمصّ ولا تدخن لـ ٢٤ ساعة." },
      { label: "بعد علاج العصب", text: "تجنب المضغ من جهة العلاج حتى يتم وضع التاج النهائي." },
      { label: "بعد التنظيف GBT", text: "تجنب الأطعمة والمشروبات الملونة لـ ٢٤ ساعة للحفاظ على النتيجة." },
    ],
  },
  {
    id: "daily",
    icon: Star,
    color: "#D4AF37",
    title: "نصائح يومية",
    englishTitle: "Daily Care Tips",
    tips: [
      { label: "الفرش", text: "فرّش أسنانك مرتين يومياً لمدتين دقيقتين بفرشاة ناعمة." },
      { label: "الخيط السني", text: "استخدم الخيط السني مرة واحدة قبل النوم لتنظيف ما بين الأسنان." },
      { label: "الماء", text: "اشرب الماء بعد الوجبات لتقليل حموضة الفم وحماية المينا." },
      { label: "الكشف الدوري", text: "زر طبيب أسنانك كل ٦ أشهر — الوقاية أسهل وأرخص من العلاج." },
    ],
  },
  {
    id: "calm",
    icon: Heart,
    color: "#EC4899",
    title: "تهدئة قبل العلاج",
    englishTitle: "Before Your Appointment",
    tips: [
      { label: "التنفس العميق", text: "شهيق ٤ ثوان — احبس ٢ — زفير ٦ ثوان. كرّر ٣ مرات." },
      { label: "أخبرنا", text: "لا تتردد في إخبار طبيبك بأي قلق — نحن هنا لنجعل التجربة مريحة." },
      { label: "الموسيقى", text: "اطلب من الممرضة سماعات الأذن — لدينا قوائم تشغيل مهدئة لك." },
      { label: "تصوّر النتيجة", text: "ركّز على الابتسامة الجميلة التي ستغادر بها — الألم لحظة والنتيجة دائمة." },
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "هل علاج العصب مؤلم؟",
    a: "مع التخدير الموضعي والمجهر الجراحي، معظم المرضى لا يشعرون بأي ألم أثناء الجلسة. قد يكون هناك إحساس خفيف بعد انتهاء مفعول التخدير يتحكم به المسكن.",
  },
  {
    q: "كم يستغرق وقت الانتظار عادةً؟",
    a: "نسعى إلى احترام مواعيد جميع مرضانا. في حال تأخر موعدك، استرح واستمتع بمشروبك المجاني في الاستراحة ونحن نبلغك فور الاستعداد.",
  },
  {
    q: "ما الفرق بين التنظيف الاعتيادي وبروتوكول GBT؟",
    a: "GBT يستخدم تدفق هواء دافئ بدلاً من الأدوات الكاشطة، مما يزيل التصبغات بعمق دون إزعاج اللثة — مثالي لمن يعاني من حساسية الأسنان.",
  },
  {
    q: "هل التصوير CBCT آمن؟",
    a: "نعم، جهاز CBCT يستخدم جرعة إشعاعية أقل بكثير من الأشعة التقليدية وهو آمن تماماً. يُستخدم لتخطيط الزراعة بدقة متناهية.",
  },
  {
    q: "هل يمكن إجراء أكثر من خدمة في نفس الجلسة؟",
    a: "نعم في كثير من الحالات يمكن دمج خدمتين بحسب تقدير الطبيب. تحدث مع طاقمنا وسنجد الخطة الأنسب لك.",
  },
];

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

function GoldOrnament() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", margin: "12px 0" }}>
      <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, transparent, #B8860B66)" }} />
      <Sparkles size={12} color="#B8860B" />
      <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #B8860B66, transparent)" }} />
    </div>
  );
}

function MenuItem({ item }) {
  return (
    <motion.div variants={itemVariants} className="menu-card">
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <div className="icon-dot">
          <Sparkles size={14} color="#B8860B" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "1rem", letterSpacing: "0.02em", marginBottom: "5px", lineHeight: 1.4 }}>
            {item.name}
          </p>
          <p style={{ color: "#9CA3AF", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.7 }}>
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function TipSection({ section }) {
  const SectionIcon = section.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ marginBottom: "28px" }}
    >
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "12px",
          background: `${section.color}18`,
          border: `1px solid ${section.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <SectionIcon size={18} color={section.color} />
        </div>
        <div>
          <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.2 }}>{section.title}</p>
          <p style={{ color: `${section.color}88`, fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.1em" }}>{section.englishTitle}</p>
        </div>
      </div>

      {/* Tips cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {section.tips.map((tip, idx) => (
          <div key={idx} className="tip-card">
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{
                minWidth: "6px", height: "6px", borderRadius: "50%",
                background: section.color, marginTop: "8px", flexShrink: 0,
              }} />
              <div>
                <span style={{ color: section.color, fontWeight: 600, fontSize: "0.82rem", marginLeft: "6px" }}>{tip.label}: </span>
                <span style={{ color: "#9CA3AF", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.75 }}>{tip.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ marginBottom: "48px" }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "12px",
          background: "#B8860B18",
          border: "1px solid #B8860B44",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Sparkles size={18} color="#B8860B" />
        </div>
        <div>
          <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.2 }}>أسئلة شائعة</p>
          <p style={{ color: "#B8860B88", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.1em" }}>Frequently Asked Questions</p>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #0d0d0d, #0a0a0a)", border: "1px solid #1a1a1a", borderRadius: "16px", padding: "0 20px", overflow: "hidden" }}>
        {FAQ_ITEMS.map((item, idx) => (
          <div key={idx} className="faq-item" style={{ borderBottom: idx === FAQ_ITEMS.length - 1 ? "none" : "1px solid #111" }}>
            <button
              className="faq-btn"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span style={{ color: openIdx === idx ? "#D4AF37" : "#e5e7eb", fontSize: "0.9rem", fontWeight: openIdx === idx ? 600 : 400, flex: 1, textAlign: "right" }}>
                {item.q}
              </span>
              <motion.div
                animate={{ rotate: openIdx === idx ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ flexShrink: 0 }}
              >
                <ChevronDown size={16} color={openIdx === idx ? "#D4AF37" : "#4B5563"} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ color: "#9CA3AF", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.85, paddingBottom: "16px", paddingRight: "4px" }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function EmergencyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7 }}
      style={{
        background: "linear-gradient(135deg, #B8860B18, #B8860B08)",
        border: "1px solid #B8860B44",
        borderRadius: "16px",
        padding: "20px 22px",
        marginBottom: "40px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div style={{
        width: "48px", height: "48px", borderRadius: "12px",
        background: "#B8860B22",
        border: "1px solid #B8860B55",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Phone size={20} color="#D4AF37" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: "#D4AF37", fontWeight: 600, fontSize: "0.92rem", marginBottom: "4px" }}>للطوارئ السنية</p>
        <p style={{ color: "#9CA3AF", fontWeight: 300, fontSize: "0.8rem", lineHeight: 1.6 }}>
          هل تعاني من ألم حاد أو كسر في السن؟ أخبر الاستقبال فوراً وسنعطيك الأولوية.
        </p>
        <a
          href="https://wa.me/9647731450750"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#D4AF37", fontSize: "0.82rem", fontWeight: 500, textDecoration: "none", direction: "ltr", display: "inline-block", marginTop: "6px" }}
        >
          WhatsApp: 07731450750
        </a>
      </div>
    </motion.div>
  );
}

export default function LoungeMenu() {
  const [activeId, setActiveId] = useState("all");
  const [activeSection, setActiveSection] = useState("menu");

  const visibleCategories =
    activeId === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === activeId);

  return (
    <>
      <FontStyle />
      <div className="lounge-root">
        <div className="lounge-content" style={{ paddingTop: "80px" }}>
          <div className="lounge-inner" style={{ padding: "0 20px" }}>

            {/* ── Header ── */}
            <motion.div variants={headerVariants} initial="hidden" animate="visible"
              style={{ padding: "28px 8px 28px", textAlign: "center" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "linear-gradient(135deg, #B8860B22, #B8860B0a)",
                  border: "1px solid #B8860B55", borderRadius: "100px",
                  padding: "5px 16px", marginBottom: "24px",
                }}>
                <span style={{ fontSize: "0.68rem", color: "#B8860B", fontWeight: 500, letterSpacing: "0.12em" }}>
                  عيادات الموسوي
                </span>
                <Sparkles size={10} color="#B8860B" />
              </motion.div>

              <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1.2, marginBottom: "6px" }}>
                استراحة الموسوي
              </h1>
              <p style={{ fontSize: "0.72rem", color: "#B8860B", fontWeight: 400, letterSpacing: "0.18em", marginBottom: "20px", textTransform: "uppercase" }}>
                Al-Mousawi Lounge
              </p>
              <GoldOrnament />
              <p style={{ color: "#9CA3AF", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.9, marginTop: "16px", padding: "0 8px" }}>
                نؤمن بأن رحلة علاجك تبدأ من الهدوء.<br />
                تفضل باختيار مشروبك المفضل لنحضره لك بكل حب.
              </p>
            </motion.div>

            <hr className="gold-rule" style={{ width: "60%", marginBottom: "28px" }} />

            {/* ── Section Switcher (Menu / Tips) ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "24px" }}
            >
              {[
                { id: "menu", label: "قائمة المشروبات" },
                { id: "tips", label: "نصائح المرضى" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  style={{
                    background: activeSection === s.id ? "linear-gradient(135deg, #B8860B22, #B8860B11)" : "transparent",
                    border: activeSection === s.id ? "1px solid #B8860B" : "1px solid #1f1f1f",
                    color: activeSection === s.id ? "#d4a30d" : "#6B7280",
                    fontFamily: "'Alexandria', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    padding: "9px 22px",
                    borderRadius: "100px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: activeSection === s.id ? "0 0 16px #B8860B22" : "none",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </motion.div>

            {/* ── MENU section ── */}
            <AnimatePresence mode="wait">
              {activeSection === "menu" && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Drink tabs */}
                  <motion.div variants={tabsVariants} initial="hidden" animate="visible"
                    style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "20px", scrollbarWidth: "none", justifyContent: "center", flexWrap: "wrap" }}>
                    {[{ id: "all", label: "الكل" }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))].map((tab) => (
                      <button key={tab.id} className={`tab-btn ${activeId === tab.id ? "active" : ""}`} onClick={() => setActiveId(tab.id)}>
                        {tab.label}
                      </button>
                    ))}
                  </motion.div>

                  <div style={{ paddingBottom: "40px" }}>
                    <AnimatePresence mode="wait">
                      <motion.div key={activeId} variants={listVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                        {visibleCategories.map((cat) => {
                          const CatIcon = cat.Icon;
                          return (
                            <motion.div key={cat.id} variants={itemVariants} style={{ marginBottom: "36px" }}>
                              <motion.div variants={categoryHeaderVariants}
                                style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", padding: "0 4px" }}>
                                <div style={{
                                  width: "42px", height: "42px", borderRadius: "12px",
                                  background: "linear-gradient(135deg, #B8860B33, #B8860B0a)",
                                  border: "1px solid #B8860B55",
                                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                }}>
                                  <CatIcon size={18} color="#B8860B" />
                                </div>
                                <div>
                                  <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.2 }}>{cat.fullLabel}</p>
                                  <p style={{ color: "#B8860B88", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.1em" }}>{cat.englishLabel}</p>
                                </div>
                              </motion.div>
                              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {cat.items.map((item) => (
                                  <MenuItem key={item.name} item={item} />
                                ))}
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* ── TIPS section ── */}
              {activeSection === "tips" && (
                <motion.div
                  key="tips"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  style={{ paddingBottom: "40px" }}
                >
                  {/* Patient tips */}
                  {PATIENT_TIPS.map((section) => (
                    <TipSection key={section.id} section={section} />
                  ))}

                  {/* FAQ */}
                  <GoldOrnament />
                  <div style={{ height: "24px" }} />
                  <FaqSection />

                  {/* Emergency banner */}
                  <EmergencyBanner />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Footer note ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
              style={{ borderTop: "1px solid #1a1a1a", padding: "24px 8px 40px", textAlign: "center" }}>
              <GoldOrnament />
              <p style={{ color: "#3a3a3a", fontSize: "0.72rem", marginTop: "14px", letterSpacing: "0.08em" }}>
                هذه الخدمة مُقدَّمة بالكامل على حسابنا — بكل فخر وتقدير
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}
