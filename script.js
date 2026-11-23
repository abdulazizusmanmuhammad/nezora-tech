document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");

if (header && menuToggle && navigation) {
  const closeMenu = () => {
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    header.classList.toggle("menu-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const quickContact = document.createElement("nav");
quickContact.className = "floating-contact";
quickContact.setAttribute("aria-label", "Quick contact");

const whatsappLink = document.createElement("a");
whatsappLink.className = "floating-contact-link floating-contact-whatsapp";
whatsappLink.href = "https://wa.me/2347077909619";
whatsappLink.target = "_blank";
whatsappLink.rel = "noopener noreferrer";
whatsappLink.textContent = "WhatsApp";

const emailLink = document.createElement("a");
emailLink.className = "floating-contact-link floating-contact-email";
emailLink.href = "mailto:abdulazizusmanmuhammad5@gmail.com";
emailLink.textContent = "Email";

quickContact.append(whatsappLink, emailLink);
document.body.append(quickContact);

const receiptForm = document.querySelector("#receipt-form");
if (receiptForm) {
  receiptForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const receiptInput = receiptForm.querySelector("#payment-receipt");
    const status = receiptForm.querySelector("#receipt-status");
    const receipt = receiptInput.files[0];

    if (!receipt) {
      status.textContent = "Please select your payment receipt first.";
      return;
    }

    if (receipt.size > 10 * 1024 * 1024) {
      status.textContent = "Please choose a receipt smaller than 10 MB.";
      return;
    }

    status.textContent = "Opening WhatsApp. Please attach the selected receipt in the chat.";
    const message = `Hello Nexora Tech, I have made a payment. My receipt file is: ${receipt.name}`;
    window.open(`https://wa.me/2347077909619?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
