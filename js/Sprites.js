/* Sphere SPRITE */
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

  updatePosition(deltaTime) {
    // console.log(this.vel);
    let x = Math.min(Math.max(this.radius, this.pos.x), this.screenDimen.x - this.radius);
    let y = Math.min(Math.max(this.radius, this.pos.y), this.screenDimen.y - this.radius);
    this.pos.set(x, y);
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.updatePosition(deltaTime);
    this.bounceSphere();
    this.drawer.beginPath();
    this.drawer.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.drawer.fill();
  }
  inSprite(x, y) {
    super.inSprite(x, y);
    return Math.pow(x - this.pos.x, 2) + Math.pow(y - this.pos.y, 2) <= this.radius * this.radius;
  }
  collidesWith(sprite, deltaTime) {
    super.collidesWith(sprite);
    const diff = Vector.subtract(sprite.pos, this.pos);
    //Distance less than sum of radii
    if (diff.x * diff.x + diff.y * diff.y > Math.pow(this.radius + sprite.radius, 2)) {
      return false;
    }
    //Velocity not in the same direction as the other sphere
    if (Vector.dot(Vector.subtract(this.vel, sprite.vel), diff) < 0) {
      return false;
    }
    if (diff.x * diff.x + diff.y * diff.y < Math.pow(this.radius + sprite.radius, 2)) {
    }
    diff.normalize();
    let a1 = Vector.dot(this.vel, diff);
    let a2 = Vector.dot(sprite.vel, diff);

    let optimized = a1 - a2;
    // console.log(this.vel, sprite.vel, optimized);
    this.vel.subtract(Vector.multiply(diff, optimized));
    sprite.vel.add(Vector.multiply(diff, optimized));
  }
}

/* BOX SPRITE */

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
    super.update(deltaTime);
    this.bounceBox();
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
