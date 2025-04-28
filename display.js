// مثال بيانات (يفضل لاحقًا جلبها من API)
const lessons = [
    {
        name: "درس في العقيدة",
        sheikh: "الشيخ أحمد",
        type: "religious",
        fileUrl: "http://localhost:3001/uploads/1712345678-lesson1.mp3"
    },
    {
        name: "تلاوة جزء عم",
        sheikh: "الشيخ محمد",
        type: "quran",
        fileUrl: "http://localhost:3001/uploads/1712345680-quran1.mp3"
    },
    {
        name: "محاضرة عن الأخلاق",
        sheikh: "الشيخ علي",
        type: "lecture",
        fileUrl: "http://localhost:3001/uploads/1712345690-lecture1.mp4"
    }
];

// دالة لعرض الدروس في القسم المناسب
function displayLessons() {
    lessons.forEach(lesson => {
        let containerId = "";
        if (lesson.type === "religious") containerId = "religious-lessons";
        else if (lesson.type === "quran") containerId = "quran-lessons";
        else if (lesson.type === "lecture") containerId = "lecture-lessons";

        const container = document.getElementById(containerId);
        const div = document.createElement("div");
        div.className = "lesson-box";
        div.innerHTML = `
            <strong>اسم الدرس:</strong> ${lesson.name}<br>
            <strong>الشيخ:</strong> ${lesson.sheikh}<br>
            ${
                lesson.fileUrl.endsWith('.mp3') || lesson.fileUrl.endsWith('.wav')
                ? `<audio controls src="${lesson.fileUrl}"></audio>`
                : `<video controls width="320" src="${lesson.fileUrl}"></video>`
            }
        `;
        container.appendChild(div);
    });
}

window.onload = displayLessons;