// // functions for adding and reading from storage json file
import { parse } from "path";
import { currentLevel } from "./index.js";
let fs = require("fs"); // file system module to perform operations
let leaderboard = require("/src/storage/leaderboard.json");

export function writeDataToFile(revisedJSON) {
  // error ENOTSUP unable to write to file
  // let temp = JSON.parse(revisedJSON);
  //** H E L P */
  console.log("write data function: " + typeof revisedJSON);
  fs.writeFile("./src/storage/leaderboard.json", revisedJSON, "utf8", function (
    err
  ) {
    if (err) {
      //**Error when I rename myself and rewin the game, same when I try to rewin the game under the same username */
      console.log(err);
    }
    leaderboard = require("/src/storage/leaderboard.json"); // refresh json data  to be upto date
  });
  // try {
  //   fs.writeFileSync("/src/storage/leaderboard.json", revisedJSON);
  // } catch (err) {
  //   console.log(err);
  // }
  // leaderboard = require("/src/storage/leaderboard.json");
  console.log("writedata to file fiunction ", leaderboard);
  // updateLeaderboard(currentLevel, leaderboard);
}

export function editJSON(level, moves) {
  let mainUser = sessionStorage.getItem("mainuser");
  let userIndex = doesUserExist(level, mainUser);
  let currentLeaderboard = JSON.parse(exportSessionLeaderboard());
  if (userIndex != -1) {
    // user exists
    console.log(currentLeaderboard.levels[level][userIndex]);
    let previousScore = currentLeaderboard.levels[level][userIndex]["score"];
    if (moves < previousScore) {
      currentLeaderboard.levels[level][userIndex]["score"] = moves;
    }
  } else {
    // user does not exist so create a new one
    let newUser = {
      username: mainUser,
      score: moves
    };
    currentLeaderboard.levels[level].push(newUser);
  }
  let newLeaderBoard = JSON.stringify(currentLeaderboard);
  return newLeaderBoard;
}
export function updateLeaderboard(level) {
  console.log("first line in updateLeaderboard: ");
  let temp = exportSessionLeaderboard();
  let parsed = JSON.parse(temp);
  // console.log("imported leaderboard: ", JSON.parse(leaderboardInfo));
  // let parsedData = JSON.parse(JSON.parse(leaderboardInfo));
  let leaderboardSlots = document.querySelectorAll(".usertext");
  let userArray = parsed.levels[level];

  userArray.sort((a, b) => {
    return a["score"] - b["score"];
  });

  // clear leaderboard
  for (let index = 0; index < leaderboardSlots.length; index++) {
    leaderboardSlots[index].innerHTML = "";
  }
  if (userArray.length < 5) {
    // users are less than 5
    // do something to avoid code error
    for (let index = 0; index < userArray.length; index++) {
      leaderboardSlots[
        index
      ].innerHTML = `${userArray[index]["username"]} : ${userArray[index]["score"]}`;
    }
  } else {
    // get top 5 only
    for (let index = 0; index < leaderboardSlots.length; index++) {
      leaderboardSlots[
        index
      ].innerHTML = `${userArray[index]["username"]} : ${userArray[index]["score"]}`;
    }
  }
}
export function doesUserExist(level, user) {
  // find if user exists and return index to update score
  let parsedJSON = JSON.parse(exportSessionLeaderboard());
  let users = parsedJSON.levels[level]; // users array
  for (let index = 0; index < users.length; index++) {
    if (users[index]["username"] == user) {
      return index;
    }
  }
  return -1;
}
export function storeSessionStorage(leaderboardJSON) {
  window.sessionStorage.setItem("info", leaderboardJSON);
}
export function exportSessionLeaderboard() {
  if (window.sessionStorage.getItem("info") == null) {
    // first time logging in
    leaderboard = require("/src/storage/leaderboard.json");
    // console.log(leaderboard);
    storeSessionStorage(JSON.stringify(leaderboard));
    return JSON.stringify(leaderboard);
  } else {
    // session storage already available to pick
    return window.sessionStorage.getItem("info");
  }
}
