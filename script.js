let urlPlayerList =
  "https://api.cricapi.com/v1/players?apikey=f1be88f4-c919-4fa1-97b5-9065161e6124&offset=0";
// let urlPlayerList = "https://api.cricapi.com/v1/players?apikey=9ce157bb-9bad-4dfe-acb3-de094c92e087&offset=0";
let urlPlayerInfo =
  "https://api.cricapi.com/v1/players_info?apikey=9ce157bb-9bad-4dfe-acb3-de094c92e087&id=2bd32a4d-2f82-44c4-9ed7-3feeec71e313";
  let urlPlayerSearch =
  "https://api.cricapi.com/v1/players?apikey=f1be88f4-c919-4fa1-97b5-9065161e6124&offset=0&search=";
//   let urlPlayerSearch =
//   "https://api.cricapi.com/v1/players?apikey=9ce157bb-9bad-4dfe-acb3-de094c92e087&offset=0&search=";
let input = document.querySelector("#input");
let searchBtn = document.querySelector("#searchbtn");
let playerData = document.querySelector("#pdata1para");
let list = document.querySelector(".list");
let addButton = document.querySelector("#add");
let team = document.querySelector(".team");
// Create Team
window.addEventListener("DOMContentLoaded", () => {
  let storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
  storedPlayers.forEach((playerInfo) => {
    let pre = document.createElement("pre");
    pre.innerText = playerInfo;
    team.appendChild(pre);
  });
});
addButton.addEventListener("click", () => {
  if (result) {
    let players = JSON.parse(localStorage.getItem("players") || "[]");
    if (!players.includes(result)) {
        players.push(result);
        localStorage.setItem("players", JSON.stringify(players));
    let answer = document.createElement("pre");
    answer.innerText = result;
    team.appendChild(answer);
    }
  }
  console.log(result);
});

// Player Info
let result = "";
searchBtn.addEventListener("click", async () => {
  let inputText = input.value;
  let url = `${urlPlayerSearch}${inputText}`;
  result = await printPlayerInfo(url);
});
let getPlayerInfo = async (url) => {
  let players_info = await fetch(url);
  let promise = await players_info.json();
  return promise;
};
async function printPlayerInfo(url) {
    let data;
  let result = await getPlayerInfo(url);
  if (result.data && result.data.length > 0) {
    console.log(result.data[0]);
    playerData.innerText = `    Name = ${result.data[0].name}\n    Country = ${result.data[0].country}\n    Status = ${result.status}\n    Hits Today: ${result.info.hitsToday}\n    Hits Used: ${result.info.hitsUsed}\n    Hits Limit: ${result.info.hitsLimit}\n    Credits: ${result.info.credits}`;
    data = playerData.innerText;
  } else {
    playerData.innerText = "                No player found.";
    data = playerData.innerText;
  }
  return data;
}

// Player List
document.addEventListener("DOMContentLoaded", async (event) => {
  let url = `${urlPlayerList}`;
  event.preventDefault();
  let result1 = await printPlayerList(urlPlayerList);
});
let playerList = async (url) => {
  let list_info = await fetch(url);
  let promise = await list_info.json();
  console.log(promise);
  return promise;
};
let array = [];
async function printPlayerList(url) {
  let result = await playerList(url);
  result.data.forEach((player) => {
    array.push(player.name);
    console.log(array);
    list.innerText = array.join("\n");
  });
  array = [];
}
