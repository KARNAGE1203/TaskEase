document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");
    const signupBtn = document.getElementById("signupBtn"); 

    // Redirect to sign-up page when Sign Up button is clicked
    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            window.location.href = "../views/signup.html";
        });
    }

    // Handle Sign Up Form Submission
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
        });
    }

    // Handle Sign In Form Submission
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
                window.location.href = "../views/dashboard.html";
            }
        });
    }
});
