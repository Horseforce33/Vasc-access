```javascript
emailjs.init({
  publicKey: "d77Wfobv8PH4KJRjt"
});

/* Hover animation */

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-12px)";
    card.style.boxShadow = "0 18px 35px rgba(0,0,0,0.18)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
  });
});

/* Form submission */

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    role: document.getElementById("role").value
  })

  .then(() => {
    document.getElementById("status").innerText =
      "Successfully registered.";
    this.reset();
  })

  .catch(() => {
    document.getElementById("status").innerText =
      "Something went wrong.";
  });
});
```

