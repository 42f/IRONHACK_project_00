

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

		this.guessTimeoutId = null;
		this.guessCouple = [];
		this.state = {
			soundOn: true,
			timeOver: false,
			score: 0,
			lvl: level,
			win: false
		}

		this.countdown = new Countdown();
		this.grid = new Grid();
		this.cardSet = new RandomNbrCardSet(8);

		// this.cardSet.logCards();
		// this.setCardsInGridRandomly();
		this.setCardsInGridInOrder();
	}

	/* USER INTERACTIONS         -----------------------------------------------*/

	isValidClick(event) {
		return event.target.classList.contains('card')
			&& !event.target.classList.contains('success')
			&& this.guessCouple.length < 2
			&& !this.state.timeOver
			&& !this.state.win;
	}

	clickHandler(event) {
		if (this.isValidClick(event)) {
			const clickedCard = this.cardSet.findCard(elem =>
				elem.getElement() === event.target
			);
			if (clickedCard && !clickedCard.getSneakPeakState()) {
				clickedCard.setSneakPeak();
				this.addToGuess(clickedCard);
			}
		}
	}

	addToGuess(card) {
		if (this.guessCouple.length < 2) {
			this.guessCouple.push(card);
			this.guessCouple.length < 2 ? this.waitForSecondCard() : this.checkGuess();
		}
	}

	checkGuess() {
		this.clearWaiting();
		const sameCards = this.cardSet.cardCmp(this.guessCouple[0], this.guessCouple[1]);
		sameCards ? this.manageCorrectGuess() : this.abortGuess(true);
	}

	waitForSecondCard() {
		this.guessTimeoutId = setTimeout(() => {
			this.abortGuess(true);
		}, 1500);
	}

	clearWaiting() {
		if (this.guessTimeoutId) {
			clearInterval(this.guessTimeoutId);
			this.guessTimeoutId = null;
		}
	}

	abortGuess(isFailure) {
		if (isFailure) {
			this.guessCouple.forEach(card => {
				card.unsetSneakPeak();
				setTimeout(() => {
					if (!this.state.timeOver) {
						card.hideCard(true);
					}
					this.guessCouple = [];
				}, 800);
			})
		}	 else {
			this.guessCouple = [];
		}
	}

	manageCorrectGuess() {
		clearTimeout(this.guessTimeoutId);
		this.guessTimeoutId = null;

		this.guessCouple.forEach(card => card.setCardAsFound())
		this.incrementScore();
		this.guessCouple = [];
		this.nextTour();
	}

	incrementScore() {
		this.state.score++;
		this.scoreElement.innerText = this.state.score;
	}

	nextTour() {
		this.countdown.stop();
		this.startTimer();
		console.log('next tour', this.cardSet.isAllFound());
		if (this.cardSet.isAllFound()) {
			this.endGame('win');
		}
	}

	/* GRID MANIPULATION METHODS -----------------------------------------------*/

	setCardsInGridRandomly() {
		const tmpCards = [...this.cardSet.cards];
		while (tmpCards.length) {
			const randomIndex = Math.floor(Math.random() * tmpCards.length);
			const randomCard = tmpCards.splice(randomIndex, 1);
			this.grid.addCard(randomCard[0]);
		}
	}

	// for debug purposes
	setCardsInGridInOrder() {
		for (let i = 0; i < this.cardSet.cards.length; i++) {
			this.grid.addCard(this.cardSet.cards[i]);
		}
	}

	/* TIMER MANIPULATIONS       -----------------------------------------------*/

	startTimer() {
		this.countdown.start(121, () => {
			this.timerCallback()
		});
	}

	timerCallback() {
		if (!this.state.timeOver) {
			this.renderTime(this.countdown.getRemainingSeconds(), this.countdown.split());
			if(this.countdown.getRemainingSeconds() <= 0) {
				this.state.timeOver = true;
				this.endGame();
			}
		}
	}

	startGame() {
		this.startTimer();
	}

	endGame(hasWin) {
		if (hasWin && hasWin === 'win') {
			this.state.win = true;
			this.timerElement.classList.remove('countdown-reach-limit');
			this.timerElement.classList.add('countdown-win');
		} else {
			console.log('GAME OVER');
		}
		this.clearWaiting();
		this.countdown.stop();
		this.cardSet.revealAllCards();
	}

	setVolume(muted) {this.timerBip.muted = muted}

	renderTime(remainingSeconds, timeStr) {
		if (remainingSeconds >= 0) {
			this.timerElement.innerText = timeStr;
			if (remainingSeconds < 25) {
				this.timerElement.classList.toggle('countdown-reach-limit');
				// play bip warning the end ofcountdown
				if (this.timerBip && !this.timerBip.muted && remainingSeconds <= 10) {
					this.timerBip.play().catch((e) => {});
				}
			}
		} else {
			this.timerElement.classList.add('countdown-reach-limit');
		}
	}
}


