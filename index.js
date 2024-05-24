function animate(color) {
  let clicked = $("." + color);
  clicked.addClass("flash");
  setTimeout(() => {
    clicked.removeClass("flash");
  }, 200);
}

function play(color) {
  switch (color) {
    case "green":
      let click = new Audio("sounds/click.mp3");
      click.play();
      break;
    case "red":
      let pop = new Audio("sounds/pop.mp3");
      pop.play();
      break;
    case "yellow":
      let ping = new Audio("sounds/ping.mp3");
      ping.play();
      break;
    case "blue":
      let bloop = new Audio("sounds/bloop.mp3");
      bloop.play();
      break;
    default:
  }
}

let highscore = 0;
let computerSequence = [];
let playerSequence = [];
let colors = ["green", "red", "yellow", "blue"];
let level = 0;

$(document).on("keypress", function () {
  if (level === 0) {
    start();
  }
});

function start() {
  playerSequence = [];
  level++;
  highScore();
  $("h2").text("LEVEL " + level);
  setTimeout(computerTurn, 1000);
}

function computerTurn() {
  let randomNum = Math.floor(Math.random() * 4);
  computerSequence.push(colors[randomNum]);
  play(colors[randomNum]);
  animate(colors[randomNum]);
  setTimeout(playerTurn, 200);
}

function playerTurn() {
  $(".button").on("click", function () {
    play(this.id);
    animate(this.id);
    playerSequence.push(this.id);

    if (
      playerSequence[playerSequence.length - 1] !==
      computerSequence[playerSequence.length - 1]
    ) {
      setTimeout(reset, 500);
      return;
    }

    if (playerSequence.length === computerSequence.length) {
      $(".button").unbind();
      start();
    } else {
      $(".button").unbind();
      playerTurn();
    }
  });
}

function reset() {
  $("body").addClass("error");
  let error = new Audio("sounds/error.mp3");
  error.play();
  setTimeout(() => {
    $("body").removeClass("error");
  }, 500);
  level = 0;
  computerSequence = [];
  playerSequence = [];
  $("h2").text("YOU LOST. PRESS ANY KEY TO RESTART");
  $(".button").unbind();
}

function highScore() {
  if (level - 1 > highscore) {
    highscore = level - 1;
  }
  $("p").text("HIGHSCORE: " + highscore);
}
