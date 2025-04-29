// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// لما ترفع درس جديد
app.post('/upload', upload.single('file'), (req, res) => {
    const { lessonName, sheikhName, lessonType } = req.body;
    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    const newLesson = {
        lessonName,
        sheikhName,
        lessonType,
        fileUrl,
    };

    const filePath = path.join(__dirname, 'lessons.json');

    // قراءة الداتا الحالية
    let lessons = [];
    if (fs.existsSync(filePath)) {
        lessons = JSON.parse(fs.readFileSync(filePath));
    }

    // إضافة الدرس الجديد
    lessons.push(newLesson);

    // حفظ الداتا في lessons.json
    fs.writeFileSync(filePath, JSON.stringify(lessons, null, 2));

    res.json({ message: 'Lesson uploaded successfully', newLesson });
});

// Endpoint لعرض كل الدروس
app.get('/lessons', (req, res) => {
    const filePath = path.join(__dirname, 'lessons.json');
    if (fs.existsSync(filePath)) {
        const lessons = JSON.parse(fs.readFileSync(filePath));
        res.json(lessons);
    } else {
        res.json([]);
    }
});

// تشغيل السيرفر
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
app.get('/', (req, res) => {
    res.send('Server is running for Masjid Altawba 🚀');
  });
  const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// إعداد مكان حفظ الملفات المرفوعة
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads'); // حفظ الملفات في فولدر uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // تسمية الملفات بإضافة الوقت
  }
});

const upload = multer({ storage: storage });

// API لرفع الدروس
app.post('/upload', upload.single('lessonFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // هنا هنضيف الكود لحفظ بيانات الدرس (اسم الدرس، اسم الشيخ، نوع الدرس)
  const lessonData = {
    lessonName: req.body.lessonName,
    teacherName: req.body.teacherName,
    lessonType: req.body.lessonType,
    filePath: req.file.path
  };

  // طبعًا هنا هنبقي هنحفظ البيانات في ملف JSON أو قاعدة بيانات
  res.status(200).send('File uploaded successfully!');
});

// السيرفر بيشتغل على المنفذ 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
