import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Bot, MapPin, Clock } from "lucide-react";
import { GOLD, LOGO_SRC, CONTACT } from "../constants";

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const NAV_LINKS = [
  { label: "الرئيسية", to: "/" },
  { label: "الخدمات", to: "/services" },
  { label: "عن العيادة", to: "/about" },
  { label: "تواصل معنا", to: "/contact" },
  { label: "الاستراحة", to: "/lounge" },
];

export default function Footer() {
  return (
    <footer
      dir="rtl"
      style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid #111",
        padding: "4rem 1.25rem 3rem",
        maxWidth: 1100, margin: "0 auto",
        fontFamily: "'Alexandria', sans-serif",
      }}
    >
      <div
        className="footer-grid"
        style={{
          display: "grid",
          marginBottom: "4rem",
          gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "2fr 1fr 1fr",
          gap: window.innerWidth < 768 ? "2rem" : "4rem"
        }}
      >
        {/* Brand */}
        <Reveal>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.5rem", textDecoration: "none" }}>
            <img src={LOGO_SRC} alt="logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
            <span style={{ fontWeight: 500, fontSize: 16, color: "#fff" }}>عيادات الموسوي</span>
          </Link>
          <p style={{ fontWeight: 300, fontSize: 14, color: "#4B5563", lineHeight: 1.9, maxWidth: 320 }}>
            بيئة علاجية تدمج بين دقة التشخيص المجهري واللمسة الفنية الخبيرة.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} style={{ fontSize: 12, color: "#374151", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "#374151"}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal delay={0.1}>
          <p style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, textTransform: "uppercase", marginBottom: "1.2rem" }}>تواصل</p>
          {[
            { Icon: MessageCircle, label: CONTACT.whatsapp.label, val: CONTACT.whatsapp.number, href: CONTACT.whatsapp.href },
            { Icon: Bot, label: CONTACT.booking.label, val: CONTACT.booking.number, href: CONTACT.booking.href },
          ].map(({ Icon, label, val, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem", textDecoration: "none" }}>
              <Icon size={13} color={GOLD} />
              <div>
                <p style={{ fontSize: 10, color: "#374151", fontWeight: 300, marginBottom: 1 }}>{label}</p>
                <p style={{ fontSize: 14, fontWeight: 400, color: "#9CA3AF", direction: "ltr" }}>{val}</p>
              </div>
            </a>
          ))}
        </Reveal>

        {/* Location */}
        <Reveal delay={0.2}>
          <p style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, textTransform: "uppercase", marginBottom: "1.2rem" }}>الزيارة</p>
          {[
            { Icon: MapPin, text: CONTACT.address },
            { Icon: Clock, text: CONTACT.hours },
          ].map(({ Icon, text }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: "1rem" }}>
              <Icon size={13} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 13, fontWeight: 300, color: "#9CA3AF", lineHeight: 1.7 }}>{text}</span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: "2rem", borderTop: "1px solid #0F0F0F",
        flexWrap: "wrap", gap: "1rem",
      }}>
        <p style={{ fontSize: 12, color: "#1F1F1F", fontWeight: 300 }}>© 2025 عيادات الموسوي · جميع الحقوق محفوظة</p>
        <p style={{ fontSize: 11, color: "#1F1F1F", letterSpacing: "0.15em" }}>Excellence · Precision · Trust</p>
      </div>
    </footer>
  );
}
