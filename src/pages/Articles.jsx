import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, BookOpen, CircleCheck, MessageCircle } from "lucide-react";
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
    id: "root-fillings",
    title: "مقالات حشوات الجذور",
    desc: "شرح مبسط لعلاج الجذور، خطواته، ومتى يكون الحفاظ على السن أفضل من القلع.",
    status: "مقال متاح",
  },
  {
    id: "children-dentistry",
    title: "مقالات الأطفال",
    desc: "محتوى توعوي يساعد الأهل على فهم أول زيارة، الوقاية، وطريقة تهدئة الطفل داخل العيادة.",
    status: "مقال متاح",
  },
  {
    id: "surgery-articles",
    title: "مقالات الجراحة",
    desc: "متى نحتاج القلع الجراحي، وما الذي يحدث قبل وبعد الإجراء، وكيف تكون فترة التعافي.",
    status: "مقال متاح",
  },
  {
    id: "non-surgical-cosmetics",
    title: "مقالات التجميل غير الجراحي",
    desc: "معلومات تعليمية عن البوتوكس والفيلر حول الفم والابتسامة، ومتى يكون الإجراء مناسباً.",
    status: "مقال متاح",
  },
];

const ARTICLES = [
  {
    id: "root-fillings",
    category: "مقالات حشوات الجذور",
    title: "حشوات الجذور",
    subtitle: "متى نحتاجها؟ وكيف نحافظ على نجاحها؟",
    intro:
      "كثير من المرضى يسمعون عن علاج العصب، لكن الجزء الأهم بعد تنظيف القنوات هو حشوات الجذور نفسها. هذا المقال يشرح الفكرة ببساطة: ما الذي يحدث داخل السن، ولماذا تعتبر الحشوة الجذرية المحكمة خطوة أساسية لإنقاذ السن ومنع رجوع الالتهاب.",
    points: [
      "حشوات الجذور هي خطوة إغلاق وحماية بعد تنظيف القنوات من الالتهاب والبكتيريا.",
      "نجاح العلاج يعتمد على تنظيف دقيق وتعبئة محكمة تمنع عودة التلوث داخل السن.",
      "كثير من الأسنان يمكن الحفاظ عليها لسنوات إذا اكتمل العلاج والترميم النهائي بالشكل الصحيح.",
    ],
    sections: [
      {
        title: "ما المقصود بحشوات الجذور؟",
        body:
          "بعد إزالة العصب الملتهب أو التالف من داخل القنوات الجذرية، يتم ملء هذه القنوات بمادة طبية خاصة ومحكمة. الهدف من الحشوة الجذرية هو غلق المسارات الدقيقة داخل السن حتى لا تجد البكتيريا طريقاً جديداً للعودة، وبذلك نحافظ على الجذر ونزيد فرصة بقاء السن في الفم بوظيفته الطبيعية.",
      },
      {
        title: "متى نحتاج هذا العلاج؟",
        body:
          "نحتاجه عندما يصل التسوس أو الكسر أو الالتهاب إلى عصب السن، أو عندما يكون هناك ألم عميق، حساسية طويلة، انتفاخ، أو خراج يظهر في الأشعة. أحياناً يكون السن متأثراً حتى من دون ألم شديد، لذلك الفحص السريري والشعاعي مهم جداً لاتخاذ القرار الصحيح.",
      },
      {
        title: "هل العلاج مؤلم؟",
        body:
          "الفكرة المنتشرة أن علاج الجذور مؤلم جداً، لكن الحقيقة أن الهدف منه هو إزالة الألم الذي سببه الالتهاب. مع التخدير الجيد والتقنيات الدقيقة، يشعر أغلب المرضى براحة أوضح بعد الجلسة مقارنة بما كانوا يشعرون به قبل المراجعة.",
      },
      {
        title: "ماذا بعد الحشوة الجذرية؟",
        body:
          "بعد إنهاء حشوات الجذور، يكون ترميم السن مهماً جداً. كثير من الأسنان، خاصة الخلفية، تحتاج حشوة نهائية قوية أو تغليف حتى لا تضعف أو تتكسر مع الوقت. لهذا نجاح العلاج لا يعتمد على القنوات وحدها، بل على الإغلاق الداخلي والترميم الخارجي معاً.",
      },
    ],
  },
  {
    id: "children-dentistry",
    category: "مقالات الأطفال",
    title: "أول زيارة لطفلك إلى عيادة الأسنان",
    subtitle: "شلون نخلي التجربة هادئة ومفيدة بدل ما تصير مصدر خوف؟",
    intro:
      "زيارة الطفل الأولى لعيادة الأسنان ليست فقط لعلاج مشكلة موجودة، بل هي بداية علاقة صحية مع العناية الفموية. كلما كانت الزيارة مبكرة وهادئة، صار الطفل أكثر تقبلاً للفحص والعلاج لاحقاً، وقلّت احتمالات الخوف أو التأجيل.",
    points: [
      "أفضل زيارة أولى هي الزيارة الهادئة الوقائية قبل وجود ألم شديد أو حالة طارئة.",
      "طريقة الأهل في الحديث عن الطبيب تؤثر كثيراً على مشاعر الطفل داخل العيادة.",
      "الفحص المبكر يساعد في اكتشاف التسوس، تقييم العادات، وتقديم نصائح مناسبة لعمر الطفل.",
    ],
    sections: [
      {
        title: "ليش الزيارة المبكرة مهمة؟",
        body:
          "لأن الطفل إذا عرف العيادة في وقت راحة، سيبني انطباعاً مختلفاً عمّا لو كانت أول زيارة مرتبطة بألم أو بكاء. كذلك يستطيع الطبيب تقييم نمو الأسنان، وتعليم الأهل أساليب الوقاية والتنظيف المناسبة في الوقت المناسب.",
      },
      {
        title: "شلون نهيئ الطفل قبل الموعد؟",
        body:
          "الأفضل استخدام كلمات بسيطة وإيجابية مثل: سنذهب حتى يطمئن الطبيب على أسنانك. لا نحبذ ربط الزيارة بالحقن أو الألم أو التهديد. كذلك من المفيد اختيار وقت يكون فيه الطفل مرتاحاً وغير متعب أو جائع.",
      },
      {
        title: "شنو الذي يحدث داخل الزيارة الأولى؟",
        body:
          "غالباً تبدأ الزيارة بالتعارف والتدرج، ثم فحص لطيف للفم والأسنان واللثة، وأحياناً نصائح عن التغذية، المصاصة، الرضاعة الليلية، أو طريقة التفريش. إذا احتاج الطفل علاجاً، يكون القرار مبنياً على عمره وتعاونه وحالة الأسنان الفعلية.",
      },
      {
        title: "متى يجب عدم التأجيل؟",
        body:
          "إذا لاحظت بقعاً بنية أو سوداء، كسر في السن، شكوى متكررة من الألم، تورم في اللثة، أو صعوبة في الأكل والنوم، فالأفضل المراجعة مبكراً. التدخل المبكر غالباً يكون أسهل وألطف من انتظار تطور المشكلة.",
      },
    ],
  },
  {
    id: "surgery-articles",
    category: "مقالات الجراحة",
    title: "متى نحتاج القلع الجراحي؟",
    subtitle: "وماذا يختلف عن القلع الاعتيادي؟",
    intro:
      "ليس كل قلع يحتاج إلى جراحة، لكن بعض الأسنان تكون مكسورة، مطمورة، أو في وضع يجعل إخراجها بالطريقة الاعتيادية غير كافٍ. فهم الفرق بين القلع الجراحي والقلع الاعتيادي يساعد المريض على توقع الإجراء والتعافي بشكل أفضل.",
    points: [
      "القلع الجراحي يُستخدم عندما يكون السن أو الجذر غير مهيأ للخروج بالطريقة البسيطة.",
      "التخطيط الجيد والأشعة الدقيقة يقللان المضاعفات ويجعلان الإجراء أكثر أماناً.",
      "اتباع التعليمات بعد الجراحة هو جزء أساسي من سرعة الالتئام وتقليل الألم والتورم.",
    ],
    sections: [
      {
        title: "ما الفرق بين القلع الجراحي والاعتيادي؟",
        body:
          "القلع الاعتيادي يكون عادة لسن ظاهر ومتاح ويمكن تحريكه وإخراجه بشكل مباشر. أما القلع الجراحي فيحتاج إلى خطوات إضافية مثل فتح بسيط على اللثة أو إزالة جزء محدود من العظم أو تقسيم السن إلى أجزاء لتسهيل إخراجه بأمان.",
      },
      {
        title: "في أي حالات نلجأ إليه؟",
        body:
          "نلجأ إليه في حالات مثل ضرس العقل المطمور، السن المكسور تحت مستوى اللثة، الجذور المتبقية، أو الأسنان التي يكون موقعها أو شكل جذورها معقداً. الأشعة هنا ضرورية حتى نختار الطريقة الأكثر أماناً ودقة.",
      },
      {
        title: "كيف تكون فترة ما بعد الجراحة؟",
        body:
          "من الطبيعي وجود انزعاج أو تورم خفيف في أول يومين، ويختلف ذلك حسب نوع الحالة. عادة ننصح بالراحة، والكمادات الباردة، والالتزام بالأدوية والتعليمات، وتجنب المضمضة القوية أو التدخين أو الأكل القاسي في البداية.",
      },
      {
        title: "متى تحتاج مراجعة سريعة بعد القلع؟",
        body:
          "إذا ظهر نزف مستمر، ألم يزداد بشكل غير طبيعي، تورم متصاعد، حرارة، أو رائحة وطعم غير طبيعيين من مكان الخلع، فالأفضل مراجعة العيادة بسرعة حتى نتأكد أن الالتئام يسير بالشكل الصحيح.",
      },
    ],
  },
  {
    id: "non-surgical-cosmetics",
    category: "مقالات التجميل غير الجراحي",
    title: "التجميل غير الجراحي حول الفم والابتسامة",
    subtitle: "متى يكون البوتوكس أو الفيلر مناسباً؟",
    intro:
      "التجميل غير الجراحي لا يعني تغيير الملامح بالكامل، بل قد يكون أحياناً لمسات محسوبة تدعم توازن الابتسامة وتخفف خطوطاً معينة حول الفم. المهم هو التقييم الطبي الصحيح، وفهم ما الذي يمكن أن يقدمه الإجراء فعلاً وما الذي لا يمكن أن يفعله.",
    points: [
      "البوتوكس والفيلر ليسا بديلين عن علاج الأسنان إذا كانت المشكلة أساسها وظيفي أو سني.",
      "النتيجة الأجمل غالباً تكون النتيجة الهادئة الطبيعية، لا التغيير المبالغ فيه.",
      "اختيار الحالة المناسبة والتقييم الدقيق أهم من مجرد الرغبة في إجراء سريع.",
    ],
    sections: [
      {
        title: "ما الفرق بين البوتوكس والفيلر؟",
        body:
          "البوتوكس يهدف إلى إرخاء نشاط عضلي معين بشكل مؤقت، لذلك يستخدم في حالات مثل خطوط التعبير أو بعض الابتسامات اللثوية حسب التقييم. أما الفيلر فيضيف دعماً أو امتلاءً مدروساً في مناطق محددة عندما يكون ذلك مناسباً من الناحية الجمالية والطبية.",
      },
      {
        title: "متى يكون الإجراء مناسباً؟",
        body:
          "يكون مناسباً عندما تكون التوقعات واقعية، وعندما يكون السبب الجمالي قابلاً للتحسن بهذه الإجراءات فعلاً. أحياناً تكون المشكلة من الأسنان أو الإطباق أو شكل اللثة، وهنا يكون علاج الأسنان هو الأساس قبل التفكير بأي لمسة تجميلية مساندة.",
      },
      {
        title: "هل النتيجة دائمة؟",
        body:
          "لا، هذه الإجراءات مؤقتة بطبيعتها وتختلف مدة بقائها من شخص لآخر حسب نوع المادة، طبيعة العضلات، والأيض. لذلك من المهم التعامل معها كإجراء يحتاج متابعة وتقييم، وليس كحل دائم لكل ما يتعلق بشكل الفم أو الابتسامة.",
      },
      {
        title: "شنو أهم نقطة قبل القرار؟",
        body:
          "أهم نقطة هي الفحص الصريح والتخطيط الهادئ. المريض يحتاج يعرف ما الذي سيتغير فعلاً، وما حدود النتيجة المتوقعة، وهل هناك بدائل أفضل من ناحية سنية أو تجميلية. التوعية هنا تحمي من القرارات السريعة ومن النتائج غير المتوازنة.",
      },
    ],
  },
];

