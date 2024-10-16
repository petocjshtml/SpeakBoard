const keys = document.querySelectorAll('.key');

const keyMap = {
    'Backquote': 0,    // ~ `
    'Digit1': 1,       // ! 1
    'Digit2': 2,       // @ 2
    'Digit3': 3,       // # 3
    'Digit4': 4,       // $ 4
    'Digit5': 5,       // % 5
    'Digit6': 6,       // ^ 6
    'Digit7': 7,       // & 7
    'Digit8': 8,       // * 8
    'Digit9': 9,       // ( 9
    'Digit0': 10,      // ) 0
    'Minus': 11,       // _ -
    'Equal': 12,       // + =
    'Backspace': 13,   // Backspace
    
    'Tab': 14,         // Tab
    'KeyQ': 15,        // Q
    'KeyW': 16,        // W
    'KeyE': 17,        // E
    'KeyR': 18,        // R
    'KeyT': 19,        // T
    'KeyY': 20,        // Y
    'KeyU': 21,        // U
    'KeyI': 22,        // I
    'KeyO': 23,        // O
    'KeyP': 24,        // P
    'BracketLeft': 25, // { [
    'BracketRight': 26,// } ]
    'Backslash': 27,   // | \
    
    'CapsLock': 28,    // Caps
    'KeyA': 29,        // A
    'KeyS': 30,        // S
    'KeyD': 31,        // D
    'KeyF': 32,        // F
    'KeyG': 33,        // G
    'KeyH': 34,        // H
    'KeyJ': 35,        // J
    'KeyK': 36,        // K
    'KeyL': 37,        // L
    'Semicolon': 38,   // : ;
    'Quote': 39,       // " '
    'Enter': 40,       // Enter
    
    'ShiftLeft': 41,   // Left Shift
    'KeyZ': 42,        // Z
    'KeyX': 43,        // X
    'KeyC': 44,        // C
    'KeyV': 45,        // V
    'KeyB': 46,        // B
    'KeyN': 47,        // N
    'KeyM': 48,        // M
    'Comma': 49,       // < ,
    'Period': 50,      // > .
    'Slash': 51,       // ? /
    'ShiftRight': 52,  // Right Shift
    
    'ControlLeft': 53, // Left Ctrl
    'AltLeft': 54,     // Left Alt
    'Space': 55,       // Space
    'ArrowLeft': 56,   // Left arrow
    'ArrowUp': 57,     // Up arrow
    'ArrowDown': 58,  // Down arrow
    'ArrowRight': 59    // Right arrow
};

function stlacKlav(klavesPoradie) {
    if (klavesPoradie !== null && keys[klavesPoradie]) {
        const klaves = keys[klavesPoradie];
        klaves.classList.add('pressed');  
    }
}

function uvolniKlav(klavesPoradie) {
    if (klavesPoradie !== null && keys[klavesPoradie]) {
        const klaves = keys[klavesPoradie];
        klaves.classList.remove('pressed');  
    }
}

document.addEventListener('keydown', (e) => {
    const klavesPoradie = keyMap[e.code];
    if (klavesPoradie !== undefined) {
        stlacKlav(klavesPoradie);
    }
});

document.addEventListener('keyup', (e) => {
    const klavesPoradie = keyMap[e.code];
    if (klavesPoradie !== undefined) {
        uvolniKlav(klavesPoradie);
    }
});


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {  
        switch (event.key.toLowerCase()) {
            case 's':   
            case 'p':   
            case 'w':  
                event.preventDefault();
                break;
        }
    }

    switch (event.code) {
        case 'F5':          
        case 'Tab':         
        case 'Backspace':  
        case 'Enter':       
        case 'ShiftRight': 
        case 'ShiftLeft':  
        case 'CapsLock':    
        case 'ControlLeft':
        case 'AltLeft':    
        case 'Space':      
            event.preventDefault();
            break;
    }
});


