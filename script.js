const WHATSAPP_NUMBER = "27712040926";

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

// Service-specific WhatsApp messages
document.querySelectorAll(".whatsapp-service").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    const service = button.dataset.service || "General Security Enquiry";
    openWhatsApp(`Hello Nsika Protection Services (NPS Tactical Unit), I would like to enquire about ${service}. Please share more information and availability. Thank you.`);
  });
});

// Enquiry form: prepares a personalised WhatsApp message
const enquiryForm = document.getElementById("enquiry-form");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const service = document.getElementById("service").value;
    const details = document.getElementById("details").value.trim();
    if (!name || !service) return;
    const message = `Hello Nsika Protection Services (NPS Tactical Unit), my name is ${name}. I would like to enquire about: ${service}.${details ? `\n\nAdditional details: ${details}` : ""}\n\nPlease contact me to discuss availability and a quotation. Thank you.`;
    openWhatsApp(message);
  });
}

// Scroll reveal animation
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
