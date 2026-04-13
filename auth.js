import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

/* =========================
   FIREBASE INIT
========================= */
const firebaseConfig = {
  apiKey: "AIzaSyD3lH7zj63m7GUqzNWtWVnS6RwKuOXXX08",
  authDomain: "vascularaccessalpha.firebaseapp.com",
  projectId: "vascularaccessalpha",
  storageBucket: "vascularaccessalpha.firebasestorage.app",
  messagingSenderId: "585810430356",
  appId: "1:585810430356:web:bd71e83a6ba6ba0cef2781"
};

let db;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (err) {
  console.error("Firebase init failed:", err);
}

/* =========================
   EMAILJS INIT (optional)
========================= */
if (typeof emailjs !== "undefined") {
  emailjs.init("d77Wfobv8PH4KJRjt");
}

/* =========================
   FORM HANDLER
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".contact-form");

  if (!form) {
    console.warn("Form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value?.trim() || "";
    const email = document.getElementById("email")?.value?.trim() || "";
    const role = document.getElementById("role")?.value?.trim() || "";

    if (!name || !email) {
      alert("Please fill in required fields");
      return;
    }

    try {
      /* FIRESTORE WRITE */
      if (db) {
        await addDoc(collection(db, "waiting_list"), {
          name,
          email,
          role: role || null,
          timestamp: serverTimestamp()
        });
      }

      /* EMAILJS (non-blocking) */
      if (typeof emailjs !== "undefined") {
       emailjs.send("service_9jqoaqp", "template_flt577v", {
        name: name,
        email: email,
        role: role || "Not provided"
        })
        .then(res => {
        console.log("EmailJS SUCCESS:", res);
        })
        .catch(err => {
        console.error("EmailJS FAILED:", err);
        });
      }

      alert("Registered successfully");
      form.reset();

    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting form");
    }
  });

});
