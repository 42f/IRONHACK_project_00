class Card {
	constructor(content) {
		this.cardElement = this.generateCardElement(content);
		this.state = {
			hidden: true,
			found: false
		}
	}

	getElement() {
		return this.cardElement ;
	}

	generateCardElement(content) {
		const cardElement = document.createElement('div');
		cardElement.classList.add('card');
		cardElement.innerText = content;

		cardElement.style.animationDuration = `${Math.round(50 + Math.random() * 250).toString()}ms`;
		cardElement.style.animationDelay = `${Math.round(50 + Math.random() * 750).toString()}ms`;

		return cardElement;
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
			const cardContent = this.makeOneCard();
			this.cards.push(cardContent, cardContent);
		}
	}

	// generates one card, each derived class will implement its own factory
	makeOneCard() { }


	// shows card to user by manipulating the DOM
	revealCard(card) { }
	// hides card from user, if isFailure adds fail visual effect to it
	hideCard(card, isFailure) { }

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
		let card;
		do  {
			card = new Card(Math.floor(Math.random() * 100));
		} while (this.h)
		return new Card(Math.floor(Math.random() * 100));
	}
}
