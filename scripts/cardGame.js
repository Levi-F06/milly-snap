const mainDisplay = document.querySelector(".noDisplay");
const activeCardImage = document.querySelector("#activeCardImage");
const lastPlayedImage = document.querySelector("#lastPlayedImage");
const levisHandImage = document.querySelector("#levisHand");
const millysHandImage = document.querySelector("#millysHand");
const leviTitle = document.querySelector("#leviTitle");
const millyTitle = document.querySelector("#millyTitle");
const millyStatus = document.querySelector("#millyStatus");
const leviStatus = document.querySelector("#leviStatus");
const playAgainBtn = document.querySelector("#playAgain");
const askQuestBtn = document.querySelector("#askQuestion");
const buttonContainer = document.querySelector(".buttons");
const showControlsBtn = document.querySelector("#showControls");
const gameControls = document.querySelector("#gameControls");
const container = document.querySelector("main");

const UP_ARROW = "↑";

let leviScore = 0;
let millyScore = 0;
let activeCard;
let lastPlayed;
let millysCards;
let levisCards;

container.backgroundColor = "white";

showControlsBtn.addEventListener("click", () => {
  gameControls.classList.toggle("noDisplay");
  showControlsBtn.textContent =
    showControlsBtn.textContent === "Show Controls"
      ? "Hide Controls"
      : "Show Controls";
  container.classList.toggle("getBig");
});

startBtn.addEventListener("click", () => setTimeout(displayInit, 2000));
askQuestBtn.addEventListener("click", () => alert("IN DEVELOPMENT"));
playAgainBtn.addEventListener("click", () => {
  for (const card of document.querySelectorAll(".card")) {
    card.src = "./images/mystery.png";
    card.classList.remove("hidden");
  }

  activeCard = undefined;
  lastPlayed = undefined;
  buttonContainer.classList.add("noDisplay");
  leviStatus.textContent = "Press Z";
  millyStatus.textContent = "Press M";
  addEventListener("keyup", getReady);
});

function displayInit() {
  mainDisplay.classList.remove("noDisplay");
  section.remove();
  addEventListener("keyup", getReady);
}

function getReady(e) {
  const key = e.key.toLowerCase();
  switch (key) {
    case "z":
      leviStatus.textContent = "READY!";
      break;
    case "m":
      millyStatus.textContent = "READY!";
      break;
    default:
      return;
  }
  if (
    millyStatus.textContent === "READY!" &&
    leviStatus.textContent === "READY!"
  ) {
    removeEventListener("keyup", getReady);
    leviStatus.textContent = "GO!";
    millyStatus.textContent = "GO!";
    setTimeout(1000);
    if (Math.floor(Math.random() * 2)) {
      leviStatus.textContent = UP_ARROW;
    } else {
      millyStatus.textContent = UP_ARROW;
    }
    gameInit();
  }
}

function getDeck() {
  const suits = [
    "x-ray",
    "cartoon",
    "love",
    "double",
    "tunnel",
    "90",
    "standard",
    "alien",
  ];
  const superSuits = ["chipmunk", "yellow"];
  const cards = [];
  for (let i = 1; i <= 16; i++) {
    const cardObj = {
      image: `./images/cards/${i.toString().padStart(2, 0)}.jpg`,
      suit: suits[Math.floor((i - 1) / 2)],
    };
    // creates two seperate instances of the same card
    cards.push(cardObj);
    cards.push({ ...cardObj });
  }
  for (let i = 17; i <= 24; i++) {
    const cardObj = {
      image: `./images/cards/${i.toString()}.jpg`,
      suit: superSuits[Math.floor((i - 17) / 4)],
    };
    cards.push(cardObj);
  }
  return cards;
}

function gameInit() {
  millysCards = getDeck();
  levisCards = getDeck();
  addEventListener("keyup", playCard);
}

function playCard(e) {
  const key = e.key.toLowerCase();
  // placing card
  if (key === "z" || key === "m") {
    // get new cards
    if (key === "z" && leviStatus.textContent === UP_ARROW) {
      if (levisCards.length === 1) {
        levisHandImage.classList.add("hidden");
      }
      if (!levisCards.length) {
        return noCards();
      }
      const cardIndex = Math.floor(Math.random() * levisCards.length);
      lastPlayed = activeCard;
      activeCard = levisCards[cardIndex];
      levisCards.splice(cardIndex, 1);
      leviStatus.textContent = "";
      millyStatus.textContent = UP_ARROW;
    } else if (key === "m" && millyStatus.textContent === UP_ARROW) {
      if (millysCards.length === 1) {
        millysHandImage.classList.add("hidden");
      }
      if (!millysCards.length) {
        return noCards();
      }
      const cardIndex = Math.floor(Math.random() * millysCards.length);
      lastPlayed = activeCard;
      activeCard = millysCards[cardIndex];
      millysCards.splice(cardIndex, 1);
      millyStatus.textContent = "";
      leviStatus.textContent = UP_ARROW;
    } else {
      return;
    }
    // update cards
    activeCardImage.src = activeCard.image;
    if (lastPlayed) {
      lastPlayedImage.src = lastPlayed.image;
    }
  }
  // calling snap
  else if (key === "x" || key === "n") {
    // calling snap shit
    if (lastPlayed && activeCard.suit === lastPlayed.suit) {
      removeEventListener("keyup", playCard);
      if (key === "x") {
        leviScore++;
        millyStatus.textContent = "";
        leviStatus.textContent = "SNAP! Levi wins!";
      } else {
        millyScore++;
        leviStatus.textContent = "";
        millyStatus.textContent = "SNAP! Milly wins!";
      }
    } else {
      if (key === "x") {
        millyScore++;
        millyStatus.textContent = "";
        leviStatus.textContent = "NO SNAP! Milly wins!";
      } else {
        leviScore++;
        leviStatus.textContent = "";
        millyStatus.textContent = "NO SNAP! Levi wins";
      }
    }
    millyTitle.textContent = `Milly - ${millyScore}`;
    leviTitle.textContent = `Levi - ${leviScore}`;
    buttonContainer.classList.remove("noDisplay");
  } else {
    return;
  }
}

function noCards() {
  removeEventListener("keyup", playCard);
  leviStatus.textContent = "OUT OF CARDS";
  millyStatus.textContent = "OUT OF CARDS";
  buttonContainer.classList.remove("noDisplay");
  askQuestBtn.classList.add("noDisplay");
}
