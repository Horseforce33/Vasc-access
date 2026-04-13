import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3lH7zj63m7GUqzNWtWVnS6RwKuOXXX08",
  authDomain: "vascularaccessalpha.firebaseapp.com",
  projectId: "vascularaccessalpha",
  storageBucket: "vascularaccessalpha.firebasestorage.app",
  messagingSenderId: "585810430356",
  appId: "1:585810430356:web:bd71e83a6ba6ba0cef2781"
};

// ✅ MUST initialize app first
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".contact-form");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value.trim();

    try {
      await addDoc(collection(db, "waiting_list"), {
        name,
        email,
        role: role || null,
        timestamp: serverTimestamp()
      });

      alert("Registered successfully");
      form.reset();

    } catch (err) {
      console.error("Firestore error:", err);
      alert("Error submitting form");
    }
  });

});
