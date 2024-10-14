function isSynthesisAllowed()
{
    if (!('speechSynthesis' in window)) {
        alert("Syntéza v tomto prehliadači nieje podporovaná...")
    }
}

isSynthesisAllowed();

function loadVoices() {
    let voiceSelect = document.getElementById('voice');
    let voices = window.speechSynthesis.getVoices();

    voiceSelect.innerHTML = ''; 
    voices.forEach((voice, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    if (voices.length > 0) {
        config.voice = voices[0];
        console.log(config); 
    }
}

window.speechSynthesis.onvoiceschanged = loadVoices;

let utterance = new SpeechSynthesisUtterance();
let window_speechSynthesis = window.speechSynthesis;
let config = {
    rate: 1, 
    pitch: 1, 
    volume: 1,
    voice: null 
};

function read(text) {
    window_speechSynthesis.cancel();
    utterance.text = text;
    window_speechSynthesis.speak(utterance);
}

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


document.getElementById('rate').onchange = updateConfig;
document.getElementById('pitch').onchange = updateConfig;
document.getElementById('volume').onchange = updateConfig;
document.getElementById('voice').onchange = updateConfig;


