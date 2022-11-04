import {
  gameStarted,
  displayScore,
  updateLevel,
  setupCardTemplate,
  defaultBoard,
  generateCustomBoard
} from "./index.js";
import { updateLeaderboard } from "./storageSaver.js";

let custom = document.querySelector("#custom");
let level1 = document.querySelector("#level1");
let level2 = document.querySelector("#level2");
let level3 = document.querySelector("#level3");
let randomBoard = document.querySelector("#random");
let closeWin = document.querySelector("#closewin");

let winContainer = document.querySelector(".win-container");

let startBtn = document.querySelector(".start");
let resetBtn = document.querySelector(".reset");

let leaderboardLevel = document.querySelector("#leaderboardlevel");

let levelArr = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null],
  [null, 1, 2, 3, 6, 7, 8, 4, 5, 9, 10, 11, 13, 14, 15, 12],
  [5, 1, 2, 4, 6, 10, 3, 7, 9, null, 12, 8, 13, 14, 11, 15],
  [1, 3, 4, 8, 5, 11, 2, 6, 9, 14, 10, 12, 13, 7, 15, null]
];

let timeoutIDs = [];
let animationTime = 10;

let randomButtonClicked = false;

let levelTemplate = levelArr[0];

custom.classList.add("is-clicked");

closeWin.addEventListener("click", () => {
  winContainer.classList.toggle("is-toggled");
});

if (gameStarted) {
  startBtn.classList.toggle("is-clicked");
}

startBtn.addEventListener("click", () => {
  displayScore(0);
  startBtn.classList.toggle("is-clicked");
  gameStarted(true);

  let user = sessionStorage.getItem("mainuser");

  if (
    sessionStorage.getItem(`${user}-${levelArr.indexOf(levelTemplate)}`) ===
    null
  ) {
    sessionStorage.setItem(`${user}-${levelArr.indexOf(levelTemplate)}`, -1);
  }
});

resetBtn.addEventListener("click", () => {
  gameStarted(false);

  resetBtn.classList.toggle("is-clicked");

  window.setTimeout(() => {
    resetBtn.classList.toggle("is-clicked");
  }, 200);
});

resetBtn.addEventListener("click", () => {
  setupCardTemplate(levelTemplate);
  displayScore(0);
});

custom.addEventListener("click", () => {
  toggleAllOff();

  window.setTimeout(() => {
    defaultBoard();
  }, animationTime);

  custom.classList.toggle("is-clicked");
  levelTemplate = levelArr[0];
  leaderboardLevel.innerHTML = " Customized ";
  updateLevel("custom");
  updateLeaderboard("custom");
  console.log("changing to custom leader");
});

level1.addEventListener("click", () => {
  toggleAllOff();
  window.setTimeout(() => {
    setupCardTemplate(levelArr[1]);
  }, animationTime);
  level1.classList.toggle("is-clicked");
  levelTemplate = levelArr[1];
  leaderboardLevel.innerHTML = levelArr.indexOf(levelTemplate);
  updateLevel("1");
  updateLeaderboard("1");
  console.log("changing to 1 leader");
});

level2.addEventListener("click", () => {
  toggleAllOff();

  window.setTimeout(() => {
    setupCardTemplate(levelArr[2]);
  }, animationTime);

  level2.classList.toggle("is-clicked");
  levelTemplate = levelArr[2];
  leaderboardLevel.innerHTML = levelArr.indexOf(levelTemplate);
  updateLevel("2");
  updateLeaderboard("2");
});

level3.addEventListener("click", () => {
  toggleAllOff();

  window.setTimeout(() => {
    setupCardTemplate(levelArr[3]);
  }, animationTime);

  level3.classList.toggle("is-clicked");
  levelTemplate = levelArr[3];
  leaderboardLevel.innerHTML = levelArr.indexOf(levelTemplate);
  updateLevel("3");
  updateLeaderboard("3");
});

randomBoard.addEventListener("click", () => {
  if (randomButtonClicked) {
    return;
  } else {
    defaultBoard();
    toggleAllOff();
  }

  randomButtonClicked = true;

  randomBoard.classList.toggle("is-clicked");
  leaderboardLevel.innerHTML = " Randomized ";
  updateLevel("random");
  updateLeaderboard("random");

  let numOfIterations = 1000;
  for (let i = 0; i < numOfIterations; i++) {
    timeoutIDs.push(
      window.setTimeout(() => {
        generateCustomBoard(animationTime);
      }, (animationTime + 5) * i)
    );

    timeoutIDs.push(
      window.setTimeout(() => {
        randomButtonClicked = false;
      }, numOfIterations * animationTime + 5)
    );
  }
});

function toggleAllOff() {
  for (let timeoutID of timeoutIDs) {
    window.clearTimeout(timeoutID);
    randomButtonClicked = false;
  }

  timeoutIDs = [];

  displayScore(0);
  startBtn.classList.remove("is-clicked");
  gameStarted(false);

  custom.classList.remove("is-clicked");
  level1.classList.remove("is-clicked");
  level2.classList.remove("is-clicked");
  level3.classList.remove("is-clicked");
  randomBoard.classList.remove("is-clicked");
}
