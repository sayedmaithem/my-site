import { useEffect } from "react";
import { MessageCircle, PlayCircle, ShieldCheck } from "lucide-react";
import { GOLD, VIDEO_PAGE } from "../constants";

const TRACKING_STORAGE_KEY = "mosawi-video-opened";

function buildWhatsAppUrl() {
  const message = encodeURIComponent(VIDEO_PAGE.whatsappMessage);
  return `https://wa.me/${VIDEO_PAGE.whatsappNumber}?text=${message}`;
}

export default function Video() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!VIDEO_PAGE.webhookUrl || VIDEO_PAGE.webhookUrl === "https://n8n.srv1125962.hstgr.cloud/webhook-test/video-open") return;

    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    const phone = params.get("phone") || "";
    const payload = {
      name,
      phone,
      page: "video",
      openedAt: new Date().toISOString(),
      source: "patient_video_campaign",
    };

    const trackingKey = `${TRACKING_STORAGE_KEY}:${name}:${phone}`;
    if (window.sessionStorage.getItem(trackingKey)) return;
    window.sessionStorage.setItem(trackingKey, "1");

    fetch(VIDEO_PAGE.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, []);

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
        .video-shell {
          position: relative;
          z-index: 1;
          max-width: 980px;
          margin: 0 auto;
          padding: 0 1.25rem 5rem;
        }
        .video-layout {
          display: grid;
          gap: 1.25rem;
        }
        .video-card,
        .info-card {
          background: linear-gradient(180deg, rgba(18,18,18,0.98) 0%, rgba(11,11,11,0.96) 100%);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.28);
        }
        .video-frame {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(212,175,55,0.14);
          background:
            radial-gradient(circle at top right, rgba(212,175,55,0.12), transparent 42%),
            linear-gradient(180deg, rgba(19,19,19,0.95), rgba(9,9,9,0.98));
        }
        .video-frame video {
          width: 100%;
          display: block;
          aspect-ratio: 16 / 9;
          background: #090909;
        }
        .video-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          width: fit-content;
          padding: 0.5rem 0.95rem;
          border-radius: 999px;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.18);
          color: ${GOLD};
          font-size: 0.72rem;
          font-weight: 500;
        }
        .info-stack {
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .video-shell {
            padding-bottom: 7rem;
          }
          .video-layout {
            grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.7fr);
            align-items: start;
          }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(28, 23, 18, 0.8) 0%, #050505 62%)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "12%",
          left: "-8%",
          width: "38vw",
          height: "38vw",
          borderRadius: "50%",
          background: "rgba(212,175,55,0.04)",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <main className="video-shell">
        <section
          style={{
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto",
            padding: "2.5rem 0 2rem",
          }}
        >
          <div className="video-badge">
            <ShieldCheck size={14} />
            تحديث خاص لمراجعي Mosawi Clinics
          </div>
          <h1
            style={{
              fontWeight: 900,
              fontSize: "clamp(2.1rem, 7vw, 4.6rem)",
              lineHeight: 1.1,
              margin: "1.2rem 0 1rem",
            }}
          >
            تحديث جديد
            <br />
            <span style={{ color: GOLD, fontWeight: 300, fontStyle: "italic" }}>في عيادتنا</span>
          </h1>
          <p
            style={{
              color: "#A1A1AA",
              fontWeight: 300,
              lineHeight: 1.95,
              fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
            }}
          >
            مراجعنا العزيز، حبّينا نشاركك انتقالة جديدة سوّيناها حتى تكون تجربتك ويانا أفضل وأرتب.
          </p>
        </section>

        <section className="video-layout">
          <div className="video-card" style={{ padding: "1rem" }}>
            <div className="video-frame">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1rem 1rem 0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 14,
                      background: "rgba(212,175,55,0.08)",
                      border: "1px solid rgba(212,175,55,0.2)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <PlayCircle size={20} color={GOLD} />
                  </div>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.96rem", marginBottom: 2 }}>
                      فيديو التحديث
                    </p>
                    <p style={{ color: "#71717A", fontSize: "0.8rem", fontWeight: 300 }}>
                      ملف الفيديو: `clinic-update.mp4`
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    color: GOLD,
                    fontSize: "0.72rem",
                    border: "1px solid rgba(212,175,55,0.18)",
                    borderRadius: 999,
                    padding: "0.42rem 0.85rem",
                    background: "rgba(212,175,55,0.05)",
                  }}
                >
                  مشاهدة خاصة
                </span>
              </div>

              <video controls preload="metadata" playsInline>
                <source src={VIDEO_PAGE.videoSrc} type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          </div>

          <aside className="info-stack">
            <div className="info-card" style={{ padding: "1.4rem" }}>
              <p style={{ color: GOLD, fontSize: "0.72rem", letterSpacing: "0.12em", marginBottom: "0.9rem" }}>
                MOSAWI CLINICS
              </p>
              <p style={{ color: "#F4F4F5", fontWeight: 600, lineHeight: 1.7, marginBottom: "0.75rem" }}>
                هذا الرابط مخصص لمراجعي العيادة حتى يطّلعون على التحديث الجديد بشكل سريع وواضح.
              </p>
              <p style={{ color: "#8C8C94", fontSize: "0.92rem", lineHeight: 1.9, fontWeight: 300 }}>
                إذا حبيت تحجز أو تستفسر بعد مشاهدة الفيديو، زر الواتساب جاهز مباشرة.
              </p>
            </div>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.7rem",
                textDecoration: "none",
                background: GOLD,
                color: "#050505",
                minHeight: 56,
                borderRadius: 999,
                padding: "0.95rem 1.4rem",
                fontWeight: 700,
                fontSize: "0.97rem",
                boxShadow: "0 18px 40px rgba(212,175,55,0.24)",
              }}
            >
              <MessageCircle size={18} />
              احجز أو راسلنا على واتساب
            </a>
          </aside>
        </section>
      </main>
    </div>
  );
}
