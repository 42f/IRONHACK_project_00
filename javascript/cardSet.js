class Card {
	constructor(content) {
		this.cardElement = this.generateCardElement(content);
		this.currentTimeout = null;
		this.state = {
			hidden: true,
			found: false
		}
	}

	getElement() {
		return this.cardElement;
	}

	stopTimeout() {
		clearTimeout(this.currentTimeout);
		this.currentTimeout = null;
	}

	generateCardElement(content) {
		const cardElement = document.createElement('div');
		const pElement = cardElement.appendChild(document.createElement('p'));
		cardElement.classList.add('card');
		pElement.innerText = content;
		pElement.style.visibility = 'hidden';
		cardElement.style.animationDuration = `${Math.round(50 + Math.random() * 250).toString()}ms`;
		cardElement.style.animationDelay = `${Math.round(50 + Math.random() * 750).toString()}ms`;

		return cardElement;
	}

	sneakPeakCard() {
		this.revealCard();
		this.currentTimeout = setTimeout(() => {
			this.hideCard(true);
		}, 1000);
	}

	setEventListenner() {
		this.cardElement.addEventListener('click', () => {this.sneakPeakCard()});
	}

	unsetEventListenner() {
		this.cardElement.removeEventListener('click', () => {this.sneakPeakCard()});
	}

	// shows card to user by manipulating the DOM
	revealCard() {
		this.state.hidden = false;
		this.cardElement.querySelector('p').style.visibility = 'visible';
	}

	// hides card from user, if isFailure adds fail visual effect to it
	hideCard(isFailure) {
		this.state.hidden = true;
		this.cardElement.querySelector('p').style.visibility = 'hidden';
		if (isFailure) {
			this.cardElement.classList.toggle('failure');
			setTimeout(() => {
				this.cardElement.classList.toggle('failure');
			}, 900);
		}
	}

	toggleCardVisibility(isFailure) {
		this.state.hidden ? this.revealCard(isFailure) : this.hideCard();
	}
}


/* CARD SET CLASS ------------------------------------------------------------*/


class CardSetBase {
	constructor(nbOfPairs) {
		this.cards = [];
		this.populateCardSet(nbOfPairs);
		this.setAllEventListenner();
	}

	setAllEventListenner() {
		for(let card of this.cards) {
			card.setEventListenner();
		}
	}

	unsetAllEventListenner() {
		for(let card of this.cards) {
			card.unsetEventListenner();
		}
	}

	// makes as many card as nbOfPairs times 2 and store them in the cards array
	populateCardSet(nbOfPairs) {
		for (let pair = 0; pair < nbOfPairs; pair++) {
			const cardElements = this.makeOneCard();
			this.cards.push(cardElements[0], cardElements[1]);
		}
	}

	// generates one card, each derived class will implement its own factory
	makeOneCard() { }


	// returns true if two cards are from the same paire (i.e. has the same innerHTML)
	cardCmp(cardA, cardB) { }

	// sets card as found by manipulating the DOM and add them to the foundCards array
	validate(card) { }

	logCards() {
		console.log(`CARDS LEN = ${this.cards.length}`);
		console.log('CARDS = ', this.cards);
	}
}

/* CARD SET DERIVED CLASSES --------------------------------------------------*/

class RandomNbrCardSet extends CardSetBase {
	constructor(nbOfPairs) {
		super(nbOfPairs);
	}

	static cardCmp(cardA, cardB) {
		console.log('CMP FUNCTION between:', cardA, cardB);
		const valueA = cardA.cardElement.querySelector('p').innerHTML;
		const valueB = cardB.cardElement.querySelector('p').innerHTML;
		console.log(`compare -> ${valueA} / ${valueB}`);

		return valueA === valueB;
	}

	makeOneCard() {
		let value = Math.floor(Math.random() * 10000);
		// implement do while to make sure cards don't have same value twice
		// do  {
		// } while (this.)
		return [new Card(value), new Card(value)];
	}
}
