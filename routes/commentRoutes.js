// استيراد مكتبة express لإنشاء Router
const express = require("express");

// إنشاء Router جديد
const router = express.Router();

// استيراد الملف الذي يحتوي على Schema (نموذج البيانات) من مجلد modules
const Data = require("../modules/schema.js");

// مسار الصفحة الرئيسية
router.get("/", (req, res) => {
  // عرض صفحة addcomment باستخدام محرك العرض EJS
  res.render("addcomment", {
    title: "ADD COMMENTS", // تمرير عنوان للصفحة
  });
});

// مسار إضافة تعليق (POST request)
router.post("/read.html", async (req, res) => {
  try {
    // إنشاء كائن جديد من نموذج البيانات باستخدام البيانات المرسلة من النموذج
    const data = new Data(req.body);

    // حفظ البيانات في قاعدة البيانات
    await data.save();

    // إعادة توجيه المستخدم إلى صفحة read.html بعد الحفظ
    res.redirect("read.html");
  } catch (err) {
    // في حالة حدوث خطأ، إرسال رسالة خطأ مع حالة HTTP 500
    res.status(500).send("Error saving comment");

    // طباعة تفاصيل الخطأ في الكونسول
    console.error(err);
  }
});

// مسار قراءة التعليقات (GET request)
router.get("/read.html", async (req, res) => {
  try {
    // جلب جميع البيانات من قاعدة البيانات
    const data = await Data.find();

    // عرض صفحة read باستخدام محرك العرض EJS وتمرير البيانات
    res.render("read", {
      da: data, // تمرير البيانات إلى الصفحة
      title: "READ PRODUCT", // تمرير عنوان للصفحة
    });
  } catch (err) {
    // في حالة حدوث خطأ، إرسال رسالة خطأ مع حالة HTTP 500
    res.status(500).send("Error fetching comments");

    // طباعة تفاصيل الخطأ في الكونسول
    console.error(err);
  }
});

// تصدير Router ليتم استخدامه في الملف الرئيسي
module.exports = router;