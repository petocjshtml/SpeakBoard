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

    if (dlzen && dlzenMap[pismeno]) {
        pismeno = dlzenMap[pismeno];
    }
    else if (makcen && makcenMap[pismeno]) {
        pismeno = makcenMap[pismeno];
    }

    dlzen = false;
    makcen = false;
    return pismeno;
}


document.addEventListener('keydown', function(event) {
    const typedCharacter = event.key;

    console.log('Napísané písmenko:', typedCharacter);
    switch (typedCharacter) {
        case "ArrowLeft":
            read("Vľavo");
        break;
        case "ArrowRight":
            read("Vpravo");
        break;
        case "ArrowDown":
            read("Dolu");
        break;
        case "ArrowUp":
            read("Hore");
        break;
        case "Shift":
            read("Držím Shift");
        break;
        case "Dead":
            return;
        break;
        case "CapsLock":
            if (event.getModifierState('CapsLock')) {
                read("Zapínam CapsLock");
            } else {
                read("Vypínam CapsLock");
            }
        break;
        case "Alt":
            read("Držím Alt");
        break;
        case "Meta":
            return;
        break;
        case "Control":
            read("Držím Control");
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
        case ",":
            napisDoTerminalu(event.key);
            read("Čiarka");
        break;
        case ".":
            napisDoTerminalu(event.key);
            read("Bodka");
        break;
        case ":":
            napisDoTerminalu(event.key);
            read("Dvojbodka");
        break;
        case "?":
            napisDoTerminalu(event.key);
            read("Otáznik");
        break;
        case "!":
            napisDoTerminalu(event.key);
            read("Výkričník");
        break;
        case "-":
            napisDoTerminalu(event.key);
            read("Pomlčka");
        break;
        case "(":
            napisDoTerminalu(event.key);
            read("Ľavá okruhlá zátvorka");
        break;
        case ")":
            napisDoTerminalu(event.key);
            read("Pravá okruhlá zátvorka");
        break;
        case "{":
            napisDoTerminalu(event.key);
            read("Ľavá zložená zátvorka");
        break;
        case "}":
            napisDoTerminalu(event.key);
            read("Pravá zložená zátvorka");
        break;
        case "[":
            napisDoTerminalu(event.key);
            read("Ľavá hranatá zátvorka");
        break;
        case "]":
            napisDoTerminalu(event.key);
            read("Pravá hranatá zátvorka");
        break;
        case "<":
            napisDoTerminalu(event.key);
            read("Ľavá špicatá zátvorka");
        break;
        case ">":
            napisDoTerminalu(event.key);
            read("Pravá špicatá zátvorka");
        break;
        case "=":
            napisDoTerminalu(event.key);
            read("Rovná sa");
        break;
        case ";":
            napisDoTerminalu(event.key);
            read("Bodkočiarka");
        break;
        case "'":
            napisDoTerminalu(event.key);
            read("Úvodzovka");
        break;
        case '"':
            napisDoTerminalu(event.key);
            read("Dvojitá Úvodzovka");
        break;
        case "Backspace":
            vymazPismeno();
        break;
        case "Delete":
            vymazPismeno();
        break;
        case " ":
            napisDoTerminalu(event.key);
            read("Medzera");
        break;
        case "Enter":
            napisDoTerminalu("<br>");
            read("Nový riadok");
        break;
        case "Tab":
            napisDoTerminalu("&nbsp;&nbsp;&nbsp;");
            read("Tabulátor");
        break;
    
        default:
        napisDoTerminalu(event.key);
        read(getLastWordFromTerminal());
        break;
    }
});


document.addEventListener('keyup', function(event) {
    const typedCharacter = event.key;
    switch (typedCharacter) {
        case "Shift":
            read("Púšťam Shift");
        break;
        case "Alt":
            read("Púšťam Alt");
        break;
        case "Control":
            read("Púšťam Control");
        break;

        default:
        break;
    }
});

function napisDoTerminalu(pismeno){
    const terminal = document.getElementById("terminal");
    terminal.innerHTML += pridajDiakritiku(pismeno);
    terminal.scrollTop = terminal.scrollHeight;
}

function vymazPismeno() {
    const terminal = document.getElementById("terminal");
    const aktualnyText = terminal.innerHTML;
     if (aktualnyText.endsWith('&nbsp;')) {
        terminal.innerHTML = aktualnyText.slice(0, -6); 
        read("Mažem tabulátor");
    } else if (aktualnyText.endsWith('<br>')) {
        terminal.innerHTML = aktualnyText.slice(0, -4); 
        read("Mažem enter");
    } 
    else if (aktualnyText.endsWith(" ")) {
        terminal.innerHTML = aktualnyText.slice(0, -1); 
        read("Mažem medzeru");
    }
    else {
        terminal.innerHTML = aktualnyText.slice(0, -1);
        read(`Mažem ${aktualnyText.slice(-1)}`);
    }
    terminal.scrollTop = terminal.scrollHeight; 
}

function parsujText(html) {
    let upravenyText = html.replace(/<br\s*\/?>/gi, ' ');
    upravenyText = upravenyText.replace(/&nbsp;/gi, ' ');
    const slova = upravenyText.split(/\s+/).filter(slovo => slovo.length > 0); 
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

function getLastLetterFromTerminal() 
{
    return getLastWordFromTerminal().slice(-1);
}