function ArticleCard({ article, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article
        id={article.id}
        style={{
          background: "linear-gradient(180deg, rgba(16,16,16,0.98) 0%, rgba(10,10,10,0.98) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 30px 90px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ padding: "1.25rem 1.25rem 0" }}>
          <div
            style={{
              borderRadius: 22,
              padding: "1.35rem",
              background: "radial-gradient(circle at top right, rgba(212,175,55,0.14), transparent 38%), linear-gradient(180deg, rgba(18,18,18,0.95), rgba(12,12,12,0.92))",
              border: "1px solid rgba(212,175,55,0.12)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", marginBottom: "1rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0.42rem 0.8rem",
                  borderRadius: 999,
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.16)",
                  color: GOLD,
                  fontSize: 11,
                }}
              >
                <BookOpen size={13} />
                {article.category}
              </span>
              <span
                style={{
                  padding: "0.42rem 0.8rem",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#A1A1AA",
                  fontSize: 11,
                }}
              >
                مقال تعليمي
              </span>
            </div>

            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                lineHeight: 1.2,
                marginBottom: "0.9rem",
              }}
            >
              {article.title}
              <br />
              <span style={{ color: GOLD, fontWeight: 300, fontStyle: "italic" }}>{article.subtitle}</span>
            </h2>

            <p style={{ color: "#B3B3BC", fontSize: 15, lineHeight: 2, fontWeight: 300, maxWidth: 760 }}>
              {article.intro}
            </p>
          </div>
        </div>

        <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
          <div
            style={{
              background: "#0C0C0C",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 22,
              padding: "1.4rem",
              marginBottom: "1.2rem",
            }}
          >
            <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.16em", marginBottom: "0.9rem" }}>أهم النقاط</p>
            <div style={{ display: "grid", gap: "0.8rem" }}>
              {article.points.map((point) => (
                <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <CircleCheck size={17} color={GOLD} style={{ flexShrink: 0, marginTop: 3 }} />
                  <p style={{ color: "#D4D4D8", fontSize: 14, lineHeight: 1.9, fontWeight: 300 }}>{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="prose-grid">
            {article.sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.04} y={18}>
                <section
                  style={{
                    height: "100%",
                    background: index % 2 === 0 ? "#0D0D0D" : "#101010",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 20,
                    padding: "1.3rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, marginBottom: "0.7rem", color: "#fff" }}>
                    {section.title}
                  </h3>
                  <p style={{ color: "#A1A1AA", fontSize: 14, lineHeight: 2, fontWeight: 300 }}>{section.body}</p>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

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
        .article-list { display: grid; gap: 28px; }
        .prose-grid { display: grid; gap: 18px; }
        @media (min-width: 768px) {
          .category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .prose-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 58% at 50% 0%, rgba(27,22,18,0.78) 0%, #050505 62%)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "18%",
          right: "-10%",
          width: "34vw",
          height: "34vw",
          borderRadius: "50%",
          background: "rgba(212,175,55,0.03)",
          filter: "blur(130px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <main className="articles-shell">
        <section style={{ textAlign: "center", maxWidth: 760, margin: "0 auto", padding: "2.8rem 0 4rem" }}>
          <Reveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: 999,
                padding: "0.45rem 1rem",
                color: GOLD,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              <BookOpen size={15} />
              مساحة توعوية لمرضى العيادة
            </div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.3rem, 6vw, 4.8rem)", lineHeight: 1.08, margin: "1.3rem 0 1rem" }}>
              مقالات
              <br />
              <span style={{ color: GOLD, fontWeight: 300, fontStyle: "italic" }}>تعليمية وواضحة</span>
            </h1>
            <p style={{ color: "#A1A1AA", fontSize: "clamp(0.95rem, 1.6vw, 1.08rem)", lineHeight: 1.95, fontWeight: 300 }}>
              كل قسم هنا يحتوي على مقال تعليمي أقرب لأسئلة المراجعين الحقيقية، بلغة مبسطة وهادئة تساعد على الفهم قبل الزيارة أو بعدها.
            </p>
          </Reveal>
        </section>

        <section style={{ marginBottom: "4rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "1.3rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.18em", marginBottom: "0.6rem" }}>أقسام المقالات</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700 }}>كل قسم فيه مقال تعليمي مستقل</h2>
              </div>
              <Link to="/services" style={{ color: GOLD, textDecoration: "none", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
                خدمات العيادة <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="category-grid">
            {ARTICLE_CATEGORIES.map((category, index) => (
              <Reveal key={category.id} delay={index * 0.06}>
                <a
                  href={`#${category.id}`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    height: "100%",
                    background: "rgba(212,175,55,0.04)",
                    border: "1px solid rgba(212,175,55,0.12)",
                    borderRadius: 22,
                    padding: "1.5rem",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: "1rem", fontSize: 11, color: GOLD }}>
                    <CircleCheck size={14} />
                    {category.status}
                  </span>
                  <h3 style={{ fontSize: "1.12rem", fontWeight: 700, marginBottom: "0.7rem", color: "#fff" }}>{category.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.9, fontWeight: 300 }}>{category.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="article-list" style={{ marginBottom: "3rem" }}>
          {ARTICLES.map((article, index) => (
            <ArticleCard key={article.id} article={article} delay={index * 0.04} />
          ))}
        </section>

        <Reveal>
          <section
            style={{
              background: "#0D0D0D",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 24,
              padding: "1.4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.16em", marginBottom: "0.5rem" }}>إذا عندك سؤال عن حالتك</p>
              <p style={{ color: "#D4D4D8", lineHeight: 1.9, fontSize: 14, fontWeight: 300 }}>
                هذه المقالات للتوعية والتعليم، لكن التشخيص الدقيق دائماً يحتاج فحص مباشر حسب حالتك.
              </p>
            </div>
            <a
              href={CONTACT.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                textDecoration: "none",
                background: GOLD,
                color: "#050505",
                minHeight: 50,
                borderRadius: 999,
                padding: "0 1.4rem",
                fontWeight: 700,
                fontSize: 14,
                whiteSpace: "nowrap",
              }}
            >
              <MessageCircle size={16} />
              احجز استشارة عبر واتساب
            </a>
          </section>
        </Reveal>
      </main>
    </div>
  );
}
