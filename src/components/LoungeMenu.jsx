import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Leaf, Waves, Sparkles, Shield, Heart, Star, ChevronDown, Phone } from "lucide-react";

/* ─────────────────────────── styles ─────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .lr {
      font-family: 'Alexandria', sans-serif;
      background: #050505;
      min-height: 100vh;
      color: #fff;
      direction: rtl;
      width: 100%;
      position: relative;
      overflow-x: hidden;
    }

    /* noise grain */
    .lr::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: 0.4;
    }

    .lr-body {
      position: relative;
      z-index: 1;
      padding-top: 70px;           /* nav clearance */
      padding-bottom: 60px;
    }

    /* centre column — full width on small, capped on large */
    .lr-col {
      width: 100%;
      max-width: 640px;
      margin: 0 auto;
      padding: 0 18px;
    }

    /* ── gold divider ── */
    .gold-rule {
      border: none; height: 1px;
      background: linear-gradient(90deg, transparent, #B8860B77, #B8860B, #B8860B77, transparent);
      width: 55%; margin: 0 auto;
    }

    /* ── section toggle buttons ── */
    .seg-bar {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin: 22px 0;
    }
    .seg-btn {
      font-family: 'Alexandria', sans-serif;
      font-size: 0.82rem;
      font-weight: 500;
      padding: 9px 22px;
      border-radius: 100px;
      cursor: pointer;
      transition: all 0.28s ease;
      white-space: nowrap;
      border: 1px solid #1f1f1f;
      background: transparent;
      color: #6B7280;
      min-height: 44px;
    }
    .seg-btn.on {
      background: linear-gradient(135deg, #B8860B22, #B8860B0d);
      border-color: #B8860B;
      color: #d4a30d;
      box-shadow: 0 0 18px #B8860B1a;
    }

    /* ── drink tabs ── */
    .tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 16px;
      scrollbar-width: none;
      justify-content: center;
      flex-wrap: wrap;
    }
    .tab {
      font-family: 'Alexandria', sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      padding: 8px 18px;
      border-radius: 100px;
      cursor: pointer;
      border: 1px solid #1f1f1f;
      background: transparent;
      color: #9CA3AF;
      transition: all 0.28s;
      white-space: nowrap;
      min-height: 40px;
    }
    .tab.on {
      background: linear-gradient(135deg, #B8860B22, #B8860B0d);
      border-color: #B8860B;
      color: #d4a30d;
      box-shadow: 0 0 14px #B8860B1a;
    }

    /* ── cards ── */
    .card {
      background: linear-gradient(135deg, #0d0d0d, #0a0a0a);
      border: 1px solid #1a1a1a;
      border-radius: 14px;
      padding: 18px 18px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.28s;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, #B8860B2a, transparent);
    }
    .card:hover { border-color: #B8860B33; }

    /* ── FAQ ── */
    .faq-wrap {
      background: linear-gradient(135deg, #0d0d0d, #0a0a0a);
      border: 1px solid #1a1a1a;
      border-radius: 14px;
      overflow: hidden;
    }
    .faq-row {
      border-bottom: 1px solid #111;
    }
    .faq-row:last-child { border-bottom: none; }
    .faq-btn {
      width: 100%;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px;
      font-family: 'Alexandria', sans-serif;
      direction: rtl;
      text-align: right;
      gap: 10px;
      min-height: 52px;
    }

    /* ── emergency banner ── */
    .em-banner {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      flex-wrap: wrap;
      background: linear-gradient(135deg, #B8860B14, #B8860B06);
      border: 1px solid #B8860B3a;
      border-radius: 14px;
      padding: 18px 18px;
      margin-bottom: 36px;
    }

    /* ornament dots */
    .dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 9px;
    }

    @media (min-width: 600px) {
      .lr-col { padding: 0 24px; }
    }
  `}</style>
);

/* ─────────────────────────── data ─────────────────────────── */
const DRINKS = [
  {
    id: "coffee", label: "القهوة", fullLabel: "القهوة المختصة", en: "Specialty Coffee", Icon: Coffee,
    items: [
      { name: "إسبريسو",  desc: "تحميص غني وقوام مخملي لنشاط متجدد." },
      { name: "أمريكانو", desc: "قهوة كلاسيكية ناعمة وموزونة." },
      { name: "كابتشينو", desc: "توازن مثالي بين الإسبريسو ورغوة الحليب الغنية." },
      { name: "لاتيه",    desc: "لمسة ناعمة من الحليب الدافئ مع القهوة الفاخرة." },
    ],
  },
  {
    id: "tea", label: "الشاي", fullLabel: "شاي النخبة", en: "Premium Tea", Icon: Leaf,
    items: [
      { name: "شاي أسود كلاسيكي",   desc: "أوراق منتقاة بعناية لنكهة أصيلة." },
      { name: "شاي أخضر بالياسمين", desc: "عبير مهدئ يساعد على الاسترخاء الذهني." },
    ],
  },
  {
    id: "relax", label: "الاسترخاء", fullLabel: "ركن الاسترخاء", en: "Relaxation", Icon: Waves,
    items: [
      { name: "شاي البابونج", desc: "مزيج خاص لتهدئة الأعصاب قبل العلاج." },
      { name: "مياه معدنية", desc: "نقية ومنعشة." },
    ],
  },
];

const TIPS = [
  {
    id: "post", Icon: Shield, color: "#3B82F6",
    title: "بعد العلاج", en: "Post-Treatment Care",
    items: [
      { label: "بعد الحشوة",       text: "تجنّب الطعام الصلب والسكريات لمدة ساعتين." },
      { label: "بعد القلع",        text: "عضّ الشاش بلطف ٣٠ دقيقة، لا تمصّ ولا تدخن ٢٤ ساعة." },
      { label: "بعد علاج العصب",   text: "تجنّب المضغ من جهة العلاج حتى وضع التاج النهائي." },
      { label: "بعد تنظيف GBT",    text: "تجنّب المشروبات الملونة ٢٤ ساعة للحفاظ على النتيجة." },
    ],
  },
  {
    id: "daily", Icon: Star, color: "#D4AF37",
    title: "نصائح يومية", en: "Daily Care",
    items: [
      { label: "الفرش",       text: "فرّش مرتين يومياً لمدتين دقيقتين بفرشاة ناعمة." },
      { label: "الخيط السني", text: "استخدمه مرة واحدة قبل النوم لتنظيف ما بين الأسنان." },
      { label: "الماء",       text: "اشرب الماء بعد الوجبات لتقليل حموضة الفم." },
      { label: "الكشف الدوري",text: "زيارة كل ٦ أشهر — الوقاية أسهل وأرخص من العلاج." },
    ],
  },
  {
    id: "calm", Icon: Heart, color: "#EC4899",
    title: "قبل جلستك", en: "Before Your Appointment",
    items: [
      { label: "التنفس",     text: "شهيق ٤ ثوان — احبس ٢ — زفير ٦. كرّر ثلاث مرات." },
      { label: "أخبرنا",    text: "أيّ قلق أو ألم أخبر طبيبك فوراً — نحن هنا لنساعدك." },
      { label: "الموسيقى",  text: "اطلب سماعات الأذن — لدينا قوائم تشغيل مهدئة." },
    ],
  },
];

const FAQS = [
  { q: "هل علاج العصب مؤلم؟",
    a: "مع التخدير الموضعي والمجهر الجراحي، معظم المرضى لا يشعرون بأي ألم أثناء الجلسة." },
  { q: "كم يستغرق وقت الانتظار؟",
    a: "نسعى لاحترام المواعيد دائماً. إن تأخّر موعدك استرح في الاستراحة وسنبلّغك فور الاستعداد." },
  { q: "ما الفرق بين التنظيف الاعتيادي وـ GBT؟",
    a: "GBT يستخدم هواء دافئاً بدل الأدوات الكاشطة — إزالة أعمق وأقل إزعاجاً للثة." },
  { q: "هل التصوير CBCT آمن؟",
    a: "نعم — جرعة إشعاعية أقل بكثير من الأشعة التقليدية، آمن تماماً." },
];

/* ─────────────────────────── small components ─────────────────────────── */
function GoldLine() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", margin: "14px 0" }}>
      <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, #B8860B55)" }} />
      <Sparkles size={11} color="#B8860B" />
      <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, #B8860B55, transparent)" }} />
    </div>
  );
}

function DrinkCard({ item }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }}
      className="card"
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg,#B8860B22,#B8860B0a)",
          border: "1px solid #B8860B44",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Sparkles size={13} color="#B8860B" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4, lineHeight: 1.4 }}>{item.name}</p>
          <p style={{ color: "#9CA3AF", fontWeight: 300, fontSize: "0.8rem", lineHeight: 1.75 }}>{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TipBlock({ section }) {
  const Icon = section.Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}
      style={{ marginBottom: 26 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: `${section.color}18`, border: `1px solid ${section.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={17} color={section.color} />
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.98rem", lineHeight: 1.2 }}>{section.title}</p>
          <p style={{ color: `${section.color}88`, fontSize: "0.68rem", fontWeight: 400, letterSpacing: "0.1em" }}>{section.en}</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {section.items.map((tip, i) => (
          <div key={i} className="card" style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div className="dot" style={{ background: section.color }} />
              <p style={{ color: "#9CA3AF", fontWeight: 300, fontSize: "0.81rem", lineHeight: 1.75 }}>
                <span style={{ color: section.color, fontWeight: 600 }}>{tip.label}: </span>
                {tip.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FaqBlock() {
  const [open, setOpen] = useState(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}
      style={{ marginBottom: 28 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: "#B8860B18", border: "1px solid #B8860B44",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Sparkles size={17} color="#B8860B" />
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.98rem" }}>أسئلة شائعة</p>
          <p style={{ color: "#B8860B88", fontSize: "0.68rem", letterSpacing: "0.1em" }}>FAQ</p>
        </div>
      </div>
      <div className="faq-wrap">
        {FAQS.map((item, i) => (
          <div key={i} className="faq-row">
            <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
              <span style={{ color: open === i ? "#D4AF37" : "#e5e7eb", fontSize: "0.88rem", fontWeight: open === i ? 600 : 400, flex: 1, textAlign: "right" }}>
                {item.q}
              </span>
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.22 }} style={{ flexShrink: 0 }}>
                <ChevronDown size={15} color={open === i ? "#D4AF37" : "#4B5563"} />
              </motion.div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ color: "#9CA3AF", fontSize: "0.83rem", fontWeight: 300, lineHeight: 1.85, padding: "0 18px 16px" }}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function EmergencyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="em-banner"
    >
      <div style={{
        width: 44, height: 44, borderRadius: 11, flexShrink: 0,
        background: "#B8860B22", border: "1px solid #B8860B55",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Phone size={18} color="#D4AF37" />
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ color: "#D4AF37", fontWeight: 600, fontSize: "0.9rem", marginBottom: 5 }}>للطوارئ السنية</p>
        <p style={{ color: "#9CA3AF", fontWeight: 300, fontSize: "0.78rem", lineHeight: 1.7, marginBottom: 6 }}>
          ألم حاد أو كسر؟ أخبر الاستقبال فوراً وسنعطيك الأولوية.
        </p>
        <a href="https://wa.me/9647731450750" target="_blank" rel="noopener noreferrer"
          style={{ color: "#D4AF37", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", direction: "ltr", display: "inline-block" }}>
          WhatsApp: 07731450750
        </a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── main ─────────────────────────── */
export default function LoungeMenu() {
  const [activeTab, setActiveTab] = useState("all");
  const [section, setSection] = useState("menu");

  const visibleDrinks = activeTab === "all" ? DRINKS : DRINKS.filter(d => d.id === activeTab);

  return (
    <>
      <Styles />
      <div className="lr">
        <div className="lr-body">
          <div className="lr-col">

            {/* ── HEADER ── */}
            <motion.div
              initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
              style={{ textAlign: "center", padding: "24px 0 20px" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.55 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "linear-gradient(135deg,#B8860B22,#B8860B0a)",
                  border: "1px solid #B8860B55", borderRadius: 100,
                  padding: "5px 16px", marginBottom: 20,
                }}
              >
                <span style={{ fontSize: "0.66rem", color: "#B8860B", fontWeight: 500, letterSpacing: "0.12em" }}>عيادات الموسوي</span>
                <Sparkles size={9} color="#B8860B" />
              </motion.div>

              <h1 style={{ fontSize: "clamp(1.6rem,5vw,2.1rem)", fontWeight: 700, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.2, marginBottom: 6 }}>
                استراحة الموسوي
              </h1>
              <p style={{ fontSize: "0.7rem", color: "#B8860B", fontWeight: 400, letterSpacing: "0.18em", marginBottom: 18, textTransform: "uppercase" }}>
                Al-Mousawi Lounge
              </p>
              <GoldLine />
              <p style={{ color: "#9CA3AF", fontSize: "clamp(0.82rem,2.5vw,0.9rem)", fontWeight: 300, lineHeight: 1.9, marginTop: 14 }}>
                نؤمن بأن رحلة علاجك تبدأ من الهدوء.<br />
                تفضّل باختيار مشروبك المفضل لنحضره لك بكل حب.
              </p>
            </motion.div>

            <hr className="gold-rule" style={{ marginBottom: 4 }} />

            {/* ── SECTION TOGGLE ── */}
            <div className="seg-bar">
              {[{ id: "menu", label: "قائمة المشروبات" }, { id: "tips", label: "نصائح المرضى" }].map(s => (
                <button key={s.id} className={`seg-btn${section === s.id ? " on" : ""}`} onClick={() => setSection(s.id)}>
                  {s.label}
                </button>
              ))}
            </div>

            {/* ── MENU ── */}
            <AnimatePresence mode="wait">
              {section === "menu" && (
                <motion.div key="menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <div className="tabs">
                    {[{ id: "all", label: "الكل" }, ...DRINKS.map(d => ({ id: d.id, label: d.label }))].map(t => (
                      <button key={t.id} className={`tab${activeTab === t.id ? " on" : ""}`} onClick={() => setActiveTab(t.id)}>
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{}} animate={{ transition: { staggerChildren: 0.09 } }}
                      exit={{ opacity: 0 }}
                    >
                      {visibleDrinks.map(cat => {
                        const CatIcon = cat.Icon;
                        return (
                          <div key={cat.id} style={{ marginBottom: 32 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                              <div style={{
                                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                                background: "linear-gradient(135deg,#B8860B33,#B8860B0a)",
                                border: "1px solid #B8860B55",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <CatIcon size={17} color="#B8860B" />
                              </div>
                              <div>
                                <p style={{ color: "#fff", fontWeight: 600, fontSize: "1rem" }}>{cat.fullLabel}</p>
                                <p style={{ color: "#B8860B88", fontSize: "0.68rem", letterSpacing: "0.1em" }}>{cat.en}</p>
                              </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                              {cat.items.map(item => <DrinkCard key={item.name} item={item} />)}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ── TIPS ── */}
              {section === "tips" && (
                <motion.div key="tips" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  {TIPS.map(s => <TipBlock key={s.id} section={s} />)}
                  <GoldLine />
                  <div style={{ height: 20 }} />
                  <FaqBlock />
                  <EmergencyCard />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FOOTER NOTE ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
              style={{ borderTop: "1px solid #141414", paddingTop: 22, textAlign: "center" }}>
              <GoldLine />
              <p style={{ color: "#2e2e2e", fontSize: "0.7rem", marginTop: 12, letterSpacing: "0.08em" }}>
                هذه الخدمة مُقدَّمة بالكامل على حسابنا — بكل فخر وتقدير
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}
