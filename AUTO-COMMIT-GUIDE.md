# التحديثات التلقائية على GitHub

هنا طريقتين لرفع التحديثات تلقائياً:

## الطريقة 1️⃣: GitHub Actions (الأفضل)

✅ **المميزات:**
- لا تحتاج تثبيت أي برامج إضافية
- تعمل تلقائياً مع كل push إلى GitHub
- آمنة وموثوقة

**الملف:** `.github/workflows/auto-commit.yml`

الـ workflow هذا يراقب أي تغييرات وينشئ commit تلقائياً.

---

## الطريقة 2️⃣: Watch Script محلي

✅ **المميزات:**
- تحكم كامل محلي
- رصد فوري للتغييرات

**متطلبات:**
- macOS: `brew install fswatch`
- Linux: `apt-get install inotify-tools`

**التشغيل:**
```bash
npm run watch-push
```

أو:
```bash
bash watch-and-push.sh
```

---

## أيهما أختار؟

| | GitHub Actions | Watch Script |
|---|---|---|
| سهولة التثبيت | ✅ بدون تثبيت | ⚠️ يحتاج أدوات |
| الموثوقية | ✅ عالية جداً | ✅ عالية |
| الاستخدام | تلقائي | يدوي (لكن مراقب) |
| **التوصية** | **الأفضل للبداية** | للمطورين المتقدمين |

---

## ملاحظات مهمة ⚠️

1. **تجنب النقاعات:** إذا عدلت الملفات من عدة أماكن معاً، قد تحصل conflict. استخدم طريقة واحدة فقط.

2. **المجلدات المستثناة:** السكريبت يراقب:
   - `src/`
   - `index.html`
   - `package.json`
   - `vite.config.js`
   - `netlify.toml`

   لا يراقب: `node_modules/` و `dist/` و `.git/`

3. **قراءة commit messages:** 
   ```bash
   git log --oneline
   ```

---

## استكشاف الأخطاء

### الخطأ: fswatch not found
```bash
# macOS
brew install fswatch

# Linux
sudo apt-get install inotify-tools
```

### الخطأ: Permission denied
```bash
chmod +x watch-and-push.sh
```

### الخطأ: Failed to push
- تأكد من GitHub token صحيح
- تحقق من الاتصال بالإنترنت
- اعمل `git pull` أولاً

---

**اختر طريقة واحدة وابدأ!** 🚀
