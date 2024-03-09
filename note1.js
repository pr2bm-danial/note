window.addEventListener('DOMContentLoaded', function () {

    // Beim Laden der Seite gespeicherten Notizen-Seitennamen abrufen und anzeigen
    let page = document.getElementById('noteArea');
    let storedPageName = getCurrentPageContent();
    if (storedPageName) {
        page.innerHTML = storedPageName;
    }

    // Eventlistener zum Speichern des Notizen-Seitennamens beim Eingeben von Text
    page.addEventListener('input', function () {
        // Notizen-Seitenname abrufen und speichern
        let content = page.innerHTML; // HTML statt Text, um auch Absätze zu berücksichtigen
        // Notizen-Seitenname im LocalStorage speichern
        savePageName(content);
    });

    // Beim Laden der Seite gespeicherten Notizen-Namen abrufen und anzeigen
    let noteName = document.getElementById('text');
    let storedNoteName = getCurrentNoteName();
    if (storedNoteName) {
        noteName.innerHTML = storedNoteName;
    }

    // Eventlistener zum Speichern des Notizen-Namen beim Eingeben von Text
    noteName.addEventListener('input', function () {
        // Notizen-Seitenname abrufen und speichern
        let note = noteName.innerHTML; // HTML statt Text, um auch Absätze zu berücksichtigen
        // Notizen-Seitenname im LocalStorage speichern
        saveNoteName(note);
    });

});

let time = document.querySelector('.time');
function updateTime() {
    // Aktuelle Zeit anzeigen
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let base = new Date();
    let month = months[base.getMonth()];
    let minute = base.getMinutes().toString().padStart(2, "0");
    const date = 'Bearbeitet: ' + base.getDate() + ". " + month + " " + base.getFullYear() + " um " + base.getHours() + ":" + minute;
    console.log(date);
    saveDate(date);
    return date
}

function saveDate(date) {
    localStorage.setItem('lastEdit1', date)
}

function getEditDate() {
    return localStorage.getItem('lastEdit1')
}

// Funktion zum Speichern des Notizen-Seitennamens im LocalStorage
function savePageName(content) {
    localStorage.setItem('currentPageContent1', content);
}

// Funktion zum Abrufen des gespeicherten Notizen-Seitennamens aus dem LocalStorage
function getCurrentPageContent() {
    return localStorage.getItem('currentPageContent1');
}

const myArray = JSON.parse(localStorage.getItem('savedList')) || [];
// Funktion zum Speichern des Notizen-Namen im LocalStorage
function saveNoteName(note) {
    myArray[0] = ''
    myArray[0] = note
    return localStorage.setItem('savedList', JSON.stringify(myArray));
}

// Funktion zum Abrufen des gespeicherten Notizen-Namen aus dem LocalStorage
function getCurrentNoteName() {
    return myArray[0]
}


window.addEventListener('DOMContentLoaded', () => {
    let body = document.querySelector('body');
    let textField = document.getElementById('noteArea');
    let selectField = document.getElementById('color');

    // Lade die gespeicherte Schriftfarbe
    let currentFontColor = getCurrentFontColor();
    if (currentFontColor) {
        body.style.color = currentFontColor;
        textField.style.color = currentFontColor;
        selectField.style.color = currentFontColor;
    }

    // Lade die gespeicherte Farboption
    let currentColorName = getCurrentColorName();
    if (currentColorName) {
        // Iteriere durch die Optionen und setze den Text basierend auf der gespeicherten Farbe
        Array.from(selectField.options).forEach((option) => {
            if (option.getAttribute('for') === currentColorName) {
                // Setze die ausgewählte Option auf die gespeicherte Farbe
                option.selected = true;
            }
        });
    }

    // Eventlistener für Änderungen in der Farbauswahl
    document.getElementById('color').addEventListener('change', function () {
        // Get the selected option's colorName attribute
        const selectedOptionElement = selectField.options[selectField.selectedIndex];
        let colorName = selectedOptionElement ? selectedOptionElement.getAttribute('for') : '';

        // Get the selected option
        const selectedOption = this.value;

        // Set styles based on the selected color
        body.style.color = selectedOption;
        textField.style.color = selectedOption;
        selectField.style.color = selectedOption;

        // Speichere die Änderungen
        saveCurrentFontColor(selectedOption);
        saveColorName(colorName);
    });
});




