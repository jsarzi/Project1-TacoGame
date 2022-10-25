// DISPLAY CANVAS
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const tomatoes = [];
const bad = ["./../images/pokemon.png"];
const toxic = ["./../images/donald.png"];
const good = [
  "./../images/carne.png",
  "./../images/tomato-image.png",
  "./../images/cilantro.png",
];
let score = 0;
let level = 1;
let num = document.querySelector("#score");

canvas.style.background = "#C9AA7F";

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

// CREATE TOMATO
class Tomato {
  constructor() {
    this.isGood = Math.random() > 0.5;
    this.isToxic = this.isGood ? false : Math.random() > 0.8;

    // this.fruitBottom = 470;
    // this.fruitLeft = Math.floor(Math.random() * 1000);
    this.image = new Image();
    // this.imageArray = this.isGood ? good : bad;

    if (this.isGood) {
      this.imageArray = good;
    } else if (this.isToxic) {
      this.imageArray = toxic;
    } else {
      this.imageArray = bad;
    }
    console.log(this.isGood);
    this.image.src =
      this.imageArray[Math.floor(Math.random() * this.imageArray.length)];
    this.position = {
      x: Math.floor(Math.random() * canvas.width - 80),
      y: 0,
      width: 50,
      height: 50,
    };
  }
  // infiniteTomato() {
  //   setInterval(function () {
  //     addTomato();
  //     fallingTomato(this.tomatoArray[tomatoIndex]);
  //     this.tomatoIndex++;
  //   }, 2000);
  // }
  // addTomato() {
  //   this.position.x = rando;
  //   this.tomatoArray.push(this.position);
  // }
  move() {
    this.position.y += 6;
    if (this.position.y > canvas.width) {
    }
  }
  draw() {
    // this.tomatoArray.forEach(function () {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.position.width,
      this.position.height
    );

    // });
  }
  // generateFruit() {
  //   this.x = Math.floor(Math.random() * 1000);
  //   this.y = 460;
  // }
}

// CREATE CLASS TO GENERATE FOOD

// CREATE SCORE

// let count = 0;
// function Score() {
//   let score = document.querySelector(".score");
//   score.textContent = count;
// }
// function AddPoint(count) {
//   score += count;
// }
// function LoosePoint(count) {
//   score -= count;
// }

const keys = {
  r: {
    pressed: false,
  },
  l: {
    pressed: false,
  },
};

// MAKE MOVE TACO LEFT TO RIGHT

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
    console.log(tomato);
    if (
      taco.x + 30 <= tomato.position.x + tomato.position.width &&
      tomato.position.x <= taco.x - 30 + taco.width &&
      taco.y + 40 <= tomato.position.y + tomato.position.height &&
      tomato.position.y <= taco.y + taco.height
    ) {
      if (tomato.isGood) {
        score++;
        num.textContent = score;
      } else {
        score--;
        num.textContent = score;
      }

      if (tomato.isToxic || score < 0) {
        alert("you lose");
      }
      tomatoes.splice(tomatoes.indexOf(tomato), 1);
      console.log(score);
    }
    // if (
    //   taco.x < tomato.position.x + tomato.position.width / 2 &&
    //   tomato.position.x <= taco.x + taco.width / 2 &&
    //   taco.y + taco.height / 2 <= tomato.position.y + tomato.height &&
    //   tomato.y <= taco.y + taco.height
    // ) {
    // }
  }
  frame++;

  if (keys.r.pressed && taco.x + taco.width <= canvas.width) {
    taco.velocity.x = +9;
  } else if (keys.l.pressed && taco.x >= 0) {
    taco.velocity.x = -9;
  } else {
    taco.velocity.x = 0;
  }
}

animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowRight":
      console.log("right");
      keys.r.pressed = true;
      break;
    case "ArrowLeft":
      console.log("left");
      keys.l.pressed = true;
      break;
    default:
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowRight":
      console.log("right");
      keys.r.pressed = false;
      break;
    case "ArrowLeft":
      console.log("left");

      keys.l.pressed = false;
      break;
    default:
      break;
  }
});

// MAKE ELEMENTS THAT COME RANDOMLY FROM UP
// class Obstacle {
//   constructor(canvas, ctx) {
//     this.ctx = ctx;
//     this.canvas = canvas;
//     this.x = Math.floor(Math.random() * (this.canvas.width / 2)) + 20;
//     this.width = Math.floor(Math.random() * (this.canvas.width / 2));
//     this.height = 15;
//     this.y = -20;
//   }

//   bottomEdge() {
//     return this.y + this.height;
//   }

//   leftEdge() {
//     return this.x;
//   }
//   rightEdge() {
//     return this.x + this.width;
//   }
//   topEdge() {
//     return this.y;
//   }

//   draw() {
//     this.ctx.fillStyle = "red";
//     this.ctx.fillRect(this.x, this.y, this.width, this.height);
//   }

//   move() {
//     this.y += 4;
//   }
// }

// this.intervalId = setInterval(() => {
//   this.frames++;
//   if (this.frames % 60 === 0) {
//     this.obstacles.push(new Obstacle(this.canvas, this.ctx));
//   }
//   this.road.draw();
//   this.road.move();
//   this.car.draw();
//   for (const obstacle of this.obstacles) {
//     obstacle.draw();
//     if (this.checkCollision(obstacle, this.car)) {
//       this.stopGame();
//     }
//     obstacle.move();
//   }
// }, 1000 / 60);
