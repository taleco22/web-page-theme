// set true for console output, obs: this may cause performance issues
const debug = false;
const log = (...args) => (debug ? console.log(...args) : {});

//  All DOM here
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
const page = document.getElementById("page");
const menu = document.querySelector(".menu");
const chocoImage = document.getElementById("break");

//  Media query disables menu after 700px and replace it with nav
const isMobile = innerWidth < 700;
const isPc = innerWidth >= 700;

let isActive = false;

//0. tldr; this happens
window.onload = () => {
  document.body.setAttribute("data-theme", "light");

  document.getElementById("switchCheckbox1").addEventListener("input", function(event) {
    event.target.checked
      ? document.body.setAttribute("data-theme", "dark")
      : document.body.setAttribute("data-theme", "light");
  });

  if (isMobile) nav.setAttribute("aria-hidden", true);

  menuBtn.addEventListener("click", (e) => onHamburguerClick(e));
  page.addEventListener("click", onPageClick);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
};

function handleResize() {
  if (isPc) {
    nav.classList.remove("active");
    menuBtn.classList.remove("open");
    page.classList.remove("active");
    nav.setAttribute("aria-hidden", false);
  }
}

//1. Basically where code starts

//  Open nav
function onHamburguerClick(e) {
  log("hamburguer clicked");
  e.stopImmediatePropagation();
  animateNav();
}

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
  if (isActive) {
    log("pageClicked");
    animateNav();
  }
}

//  Menu bar hide up or show down on smooth effect (via css)
let lastScroll = 80;
function handleScroll() {
  if (isMobile) changeMenuAnimation(window);
  parallaxChocolateImage(window, chocoImage);
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
}
function hideMenu() {
  log("menu hiding");
  menu.classList.remove("fixed");
}

function parallaxChocolateImage({pageYOffset, innerHeight}, {offsetTop, style}) {
  const position = pageYOffset + innerHeight;
  const imageReachHalfScreen = position >= offsetTop;

  if (imageReachHalfScreen) {
    const speed = (position - offsetTop) * 0.08;
    const from100To15 = 100 - speed;

    from100To15 >= 0
      ? (style.backgroundPositionY = `${from100To15}%`) &
        log({from100To15, position, offsetTop, speed, style})
      : {};
  }
}
