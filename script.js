"use strict";

let player1_name;
let player2_name;
const player_arra = [player1_name, player2_name];

const pl1_value = document.querySelector(`.name_player1`);
const pl2_value = document.querySelector(`.name_player2`);
const close_button = document.querySelector(`.close_button`);
let playing = true;

document
  .querySelector(`.name_player1`)
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      if (!player1_name) {
        if (!document.querySelector(`.name_player1`).value) {
          document.querySelector(
            ".game_message"
          ).textContent = `Empty name! Not good `;
        } else {
          player1_name = pl1_value.value;
          document.querySelector(
            ".game_message"
          ).textContent = `Great! First player (X) is ${player1_name}! `;
          document.querySelector(".pl1_name").textContent = player1_name;
        }
      } else {
        document.querySelector(
          ".game_message"
        ).textContent = `First player (X) is already named ${player1_name}! `;
      }
    }
  });

document
  .querySelector(`.name_player2`)
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      if (!player2_name) {
        if (!document.querySelector(`.name_player2`).value) {
          document.querySelector(
            ".game_message"
          ).textContent = `Empty name! Not good `;
        } else {
          player2_name = pl2_value.value;
          document.querySelector(
            ".game_message"
          ).textContent = `Great! Second player (O) is named ${player2_name}! `;
          document.querySelector(".pl2_name").textContent = player2_name;
        }
      } else {
        document.querySelector(
          ".game_message"
        ).textContent = `Second player (O) is already named ${player2_name}! `;
      }
    }
  });

const buttons = document.querySelectorAll(`.btn`);
console.log(buttons);

const const_check_for_victory = function (letter) {
  for (let i = 0; i <= 6; i += 3) {
    if (
      buttons[i].textContent === letter &&
      buttons[i + 1].textContent === letter &&
      buttons[i + 2].textContent === letter
    )
      return true;
  }
  for (let i = 0; i <= 2; i++) {
    if (
      buttons[i].textContent === letter &&
      buttons[i + 3].textContent === letter &&
      buttons[i + 6].textContent === letter
    )
      return true;
  }

  if (
    buttons[0].textContent === letter &&
    buttons[4].textContent === letter &&
    buttons[8].textContent === letter
  )
    return true;

  if (
    buttons[2].textContent === letter &&
    buttons[4].textContent === letter &&
    buttons[6].textContent === letter
  )
    return true;
};

let pl1_turn = true;
let pl2_turn = false;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (playing) {
      if (pl1_turn) {
        if (const_check_for_victory("O")) {
          document.querySelector(".player_won").classList.remove("hidden");
          document.querySelector(".container").classList.add("overlay");
          document.querySelector(
            ".player_message"
          ).textContent = `${player2_name} (O) won!`;
        } else {
          if (!buttons[i].textContent) {
            buttons[i].textContent = "X";
            pl1_turn = false;
            pl2_turn = true;
            if (const_check_for_victory("X")) {
              document.querySelector(".player_won").classList.remove("hidden");
              document.querySelector(".container").classList.add("overlay");
              document.querySelector(
                ".player_message"
              ).textContent = `${player2_name} (X) won!`;
              playing = false;
            }
            document.querySelector(
              ".game_message"
            ).textContent = `${player2_name} (O) turn!`;
          }
        }
      } else if (pl2_turn) {
        if (const_check_for_victory("X")) {
          document.querySelector(".player_won").classList.remove("hidden");
          document.querySelector(".container").classList.add("overlay");
          document.querySelector(
            ".player_message"
          ).textContent = `${player1_name} (X) won!`;
          playing = false;
        } else {
          if (!buttons[i].textContent) {
            buttons[i].textContent = "O";
            pl2_turn = false;
            pl1_turn = true;
            document.querySelector(
              ".game_message"
            ).textContent = `${player1_name} (X) turn!`;
          }
        }
      }
    }
  });
}

close_button.addEventListener("click", function () {
  document.querySelector(".player_won").classList.add("hidden");
  document.querySelector(".container").classList.remove("overlay");
});
