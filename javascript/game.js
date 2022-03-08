
class Grid {
	constructor() {
		this.gridElement = document.querySelector('#grid');
		this.cards = [];
	}

	addCard(cardElement) {
		const newLen = this.cards.push(cardElement);
		this.gridElement.appendChild(this.cards[newLen - 1].getElement());
	}

}

class Game {
	constructor(level) {

		this.timerBip = new Audio('./media/audio/bip.mp3');
		this.timerElement = document.querySelector('#tourTimer');

		this.timer = new Countdown();

		this.lvl = level;

		this.grid = new Grid();
		this.randomNbCardSet = new RandomNbrCardSet(12);
		this.randomNbCardSet.logCards();

		const tmpCards = [...this.randomNbCardSet.cards];
		while (tmpCards.length) {
			const randomCard = tmpCards.splice(Math.floor(Math.random() * tmpCards.length), 1);
			this.grid.addCard(randomCard[0]);
		}
		for (let card of this.grid.cards) {
			console.log(card);
			card.toggleCardVisibility(false);
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


