import { winEvent } from "./events.js"; // import var from other file with ES6
import {
  editJSON,
  updateLeaderboard,
  storeSessionStorage,
  writeDataToFile
} from "./storageSaver.js";

import { randomButtonClicked } from "./buttonListeners.js";
// import { leaderboard } from "./winScript.js"; // import leaderboard here

export let currentLevel = "custom"; // custom level is "custom", level 1 is 1 ...
let moves = 0;
let isGameStarted = false;
let moveNum = document.getElementById("moveNum");
let slots = document.querySelectorAll(".slot");
let cards = document.querySelectorAll(".card");
let container = document.querySelector(".win-container");

let startBtn = document.querySelector(".start");

let isAnimating = false;

updateLeaderboard("custom"); // set up leaderboard before player is able to play

cards.forEach((card) => {
  card.addEventListener("click", (obj) => {
    console.log("listener 1");
    if (!randomButtonClicked) {
      let clickedCard = obj.target;
      organizeMove(clickedCard, 300);
    }
  });
});

updateLeaderboard("custom"); // set up leaderboard before player is able to play
export function updateLevel(level) {
  currentLevel = level;
}
export function gameStarted(value) {
  isGameStarted = value;
  if (!value) {
    moves = 0;
  }
}

export function displayScore(value) {
  if (value === 0) {
    moveNum.innerHTML = 0;
  } else {
    moveNum.innerHTML = moves;
  }
}

export function setupCardTemplate(array) {
  if (array.length !== 16) {
    console.error(
      "setupCardTemplate function needs to have an array of size 16!"
    );

    return;
  }

  slots.forEach((slot) => {
    slot.innerHTML = "";
  });

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== null) {
      let tempCard = document.createElement("div");
      tempCard.setAttribute("id", i + 1);
      tempCard.setAttribute("class", "card");
      tempCard.innerHTML = array[i];
      let tempSlot = slots.item(i);
      tempSlot.replaceChildren(tempCard);
    } else {
      slots[i].innerHTML = "";
    }
  }

  cards = document.getElementsByClassName("card");
  for (let j = 0; j < cards.length; j++) {
    cards[j].addEventListener("click", (obj) => {
      console.log("listener 1");
      let clickedCard = obj.target;
      organizeMove(clickedCard, 300);

      console.log(currentLevel);

      if (currentLevel !== "custom" && !isGameStarted) {
        console.log(currentLevel);
        startBtn.dispatchEvent(new Event("click"));
      }
    });
  }

  updateCardsArray();
}

function addMove() {
  if (isGameStarted || (currentLevel !== "custom" && currentLevel !== "random"))
    moves++;
  displayScore();
}

const findEmptySpace = () => {
  const grabIdList = function (arr) {
    let idList = [];
    arr.forEach((element) => {
      idList.push(parseInt(element.id, 10));
    });
    return idList.sort((a, b) => a - b);
  };

  let cardIdList = grabIdList(cards);
  let slotIdList = grabIdList(slots);
  for (let i = 0; i < slotIdList.length; i++) {
    if (cardIdList[i] !== slotIdList[i]) {
      return slotIdList[i];
    }
  }
};

function findSurroundingBoxes(emptySpace) {
  let checkLeftSpace,
    checkRightSpace,
    checkUpSpace,
    checkDownSpace = false;

  if (emptySpace % 4 === 0) {
    checkLeftSpace = true;
    if (emptySpace - 4 >= 4) {
      checkUpSpace = true;
    }
    if (emptySpace + 4 <= 16) {
      checkDownSpace = true;
    }
  } else if (emptySpace % 4 === 1) {
    checkRightSpace = true;
    if (emptySpace - 4 >= 1) {
      checkUpSpace = true;
    }
    if (emptySpace + 4 <= 13) {
      checkDownSpace = true;
    }
  } else {
    if (emptySpace < 4) {
      checkLeftSpace = true;
      checkRightSpace = true;
      checkDownSpace = true;
    } else if (emptySpace > 12) {
      checkLeftSpace = true;
      checkRightSpace = true;
      checkUpSpace = true;
    } else {
      return [true, true, true, true];
    }
  } //yo ~ 7:00 is reset supposed to set moves equal to 0?
  return [checkUpSpace, checkRightSpace, checkDownSpace, checkLeftSpace];
}

