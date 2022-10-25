// DISPLAY CANVAS
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const tomatoes = [];
const bad = ["./../images/pokemon.png"];
const toxic = ["./../images/donald.png"];
const good = [
  "./../images/carne.png",
  "./../images/tomate.png",
  "./../images/cilantro.png",
  "./../images/piment.png",
  "./../images/oignon.png",
];
let score = 0;

let num = document.querySelector("#score");
let timer = document.querySelector("#timer");
let timeLeft = 15;

// SET TIMER

// function gameOver() {
//   cancelInterval(timer);
//   timer.shadowRoot();
// }

// function updateTimer() {
//   timeLeft = timeLeft - 1;
//   if (timeLeft >= 0) timer.html(timeLeft);
//   else {
//     gameOver();
//   }
// }

// function start() {
//   timer = setInterval(updateTimer, 1000);
//   updateTimer();
//   timer.hide();
// }

// MUSIC FOR TRUMP
let soundBad = new Audio();
soundBad.src = "./../sounds/trump.m4a";

// MUSIC FOR GOOD
let soundMore = new Audio();
soundMore.src = "./../sounds/more.m4a";

// MUSIC FOR ESCARGOT
let soundLess = new Audio();
soundLess.src = "./../sounds/less.m4a";

// BACKGROUND
canvas.style.background = "url('./../images/background1.png";

// CREATE TACOS
class Tacos {
  constructor() {
    this.image = new Image();
    this.image.src = "./../images/tacos-image.png";

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
      width: 65,
      height: 65,
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
  requestAnimationFrame(animate);

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
      } else {
        score--;
        num.textContent = score;
        soundLess.play();
      }

      if (tomato.isToxic || score < 0) {
        soundBad.play();
        alert("Noooooooo! Baby taco is dead");
        // gameOver();
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

animate();

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
