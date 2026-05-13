// simple form handler (no EmailJS)

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;

  console.log("New registration:", { name, email, role });

  document.getElementById("status").textContent =
    "Thanks — your interest has been recorded.";

  this.reset();
});