function saveColorName(colorName) {
    localStorage.setItem('currentColorName', colorName)
}

function getCurrentColorName() {
    return localStorage.getItem('currentColorName')
}

function saveCurrentFontColor(selectedOption) {
    localStorage.setItem('currentFontColor', selectedOption)
}

function getCurrentFontColor() {
    return localStorage.getItem('currentFontColor')
}


window.addEventListener('DOMContentLoaded', function () {
    // ... (dein vorhandener Code)

    let startY = 0; // Variable, um die Anfangsposition der Berührung zu speichern



    // Event Listener für das Mausrad hinzufügen
    window.addEventListener('wheel', function (event) {
        if (event.deltaY < -7 && window.scrollY === 0) {
            // Wenn das Mausrad nach oben bewegt wird und der Benutzer am oberen Rand ist,
            // Rufe die Funktion auf, um die letzte Bearbeitungszeit zu erhalten und anzuzeigen
            this.setTimeout(displayLastModifiedDate, 105)
            this.setTimeout(removeDate, 5000)
        }
    });


    // Touchstart Eventlistener für Mobilgeräte
    window.addEventListener('touchstart', function (event) {
        // Speichere die Anfangsposition der Berührung
        startY = event.touches[0].clientY;
    });

    // Touchmove Eventlistener für Mobilgeräte
    window.addEventListener('touchmove', function (event) {
        // Überprüfe, ob der Benutzer nach unten zieht und sich bereits ganz oben auf der Seite befindet
        if (window.scrollY === 0 && event.touches[0].clientY > startY) {
            // Rufe die Funktion auf, um die letzte Bearbeitungszeit zu erhalten und anzuzeigen
            this.setTimeout(displayLastModifiedDate, 105)
            this.setTimeout(removeDate, 5000)
        }
    });

    // Funktion zum Anzeigen der letzten Bearbeitungszeit
    function displayLastModifiedDate() {
        let time = document.querySelector('.time');
        // Rufe das letzte Bearbeitungsdatum aus dem LocalStorage ab
        let lastModifiedDate = getEditDate(Date)

        if (lastModifiedDate) {
            // Hier kannst du den Code hinzufügen, um das Datum anzuzeigen, wie du es benötigst
            time.textContent = lastModifiedDate
        }
    }

    function removeDate() {
        let time = document.querySelector('.time');
        time.textContent = ''
    }

});

window.addEventListener('DOMContentLoaded', function () {
    // ... (dein vorhandener Code)

    let previousLengthNote = getLengthNote(); // Hier musst du die aktuelle Länge deines Inhalts speichern
    let previousLengthHead = getLengthHead();

    // Überprüfung der Länge in einem Intervall
    setInterval(function () {
        let currentLengthNote = getLengthNote(); // Hier musst du die aktuelle Länge deines Inhalts erneut abrufen
        let currentLengthHead = getLengthHead();

        if (currentLengthNote !== previousLengthNote || currentLengthHead !== previousLengthHead) {
            console.log('Die Länge des Inhalts hat sich geändert!');
            // Führe hier zusätzliche Aktionen basierend auf der Änderung der Länge durch


            // Aktuelle Zeit anzeigen
            const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            let base = new Date();
            let month = months[base.getMonth()];
            let minute = base.getMinutes().toString().padStart(2, "0");
            const date = 'Bearbeitet: ' + base.getDate() + ". " + month + " " + base.getFullYear() + " um " + base.getHours() + ":" + minute;

            saveDate(date);

            // Aktualisiere previousLength für die nächste Überprüfung
            previousLengthNote = currentLengthNote;
            previousLengthHead = currentLengthHead;
        }
    }, 1000); // Überprüfung alle 1000 Millisekunden (1 Sekunde), passe dies an deine Bedürfnisse an

    // ... (weitere Funktionen und Code)

    // Funktion zum Abrufen der aktuellen Länge deines Inhalts (zum Beispiel für ein Array)
    function getLengthNote() {
        // Passe dies an deine Bedürfnisse an, um die aktuelle Länge zu erhalten
        return document.getElementById('noteArea').textContent.length;
    }
    function getLengthHead() {
        // Passe dies an deine Bedürfnisse an, um die aktuelle Länge zu erhalten
        return document.getElementById('text').textContent.length;
    }
});



