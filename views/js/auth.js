// js/auth.js

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    }).then(res => res.json())
      .then(data => {
          if (data.message === "Login successful") {
              localStorage.setItem("user", JSON.stringify(data.user));
              window.location.href = "dashboard.html";
          } else {
              alert("Invalid credentials");
          }
      });
});
