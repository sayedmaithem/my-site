import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { GOLD, LOGO_SRC } from "../constants";

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

const TECHNOLOGIES = [
  { tag: "Surgical Microscope", title: "المجهر الجراحي 25×", body: "دقة غير مسبوقة في علاج قنوات الجذر وإنقاذ الأسنان التالفة بدون ألم." },
  { tag: "CBCT 3D Imaging", title: "التصوير المقطعي ثلاثي الأبعاد", body: "تشخيص شامل ودقيق بأشعة CBCT لتخطيط علاجي مثالي وآمن." },
  { tag: "In-House Lab", title: "المختبر الداخلي", body: "خبير السيراميك في العيادة لتعديل اللون والشكل فوراً، لنتائج طبيعية تماماً." },
  { tag: "3D Intraoral Scanner", title: "الماسح الضوئي الفموي", body: "مقاسات رقمية دقيقة بدون طبعات عجين. سريع، مريح، ودقيق." },
  { tag: "Laser Dentistry", title: "طب الأسنان بالليزر", body: "علاجات اللثة والتبييض باستخدام الليزر لنتائج أسرع وتعافٍ أقل." },
  { tag: "Digital Smile Design", title: "تصميم الابتسامة الرقمي", body: "نصمم ابتسامتك رقمياً قبل البدء بالعلاج لترى النتيجة مسبقاً." },
];

const VALUES = [
  { n: "14+", l: "سنة خبرة" },
  { n: "25×", l: "تكبير مجهري" },
  { n: "3D", l: "تصوير مقطعي" },
  { n: "100%", l: "رضا المرضى هدفنا" },
];

export default function About() {
  return (
    <div dir="rtl" style={{ fontFamily: "'Alexandria', sans-serif", background: "#050505", color: "#fff", minHeight: "100vh", paddingTop: "90px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@200;300;400;500;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .tech-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .values-grid { grid-template-columns: repeat(2,1fr) !important; }
        @media (min-width: 768px) {
          .tech-grid { grid-template-columns: repeat(3, 1fr); }
          .values-grid { grid-template-columns: repeat(4,1fr) !important; }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(26,20,18,0.7) 0%, #050505 60%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 8rem" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "3rem 0 5rem" }}>
          <Reveal>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: "inline-flex", justifyContent: "center", marginBottom: "2rem" }}
            >
              <div style={{ width: 80, height: 80, borderRadius: "50%", border: `1px solid rgba(212,175,55,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(212,175,55,0.05)" }}>
                <img src={LOGO_SRC} alt="logo" style={{ width: 50, height: 50, objectFit: "contain" }} />
              </div>
            </motion.div>
            <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>عن العيادة</p>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.5rem,6vw,5rem)", color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              عيادات<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: GOLD }}>الموسوي</span>
            </h1>
            <p style={{ fontSize: "clamp(0.9rem,1.3vw,1.1rem)", fontWeight: 300, color: "#9CA3AF", lineHeight: 2, maxWidth: 580, margin: "0 auto" }}>
              منذ أكثر من 14 عاماً، نقدم تجارب علاجية استثنائية تجمع بين دقة التشخيص المجهري وفن تصميم الابتسامة، في بيئة تحترم وقتك وراحتك.
            </p>
          </Reveal>
        </div>

        {/* Values */}
        <Reveal>
          <div style={{ borderTop: "1px solid #111", borderBottom: "1px solid #111", marginBottom: "6rem" }}>
            <div className="values-grid" style={{ display: "grid", gap: "1px", background: "#111" }}>
              {VALUES.map((v, i) => (
                <div key={i} style={{ padding: "2.5rem 2rem", background: "#050505", textAlign: "center" }}>
                  <div style={{ fontWeight: 900, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: GOLD, lineHeight: 1, marginBottom: "0.4rem" }}>{v.n}</div>
                  <div style={{ fontSize: 12, color: "#4B5563", fontWeight: 300 }}>{v.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Story */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", marginBottom: "6rem", alignItems: "center" }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "1.2rem" }}>قصتنا</p>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#fff", lineHeight: 1.25, marginBottom: "1.5rem" }}>
              رحلة من الشغف<br />
              <span style={{ fontWeight: 300, color: GOLD, fontStyle: "italic" }}>إلى الامتياز</span>
            </h2>
            <p style={{ fontWeight: 300, fontSize: "clamp(0.9rem,1.2vw,1.05rem)", lineHeight: 2, color: "#9CA3AF", marginBottom: "1.5rem" }}>
              بدأت رحلتنا بقناعة بسيطة: أن علاج الأسنان يجب أن يكون تجربة مريحة وشاملة، لا مجرد زيارة طبية روتينية. بنينا عيادتنا على أساس هذه القناعة، مستثمرين في أحدث التقنيات وأفضل الكفاءات.
            </p>
            <p style={{ fontWeight: 300, fontSize: "clamp(0.9rem,1.2vw,1.05rem)", lineHeight: 2, color: "#9CA3AF" }}>
              اليوم، تجمع عيادات الموسوي بين المجهر الجراحي بتكبير 25×، وتصوير CBCT ثلاثي الأبعاد، ومختبر سيراميك داخلي، لنقدم لك نتائج لا مثيل لها في المنطقة.
            </p>
          </Reveal>
        </div>

        {/* Technologies */}
        <Reveal>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "0.8rem" }}>تقنياتنا</p>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#fff", marginBottom: "3rem" }}>المعدات والتقنيات</h2>
        </Reveal>

        <div className="tech-grid" style={{ marginBottom: "6rem" }}>
          {TECHNOLOGIES.map((tech, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(212,175,55,0.4)" }}
                transition={{ duration: 0.3 }}
                style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 20, padding: "2rem", height: "100%" }}
              >
                <span style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>{tech.tag}</span>
                <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.75rem", lineHeight: 1.3 }}>{tech.title}</h3>
                <p style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 300, lineHeight: 1.8 }}>{tech.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Vision */}
        <Reveal>
          <div style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 20, padding: "3rem", textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, textTransform: "uppercase", marginBottom: "1.2rem" }}>رسالتنا</p>
            <h3 style={{ fontWeight: 700, fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "#fff", lineHeight: 1.3, marginBottom: "1.5rem" }}>
              صحة الأسنان ليست رفاهية،<br />
              <span style={{ fontWeight: 300, color: GOLD, fontStyle: "italic" }}>إنها حق لكل إنسان.</span>
            </h3>
            <p style={{ fontSize: 14, color: "#9CA3AF", fontWeight: 300, lineHeight: 1.9, maxWidth: 520, margin: "0 auto 2rem" }}>
              نؤمن بأن كل مريض يستحق الوصول إلى أعلى مستويات الرعاية الطبية في بيئة تليق به. هذا هو وعدنا لكل من يثق بنا.
            </p>
            <motion.a href="https://wa.me/9647731450750" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 16px 50px rgba(212,175,55,0.3)" }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: GOLD, color: "#050505", padding: "0.9rem 2rem", borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: "'Alexandria', sans-serif" }}>
              <MessageCircle size={16} /> احجز موعدك
            </motion.a>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
