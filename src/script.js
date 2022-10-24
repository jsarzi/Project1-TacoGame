// DISPLAY CANVAS
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.style.background = "#C9AA7F";

// CREATE TACOS
class Tacos {
  constructor() {
    this.image = new Image();
    this.image.src = "./../images/tacos-image.png";
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = 200;
    this.height = 250;
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.x = this.canvas.width - 550;
    this.y = this.canvas.height - 200;
  }
  draw() {
    if (this.image)
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
    this.x += this.velocity.x;
  }
}

const taco = new Tacos(canvas, ctx);
const keys = {
  r: {
    pressed: false,
  },
  l: {
    pressed: false,
  },
};

// MAKE MOVE TACO LEFT TO RIGHT

function animate() {
  requestAnimationFrame(animate);

  taco.update();

  if (keys.r.pressed && taco.x + taco.width <= canvas.width) {
    taco.velocity.x = +7;
  } else if (keys.l.pressed && taco.x >= 0) {
    taco.velocity.x = -7;
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

class 