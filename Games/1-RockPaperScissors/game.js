const gameSummary = {
  numbers: 0,
  win: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: "",
  aiHand: "",
};

const hands = [...document.querySelectorAll(".select img")];

//Pierwsza funkcja
function handSelection() {
  game.playerHand = this.dataset.option;
  hands.forEach((hand) => (hand.style.boxShadow = ""));
  this.style.boxShadow = "0 0 0 4px black";
}

//Wybor AI
function aiChoice() {
  const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
  return aiHand;
}

//Ogloszenie wyniku
function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "papier" && ai === "kamień") ||
    (player === "kamień" && ai === "nożyczki") ||
    (player === "nożyczki" && ai === "papier")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

//Publikacja Wynika
function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;

  if (result === "win") {
    document.querySelector("p.wins span").textContent = ++gameSummary.win;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Ty wygrałeś!!!!";
    document.querySelector('[data-summary="who-win"]').style.color = "green";
  } else if (result === "loss") {
    document.querySelector("p.losses span").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "AI wygrało :((";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  } else {
    document.querySelector("p.draws span").textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Remis :\\";
    document.querySelector('[data-summary="who-win"]').style.color = "gray";
  }
}

//Koniec gry
function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    "";
  game.playerHand = "";
}

//Funkcja Sterująca
function startGame() {
  if (!game.playerHand) {
    return alert("Wybierz dłoń!!!");
  }
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  console.log(gameResult);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

hands.forEach((hand) => hand.addEventListener("click", handSelection));

document.querySelector(".start").addEventListener("click", startGame);
