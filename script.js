let currentStep = 1;

function nextStep(step) {
    document.querySelectorAll('.step-card').forEach(card => card.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
    document.getElementById('stepCounter').innerText = `Paso ${step} de 3`;
}

// Previsualización de imagen
const photoInput = document.getElementById('photoInput');
let photoBase64 = "";

photoInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoBase64 = e.target.result;
            document.getElementById('outPhoto').src = photoBase64;
        }
        reader.readAsDataURL(file);
    }
});

function generateCV() {
    // Captura de datos
    const data = {
        name: document.getElementById('name').value,
        job: document.getElementById('job').value,
        email: document.getElementById('email').value,
        summary: document.getElementById('summary').value,
        experience: document.getElementById('experience').value
    };

    // Validación básica
    if(!data.name) return alert("Por favor, ingresa al menos tu nombre.");

    // Llenar plantilla
    document.getElementById('outName').innerText = data.name;
    document.getElementById('outJob').innerText = data.job;
    document.getElementById('outEmail').innerText = "✉ " + data.email;
    document.getElementById('outSummary').innerText = data.summary;
    document.getElementById('outExperience').innerText = data.experience;

    const element = document.getElementById('cvTemplate');
    element.classList.remove('hidden');

    const opt = {
        margin:       0.5,
        filename:     `CV_${data.name.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generar PDF
    html2pdf().set(opt).from(element).save().then(() => {
        element.classList.add('hidden');
        alert("¡Tu currículum profesional ha sido generado!");
    });
}