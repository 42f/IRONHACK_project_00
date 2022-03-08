class Card {
	constructor(content) {
		this.cardElement = this.generateCardElement(content);
		this.state = {
			hidden: false,
			found: false
		}
	}

	getElement() {
		return this.cardElement;
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
	// shows card to user by manipulating the DOM
	revealCard() {
		this.cardElement.querySelector('p').style.visibility = 'visible';
		console.log('revealCard');
	}
	// hides card from user, if isFailure adds fail visual effect to it
	hideCard(isFailure) {
		this.cardElement.querySelector('p').style.visibility = 'hidden';
		console.log('hideCard', isFailure);
	}

	toggleCardVisibility(isFailure) {
		this.state.hidden = !this.state.hidden;
		this.state.hidden ? this.hideCard(isFailure) : this.revealCard();
	}
}

class CardSetBase {
	constructor(nbOfPairs) {
		this.cards = [];
		this.populateCardSet(nbOfPairs);
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

class RandomNbrCardSet extends CardSetBase {
	constructor(nbOfPairs) {
		super(nbOfPairs);
	}


	makeOneCard() {
		let value = Math.floor(Math.random() * 10000);
		// implement do while to make sure cards don't have same value twice
		// do  {
		// } while (this.)
		return [new Card(value), new Card(value)];
	}
}
