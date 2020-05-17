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

class SphereSprite extends PhysicsSprite {
  constructor(drawer, radius, pos, screenDimen) {
    super(drawer, pos.x, pos.y);
    this.radius = radius;
    this.screenDimen = screenDimen;
  }

  bounceSphere() {
    if (
      this.pos.x + this.vel.x <= this.radius ||
      this.pos.x + this.vel.x + this.radius >= this.screenDimen.x
    ) {
      this.bounceX();
    }
    if (
      this.pos.y + this.vel.y <= this.radius ||
      this.pos.y + this.vel.y + this.radius > this.screenDimen.y
    ) {
      this.bounceY();
    }
  }

  updatePosition() {
    this.pos.add(this.vel);
    let x = Math.min(Math.max(this.radius, this.pos.x), this.screenDimen.x - this.radius);
    let y = Math.min(Math.max(this.radius, this.pos.y), this.screenDimen.y - this.radius);
    this.pos.set(x, y);
  }

  update(deltaTime) {
    super.update();
    this.bounceSphere();
    if (this.gravity) {
      this.vel.add(Vector.multiply(this.accel, deltaTime));
    }
    this.updatePosition();
    this.drawer.beginPath();
    this.drawer.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.drawer.fill();
  }
  inSprite(x, y) {
    super.inSprite(x, y);
    return Math.pow(x - this.pos.x, 2) + Math.pow(y - this.pos.y, 2) <= this.radius * this.radius;
  }
}

class BoxSprite extends PhysicsSprite {
  constructor(drawer, rect, screenDimen) {
    super(drawer, rect.x, rect.y);
    this.rect = rect;
    this.screenDimen = screenDimen;
  }

  updatePosition() {
    this.pos.add(this.vel);
    let x = Math.min(Math.max(0, this.pos.x), this.screenDimen.x - this.rect.width);
    let y = Math.min(Math.max(0, this.pos.y), this.screenDimen.y - this.rect.height);
    this.pos.set(x, y);
  }

  bounceBox() {
    if (
      this.pos.x + this.vel.x <= 0 ||
      this.pos.x + this.vel.x + this.rect.width >= this.screenDimen.x
    ) {
      this.bounceX();
    }
    if (
      this.pos.y + this.vel.y <= 0 ||
      this.pos.y + this.vel.y + this.rect.height >= this.screenDimen.y
    ) {
      this.bounceY();
    }
  }

  update(deltaTime) {
    super.update();
    this.bounceBox();
    if (this.gravity) {
      this.vel.add(Vector.multiply(this.accel, deltaTime));
    }
    this.updatePosition();
    this.rect.update(this.pos.x, this.pos.y);
    this.drawer.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
  }

  inSprite(x, y) {
    super.inSprite(x, y);
    return this.rect.inRect(x, y);
  }

  collidesWith(sprite1) {
    super.collidesWith();
    return this.rect.intersects(sprite1.rect);
  }
}
