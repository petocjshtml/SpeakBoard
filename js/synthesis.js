function isSynthesisAllowed()
{
    if (!('speechSynthesis' in window)) {
        alert("Syntéza v tomto prehliadači nieje podporovaná...")
    }
}

//overenie, či je podporovaná v prehliadači syntéza
isSynthesisAllowed();

// Dynamické naplnenie select prvku hlasmi a automatické nastavenie konfiguračného objektu
function loadVoices() {
    let voiceSelect = document.getElementById('voice');
    let voices = window.speechSynthesis.getVoices();

    voiceSelect.innerHTML = ''; // Vyčistiť select pred pridaním nových hlasov
    voices.forEach((voice, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    // Automatické nastavenie prvého hlasu do configu
    if (voices.length > 0) {
        config.voice = voices[0];
        console.log(config); // Výpis konfiguračného objektu do konzoly
    }
}

// Čakať na načítanie hlasov a hneď spustiť funkciu
window.speechSynthesis.onvoiceschanged = loadVoices;

// Definícia konfiguračného objektu
let utterance = new SpeechSynthesisUtterance();
let window_speechSynthesis = window.speechSynthesis;
let config = {
    rate: 1, // Rýchlosť čítania (štandardná hodnota je 1)
    pitch: 1, // Výška tónu (štandardná hodnota je 1)
    volume: 1, // Hlasitosť (štandardná hodnota je 1)
    voice: null // Výber hlasu 
};

// Funkcia readNew (zruší prebiehajúce čítania a začne nové)
function read(text) {
    window_speechSynthesis.cancel();
    utterance.text = text;
    window_speechSynthesis.speak(utterance);
}
// Funkcia na aktualizáciu konfiguračného objektu a výpis do konzoly
function updateConfig() {
    config.rate = parseFloat(document.getElementById('rate').value);
    config.pitch = parseFloat(document.getElementById('pitch').value);
    config.volume = parseFloat(document.getElementById('volume').value);
    let voiceSelect = document.getElementById('voice');
    let voices = window.speechSynthesis.getVoices();
    config.voice = voices[voiceSelect.value];
    utterance.rate = config.rate;
    utterance.pitch = config.pitch;
    utterance.volume = config.volume;
    utterance.voice = config.voice;
}

// Nastavenie onchange pre všetky inputy a select
document.getElementById('rate').onchange = updateConfig;
document.getElementById('pitch').onchange = updateConfig;
document.getElementById('volume').onchange = updateConfig;
document.getElementById('voice').onchange = updateConfig;


