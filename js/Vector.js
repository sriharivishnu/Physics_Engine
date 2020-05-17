class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt(x * x + y * y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt(x * x + y * y);
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
  divide(scalar) {
    this.x /= scalar;
    this.y /= scalar;
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
}
