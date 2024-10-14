//logika pridávaniáa písmen s dlžňom a mäkčeňom
let dlzen = false;
let makcen = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Dead') {
        if (event.shiftKey) {
            makcen = true;
        } else {
            dlzen = true;
        }  
    }
});

function pridajDiakritiku(pismeno) {
    // Mapovanie písmen s dlžňami
    const dlzenMap = {
        'a': 'á',
        'e': 'é',
        'i': 'í',
        'o': 'ó',
        'u': 'ú',
        'y': 'ý',
        'A': 'Á',
        'E': 'É',
        'I': 'Í',
        'O': 'Ó',
        'U': 'Ú',
        'Y': 'Ý'
    };

    // Mapovanie písmen s mäkčeňmi
    const makcenMap = {
        'c': 'č',
        'd': 'ď',
        'l': 'ľ',
        'n': 'ň',
        's': 'š',
        't': 'ť',
        'z': 'ž',
        'C': 'Č',
        'D': 'Ď',
        'L': 'Ľ',
        'N': 'Ň',
        'S': 'Š',
        'T': 'Ť',
        'Z': 'Ž'
    };

    // Ak je nastavený dlžeň
    if (dlzen && dlzenMap[pismeno]) {
        pismeno = dlzenMap[pismeno];
    }
    // Ak je nastavený mäkčeň
    else if (makcen && makcenMap[pismeno]) {
        pismeno = makcenMap[pismeno];
    }

    // Vynulovanie premenných
    dlzen = false;
    makcen = false;

    // Vrátenie výsledného písmenka
    return pismeno;
}


document.addEventListener('keydown', function(event) {
    const typedCharacter = event.key;

    console.log('Napísané písmenko:', typedCharacter);
    switch (typedCharacter) {
        case "ArrowLeft":
            return;
        break;
        case "ArrowRight":
            return;
        break;
        case "ArrowDown":
            return;
        break;
        case "ArrowUp":
            return;
        break;
        case "Shift":
            return;
        break;
        case "Dead":
            return;
        break;
        case "CapsLock":
            return;
        break;
        case "Alt":
            return;
        break;
        case "Meta":
            return;
        break;
        case "Control":
            return;
        break;
        case "AudioVolumeUp":
            return;
        break;
        case "AudioVolumeDown":
            return;
        break;
        case "AudioVolumeMute":
            return;
        break;
        case "Escape":
            return;
        break;
        case "AltGraph":
            return;
        break;
        case "Insert":
            return;
        break;
        case "Backspace":
            vymazPismeno();
        break;
        case "Delete":
            vymazPismeno();
        break;
        case " ":
            napisDoTerminalu(event.key);
            readNew(getLastWordFromTerminal(), config);
        break;
        case "Enter":
            napisDoTerminalu("<br>");
            readAfter(getLastWordFromTerminal(), config);
        break;
        case "Tab":
            napisDoTerminalu("&nbsp;&nbsp;&nbsp;");
            readAfter(getLastWordFromTerminal(), config);
        break;
    
        default:
        napisDoTerminalu(event.key);
        break;
    }
});

function napisDoTerminalu(pismeno){
    const terminal = document.getElementById("terminal");
    terminal.innerHTML += pridajDiakritiku(pismeno);
    terminal.scrollTop = terminal.scrollHeight;
    textTerminalZmena();
}

function vymazPismeno() {
    const terminal = document.getElementById("terminal");
    const aktualnyText = terminal.innerHTML;
     // Skontrolovať, či text končí na `&nbsp;` alebo `<br>`
     if (aktualnyText.endsWith('&nbsp;')) {
        // Odstrániť celú HTML entitu `&nbsp;`
        terminal.innerHTML = aktualnyText.slice(0, -6); 
    } else if (aktualnyText.endsWith('<br>')) {
        // Odstrániť celú HTML značku `<br>`
        terminal.innerHTML = aktualnyText.slice(0, -4); 
    } else {
        // Inak odstrániť jeden znak
        terminal.innerHTML = aktualnyText.slice(0, -1);
    }
    terminal.scrollTop = terminal.scrollHeight; 
    textTerminalZmena();
}

function parsujText(html) {
    // Krok 1: Nahradiť všetky <br> značky za medzery
    let upravenyText = html.replace(/<br\s*\/?>/gi, ' ');

    // Krok 2: Nahradiť všetky &nbsp; za obyčajné medzery
    upravenyText = upravenyText.replace(/&nbsp;/gi, ' ');

    // Krok 3: Rozdeliť text podľa medzier a uložiť jednotlivé slová do poľa
    const slova = upravenyText.split(/\s+/).filter(slovo => slovo.length > 0); // Odstráni prázdne slová

    // Vráti pole jednotlivých slov
    return slova;
}

function textTerminalZmena(){
    const terminalHtml = document.getElementById("terminal").innerHTML;
    const parsedTextFromTerminal = parsujText(terminalHtml);

    console.log(parsedTextFromTerminal);
}

function getLastWordFromTerminal() 
{
    const terminalHtml = document.getElementById("terminal").innerHTML;
    const parsedTextFromTerminal = parsujText(terminalHtml);
    return parsedTextFromTerminal[parsedTextFromTerminal.length-1];
}








