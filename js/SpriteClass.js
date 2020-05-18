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
const PIXELSPERMETER = 100;

class Sprite {
  constructor(drawer, x, y) {
    this.drawer = drawer;
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.accel = new Vector(0, 0);
  }
  inSprite(x, y) {}
  update(deltaTime) {
    this.pos.add(Vector.multiply(this.vel, deltaTime * PIXELSPERMETER));
    this.vel.multiply(0.99);
    this.vel.add(Vector.multiply(this.accel, deltaTime));
  }
  collidesWith(sprite) {}
}

class PhysicsSprite extends Sprite {
  constructor(drawer, x, y) {
    super(drawer, x, y);
    this.gravity = true;
    this.mass = 1;
    this.forces = new Vector(0, 9.81 * this.mass);
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (!this.gravity) {
      this.forces.y = 0;
    } else {
      this.forces.y = 9.81 * this.mass;
    }
    this.accel = Vector.divide(this.forces, this.mass);
  }

  bounceX() {
    this.vel.x = -this.vel.x * 0.5;
    if (Math.abs(this.vel.x) < 0.01) {
      this.vel.x = 0;
    }
  }

  bounceY() {
    this.vel.y = -this.vel.y * 0.5;
    if (Math.abs(this.vel.y) < 0.01) {
      this.vel.y = 0;
    }
  }
}
