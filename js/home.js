function login() {

    const username =    document.getElementById("username").value.trim();

    const email =  document.getElementById("email").value.trim();

    const contact =  document.getElementById("contact").value.trim();

    const password = document.getElementById("password").value.trim();

    const message =    document.getElementById("login-message");

    if ( username === "" ||      email === "" ||contact === "" ||   password === ""
    ) {

        message.style.color = "red";
        message.textContent =     "Please fill in all fields.";

        return;
    }

    const correctUsername = "admin";
    const correctPassword = "1234";

    if (  username === correctUsername &&     password === correctPassword ) {

        localStorage.setItem("loggedIn", "true");

        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("contact", contact);

        message.style.color = "green";
        message.textContent = "Login successful!";

        setTimeout(() => {
            window.location.href = "quiz.html";
        }, 1000);

    } else {

        message.style.color = "red";
        message.textContent =   "Incorrect username or password.";
    }
}

function logout() {

    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("username", "");
    localStorage.setItem("email", "");
    localStorage.setItem("contact", "");

    alert("Logging out.");

    window.location.href = "index.html";
}