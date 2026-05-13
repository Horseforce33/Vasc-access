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
.card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}

.card h3 {
  text-align: center;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 18px 35px rgba(0,0,0,0.18);
  background: #f9f9f9;
}

.banner {
  height: 420px;
  width: 100%;
  background-image: url("midlinefoto4.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
