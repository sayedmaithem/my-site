import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Bot, MapPin, Clock, Phone } from "lucide-react";
import { GOLD, CONTACT } from "../constants";

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

const CONTACT_CARDS = [
  {
    icon: MessageCircle,
    tag: "واتساب مباشر",
    title: "احجز موعدك",
    desc: "تواصل مباشر مع الفريق للحجز والاستفسارات",
    value: CONTACT.whatsapp.number,
    href: CONTACT.whatsapp.href,
    cta: "ابدأ المحادثة",
    primary: true,
  },
  {
    icon: Bot,
    tag: "حجز آلي",
    title: "النظام الآلي",
    desc: "حجز مواعيد تلقائي على مدار الساعة",
    value: CONTACT.booking.number,
    href: CONTACT.booking.href,
    cta: "احجز الآن",
    primary: false,
  },
];

export default function Contact() {
  return (
    <div dir="rtl" style={{ fontFamily: "'Alexandria', sans-serif", background: "#050505", color: "#fff", minHeight: "100vh", paddingTop: "90px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@200;300;400;500;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .contact-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .info-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1fr 1fr; }
          .info-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(26,20,18,0.7) 0%, #050505 60%)" }} />
      <div style={{ position: "fixed", bottom: "20%", left: "5%", width: "30vw", height: "30vw", borderRadius: "50%", background: "rgba(184,134,11,0.02)", filter: "blur(120px)", zIndex: 0, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: "0 1.25rem 8rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "3rem 0 4rem" }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>تواصل معنا</p>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.5rem,6vw,5rem)", color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              نحن هنا<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: GOLD }}>لخدمتكم</span>
            </h1>
            <p style={{ fontSize: "clamp(0.9rem,1.3vw,1.05rem)", fontWeight: 300, color: "#9CA3AF", lineHeight: 1.9, maxWidth: 480, margin: "0 auto" }}>
              تواصل معنا عبر واتساب أو زورنا في عيادتنا بكربلاء.<br />مواعيدنا مرنة لتناسب جدولك.
            </p>
          </Reveal>
        </div>

        {/* Contact cards */}
        <div className="contact-grid" style={{ marginBottom: "3rem" }}>
          {CONTACT_CARDS.map((card, i) => {
            const CardIcon = card.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, borderColor: card.primary ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.1)" }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: card.primary ? "rgba(212,175,55,0.05)" : "#0d0d0d",
                    border: card.primary ? "1px solid rgba(212,175,55,0.2)" : "1px solid #1a1a1a",
                    borderRadius: 20,
                    padding: "2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: card.primary ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${card.primary ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CardIcon size={20} color={card.primary ? GOLD : "#9CA3AF"} />
                    </div>
                    <div>
                      <span style={{ fontSize: 10, letterSpacing: "0.2em", color: card.primary ? GOLD : "#4B5563", textTransform: "uppercase", display: "block", marginBottom: 3 }}>{card.tag}</span>
                      <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "#fff" }}>{card.title}</h3>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 300, lineHeight: 1.7 }}>{card.desc}</p>
                  <div style={{ fontWeight: 700, fontSize: "1.5rem", color: card.primary ? GOLD : "#fff", direction: "ltr", textAlign: "right" }}>{card.value}</div>
                  <motion.a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                      background: card.primary ? GOLD : "rgba(255,255,255,0.05)",
                      border: card.primary ? "none" : "1px solid #333",
                      color: card.primary ? "#050505" : "#9CA3AF",
                      padding: "0.85rem 1.5rem",
                      borderRadius: 100,
                      fontSize: 14,
                      fontWeight: card.primary ? 700 : 400,
                      textDecoration: "none",
                      fontFamily: "'Alexandria', sans-serif",
                    }}
                  >
                    <CardIcon size={15} />
                    {card.cta}
                  </motion.a>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Info section */}
        <div className="info-grid" style={{ marginBottom: "3rem" }}>
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ borderColor: "rgba(212,175,55,0.3)" }}
              style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 20, padding: "2rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={18} color={GOLD} />
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "0.6rem" }}>الموقع</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#fff", marginBottom: "0.4rem" }}>كربلاء المقدسة</p>
                <p style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 300, lineHeight: 1.7 }}>{CONTACT.address}</p>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div
              whileHover={{ borderColor: "rgba(212,175,55,0.3)" }}
              style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 20, padding: "2rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Clock size={18} color={GOLD} />
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "0.6rem" }}>أوقات العمل</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#fff", marginBottom: "0.4rem" }}>يومياً — بلا إجازة</p>
                <p style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 300 }}>{CONTACT.hours}</p>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.2}>
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #1a1a1a", marginBottom: "4rem" }}>
            <iframe
              title="موقع عيادات الموسوي"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.0!2d44.03!3d32.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDM2JzM2LjAiTiA0NMKwMDEnNDguMCJF!5e0!3m2!1sar!2siq!4v1000000000000!5m2!1sar!2siq"
              width="100%"
              height="320"
              style={{ border: 0, display: "block", filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* Emergency note */}
        <Reveal delay={0.1}>
          <div style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 16, padding: "2rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <Phone size={18} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: "0.4rem" }}>للحالات الطارئة</p>
              <p style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 300, lineHeight: 1.7 }}>
                في حال الألم الشديد أو الطوارئ السنية، تواصل معنا فوراً عبر واتساب على الرقم{" "}
                <a href={CONTACT.whatsapp.href} style={{ color: GOLD, textDecoration: "none", direction: "ltr" }}>{CONTACT.whatsapp.number}</a>
                {" "}وسنرد في أقرب وقت ممكن.
              </p>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
