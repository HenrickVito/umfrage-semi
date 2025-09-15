// Mapping für Bewertung
const namenBewertung = {
  1: "sehr leise",
  2: "leise",
  3: "weiß nicht",
  4: "laut",
  5: "sehr laut"
};

// Mapping für Stimmung
const namenStimmung = {
  1: "sehr langsam",
  2: "langsam",
  3: "weiß nicht",
  4: "schnell",
  5: "sehr schnell"
};

// Objekt für alle Antworten
const antworten = {};

// Funktion: Sliderwert anzeigen und speichern
function zeigeWert(sliderId, anzeigeId, mapping) {
  const slider = document.getElementById(sliderId);
  const wert = mapping[slider.value];
  document.getElementById(anzeigeId).textContent = wert;

  const match = sliderId.match(/\d+$/);
  if (!match) return;
  const nummer = match[0];

  if (!antworten["beispiel" + nummer]) {
    antworten["beispiel" + nummer] = {};
  }

  if (sliderId.includes("Bewertung")) {
    antworten["beispiel" + nummer].dynamik = wert;
  } else if (sliderId.includes("Stimmung")) {
    antworten["beispiel" + nummer].tempo = wert;
  }
}

// Funktion: Checkboxen speichern
function speichereCheckboxen(nummer, prefix) {
  const checkboxes = document.querySelectorAll('input[name="' + prefix + nummer + '"]:checked');
  const checked = Array.from(checkboxes).map(input => input.value);

  if (!antworten["beispiel" + nummer]) {
    antworten["beispiel" + nummer] = {};
  }

  if (prefix.startsWith("instrument")) {
    antworten["beispiel" + nummer].instrumente = checked;
  } else if (prefix.startsWith("emotion")) {
    antworten["beispiel" + nummer].emotionen = checked;
  }
}

// Funktion: Offene Frage speichern
function speichereOffeneFrage(nummer) {
  const input = document.getElementById("offeneFrage" + nummer);
  if (!input) return;
  const text = input.value;

  if (!antworten["beispiel" + nummer]) {
    antworten["beispiel" + nummer] = {};
  }

  antworten["beispiel" + nummer].offeneFrage = text;
}

// Event-Listener für alle Hörbeispiele
for (let i = 1; i <= 4; i++) {
  // Instrumente
  const inst = document.querySelectorAll('input[name^="instrument' + i + '"]');
  inst.forEach(input => {
    input.addEventListener("change", function () {
      speichereCheckboxen(i, "instrument");
    });
  });

  // Emotionen
  const emo = document.querySelectorAll('input[name^="emotion' + i + '"]');
  emo.forEach(input => {
    input.addEventListener("change", function () {
      speichereCheckboxen(i, "emotion");
    });
  });

  // Offene Frage
  const offen = document.getElementById("offeneFrage" + i);
  if (offen) {
    offen.addEventListener("input", function () {
      speichereOffeneFrage(i);
    });
  }
}