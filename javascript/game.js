
class Grid {
	constructor() {
		this.gridElement = document.querySelector('#grid');
		this.cardElements = [];
	}

	addCard(cardElement) {
		const newLen = this.cardElements.push(cardElement);
		this.gridElement.appendChild(this.cardElements[newLen - 1].getElement());
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

		for (let i = 0; i < this.cardSet.cards.length; i++) {
			setTimeout(() => {
				console.log('ADD CARD');
				this.grid.addCard(this.cardSet.cards[i])
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


