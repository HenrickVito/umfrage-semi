import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAWSOO386rnRhQvloF4EfJ0flI0eqVEjwI",
  authDomain: "umfrage-semi.firebaseapp.com",
  projectId: "umfrage-semi",
  storageBucket: "umfrage-semi.firebasestorage.app",
  messagingSenderId: "299563596886",
  appId: "1:299563596886:web:60ac6713d4b7468cb64ff7",
  measurementId: "G-XLL0128E3D"
};

// Initialisieren
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funktion zum Absenden
// Funktion zum Absenden
export async function absenden(antworten) {
  try {
    await addDoc(collection(db, "umfrageAntworten"), antworten);
    alert("Antworten erfolgreich gespeichert ✅");
    
    // ⏳ nach 2 Sekunden weiterleiten
    setTimeout(() => {
      window.location.href = "danke.html";
    }, 200);

  } catch (e) {
    console.error("Fehler beim Speichern: ", e);
    alert("Fehler beim Speichern ❌");
  }
}
