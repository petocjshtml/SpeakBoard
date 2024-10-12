// Kontrola, či prehliadač podporuje Web Speech API
if ('speechSynthesis' in window) {
    console.log('Syntéza reči je podporovaná.');

    // Získanie referencie na syntézu reči
    const synth = window.speechSynthesis;

    // Funkcia na čítanie textu s možnými nastaveniami
    function citajText(text, nastavenia = {}) {
        if (!text) return;

        // Vytvorenie novej reči (utterance)
        const utterance = new SpeechSynthesisUtterance(text);

        // Výber hlasu (ak nie je zadaný, použije sa predvolený hlas)
        const hlas = nastavenia.hlas || synth.getVoices()[0]; // Predvolený hlas
        utterance.voice = hlas;

        // Nastavenie rýchlosti čítania (rate)
        // Minimálna hodnota: 0.1, Maximálna hodnota: 10, Predvolená hodnota: 1
        utterance.rate = nastavenia.rychlost || 1; // Zadaj hodnotu medzi 0.1 a 10

        // Nastavenie tónu (pitch)
        // Minimálna hodnota: 0, Maximálna hodnota: 2, Predvolená hodnota: 1
        utterance.pitch = nastavenia.ton || 1; // Zadaj hodnotu medzi 0 a 2

        // Nastavenie hlasitosti (volume)
        // Minimálna hodnota: 0 (ticho), Maximálna hodnota: 1 (maximálna hlasitosť), Predvolená hodnota: 1
        utterance.volume = nastavenia.hlasitost || 1; // Zadaj hodnotu medzi 0 a 1

        // Čítanie textu
        synth.speak(utterance);
    }

    // Funkcia na získanie dostupných hlasov
    function ziskajHlasy() {
        return synth.getVoices();
    }

    // Funkcia na zistenie, či prebieha aktuálne čítanie
    function jeCitanie() {
        return synth.speaking;
    }

    // Funkcia na zastavenie čítania
    function zastavCitanie() {
        if (jeCitanie()) {
            synth.cancel();
        }
    }

    // Funkcia na pauzovanie čítania
    function pauzujCitanie() {
        if (jeCitanie() && !synth.paused) {
            synth.pause();
        }
    }

    // Funkcia na pokračovanie čítania
    function pokracujCitanie() {
        if (jeCitanie() && synth.paused) {
            synth.resume();
        }
    }

    // Ukážka používania funkcie na čítanie textu s rôznymi nastaveniami
    document.getElementById('startButton').addEventListener('click', () => {
        const text = document.getElementById('textToRead').value;
        const nastavenia = {
            hlas: ziskajHlasy()[1],   // Vyber hlas, aký sa ti páči (ak je dostupný)
            rychlost: 1.2,            // Trochu rýchlejšie čítanie
            ton: 1,                   // Štandardný tón
            hlasitost: 0.8            // Trochu nižšia hlasitosť
        };
        citajText(text, nastavenia);
    });

    // Ukážka použitia pauzy a pokračovania
    document.getElementById('pauseButton').addEventListener('click', pauzujCitanie);
    document.getElementById('resumeButton').addEventListener('click', pokracujCitanie);
    document.getElementById('stopButton').addEventListener('click', zastavCitanie);

} else {
    console.log('Syntéza reči nie je podporovaná týmto prehliadačom.');
}
