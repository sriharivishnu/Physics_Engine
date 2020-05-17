function main() {
  time.tick();
  mouse.update();
  reset();
  ctx.fillStyle = "rgb(255, 0, 0)";
  spriteList.forEach((s, index) => {
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
const time = new Time();
const mouse = new Mouse(canvas.getBoundingClientRect(), canvas, width, height, time);
window.onresize = (e) => {
  mouse.updateBounds(canvas.getBoundingClientRect());
};

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

let spriteList = [];
let selected = 0;
main();

let onSquare = false;
const addSprite = (x, y) => {
  // spriteList.push(new BoxSprite(ctx, new Rect(x, y, 30, 30), new Vector(width, height)));
  spriteList.push(new SphereSprite(ctx, 15, new Vector(x, y), new Vector(width, height)));
};

canvas.addEventListener("mousedown", (e) => {
  mouse.onMouseDown(e);
  spriteList.forEach((s, index) => {
    if (s.inSprite(mouse.pos.x, mouse.pos.y)) {
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
    spriteList[selected].vel.set(action.velocity.x, action.velocity.y);
    spriteList[selected].gravity = true;
  }
  onSquare = false;
});
