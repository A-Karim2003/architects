"use strict";

const menuItemsATag = document.querySelectorAll(".menu-item a");
const sidebar = document.querySelector(".sidebar");
const hamburgerMenu = document.querySelector(".menu-icon");
const tooltip = document.querySelector(".tooltip");
const tiltCards = document.querySelectorAll(".tilt-card");

/*
For each link, swap its text content by looping through its text content and wrap each character with a span and append it again to the link element
*/
menuItemsATag.forEach((link) => {
  const text = link.textContent.trim();
  link.textContent = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.transitionDelay = `${i * 50}ms`;
    link.append(span);
  });
});

// * Event listener for the sidebar

hamburgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    hamburgerMenu.classList.add("active");
    hamburgerMenu.classList.remove("fa-bars");
    hamburgerMenu.classList.add("fa-x");
  } else {
    hamburgerMenu.classList.remove("active");
    hamburgerMenu.classList.remove("fa-x");
    hamburgerMenu.classList.add("fa-bars");
  }
});

// event listener for tooltip

hamburgerMenu.addEventListener("mouseover", (e) => {
  const menu = e.target;
  if (!menu.classList.contains("fa-x")) return;
  tooltip.classList.add("active");
});

hamburgerMenu.addEventListener("mouseleave", (e) => {
  const menu = e.target;
  tooltip.classList.remove("active");
});

//? Add card tilt feature

tiltCards.forEach((card) => {
  VanillaTilt.init(card, {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
    perspective: 1000,
  });
});
