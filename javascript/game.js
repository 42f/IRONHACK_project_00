
class Grid {
	constructor() {
		this.gridElement = document.querySelector('#grid');
		this.cardElements = [];
	}

	makeCardElement() {
		const cardElement = document.createElement('div');
		cardElement.classList.add('card');

		cardElement.style.animationDuration = `${Math.round(Math.random() * 300).toString()}ms`;
		cardElement.style.animationDelay = `${Math.round(Math.random() * 900).toString()}ms`;

		return cardElement;
	}

	addCard() {
		const newLen = this.cardElements.push(this.makeCardElement());
		this.gridElement.appendChild(this.cardElements[newLen - 1]);
	}

}

class Game {
	constructor(level) {
		this.timerBip = new Audio('./media/audio/bip.mp3');
		this.timerElement = document.querySelector('#tourTimer');
		this.timer = new Countdown();
		this.lvl = level;
		this.grid = new Grid();

		this.cardSet = new RandomNbrCardSet(12);

		this.cardSet.logCards();

		for (let i = 1; i < 20; i++) {
			setTimeout(() => {
				console.log('ADD CARD');
				this.grid.addCard()
			}, 20);
		}
	}

	startTimer() {
		this.timer.start(30, () => {
			this.renderTime(this.timer.getRemainingSeconds(), this.timer.split());
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

	renderTime(remainingSeconds, timeStr) {
		if (remainingSeconds >= 0) {
			this.timerElement.innerText = timeStr;
			if (remainingSeconds < 25) {
				this.timerElement.classList.toggle('timer-reach-limit');
				// play bip warning the end of timer
				// this.timerBip.play();
			}
		} else {
			this.timerElement.classList.add('timer-reach-limit');
		}
	}
}


