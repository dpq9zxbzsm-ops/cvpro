// التنقل بين الصفحات
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        goToPage(target);
    });
});

function goToPage(pageId) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector(`[data-target="${pageId}"]`).classList.add('active');

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// ربط الحقول لحظياً
const fieldMappings = [
    { in: 'nameInp', out: 'viewName' },
    { in: 'jobInp', out: 'viewJob' },
    { in: 'emailInp', out: 'viewEmail' },
    { in: 'phoneInp', out: 'viewPhone' },
    { in: 'bioInp', out: 'viewBio' },
    { in: 'expInp', out: 'viewExp' },
    { in: 'eduInp', out: 'viewEdu' }
];

fieldMappings.forEach(mapping => {
    document.getElementById(mapping.in).addEventListener('input', function() {
        document.getElementById(mapping.out).innerText = this.value || "...";
    });
});

// معالجة المهارات (Pills)
document.getElementById('skillsInp').addEventListener('input', function() {
    const container = document.getElementById('viewSkills');
    container.innerHTML = '';
    this.value.split(',').forEach(skill => {
        if (skill.trim()) {
            const span = document.createElement('span');
            span.className = 'pill';
            span.innerText = skill.trim();
            container.appendChild(span);
        }
    });
});

// معالجة الصورة
document.getElementById('imgInput').addEventListener('change', function() {
    const reader = new FileReader();
    reader.onload = (e) => document.getElementById('viewImg').src = e.target.result;
    reader.readAsDataURL(this.files[0]);
});

// تحميل PDF
document.getElementById('pdfBtn').addEventListener('click', function() {
    const element = document.getElementById('cv-paper');
    const opt = {
        margin: 0,
        filename: 'My_Professional_CV.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});