
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
		this.guessCouple = [];

		this.grid = new Grid();
		this.randomNbCardSet = new RandomNbrCardSet(3);

		// this.randomNbCardSet.logCards();
		// this.setCardsInGridRandomly();
		this.setCardsInGridInOrder();

		setTimeout(() => {
			for (let card of this.grid.cards) {
				card.hideCard(false);
			}
		}, 1200);
	}

	setAllEventListenners() {
		for (let card of this.grid.cards) {
			card.revealCard(false);
			card.cardElement.addEventListener('click', () => {
				this.addToGuess(card);
			}, 1000);
		}
	}

	unsetAllEventListenners() {

	}

	setCardsInGridRandomly() {
		const tmpCards = [...this.randomNbCardSet.cards];
		while (tmpCards.length) {
			const randomCard = tmpCards.splice(Math.floor(Math.random() * tmpCards.length), 1);
			this.grid.addCard(randomCard[0]);
		}
	}

	setCardsInGridInOrder() {
		for (let i = 0; i < this.randomNbCardSet.cards.length; i++) {
			this.grid.addCard(this.randomNbCardSet.cards[i]);
		}
	}

	addToGuess(card) {
		this.guessCouple.push(card);
		console.log('add to guess, total guess couple is', this.guessCouple);
		if (this.guessCouple.length < 2) {
			console.log('waiting');
			return 'waiting';
		} else {
			this.randomNbCardSet.unsetAllEventListenner();
			const ret = RandomNbrCardSet.cardCmp(this.guessCouple[0], this.guessCouple[1]) ? 'correct' : 'incorrect';
			console.log(ret);
			this.guessCouple = [];
			return ret;
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


