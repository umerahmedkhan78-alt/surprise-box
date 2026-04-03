const config = {
    love: { color: "#ff0055", title: "Create Her Surprise" },
    sorry: { color: "#5c6bc0", title: "Make It Right" },
    angry: { color: "#ef5350", title: "Softening the Mood" },
    birthday: { color: "#fbc02d", title: "Party Time!" }
};

function changeTheme() {
    const mood = document.getElementById('moodSelect').value;
    document.body.className = "theme-" + mood;
    document.getElementById('title').innerText = config[mood].title;
}

function goToQR() {
    const msg = document.getElementById('userMessage').value;
    const mood = document.getElementById('moodSelect').value;
    
    if(!msg) { alert("Please write a message first!"); return; }

    // STEP: Create the Link
    // Replace 'yourname.github.io/repo-name' with your actual GitHub link after uploading!
    const siteUrl = window.location.href.split('index.html')[0];
    const finalUrl = `${siteUrl}card.html?msg=${encodeURIComponent(msg)}&mood=${mood}`;

    document.getElementById('step-write').classList.add('hidden');
    document.getElementById('step-qr').classList.remove('hidden');
    
    const qrDiv = document.getElementById('qrcode');
    qrDiv.innerHTML = ""; // Clear old QR
    
    new QRCode(qrDiv, {
        text: finalUrl,
        width: 200, height: 200,
        colorDark: config[mood].color,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = 'Message_QR.png';
        link.click();
    }
}

function goBack() {
    document.getElementById('step-write').classList.remove('hidden');
    document.getElementById('step-qr').classList.add('hidden');
}