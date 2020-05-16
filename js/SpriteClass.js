class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.recalculate();
  }
  recalculate() {
    this.left = this.x;
    this.right = this.x + this.width;

    this.top = this.y;
    this.bottom = this.y + this.height;

    this.centreX = this.x / 2;
    this.centreY = this.y / 2;
  }
  update(x, y) {
    this.x = x;
    this.y = y;
    this.recalculate();
  }
  intersects(rect) {
    return (
      this.right >= rect.left &&
      this.bottom >= rect.top &&
      this.top <= rect.bottom &&
      this.left <= rect.right
    );
  }
  inRect(x, y) {
    // console.log(`${x} ${y} and ${this.left},${this.right}, ${this.top}, ${this.bottom}`);
    return this.left <= x && x <= this.right && this.top <= y && y <= this.bottom;
  }
}

class BoxSprite {
  constructor(drawer, rect, boundx, boundy) {
    this.drawer = drawer;
    this.rect = rect;
    this.boundx = boundx;
    this.boundy = boundy;
    this.pos = new Vector(rect.x, rect.y);
    this.vel = new Vector(0, 0);
    this.accel = new Vector(0, 9.81);
    this.gravity = true;
  }

  updatePosition() {
    this.pos.add(this.vel);
    let x = Math.min(Math.max(0, this.pos.x), this.boundx - this.rect.width);
    let y = Math.min(Math.max(0, this.pos.y), this.boundy - this.rect.height);
    this.pos.set(x, y);
  }

  update(deltaTime) {
    if (this.gravity) {
      this.vel.add(new VectorUtils().multiply(this.accel, deltaTime));
    }
    this.vel.multiply(0.99);
    this.updatePosition();
    this.rect.update(this.pos.x, this.pos.y);
    this.drawer.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
  }

  collidesWith(sprite1) {
    if (this.rect.intersects(sprite1.rect)) {
      return true;
    }
    return false;
  }

  bounceX() {
    if (-0.1 < this.vel.x < 0.1) {
      this.vel.x = 0;
    }
    this.vel.x = -this.vel.x * 0.8;
  }

  bounceY() {
    if (-0.1 < this.vel.y < 0.1) {
      this.vel.y = 0;
    }
    this.vel.y = -this.vel.y * 0.8;
  }
}
