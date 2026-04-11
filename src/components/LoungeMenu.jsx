import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Leaf, Waves, Sparkles } from "lucide-react";

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
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
    }
    .tab-btn.active {
      background: #B8860B;
      color: #050505;
      border-color: #B8860B;
    }
    .tab-btn:hover {
      border-color: #B8860B;
      color: #B8860B;
    }
    .menu-grid {
      display: grid;
      gap: 12px;
      margin-top: 20px;
    }
    .menu-item {
      background: #0f0f0f;
      border: 1px solid #1f1f1f;
      padding: 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .menu-item:hover {
      border-color: #B8860B;
      background: #1a1a1a;
    }
    .item-name {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 4px;
    }
    .item-desc {
      font-size: 13px;
      color: #9CA3AF;
      line-height: 1.4;
    }
    .header {
      text-align: center;
      padding: 24px 16px 16px;
      border-bottom: 1px solid #1f1f1f;
    }
    .logo {
      font-size: 28px;
      font-weight: 700;
      color: #B8860B;
      margin-bottom: 8px;
    }
    .tagline {
      font-size: 12px;
      color: #6B7280;
      letter-spacing: 1px;
    }
    .tabs-container {
      display: flex;
      gap: 8px;
      padding: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .content-area {
      padding: 0 16px 24px;
    }
  `}</style>
);

const CATEGORIES = {
  coffee: {
    icon: Coffee,
    label: "القهوة",
    items: [
      { name: "إسبريسو مزدوج", desc: "قهوة غنية وعميقة بنكهة قوية" },
      { name: "كابتشينو فاخر", desc: "إسبريسو مع رغوة حليب حريرية" },
      { name: "لاتيه كلاسيكي", desc: "مزج مثالي من الإسبريسو والحليب الناعم" },
      { name: "أمريكانو", desc: "إسبريسو مخفف بماء ساخن" },
    ],
  },
  tea: {
    icon: Leaf,
    label: "الشاي",
    items: [
      { name: "شاي أسود برستيج", desc: "شاي فاخر من أفضل المزارع" },
      { name: "شاي أخضر حرير", desc: "شاي صيني نقي بنكهة مرهفة" },
      { name: "شاي بالياسمين", desc: "خليط عطري بالياسمين الطازج" },
      { name: "شاي الأعشاب الهادئ", desc: "مزيج مهدئ من الأعشاب الطبيعية" },
    ],
  },
  relax: {
    icon: Waves,
    label: "الاسترخاء",
    items: [
      { name: "عصير الرمان الطازج", desc: "عصير طبيعي 100% بدون سكريات مضافة" },
      { name: "عصير البرتقال الحمضي", desc: "عصير برتقال مضغوط على البارد" },
      { name: "عصير التفاح والزنجبيل", desc: "خليط منعش بنكهة طبيعية" },
      { name: "مياه معدنية محسّنة", desc: "مياه معدنية مع نكهات طبيعية" },
    ],
  },
};

export default function LoungeMenu() {
  const [activeCategory, setActiveCategory] = useState("coffee");

  return (
    <>
      <FontStyle />
      <div className="lounge-root">
        <div className="lounge-content">
          <div className="header">
            <div className="logo">✨ استراحة الموسوي</div>
            <div className="tagline">خدمة VVIP تفضيلية</div>
            <hr className="gold-rule" style={{ marginTop: "12px" }} />
          </div>

          <div className="tabs-container">
            {Object.entries(CATEGORIES).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={key}
                  className={`tab-btn ${activeCategory === key ? "active" : ""}`}
                  onClick={() => setActiveCategory(key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={16} style={{ marginRight: "4px" }} />
                  {category.label}
                </motion.button>
              );
            })}
          </div>

          <div className="content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="menu-grid"
              >
                {CATEGORIES[activeCategory].items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="menu-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ x: -4 }}
                  >
                    <div className="item-name">{item.name}</div>
                    <div className="item-desc">{item.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
