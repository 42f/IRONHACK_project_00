
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
		document.addEventListener('click', (event) => { this.clickHandler(event) });
		this.timerBip = new Audio('./media/audio/bip.mp3');
		this.timerElement = document.querySelector('#tourTimer');

		this.timer = new Countdown();
		this.lvl = level;
		this.guessCouple = [];

		this.grid = new Grid();
		this.cardSet = new RandomNbrCardSet(3);

		// this.cardSet.logCards();
		// this.setCardsInGridRandomly();
		this.setCardsInGridInOrder();

		setTimeout(() => {
			for (let card of this.grid.cards) {
				card.hideCard(false);
			}
		}, 1200);
	}


	/* GRID MANIPULATION METHODS -----------------------------------------------*/

	setCardsInGridRandomly() {
		const tmpCards = [...this.cardSet.cards];
		while (tmpCards.length) {
			const randomCard = tmpCards.splice(Math.floor(Math.random() * tmpCards.length), 1);
			this.grid.addCard(randomCard[0]);
		}
	}

	setCardsInGridInOrder() {
		for (let i = 0; i < this.cardSet.cards.length; i++) {
			this.grid.addCard(this.cardSet.cards[i]);
		}
	}

	/* USER INTERACTIONS         -----------------------------------------------*/

	clickHandler(event) {
		if (event.target.classList.contains('card')) {
			const cardElement = this.cardSet.cards.find(elem => {
				return elem.getElement() === event.target
			});
			cardElement.sneakPeakCard();
		}
	}

	addToGuess(card) {
		this.guessCouple.push(card);
		console.log('add to guess, total guess couple is', this.guessCouple);
		if (this.guessCouple.length < 2) {
			console.log('waiting');
			return 'waiting';
		} else {
			const ret = RandomNbrCardSet.cardCmp(this.guessCouple[0], this.guessCouple[1]) ? 'correct' : 'incorrect';
			console.log(ret);
			this.guessCouple = [];
			return ret;
		}
	}

	/* TIMER MANIPULATIONS       -----------------------------------------------*/

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


