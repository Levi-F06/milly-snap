// nabbed this to force page to the top on refresh
window.onbeforeunload = () => window.scrollTo(0, 0);

const section = document.querySelector("#introduction");
const startBtn = document.querySelector("#startBtn");

const scrollElements = document.querySelectorAll(".scroll");

let currentIndex = 0;
let endDelay = true;

let scrollTimer = setInterval(() => (endDelay = true), 1500);

function scrollWindow() {
  if (endDelay) {
    if (currentIndex === scrollElements.length) {
      removeEventListener("wheel", scrollWindow);
      scrollTimer = 0;
      return;
    }
    switch (currentIndex) {
      case 0:
        scrollElements[0].classList.add("hidden");
        break;
      default:
        scrollElements[currentIndex].classList.remove("hidden");
    }
    currentIndex++;
    endDelay = false;
  }
}

startBtn.addEventListener("click", () => {
  for (const elem of section.children) {
    elem.classList.add("hidden");
    document.body.classList.remove("noScroll");
  }
});

addEventListener("wheel", scrollWindow);
