
// Get page elements
const splash = document.getElementById("splash");
const home = document.getElementById("home");
const login = document.getElementById("login");
const register = document.getElementById("register");

const screens = [splash, login, register];

// Show a selected screen
function showScreen(screenId) {
    screens.forEach((screen) => {
        screen.classList.toggle("hidden", screen.id !== screenId);
    });

    home.classList.add("hidden");
}

// Show the original home page
function showHome() {
    screens.forEach((screen) => {
        screen.classList.add("hidden");
    });

    home.classList.remove("hidden");
}

// Splash Screen: 2 seconds, then Home Page
setTimeout(() => {
    showHome();
}, 2000);

// Home Page Buttons
document.getElementById("homeLogin").addEventListener("click", () => {
    showScreen("login");
});

document.getElementById("homeRegister").addEventListener("click", () => {
    showScreen("register");
});

// Back to Home
document.getElementById("loginBack").addEventListener("click", (event) => {
    event.preventDefault();
    showHome();
});

document.getElementById("registerBack").addEventListener("click", (event) => {
    event.preventDefault();
    showHome();
});

// Switch Between Login and Register
document.getElementById("toRegister").addEventListener("click", (event) => {
    event.preventDefault();
    showScreen("register");
});

document.getElementById("toLogin").addEventListener("click", (event) => {
    event.preventDefault();
    showScreen("login");
});

// Get Registered Users
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Registration
const regForm = document.getElementById("regForm");
const regMsg = document.getElementById("regMsg");

regForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = regForm.elements.name.value.trim();
    const email = regForm.elements.email.value.trim().toLowerCase();
    const password = regForm.elements.password.value;
    const confirm = regForm.elements.confirm.value;

    regMsg.textContent = "";

    if (password.length < 8) {
        regMsg.textContent = "Password must be at least 8 characters.";
        return;
    }

    if (password !== confirm) {
        regMsg.textContent = "Passwords do not match.";
        return;
    }

    const users = getUsers();

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
        regMsg.textContent = "This email is already registered.";
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    regForm.reset();
    alert("Registration successful! You can now log in.");

    showScreen("login");
});

// Login
const logForm = document.getElementById("logForm");
const logMsg = document.getElementById("logMsg");

logForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = logForm.elements.email.value.trim().toLowerCase();
    const password = logForm.elements.password.value;

    const user = getUsers().find((savedUser) => {
        return savedUser.email === email;
    });

    if (user && user.password === password) {
        document.getElementById("userGreeting").textContent =
            `Welcome, ${user.name}!`;

        document.getElementById("guestButtons").classList.add("hidden");
        document.getElementById("userButtons").classList.remove("hidden");

        logForm.reset();
        logMsg.textContent = "";

        showHome();
    } else {
        logMsg.textContent = "Incorrect email or password.";
    }
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
    document.getElementById("userGreeting").textContent = "";

    document.getElementById("userButtons").classList.add("hidden");
    document.getElementById("guestButtons").classList.remove("hidden");

    showHome();
});

// Dark and Light Mode
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
    root.dataset.theme = theme;

    themeToggle.textContent =
        theme === "dark" ? "Light Mode" : "Dark Mode";

    localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");

const systemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;

setTheme(savedTheme || (systemDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
    const currentTheme = root.dataset.theme;

    setTheme(currentTheme === "dark" ? "light" : "dark");
});

// Initial state: show splash screen
showScreen("splash");
