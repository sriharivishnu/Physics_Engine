class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  divide(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }
  normalize() {
    const m = this.getMagnitude();
    this.x /= m;
    this.y /= m;
    return this;
  }
  static add(vector1, vector2) {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }
  static subtract(vector1, vector2) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }
  static dot(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }
  static multiply(vector, scalar) {
    return new Vector(vector.x * scalar, vector.y * scalar);
  }
  static divide(vector, scalar) {
    return new Vector(vector.x / scalar, vector.y / scalar);
  }
  static normalize(vector) {
    if (vector.getMagnitude() == 0) {
      return new Vector(1, 0);
    }
    return new Vector(vector.x / vector.getMagnitude(), vector.y / vector.getMagnitude());
  }
}
