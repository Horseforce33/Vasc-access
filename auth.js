// auth.js - Firebase modular SDK v12.8.0
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD3lH7zj63m7GUqzNWtWVnS6RwKuOXXX08",
  authDomain: "vascularaccessalpha.firebaseapp.com",
  projectId: "vascularaccessalpha",
  storageBucket: "vascularaccessalpha.firebasestorage.app",
  messagingSenderId: "585810430356",
  appId: "1:585810430356:web:bd71e83a6ba6ba0cef2781"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const errorEl = document.getElementById("error");
  const path = window.location.pathname.split("/").pop().split("#")[0].split("?")[0]; // current file
  const coursePages = [
    "midlinecourse.html",
    "midlinecontent2.html",
    "midlinecontent3.html",
    "midlinecontent4.html"
  ];
  const isCoursePage = coursePages.includes(path);
  const isLoginPage = path === "midlinelogin.html";

  // --- LOGIN FORM ---
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      errorEl.textContent = "";
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful");
        window.location.href = "midlinecourse.html"; // first module
      } catch (err) {
        console.error("Login error:", err.code, err.message);
        switch (err.code) {
          case "auth/wrong-password":
            errorEl.textContent = "Incorrect password. Please try again.";
            break;
          case "auth/user-not-found":
            errorEl.textContent = "No account found with that email.";
            break;
          case "auth/invalid-email":
            errorEl.textContent = "Please enter a valid email address.";
            break;
          default:
            errorEl.textContent = "Login failed. Please check your credentials.";
        }
      }
    });
  }

  // --- PROTECT COURSE PAGES ---
  onAuthStateChanged(auth, (user) => {
    if (!user && isCoursePage) {
      // Only redirect if not logged in and on protected page
      console.log("User not logged in. Redirecting to login page.");
      window.location.href = "midlinelogin.html";
    }

    if (user && isLoginPage) {
      // Already logged in and on login page → redirect to first course page
      console.log("User already logged in. Redirecting to first course page.");
      window.location.href = "midlinecourse.html";
    }
  });

  // --- LOGOUT BUTTON ---
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        console.log("User logged out");
        window.location.href = "midlinelogin.html";
      } catch (err) {
        console.error("Logout error:", err);
      }
    });
  }

  // --- Smooth scroll for anchor links only ---
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

});
