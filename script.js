"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//creating DOM element -- creating a cookie type messsage
const header = document.querySelector("header");
const message = document.createElement("div");
message.classList.add("cookie--message");
//adding contents to div
message.innerHTML =
  'We use cookies for improved functionality and analytics<button class="btn btn--close--cookie">Got it!<button/>';

//inserting the element in the DOM Tree
//header.append(message);
header.prepend(message);
//header.before(message);
//header.after(message);

//deleting a DOM Element
document
  .querySelector(".btn--close--cookie")
  .addEventListener("click", function () {
    message.remove();
    //message.parentElement.removeChild(message);
  });
