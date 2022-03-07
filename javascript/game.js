
class Game {
	constructor(level) {
		this.timerElement = document.querySelector('#tourTimer');
		this.timer = new Timer();
		this.lvl = level;
	}

	startTimer() {
		this.timer.start(() => {
			this.renderTime(this.timer.split());
		});
	}

	startGame() {
		this.startTimer();
	}

	stopGame() {
		this.timer.stop();
	}

	nextTour() {
		this.timer.reset();
		this.startTimer();
	}

	renderTime(timeStr) {
		if (this.timerElement) {
			this.timerElement.innerText = timeStr;
		}
	}


}
