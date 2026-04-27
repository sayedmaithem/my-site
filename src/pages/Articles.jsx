import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, BookOpen, CircleCheck, Droplets, ShieldPlus, Sparkles } from "lucide-react";
import { GOLD, CONTACT } from "../constants";

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

const ARTICLE_CATEGORIES = [
  {
    title: "علاج العصب",
    desc: "مقالات تساعدك تفهم آلام الأسنان العميقة، علاج الجذور، وخيارات الحفاظ على السن.",
    status: "مقال متاح الآن",
  },
  {
    title: "الوقاية اليومية",
    desc: "نصائح عملية عن التنظيف، الفلورايد، والعادات التي تحافظ على أسنانك أطول فترة ممكنة.",
    status: "قريباً",
  },
  {
    title: "التجميل والترميم",
    desc: "شرح مبسط للحشوات التجميلية، العدسات، والتيجان، ومتى تكون مناسبة لكل حالة.",
    status: "قريباً",
  },
];

const ROOT_FILLING_POINTS = [
  "حشوات الجذور ليست مجرد إغلاق للسن، بل جزء أساسي من علاج يحافظ على الجذر من عودة الالتهاب.",
  "النجاح يعتمد على تنظيف القنوات بدقة ثم تعبئتها بإحكام حتى لا تبقى فراغات تسمح للبكتيريا بالرجوع.",
  "كثير من الحالات يمكن إنقاذها بدون قلع إذا جرى التشخيص مبكراً وتطبيق العلاج بالشكل الصحيح.",
];

