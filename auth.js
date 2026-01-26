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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorEl = document.getElementById("error");

  // Get the current page filename, ignoring query strings or hashes
  const path = window.location.pathname.split("/").pop().split("#")[0].split("?")[0];

  // List of protected course pages
  const coursePages = [
    "midlinecourse.html",
    "midlinecontent2.html",
    "midlinecontent3.html",
    "midlinecontent4.html"
  ];

  // -------------------
  // LOGIN FORM HANDLER
  // -------------------
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      errorEl.textContent = "";

      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful");
        // redirect to first course page
        window.location.replace("midlinecourse.html");
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

  // -------------------
  // PROTECT COURSE PAGES
  // -------------------
  onAuthStateChanged(auth, (user) => {
    // If user is logged in and on login page → redirect to first module
    if (user && path === "midlinelogin.html") {
      console.log("User already logged in. Redirecting to first course page.");
      window.location.replace("midlinecourse.html");
      return;
    }

    // If user is not logged in and on a protected course page → redirect to login
    if (!user && coursePages.includes(path)) {
      console.log("User not logged in. Redirecting to login page.");
      window.location.replace("midlinelogin.html");
      return;
    }

    // If user is logged in and on a course page → do nothing (allow navigation)
  });

  // -------------------
  // LOGOUT BUTTON
  // -------------------
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await signOut(auth);
      console.log("User logged out");
      // Go to login page
      window.location.replace("midlinelogin.html");
    });
  }
});
