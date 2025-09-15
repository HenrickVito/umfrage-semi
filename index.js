// ========================================
// Mappings für Slider
// ========================================
const namenBewertung = {
  1: "sehr leise",
  2: "leise",
  3: "weiß nicht",
  4: "laut",
  5: "sehr laut"
};

const namenStimmung = {
  1: "sehr langsam",
  2: "langsam",
  3: "weiß nicht",
  4: "schnell",
  5: "sehr schnell"
};

// ========================================
// Objekt für alle Antworten
// ========================================
const antworten = {};

// ========================================
// Funktionen zum Speichern der Antworten
// ========================================
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

function speichereCheckboxen(nummer, prefix) {
  const checkboxes = document.querySelectorAll(`input[name="${prefix}${nummer}"]:checked`);
  const checked = Array.from(checkboxes).map(input => input.value);

  if (!antworten["beispiel" + nummer]) antworten["beispiel" + nummer] = {};

  if (prefix.startsWith("instrument")) {
    antworten["beispiel" + nummer].instrumente = checked;
  } else if (prefix.startsWith("emotion")) {
    antworten["beispiel" + nummer].emotionen = checked;
  }
}

function speichereOffeneFrage(nummer) {
  const input = document.getElementById("offeneFrage" + nummer);
  if (!input) return;
  if (!antworten["beispiel" + nummer]) antworten["beispiel" + nummer] = {};
  antworten["beispiel" + nummer].offeneFrage = input.value;
}

// ========================================
// Event-Listener für Hörbeispiele & Slider
// ========================================
for (let i = 1; i <= 4; i++) {
  // Slider initialisieren & Event-Listener
  const sliderBew = document.getElementById(`sliderBewertung${i}`);
  const sliderStu = document.getElementById(`sliderStimmung${i}`);

  // Initialer Wert
  zeigeWert(`sliderBewertung${i}`, `anzeigeBewertung${i}`, namenBewertung);
  zeigeWert(`sliderStimmung${i}`, `anzeigeStimmung${i}`, namenStimmung);

  // Event-Listener Slider
  sliderBew.addEventListener("input", () => zeigeWert(`sliderBewertung${i}`, `anzeigeBewertung${i}`, namenBewertung));
  sliderStu.addEventListener("input", () => zeigeWert(`sliderStimmung${i}`, `anzeigeStimmung${i}`, namenStimmung));

  // Instrumente
  document.querySelectorAll(`input[name^="instrument${i}"]`).forEach(input => {
    input.addEventListener("change", () => speichereCheckboxen(i, "instrument"));
  });

  // Emotionen
  document.querySelectorAll(`input[name^="emotion${i}"]`).forEach(input => {
    input.addEventListener("change", () => speichereCheckboxen(i, "emotion"));
  });

  // Offene Fragen
  const offen = document.getElementById("offeneFrage" + i);
  if (offen) offen.addEventListener("input", () => speichereOffeneFrage(i));
}

// ========================================
// Musikalisch & Geschlecht
// ========================================
document.querySelectorAll('input[name="musikalisch"]').forEach(radio => {
  radio.addEventListener("change", () => antworten.musikalisch = radio.value);
});
document.querySelectorAll('input[name="geschlecht"]').forEach(radio => {
  radio.addEventListener("change", () => antworten.geschlecht = radio.value);
});

// ========================================
// Absenden-Button
// ========================================
import { absenden } from './firebase.js';
document.getElementById("absendenBtn").addEventListener("click", () => absenden(antworten));
