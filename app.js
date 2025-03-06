// تحميل المتغيرات البيئية من ملف .env
require('dotenv').config();

// استيراد مكتبة express لإنشاء التطبيق
const express = require("express");

// استيراد مكتبة path للتعامل مع مسارات الملفات والمجلدات
const path = require("path");

// استيراد مكتبة livereload لتحديث المتصفح تلقائيًا عند تغيير الملفات
const livereload = require("livereload");

// استيراد middleware لتوصيل livereload مع Express
const connectLivereload = require("connect-livereload");

// استيراد مكتبة compression لضغط الاستجابات وتحسين الأداء
const compression = require('compression');

// استيراد الملف الذي يحتوي على Schema (نموذج البيانات) من مجلد modules
const Data = require("./modules/schema.js");

// استيراد ملف المسارات (routes) الخاص بالتعليقات
const commentRoutes = require("./routes/commentRoutes");

// تعيين المنفذ (port) من المتغيرات البيئية أو استخدام القيمة الافتراضية 3000
const port = process.env.PORT || 3000;

// إنشاء تطبيق Express
const app = express();

// إعداد محرك العرض (view engine) لاستخدام EJS
app.set("view engine", "ejs");

// استخدام middleware لتحليل طلبات JSON
app.use(express.json());

// استخدام middleware لتحليل البيانات المرسلة عبر النماذج (forms)
app.use(express.urlencoded({ extended: true }));

// استخدام middleware لضغط الاستجابات وتحسين الأداء
app.use(compression());

// إنشاء خادم LiveReload لمشاهدة التغييرات في مجلد public
const liveReloadServer = livereload.createServer();

// تحديد المجلد الذي سيشاهده LiveReload (مجلد public)
liveReloadServer.watch(path.join(__dirname, "public"));

// توصيل LiveReload مع Express
app.use(connectLivereload());

// عند اتصال LiveReload بالخادم، يتم تحديث الصفحة بعد 100 مللي ثانية
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// استخدام مسارات التعليقات التي تم استيرادها من commentRoutes
app.use("/", commentRoutes);

// middleware لمعالجة الأخطاء (يتم تنفيذه عند حدوث خطأ في أي route)
app.use((err, req, res, next) => {
  console.error(err.stack); // طباعة تفاصيل الخطأ في الكونسول
  res.status(500).send("Something broke!"); // إرسال رسالة خطأ للعميل
});

// بدء الخادم والاستماع على المنفذ المحدد
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});