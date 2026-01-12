// Smooth scroll for nav & CTA
document.querySelectorAll("[data-scroll]").forEach(function (el) {
  el.addEventListener("click", function () {
    const target = document.querySelector(this.getAttribute("data-scroll"));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// Highlight active nav item on scroll
const sections = ["#home", "#about", "#work", "#contact"].map((id) =>
  document.querySelector(id)
);
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", function () {
  let current = "#home";
  const offset = 120;

  sections.forEach((sec) => {
    if (!sec) return;
    const top = sec.offsetTop - offset;
    if (window.scrollY >= top) current = "#" + sec.id;
  });

  navItems.forEach((item) => {
    if (item.getAttribute("data-scroll") === current) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
});

// Simple contact form validation (front-end only)
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name;
    const email = form.email;
    const message = form.message;

    let valid = true;

    function setError(field, state) {
      const errorEl = form.querySelector(
        '.form-error[data-for="' + field.id + '"]'
      );
      if (!errorEl) return;
      if (state) {
        errorEl.classList.add("visible");
        field.style.borderColor = "#d32f2f";
      } else {
        errorEl.classList.remove("visible");
        field.style.borderColor = "#bdbdbd";
      }
    }

    if (!name.value.trim()) {
      setError(name, true);
      valid = false;
    } else {
      setError(name, false);
    }

    const emailVal = email.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    if (!emailVal || !emailOk) {
      setError(email, true);
      valid = false;
    } else {
      setError(email, false);
    }

    if (!message.value.trim()) {
      setError(message, true);
      valid = false;
    } else {
      setError(message, false);
    }

    if (valid) {
      alert("Thank you! Your message has been captured (demo only).");
      form.reset();
    }
  });
}

