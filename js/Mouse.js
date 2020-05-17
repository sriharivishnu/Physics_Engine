class Mouse {
  constructor(bounds, canvas, pxWidth, pxHeight, time) {
    this.mouseDown = false;
    this.pos = new Vector(0, 0);
    this.bounds = bounds;
    this.canvas = canvas;
    this.pxWidth = pxWidth;
    this.pxHeight = pxHeight;
    this.time = time;
    this.startPos = new Vector();

    this.lastPos = new Vector();
    this.velocity = new Vector();
  }
  updateBounds(newBounds) {
    this.bounds = newBounds;
  }
  coordToPx(x, y) {
    let posx = Math.floor(((x - this.bounds.x) / this.canvas.clientWidth) * this.pxWidth);
    let posy = Math.floor(((y - this.bounds.y) / this.canvas.clientHeight) * this.pxHeight);
    return new Vector(posx, posy);
  }

  onMouseDown(e) {
    this.mouseDown = true;
    this.time.startTimer();
    this.pos = this.coordToPx(e.x, e.y);
    this.startPos.set(this.pos.x, this.pos.y);
  }

  onMouseMove(e) {
    this.pos = this.coordToPx(e.x, e.y);
  }

  onMouseUp(e) {
    this.mouseDown = false;
    this.pos = this.coordToPx(e.x, e.y);
    return new MotionMotion(this.time.endTimer(), this.startPos, this.pos, this.velocity);
  }
  update() {
    this.velocity = Vector.subtract(this.pos, this.lastPos);
    this.velocity.divide(this.time.getDeltaTime() * 100);
    this.lastPos.set(this.pos.x, this.pos.y);
  }
}

class MotionMotion {
  constructor(duration, startPos, endPos, velocity) {
    this.duration = duration;
    this.startPos = startPos;
    this.endPos = endPos;
    this.displacement = Vector.subtract(endPos, startPos);
    this.avgVelocity = Vector.divide(Vector.divide(this.displacement, 100), this.duration);
    this.velocity = velocity;
  }
}
