let deckOne = [];
let deckTwo = [];
let combinedPile = [];

function createDeck() {
  const arr = [];
  for (let i = 1; i <= 52; i++) {
    arr.push(`Card ${i}`);
  }
  return arr;
}

function startGame() {
  deckOne = createDeck();
  deckTwo = createDeck();
  let inputTimer = setInterval(checkInput, 50);
  let moveTimer = setInterval(addCard, 1000);
}

function addCard() {
  // add card to display and main array
}

function checkWin() {
  // return true / false
}

function checkInput() {
  // check who wins / loses
}

// let gameTimer = setInterval(addCard, 1000);

const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", () => startBtn.classList.add("hidden"));