const ROOT_FILLING_SECTIONS = [
  {
    title: "ما المقصود بحشوات الجذور؟",
    body:
      "بعد تنظيف العصب الملتهب أو المتضرر من داخل القنوات الجذرية، يتم ملء هذه القنوات بمادة طبية خاصة ومحكمة. الهدف من حشوات الجذور هو غلق المسارات الداخلية للسن ومنع البكتيريا من العودة إليها، حتى يبقى السن مستقراً وقابلاً للخدمة لسنوات طويلة بإذن الله.",
  },
  {
    title: "متى نحتاج هذا العلاج؟",
    body:
      "نلجأ إليه عندما يصل التسوس أو الكسر أو الالتهاب إلى عصب السن، أو عندما يكون هناك ألم عميق، انتفاخ، حساسية شديدة، أو خراج ظاهر في الأشعة. أحياناً يكون الألم متقطعاً، وأحياناً يكون السن ميتاً من غير ألم واضح، لذلك الفحص والأشعة مهمان جداً.",
  },
  {
    title: "هل حشوات الجذور مؤلمة؟",
    body:
      "الفكرة الشائعة أنها مؤلمة جداً، لكن الواقع أن العلاج الحديث يهدف أساساً إلى إزالة الألم وليس زيادته. مع التخدير الجيد والتقنيات الدقيقة، يشعر أغلب المرضى براحة أكبر بعد العلاج مقارنة بما كانوا يشعرون به قبل المراجعة.",
  },
  {
    title: "شلون تتم العملية عادة؟",
    body:
      "تبدأ بتشخيص سريري وشعاعي دقيق، ثم عزل السن وتنظيف القنوات من الأنسجة الملتهبة والبكتيريا، وبعدها قياس طول القنوات وتعقيمها وتجهيزها. في النهاية تُملأ القنوات بحشوة جذرية محكمة، ثم يُعاد ترميم الجزء الظاهر من السن بحشوة أو تغليف حسب الحاجة.",
  },
  {
    title: "شنو التعليمات بعد العلاج؟",
    body:
      "من الطبيعي أحياناً وجود حساسية خفيفة أو انزعاج بسيط ليومين أو ثلاثة، خصوصاً عند المضغ. ننصح بتجنب الضغط القوي على السن إلى حين اكتمال الترميم النهائي، والالتزام بالأدوية الموصوفة، ومراجعة الطبيب إذا ظهر انتفاخ أو ألم متصاعد أو سقطت الحشوة المؤقتة.",
  },
  {
    title: "ليش الترميم النهائي مهم؟",
    body:
      "لأن السن بعد علاج الجذور قد يصبح أضعف من السابق إذا تُرك بدون حماية كافية. لذلك كثير من الأسنان، خاصة الخلفية، تحتاج ترميم نهائي قوي أو تغليف يحافظ على السن من الكسر ويعطي العلاج فرصة نجاح أعلى على المدى البعيد.",
  },
];

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
        .articles-shell { position: relative; z-index: 1; max-width: 1120px; margin: 0 auto; padding: 0 1.25rem 7rem; }
        .category-grid { display: grid; gap: 16px; }
        .article-grid { display: grid; gap: 24px; align-items: start; }
        .prose-grid { display: grid; gap: 18px; }
        @media (min-width: 768px) {
          .category-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .article-grid { grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.75fr); }
          .prose-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 58% at 50% 0%, rgba(27,22,18,0.78) 0%, #050505 62%)" }} />
      <div style={{ position: "fixed", top: "18%", right: "-10%", width: "34vw", height: "34vw", borderRadius: "50%", background: "rgba(212,175,55,0.03)", filter: "blur(130px)", zIndex: 0, pointerEvents: "none" }} />

      <main className="articles-shell">
        <section style={{ textAlign: "center", maxWidth: 760, margin: "0 auto", padding: "2.8rem 0 4rem" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 999, padding: "0.45rem 1rem", color: GOLD, fontSize: 12, fontWeight: 500 }}>
              <BookOpen size={15} />
              مساحة توعوية لمرضى العيادة
            </div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.3rem, 6vw, 4.8rem)", lineHeight: 1.08, margin: "1.3rem 0 1rem" }}>
              مقالات
              <br />
              <span style={{ color: GOLD, fontWeight: 300, fontStyle: "italic" }}>تشرح وتطمّن</span>
            </h1>
            <p style={{ color: "#A1A1AA", fontSize: "clamp(0.95rem, 1.6vw, 1.08rem)", lineHeight: 1.95, fontWeight: 300 }}>
              هنا نجمع مقالات قصيرة وواضحة تساعدك تفهم الإجراءات السنية الشائعة، وتفرق بين المعلومة الصحيحة والانطباعات المقلقة المنتشرة.
            </p>
          </Reveal>
        </section>

        <section style={{ marginBottom: "4.5rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "1.3rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.18em", marginBottom: "0.6rem" }}>أقسام المقالات</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700 }}>مكتبة صغيرة تبدأ من أهم الأسئلة</h2>
              </div>
              <a href="#root-fillings-article" style={{ color: GOLD, textDecoration: "none", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
                اقرأ المقال الأول <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <div className="category-grid">
            {ARTICLE_CATEGORIES.map((category, index) => (
              <Reveal key={category.title} delay={index * 0.08}>
                <div style={{ height: "100%", background: index === 0 ? "rgba(212,175,55,0.05)" : "#0d0d0d", border: index === 0 ? "1px solid rgba(212,175,55,0.16)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 22, padding: "1.5rem" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: "1rem", fontSize: 11, color: index === 0 ? GOLD : "#71717A" }}>
                    {index === 0 ? <CircleCheck size={14} /> : <Sparkles size={14} />}
                    {category.status}
                  </span>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.7rem" }}>{category.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.9, fontWeight: 300 }}>{category.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="root-fillings-article" className="article-grid">
          <Reveal>
            <article style={{ background: "linear-gradient(180deg, rgba(16,16,16,0.98) 0%, rgba(10,10,10,0.98) 100%)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 28, overflow: "hidden", boxShadow: "0 30px 90px rgba(0,0,0,0.3)" }}>
              <div style={{ padding: "1.25rem 1.25rem 0" }}>
                <div style={{ borderRadius: 22, padding: "1.35rem", background: "radial-gradient(circle at top right, rgba(212,175,55,0.14), transparent 38%), linear-gradient(180deg, rgba(18,18,18,0.95), rgba(12,12,12,0.92))", border: "1px solid rgba(212,175,55,0.12)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", marginBottom: "1rem" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.42rem 0.8rem", borderRadius: 999, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.16)", color: GOLD, fontSize: 11 }}>
                      <Droplets size={13} />
                      علاج العصب
                    </span>
                    <span style={{ padding: "0.42rem 0.8rem", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", color: "#A1A1AA", fontSize: 11 }}>
                      مقال توعوي
                    </span>
                  </div>

                  <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: "0.9rem" }}>
                    حشوات الجذور
                    <br />
                    <span style={{ color: GOLD, fontWeight: 300, fontStyle: "italic" }}>متى نحتاجها؟ وكيف نحافظ على نجاحها؟</span>
                  </h2>

                  <p style={{ color: "#B3B3BC", fontSize: 15, lineHeight: 2, fontWeight: 300, maxWidth: 760 }}>
                    كثير من المرضى يسمعون عن علاج العصب، لكن الجزء الأهم بعد تنظيف القنوات هو حشوات الجذور نفسها. هذا المقال يشرح الفكرة ببساطة: ما الذي يحدث داخل السن، ولماذا تعتبر الحشوة الجذرية المحكمة خطوة أساسية لإنقاذ السن ومنع رجوع الالتهاب.
                  </p>
                </div>
              </div>

              <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                <div style={{ background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 22, padding: "1.4rem", marginBottom: "1.2rem" }}>
                  <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.16em", marginBottom: "0.9rem" }}>خلاصة سريعة</p>
                  <div style={{ display: "grid", gap: "0.8rem" }}>
                    {ROOT_FILLING_POINTS.map((point) => (
                      <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <CircleCheck size={17} color={GOLD} style={{ flexShrink: 0, marginTop: 3 }} />
                        <p style={{ color: "#D4D4D8", fontSize: 14, lineHeight: 1.9, fontWeight: 300 }}>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="prose-grid">
                  {ROOT_FILLING_SECTIONS.map((section, index) => (
                    <Reveal key={section.title} delay={index * 0.04} y={18}>
                      <section style={{ height: "100%", background: index % 2 === 0 ? "#0D0D0D" : "#101010", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "1.3rem" }}>
                        <h3 style={{ fontSize: "1.02rem", fontWeight: 700, marginBottom: "0.7rem", color: "#fff" }}>{section.title}</h3>
                        <p style={{ color: "#A1A1AA", fontSize: 14, lineHeight: 2, fontWeight: 300 }}>{section.body}</p>
                      </section>
                    </Reveal>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <aside style={{ display: "grid", gap: "1rem", position: "sticky", top: 110 }}>
              <div style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.14)", borderRadius: 22, padding: "1.4rem" }}>
                <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.16em", marginBottom: "0.8rem" }}>لماذا هذا المقال مهم؟</p>
                <p style={{ color: "#E4E4E7", lineHeight: 1.9, fontSize: 14, fontWeight: 300 }}>
                  لأن فهم العلاج يقلل القلق، ويساعدك تعرف متى تراجع بسرعة، ومتى يكون الحفاظ على السن أفضل من تأجيل القرار.
                </p>
              </div>

              <div style={{ background: "#0D0D0D", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 22, padding: "1.4rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.9rem" }}>
                  <ShieldPlus size={18} color={GOLD} />
                  <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>متى لازم تحجز؟</h3>
                </div>
                <p style={{ color: "#A1A1AA", lineHeight: 1.9, fontSize: 14, fontWeight: 300, marginBottom: "1rem" }}>
                  إذا عندك ألم نابض، حساسية طويلة مع البارد أو الحار، انتفاخ، أو ألم عند المضغ، الأفضل الفحص قبل ما تتطور الحالة أكثر.
                </p>
                <a
                  href={CONTACT.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", textDecoration: "none", background: GOLD, color: "#050505", minHeight: 50, borderRadius: 999, fontWeight: 700, fontSize: 14 }}
                >
                  احجز استشارة عبر واتساب
                </a>
              </div>

              <div style={{ background: "#0D0D0D", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 22, padding: "1.4rem" }}>
                <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.16em", marginBottom: "0.8rem" }}>قريباً في هذا القسم</p>
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {[
                    "هل كل ألم يعني سحب عصب؟",
                    "الفرق بين الحشوة المؤقتة والدائمة",
                    "متى نحتاج تغليف السن بعد علاج الجذور؟",
                  ].map((item) => (
                    <p key={item} style={{ color: "#D4D4D8", fontSize: 14, lineHeight: 1.8 }}>{item}</p>
                  ))}
                </div>
              </div>

              <Link
                to="/services"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", minHeight: 48, borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 14 }}
              >
                استعرض خدمات العيادة <ArrowUpRight size={14} />
              </Link>
            </aside>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
