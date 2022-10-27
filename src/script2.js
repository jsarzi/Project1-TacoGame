// DISPLAY CANVAS
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let num = document.querySelector("#score");
let tomatoes = [];
let animationId = null;
let intervalId = null;
let score = 0;
const bad = ["images/pistolet.png"];
const toxic = ["images/trump.png"];
const good = ["/images/echelle.png"];

// THE GAME
function init() {
  animate();
  const fiveMinutes = 60 * 5,
    display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
  score = 0;
  tomatoes = [];
  num.textContent = score;
}

// START AGAIN
let startAgain = document.querySelector("#playAgainButton");
startAgain.addEventListener("click", () => {
  let modal = document.querySelector("#modal");
  console.log(modal);
  modal.close();
  init();
});

// START
let start = document.querySelector(".start");
start.addEventListener("click", () => {
  init();
});

// SET TIMER

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  intervalId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
      gameOver();
    }
  }, 100);
}

// DISPLAY WIN
function winGame() {
  let win = document.querySelector("#modal1");
  win.showModal();
}

// GAME OVER
function gameOver() {
  let lost = document.querySelector("#modal");
  // lost.classList.remove("hidden");
  lost.showModal();
}

// MUSIC FOR TRUMP
let soundBad = new Audio();
soundBad.src = "./sounds/trump.m4a";

// MUSIC FOR GOOD
let soundMore = new Audio();
soundMore.src = "./sounds/more.m4a";

// MUSIC FOR ESCARGOT
let soundLess = new Audio();
soundLess.src = "./sounds/less.m4a";

// BACKGROUND
canvas.style.background = "url('/images/mur.png')";

// CREATE TACOS
class Tacos {
  constructor() {
    this.image = new Image();
    this.image.src = "./images/tacos-image.png";

    this.width = 80;
    this.height = 100;
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.x = canvas.width - 500;
    this.y = canvas.height - 100;
  }
  draw() {
    if (this.image)
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.draw();
    this.x += this.velocity.x;
  }
}

const taco = new Tacos();

// CREATE FOOD
class Tomato {
  constructor() {
    this.isGood = Math.random() > 0.5;
    this.isToxic = this.isGood ? false : Math.random() > 0.8;

    this.image = new Image();

    if (this.isGood) {
      this.imageArray = good;
    } else if (this.isToxic) {
      this.imageArray = toxic;
    } else {
      this.imageArray = bad;
    }

    this.image.src =
      this.imageArray[Math.floor(Math.random() * this.imageArray.length)];
    this.position = {
      x: Math.floor(Math.random() * canvas.width - 80),
      y: 0,
      width: 70,
      height: 70,
    };
  }

  move() {
    this.position.y += 6;
    if (this.position.y > canvas.width) {
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.position.width,
      this.position.height
    );
  }
}

// MAKE MOVE TACO LEFT TO RIGHT

const keys = {
  r: {
    pressed: false,
  },
  l: {
    pressed: false,
  },
};

// BASE OF THE GAME // CONDITIONS

let frame = 0;
function animate() {
  animationId = requestAnimationFrame(animate);

  if (frame % 20 === 0) {
    tomatoes.push(new Tomato());
  }
  taco.update();

  for (let tomato of tomatoes) {
    tomato.move();
    tomato.draw();

    if (
      taco.x + 40 <= tomato.position.x + tomato.position.width &&
      tomato.position.x <= taco.x - 40 + taco.width &&
      taco.y + 40 <= tomato.position.y + tomato.position.height &&
      tomato.position.y <= taco.y + taco.height
    ) {
      if (tomato.isGood) {
        score++;
        soundMore.play();
        num.textContent = score;
        if (score === 12) {
          clearInterval(intervalId);
          cancelAnimationFrame(animationId);
          winGame();
        }
      } else {
        score--;
        soundLess.play();
        num.textContent = score;
      }

      if (tomato.isToxic || (score < 0 && score !== 10)) {
        soundBad.play();
        clearInterval(intervalId);
        cancelAnimationFrame(animationId);
        gameOver();
      }
      tomatoes.splice(tomatoes.indexOf(tomato), 1);
    }
  }
  frame++;

  if (keys.r.pressed && taco.x + taco.width <= canvas.width) {
    taco.velocity.x = +8;
  } else if (keys.l.pressed && taco.x >= 0) {
    taco.velocity.x = -8;
  } else {
    taco.velocity.x = 0;
  }
}

// ADD EVENT LISTENER

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowRight":
      keys.r.pressed = true;
      break;
    case "ArrowLeft":
      keys.l.pressed = true;
      break;
    default:
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowRight":
      keys.r.pressed = false;
      break;
    case "ArrowLeft":
      keys.l.pressed = false;
      break;
    default:
      break;
  }
});
