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
/*****************************************************************************************/
//implementing smooth scrolling to section1
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  // implementing old school way
  // const s1Coord = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1Coord.left + window.scrollX,
  //   top: s1Coord.top + window.scrollY,
  //   behaviour: "smooth",
  // });

  // implementing in modern view
  section1.scrollIntoView({ behavior: "smooth" });
});
//Page Navigation
//1 --> through iterating elements
//can be implented like but have cons - readme file - navigation problems
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const element_id = this.getAttribute("href");
//     console.log(element_id);
//     document.querySelector(element_id).scrollIntoView({ behavior: "smooth" });
//   });
// });
//2 --> event delegation property
// 1) add event listener to the common parent
// 2)determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const element_id = e.target.getAttribute("href");
    console.log(element_id);
    document.querySelector(element_id).scrollIntoView({ behavior: "smooth" });
  }
});
/*****************************************************************************************/
// creating tabbed components in Operations section
//
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabContents = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  //selecting the closest parent to prevent selecting other than button element
  const clicked = e.target.closest(".operations__tab");
  // guard clause to prevent errors when we click on content area
  if (!clicked) return;
  //Removing active classes from tabs and tabcontents
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabContents.forEach((c) => c.classList.remove("operations__content--active"));

  //Activating the tab  when clicked on respective button
  clicked.classList.add("operations__tab--active");
  //Activating the tabcontents when clicked on respective button

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
/*****************************************************************************************/
// faded animation when mouse over a link on navbar

const nav = document.querySelector(".nav");
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/*****************************************************************************************/
// adding a sticky navigation to the page
// const initialcoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   if (this.window.scrollY > initialcoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//using Intersection observer API
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

/*****************************************************************************************/
// Revealing Sections when scroll
const allSections = document.querySelectorAll(".section");
const sectionReveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/*****************************************************************************************/

//creating DOM element -- creating a cookie type messsage
//const header = document.querySelector("header");
const message = document.createElement("div");
message.classList.add("cookie--message");
//adding contents to div
message.innerHTML =
  '<b>We use cookies for improved functionality and analytics </b>         <button class="btn btn--close--cookie">Got it!<button/>';

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

//styling cookie
message.style.backgroundColor = "white";
message.style.width = "110%";
message.style.display = "flex";
message.style.justifyContent = "space-between";
message.style.alignItems = "centre";
message.style.paddingInlineStart = "100px";
message.style.paddingTop = "20px";
