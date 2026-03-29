var up = 50;
var left = 10;
var level = 0;
var score = 0;
var falconUp = 10;
var falconLeft = 110;
let falconInterval;

function changeLevel(setLevel = true) {
  const main = document.getElementById("main");
  const falcon = document.getElementById("falcon");
  const levelCount = document.getElementById("level");

  if (setLevel) level = (level + 1) % 5;

  switch (level) {
    case 0:
      main.style.backgroundImage = "url('res/bg.jpg')";
      falcon.src = "res/falcon.gif";
      break;
    case 1:
      main.style.backgroundImage = "url('res/bg-2.png')";
      falcon.src = "res/bat.gif";
      break;
    case 2:
      main.style.backgroundImage = "url('res/bg-3.png')";
      break;
    case 3:
      main.style.backgroundImage = "url('res/bg-4.png')";
      break;
    case 4:
      main.style.backgroundImage = "url('res/bg-5.png')";
      break;
  }

  levelCount.innerText = "L" + (level + 1);
}

function checkCollision() {
  const bird = document.getElementById("bird");
  const falcon = document.getElementById("falcon");
  if (!bird || !falcon) return;

  const birdRect = bird.getBoundingClientRect();
  const falconRect = falcon.getBoundingClientRect();

  const overlap = !(
    birdRect.bottom < falconRect.top ||
    birdRect.top > falconRect.bottom ||
    birdRect.right < falconRect.left ||
    birdRect.left > falconRect.right
  );

  if (overlap) {
    if (!confirm("💥 The bird got caught! Score: " + score + ". Try again?")) {
      clearInterval(falconInterval);
      alert("Game Over!");
    } else {
      resetGame();
    }
  }
}

function gameLoop() {
  const bird = document.getElementById("bird");
  const scoreCount = document.getElementById("score");
  bird.style.top = up + "%";
  bird.style.left = left + "%";
  scoreCount.innerText = score === 0 ? "0000" : score;
}

function falconMove() {
  const falcon = document.getElementById("falcon");
  if (!falcon) return;
  falconUp = falconUp >= 90 ? 10 : falconUp + 1;
  falconLeft = falconLeft <= -10 ? 110 : falconLeft - 1;
  falcon.style.top = falconUp + "%";
  falcon.style.left = falconLeft + "%";
  checkCollision();
}

function startFalcon() {
  if (falconInterval) clearInterval(falconInterval);
  falconInterval = setInterval(falconMove, 100);
}

function resetGame() {
  up = 50;
  left = 10;
  falconUp = 10;
  falconLeft = 110;
  level = 0;
  score = 0;

  const bird = document.getElementById("bird");
  const falcon = document.getElementById("falcon");

  bird.style.top = up + "%";
  bird.style.left = left + "%";
  falcon.style.top = falconUp + "%";
  falcon.style.left = falconLeft + "%";

  changeLevel(false);
  startFalcon();
}

setInterval(gameLoop, 1);
startFalcon();

function goLeft() {
  left = left <= -10 ? 110 : left - 1;
}

function goRight() {
  if (left >= 110) {
    left = -10;
    changeLevel();
  } else {
    left++;
    score += parseInt(left / 5);
  }
}

function goUp() {
  if (up <= -10) {
    up = 100;
  } else {
    up--;
  }
}

function goDown() {
  if (up >= 100) {
    up = -10;
  } else {
    up++;
  }
}

document.addEventListener("keydown", function (event) {
  switch (event.which || event.keyCode) {
    case 37:
      goLeft();
      break;
    case 38:
      goUp();
      break;
    case 39:
      goRight();
      break;
    case 40:
      goDown();
      break;
  }
});