function animateSlide(isVertical, pixelChange, animationTime) {
  let constantAnimation = {
    fill: "forwards",
    duration: animationTime,
    iterations: 1
  };
  if (isVertical) {
    return [
      [
        { transform: "translateY(0px)" },
        { transform: `translateY(${pixelChange}px)` }
      ],
      constantAnimation
    ];
  } else {
    return [
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(${pixelChange}px)` }
      ],
      constantAnimation
    ];
  }
}

export function generateCustomBoard(animationTime) {
  let moveableCards = getMoveableCards();
  let randomElement = Math.floor(Math.random() * moveableCards.length);

  organizeMove(moveableCards[randomElement], animationTime);
}

function moveCard(
  card,
  startingSlotID,
  endpointSlotID,
  direction,
  animationTime
) {
  if (isAnimating) return;

  let cardLabel = card.innerHTML;
  let tempCard = document.createElement("div"); // create new card
  tempCard.setAttribute("class", "card");
  tempCard.setAttribute("id", endpointSlotID);

  tempCard.addEventListener("click", (obj) => {
    console.log("listener 3");

    let clickedCard = obj.target;
    organizeMove(clickedCard, 300);
  });

  isAnimating = true;
  let slotAnimationTime = animationTime;
  let animation; // create animation variable to hold animation properties
  switch (direction) {
    case "up":
      animation = animateSlide(true, -125, slotAnimationTime);
      card.animate(animation[0], animation[1]);
      break;

    case "down":
      animation = animateSlide(true, 125, slotAnimationTime);
      card.animate(animation[0], animation[1]);
      break;

    case "left":
      animation = animateSlide(false, -125, slotAnimationTime);
      card.animate(animation[0], animation[1]);
      break;

    case "right":
      animation = animateSlide(false, 125, slotAnimationTime);
      card.animate(animation[0], animation[1]);
      break;

    default:
      console.error(
        "Direction parameter doesnt have a valid argument in moveCard() function."
      );
      break;
  }

  function ifWin() {
    let space = findEmptySpace();
    for (let i = 0; i < slots.length - 1; i++) {
      if (space <= 15) {
        return false;
      } else {
        if (cards[i].innerHTML != i + 1) {
          return false;
        }
      }
    }

    return true;
  }
  window.setTimeout(() => {
    tempCard.innerHTML = cardLabel;
    slots[endpointSlotID - 1].replaceChildren(tempCard); // add new block
    slots[startingSlotID - 1].innerHTML = ""; // clear initial block

    slots = document.querySelectorAll(".slot");
    cards = document.querySelectorAll(".card"); // important to update
    addMove();

    if (ifWin() && isGameStarted) {
      // user won the game, then add their name to the leaderboard
      // document.dispatchEvent(winEvent);

      container.classList.toggle("is-toggled");
      let newJSON = editJSON(currentLevel, moves); // saves json to variable
      storeSessionStorage(newJSON); // stores json to session storage
      updateLeaderboard(currentLevel, newJSON);
    }

    isAnimating = false;
  }, slotAnimationTime);
}

export function organizeMove(card, animationTime) {
  let cardId = parseInt(card.id, 10);
  let space = findEmptySpace();
  let perimeter = findSurroundingBoxes(space);
  if (perimeter[0] && space - 4 === cardId) {
    moveCard(card, space - 4, space, "down", animationTime);
  } else if (perimeter[1] && space + 1 === cardId) {
    moveCard(card, space + 1, space, "left", animationTime);
  } else if (perimeter[2] && space + 4 === cardId) {
    moveCard(card, space + 4, space, "up", animationTime);
  } else if (perimeter[3] && space - 1 === cardId) {
    moveCard(card, space - 1, space, "right", animationTime);
  }
}

export function getMoveableCards() {
  let emptySpace = findEmptySpace();
  let boolArr = findSurroundingBoxes(emptySpace);
  let moveableCards = [];

  if (boolArr[0] === true) {
    moveableCards.push(cards[emptySpace - 5]);
  }

  if (boolArr[1] === true) {
    moveableCards.push(cards[emptySpace - 1]);
  }

  if (boolArr[2] === true) {
    moveableCards.push(cards[emptySpace + 2]);
  }

  if (boolArr[3] === true) {
    moveableCards.push(cards[emptySpace - 2]);
  }

  return moveableCards;
}
export function defaultBoard() {
  setupCardTemplate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null]);
}

export function updateCardsArray() {
  cards = document.querySelectorAll(".card");
}
