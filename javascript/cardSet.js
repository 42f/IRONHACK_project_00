class Card {
	constructor(content) {
		this.htmlElement = this.generateHtmlElement(content);
	}

	generateHtmlElement(content) {
		const template = document.querySelector('#new-card-template');
		const cardElement = template.content.cloneNode(true);
		cardElement.querySelector('div').innerText = content;
		return cardElement;
	}
}

class CardSetBase {
	constructor(nbOfPairs) {
		this.hiddenCards = [];
		this.foundCards = [];
		this.populateCardSet(nbOfPairs);
	}

	// makes as many card as nbOfPairs times 2 and store them in the hiddenCards array
	populateCardSet(nbOfPairs) {
		for (let pair = 0; pair < nbOfPairs; pair++) {
			const cardContent = this.makeOneCard();
			this.hiddenCards.push(cardContent);
			this.hiddenCards.push(cardContent);
		}
	}

	// generates one card, each derived class will implement its own factory
	makeOneCard() {}


	// shows card to user by manipulating the DOM
	// revealCard(card)
	//  {}
	// hides card from user, if isFailure adds fail visual effect to it
	// // hideCard(card, isFailure)
	//  {}

	// returns true if two cards are from the same paire (i.e. has the same innerHTML)
	// // cardCmp(cardA, cardB)
	//  {}

	// sets card as found by manipulating the DOM and add them to the foundCards array
	// validate(card)
	//  {}

	logCards() {
		console.log('Cards Hidden: ', this.hiddenCards)
		console.log('Cards Found: ', this.foundCards)
	}
}

class RandomNbrCardSet extends CardSetBase {
	constructor(nbOfPairs) {
		super(nbOfPairs);
	}


	makeOneCard() {
		return new Card(Math.floor(Math.random() * 100));
	}
}
