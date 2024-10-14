function isSynthesisAllowed()
{
    if (!('speechSynthesis' in window)) {
        alert("Syntéza v tomto prehliadači nieje podporovaná...")
    }
}

//overenie, či je podporovaná v prehliadači syntéza
isSynthesisAllowed();

// Definícia konfiguračného objektu
let config = {
    rate: 1, // Rýchlosť čítania (štandardná hodnota je 1)
    pitch: 1, // Výška tónu (štandardná hodnota je 1)
    volume: 1, // Hlasitosť (štandardná hodnota je 1)
    voice: null // Výber hlasu 
};

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

// Funkcia na aktualizáciu konfiguračného objektu a výpis do konzoly
function updateConfig() {
    config.rate = parseFloat(document.getElementById('rate').value);
    config.pitch = parseFloat(document.getElementById('pitch').value);
    config.volume = parseFloat(document.getElementById('volume').value);
    let voiceSelect = document.getElementById('voice');
    let voices = window.speechSynthesis.getVoices();
    config.voice = voices[voiceSelect.value];

    // Výpis aktualizovaného konfiguračného objektu do konzoly
    console.log(config);
}

// Nastavenie onchange pre všetky inputy a select
document.getElementById('rate').onchange = updateConfig;
document.getElementById('pitch').onchange = updateConfig;
document.getElementById('volume').onchange = updateConfig;
document.getElementById('voice').onchange = updateConfig;

// Funkcia read (umožní paralelné čítanie)
function read(text, config) {
    let utterance = new SpeechSynthesisUtterance(text);

    // Nastavenie parametrov syntetizátora z konfiguračného objektu
    if (config) {
        utterance.rate = config.rate;
        utterance.pitch = config.pitch;
        utterance.volume = config.volume;
        utterance.voice = config.voice; // Musí byť nastavený hlas
    }

    // Spustenie čítania bez prerušenia aktuálnych čítaní
    window.speechSynthesis.speak(utterance);
}

// Funkcia readNew (zruší prebiehajúce čítania a začne nové)
function readNew(text, config) {
    let utterance = new SpeechSynthesisUtterance(text);

    // Nastavenie parametrov syntetizátora z konfiguračného objektu
    if (config) {
        utterance.rate = config.rate;
        utterance.pitch = config.pitch;
        utterance.volume = config.volume;
        utterance.voice = config.voice; // Musí byť nastavený hlas
    }

    // Zrušenie aktuálnych prebiehajúcich čítaní
    window.speechSynthesis.cancel();

    // Spustenie nového čítania
    window.speechSynthesis.speak(utterance);
}

// Funkcia readAfter (naplánuje čítanie po dokončení aktuálneho)
function readAfter(text, config) {
    let utterance = new SpeechSynthesisUtterance(text);

    // Nastavenie parametrov syntetizátora z konfiguračného objektu
    if (config) {
        utterance.rate = config.rate;
        utterance.pitch = config.pitch;
        utterance.volume = config.volume;
        utterance.voice = config.voice; // Musí byť nastavený hlas
    }

    // Overenie, či niečo práve číta
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        // Ak prebieha čítanie, naplánuj nové čítanie po skončení aktuálnych
        window.speechSynthesis.onend = function() {
            window.speechSynthesis.speak(utterance);
        };
    } else {
        // Ak nič neprebieha, okamžite spusti nové čítanie
        window.speechSynthesis.speak(utterance);
    }
}







