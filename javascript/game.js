

/*
===================================================================
-------------------------------------------------------------------
			GRID
-------------------------------------------------------------------
===================================================================
*/


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


/*
===================================================================
-------------------------------------------------------------------
			GAME
-------------------------------------------------------------------
===================================================================
*/


class Game {
	constructor(level) {
		document.addEventListener('click', (event) => { this.clickHandler(event) });
		this.timerBip = new Audio('./media/audio/bip.mp3');
		this.timerElement = document.querySelector('#tourTimer');
		this.scoreElement = document.querySelector('#score');

		this.timer = new Countdown();
		this.guessCouple = [];
		this.state = {
			timeOut: false,
			score: 0,
			lvl: level,
		}

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

	/* USER INTERACTIONS         -----------------------------------------------*/

	validClic(event) {
		return event.target.classList.contains('card')
			&& this.guessCouple.length < 2
			&& !this.state.timeOut;
	}

	clickHandler(event) {
		if (this.validClic(event)) {
			const clickedCard = this.cardSet.cards.find(elem =>
				elem.getElement() === event.target
			);
			if (clickedCard && !clickedCard.getSneakPeakState()) {
				clickedCard.sneakPeakCard();
				this.addToGuess(clickedCard);
			}
		}
	}

	addToGuess(card) {
		this.guessCouple.push(card);
		if (this.guessCouple.length < 2) {
			console.log('waiting');
			setTimeout(() => {
				this.guessCouple = [];
			}, 1000);
			return 'waiting';
		} else {
			const sameCards = RandomNbrCardSet.cardCmp(this.guessCouple[0], this.guessCouple[1]);
			console.log(sameCards ? 'correct' : 'incorrect');
			if (sameCards) {
				this.guessCouple.forEach(card => card.setCardAsFound())
				this.incrementScore();
			}
			this.guessCouple = [];
			return sameCards ? 'correct' : 'incorrect';
		}
	}


	incrementScore() {
		this.state.score++;
		this.scoreElement.innerText = this.state.score;
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

	/* TIMER MANIPULATIONS       -----------------------------------------------*/

	startTimer() {
		this.timer.start(999, () => {
			this.renderTime(this.timer.getRemainingSeconds(), this.timer.split());
			if (!this.state.timeOut && this.timer.getRemainingSeconds() <= 0) {
				this.state.timeOut = true;
			}
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


