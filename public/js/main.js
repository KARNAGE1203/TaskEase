document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded!"); // Debugging: Check if script is running

    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");
    const signupBtn = document.getElementById("signupBtn"); 

    if (signupBtn) {
        console.log("Sign-Up Button Found!");
        signupBtn.addEventListener("click", () => {
            console.log("Sign-Up Button Clicked!");
            window.location.href = "signup.html";
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const res = await fetch("/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            alert(data.message);

            if (res.ok) {
                window.location.href = "index.html";  // Redirect to login page after signup
            }
        });
    }
});

    if (signinForm) {
        signinForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("signinEmail").value;
            const password = document.getElementById("signinPassword").value;

            const res = await fetch("/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            alert(data.message);
            if (res.ok) {
                window.location.href = "/dashboard.html";
            }
        });
    }
