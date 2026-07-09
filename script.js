// Dark / Light Mode Toggle
const themeButton = document.createElement("button");
themeButton.textContent = "Toggle Theme";
themeButton.id = "theme-toggle";

document.querySelector("header").appendChild(themeButton);

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Back to Top Button
const topButton = document.createElement("button");
topButton.textContent = "Back to Top";
topButton.id = "top-button";

document.body.appendChild(topButton);

topButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
});

// Project click interaction
const projects = document.querySelectorAll("#projects article");

for (let i = 0; i < projects.length; i++) {
    projects[i].addEventListener("click", function () {
        this.classList.toggle("selected-project");
    });
}
// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", function () {
    nav.classList.toggle("show");
});                         

window.filterProjects = function(category) {
    const projects = document.querySelectorAll(".project-card");

    for (let i = 0; i < projects.length; i++) {
        const projectCategory = projects[i].getAttribute("data-category");

        if (category === "all" || projectCategory === category) {
            projects[i].style.display = "block";
        } else {
            projects[i].style.display = "none";
        }
    }
}

// Lightbox for project images
const projectImages = document.querySelectorAll("#projects img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("close-lightbox");

for (let i = 0; i < projectImages.length; i++) {
    projectImages[i].addEventListener("click", function () {
        lightbox.style.display = "flex";
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
    });
}

closeLightbox.addEventListener("click", function () {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Contact form validation with real-time feedback
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formMessage = document.getElementById("form-message");

function showError(input, message) {
    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("error-message")) {
        error = document.createElement("p");
        error.classList.add("error-message");
        input.insertAdjacentElement("afterend", error);
    }

    error.textContent = message;
}

function clearError(input) {
    const error = input.nextElementSibling;

    if (error && error.classList.contains("error-message")) {
        error.textContent = "";
    }
}

function validateName() {
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required.");
        return false;
    }

    clearError(nameInput);
    return true;
}

function validateEmail() {
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required.");
        return false;
    }

    if (!emailInput.value.includes("@")) {
        showError(emailInput, "Please enter a valid email address.");
        return false;
    }

    clearError(emailInput);
    return true;
}

function validateMessage() {
    if (messageInput.value.trim() === "") {
        showError(messageInput, "Message is required.");
        return false;
    }

    clearError(messageInput);
    return true;
}

// Real-time validation
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
        console.log("Name:", nameInput.value);
        console.log("Email:", emailInput.value);
        console.log("Message:", messageInput.value);

        formMessage.textContent = "Thank you, " + nameInput.value + ". Your message has been received.";
        formMessage.className = "valid-message";

        contactForm.reset();
    } else {
        console.log("Form validation failed.");
        formMessage.textContent = "Please fix the errors above before submitting.";
        formMessage.className = "error-message";
    }
});