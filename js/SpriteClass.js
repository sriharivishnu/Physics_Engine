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
    return this.left <= x && x <= this.right && this.top <= y && y <= this.bottom;
  }
}

class Sprite {
  constructor(drawer, x, y) {
    this.drawer = drawer;
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.accel = new Vector(0, 9.81);
    this.gravity = true;
  }
  inSprite(x, y) {}
  update(deltaTime) {
    this.vel.multiply(0.99);
  }
  collidesWith(sprite) {}
}

class PhysicsSprite extends Sprite {
  constructor(drawer, x, y) {
    super(drawer, x, y);
  }
  bounceX() {
    this.vel.x = -this.vel.x * 0.8;
  }

  bounceY() {
    this.vel.y = -this.vel.y * 0.8;
  }
}
