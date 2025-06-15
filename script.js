"use strict";

const menuItemsATag = document.querySelectorAll(".menu-item a");

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
