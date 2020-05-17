class Mouse {
  constructor(bounds, canvas, pxWidth, pxHeight) {
    this.mouseDown = false;
    this.pos = new Vector(0, 0);
    this.bounds = bounds;
    this.canvas = canvas;
    this.pxWidth = pxWidth;
    this.pxHeight = pxHeight;
    this.time = new Time();
    this.startPos = new Vector();
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
    return new MotionMotion(this.time.endTimer(), this.startPos, this.pos);
  }
}

class MotionMotion {
  constructor(duration, startPos, endPos) {
    this.duration = duration;
    this.startPos = startPos;
    this.endPos = endPos;
    this.displacement = Vector.subtract(endPos, startPos);
    this.velocity = Vector.divide(Vector.divide(this.displacement, 100), this.duration);
  }
}
