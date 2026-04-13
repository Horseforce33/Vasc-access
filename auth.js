import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* =========================
   EMAILJS INIT (optional)
========================= */
if (window.emailjs) {
  emailjs.init("d77Wfobv8PH4KJRjt");
}

/* =========================
   FORM HANDLER
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".contact-form");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value.trim();

    try {
      /* FIRESTORE WRITE */
      await addDoc(collection(db, "waiting_list"), {
        name,
        email,
        role: role || null,
        timestamp: serverTimestamp()
      });

      /* EMAILJS SEND (non-blocking) */
      if (window.emailjs) {
        emailjs.send("service_9jqoaqp", "template_flt577v", {
          from_name: name,
          from_email: email,
          role: role || "Not provided",
          reply_to: email
        }).catch(err => {
          console.warn("EmailJS failed:", err);
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
