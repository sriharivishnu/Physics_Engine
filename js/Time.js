class Time {
  constructor() {
    this.lastTime = this.getTime();
    this.time = this.getTime();
    this.deltaTime = 0;
    this.startTime = 0;
  }
  tick() {
    this.lastTime = this.time;
    this.time = this.getTime();
  }
  getTime() {
    return new Date().getTime() / 1000;
  }

  getDeltaTime() {
    return this.time - this.lastTime;
  }

  startTimer() {
    this.startTime = this.getTime();
  }
  endTimer() {
    return this.getTime() - this.startTime;
  }
}
