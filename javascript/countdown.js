class Countdown {
  constructor(seconds) {
    this.expireTime = 0;
    this.remainingMs = 0;
    this.intervalId = null;
  }

  // EXPORT VALUES LOGIC -------------------------------------------------------

  split() {
    const minutes = this.computeTwoDigitNumber(this.getMinutes());
    const seconds = this.computeTwoDigitNumber(this.getSeconds());
    return `${minutes}:${seconds}`;
  }

  computeTwoDigitNumber(value) {
    return value.toString().padStart(2, '0');
  }

  // CLOCK LOGIC ---------------------------------------------------------------

  updateClock() {
    this.remainingMs = this.expireTime - Date.now();
  }

  getMinutes() {
    return Math.floor((this.remainingMs / 1000) / 60);
  }

  getSeconds() {
    return Math.floor((this.remainingMs / 1000) % 60);
  }

  getRemainingSeconds() {
    return this.remainingMs / 1000;
  }

  stop() {
    this.remainingMs = 0;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  start(countdownSeconds, callback) {
    if (this.intervalId === null) {
      this.expireTime = Date.now() + (countdownSeconds * 1000);
      this.intervalId = setInterval(() => {
        this.updateClock();
        if (callback) {
          callback();
        }
      }, 400);
    }
  }
}
