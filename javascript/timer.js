
class Timer {
  constructor() {
    this.startingTime = 0;
    this.pauseTimeStamp = 0;
    this.currentTime = 0;
    this.currentTimeMs = 0;
    this.intervalId = null;
  }

  // EXPORT VALUES LOGIC -------------------------------------------------------

  split() {
    const minutes = this.computeTwoDigitNumber(this.getMinutes());
    const seconds = this.computeTwoDigitNumber(this.getSeconds());
    return `${minutes}:${seconds}`;
  }

  splitMs() {
    const minutes = this.computeTwoDigitNumber(this.getMinutes());
    const seconds = this.computeTwoDigitNumber(this.getSeconds());
    const ms = this.computeTwoDigitNumber(this.getMs());
    return `${minutes}:${seconds}:${ms}`;
  }

  computeTwoDigitNumber(value) {
    return value.toString().padStart(2, '0');
  }

  // CLOCK LOGIC ---------------------------------------------------------------

  updateClock() {
    this.currentTimeMs = Date.now() - this.startingTime;
    this.currentTime = Math.floor(this.currentTimeMs / 1000);
  }

  getMinutes() {
    return Math.floor(this.currentTime / 60);
  }

  getSeconds() {
    return this.currentTime % 60;
  }

  getMilliseconds() {
    return Math.floor(this.currentTimeMs % 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.pauseTimeStamp = Date.now();
    this.intervalId = setInterval(() => {
      this.updateClock();
    }, 100);
  }

  reset() {
    this.startingTime = 0;
    this.currentTime = 0;
    this.currentTimeMs = 0;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  start(callback) {
    this.updateClock();
    if (this.intervalId === null) {
      this.startingTime = Date.now();
    } else {
      this.startingTime += Date.now() - this.pauseTimeStamp;
    }
    this.intervalId = setInterval(() => {
      this.updateClock();
      if (callback) {
        callback();
      }
    }, 400);
  }
}
