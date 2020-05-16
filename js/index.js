function main() {
  time.tick();
  reset();
  ctx.fillStyle = "rgb(255, 0, 0)";
  spriteList.forEach((s, index) => {
    if (s.pos.x + s.vel.x < 0 || s.pos.x + s.vel.x + s.rect.width > width) {
      s.bounceX();
    }
    if (s.pos.y + s.vel.y < 0 || s.pos.y + s.vel.y + s.rect.height > height) {
      s.bounceY();
    }
    for (let i = index + 1; i < spriteList.length; i++) {
      if (s.collidesWith(spriteList[i])) {
      }
    }
    s.update(time.getDeltaTime());
  });
  requestAnimationFrame(main);
}

function reset() {
  ctx.fillStyle = "rgb(256,256,256)";
  ctx.fillRect(0, 0, width, height);
}

const canvas = document.querySelector(".canvas");
let width = canvas.width;
let height = canvas.height;
const mouse = new Mouse(canvas.getBoundingClientRect(), canvas, width, height);
const time = new Time();
window.onresize = (e) => {
  mouse.updateBounds(canvas.getBoundingClientRect());
};

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

let spriteList = [];
let selected = 0;
spriteList.push(new BoxSprite(ctx, new Rect(0, 0, 15, 15), width, height));

main();

let onSquare = false;
const addSprite = (x, y) => {
  spriteList.push(new BoxSprite(ctx, new Rect(x, y, 15, 15), width, height));
  console.log(`Added sprite at ${x} and ${y}`);
};

canvas.addEventListener("mousedown", (e) => {
  mouse.onMouseDown(e);
  spriteList.forEach((s, index) => {
    if (s.rect.inRect(mouse.pos.x, mouse.pos.y)) {
      onSquare = true;
      selected = index;
    }
  });
  if (onSquare) {
    spriteList[selected].gravity = false;
    spriteList[selected].vel.set(0, 0);
  }
});

canvas.addEventListener("mousemove", (e) => {
  mouse.onMouseMove(e);
  if (onSquare) {
    spriteList[selected].pos.set(mouse.pos.x, mouse.pos.y);
  }
});

canvas.addEventListener("mouseup", (e) => {
  const action = mouse.onMouseUp(e);
  if (!onSquare) {
    addSprite(mouse.pos.x, mouse.pos.y);
  } else {
    console.log(action.velocity);
    spriteList[selected].vel.set(action.velocity.x, action.velocity.y);
    spriteList[selected].gravity = true;
  }
  onSquare = false;
});
