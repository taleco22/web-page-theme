// set true for console output, this may cause performance issues
const debug = true;
const log = (...params) => (debug ? console.log(...params) : {});

//  All DOM here
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
const page = document.getElementById("page");
const menu = document.querySelector(".menu");
const chocoImage = document.getElementById("break");

//  Media query disables menu after 700px and replace it with nav
const isMobile = innerWidth < 700;
const isPc = innerWidth >= 700;

//0. tldr; this happens
window.onload = () => {
  document.body.setAttribute("data-theme", "light");
  document.getElementById("switchCheckbox1").addEventListener("input", function(event) {
    event.target.checked ? document.body.setAttribute("data-theme", "dark") : document.body.setAttribute("data-theme", "light");
  });
  if (isMobile) nav.setAttribute("aria-hidden", true);
  onHamburguerClick();
  onPageClick();
  listenScroll();
};
window.addEventListener("resize", () => {
  if (isPc) {
    menuBtn.classList.remove("open");
    nav.removeAttribute("aria-hidden");
    nav.classList.remove("active");
    page.classList.remove("active");
  } else {
    nav.setAttribute("aria-hidden", true);
  }
});

//1. Basically where code starts

//  Open nav
function onHamburguerClick() {
  menuBtn.addEventListener("click", (e) => {
    log("hamburguer clicked");
    e.stopImmediatePropagation();
    animateNav();
  });
}

let isActive = false;
// Enable or Disable Nav, moving all together
function animateNav() {
  isActive = !isActive;
  menuBtn.classList.toggle("open");

  nav.setAttribute("aria-hidden", !isActive);
  nav.classList.toggle("active");

  page.classList.toggle("active");
  log({menuBtn, nav, page});
}

//  This disables nav too
function onPageClick() {
  page.addEventListener("click", () => {
    log("pageClicked");
    isActive && animateNav();
  });
}

//  Menu bar hide up or show down on smooth effect (via css)
let lastScroll = 80;
function listenScroll() {
  window.addEventListener("scroll", () => {
    if (isMobile) changeMenuAnimation(window);

    parallaxChocolateImage(window, chocoImage);
  });
}

function changeMenuAnimation({pageYOffset}) {
  const currentScroll = pageYOffset;
  const scrollUp = currentScroll < lastScroll;
  if (scrollUp) {
    showMenu();
  } else {
    hideMenu();
  }
  lastScroll = currentScroll;
}
function showMenu() {
  log("menu showing");
  menu.classList.add("fixed");
  menu.classList.remove("disabled");
}
function hideMenu() {
  log("menu hiding");
  menu.classList.remove("fixed");
  menu.classList.add("disabled");
}

function parallaxChocolateImage({pageYOffset}, {offsetTop, style}) {
  const halfScreenSize = innerHeight / 2;
  // Added so parallax inits at half screen, not on top
  const position = pageYOffset + halfScreenSize;
  const imageReachHalfScreen = position >= offsetTop;

  if (imageReachHalfScreen) {
    const speed = (position - offsetTop) * 0.28;
    const from100To15 = 100 - speed;

    from100To15 >= 15 ? (style.backgroundPositionY = `${from100To15}%`) && log({from100To15, position, offsetTop, speed, style}) : {};
  }
}
