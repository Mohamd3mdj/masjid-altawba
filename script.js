// Handle lesson form submission
document.getElementById('lessonForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const lessonName = document.getElementById('lessonName').value;
    const sheikhName = document.getElementById('sheikhName').value;
    const lessonType = document.getElementById('lessonType').options[document.getElementById('lessonType').selectedIndex].text;
    const lessonsList = document.getElementById('lessonsList');
    const lessonFileInput = document.getElementById('lessonFile');
    let fileInfo = "";

    if (lessonFileInput && lessonFileInput.files.length > 0) {
        const file = lessonFileInput.files[0];
        // عرض اسم الملف فقط (لن يتم رفعه فعليًا)
        fileInfo = ` | الملف: ${file.name}`;
    }

    const lessonDiv = document.createElement('div');
    lessonDiv.textContent = `اسم الدرس: ${lessonName} | الشيخ: ${sheikhName} | النوع: ${lessonType}${fileInfo}`;
    lessonsList.appendChild(lessonDiv);

    this.reset();
});

// Handle admin form submission
document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const adminName = document.getElementById('adminName').value;
    const adminsList = document.getElementById('adminsList');

    const adminLi = document.createElement('li');
    adminLi.textContent = adminName;
    adminsList.appendChild(adminLi);

    this.reset();
});