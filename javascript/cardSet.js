
/*
===================================================================
-------------------------------------------------------------------
			CARD
-------------------------------------------------------------------
===================================================================
*/


class Card {
	constructor(pairId, content) {
		this.cardElement = this.generateCardElement(content);
		this.sneakPeakTimeout = null;
		this.pairId = pairId;
		this.state = {
			sneakPeak: false,
			hidden: true,
			found: false
		}
	}

	isFound() {	return this.state.found; }
	getElement() {	return this.cardElement; }
	getSneakPeakState() {	return this.state.sneakPeak; }

	setSneakPeak(time) {
		this.state.sneakPeak = true;
		this.revealCard();
		this.sneakPeakTimeout = setTimeout(() => {
			this.unsetSneakPeak();
		}, time);
	}

	unsetSneakPeak() {
		if (this.sneakPeakTimeout) {
			clearTimeout(this.sneakPeakTimeout);
		}
		this.sneakPeakTimeout = null;
		this.state.sneakPeak = false;
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
			this.showFailure();
		}
	}

	showFailure() {
		this.cardElement.classList.add('failure');
		setTimeout(() => {
			this.cardElement.classList.remove('failure');
		}, 200);
	}

	setCardAsFound() {
		this.revealCard();
		this.state.found = true;
		this.cardElement.classList.toggle('success');
	}

	generateCardElement(content) {
		const cardElement = document.createElement('div');
		const pElement = cardElement.appendChild(document.createElement('p'));
		cardElement.classList.add('card');
		pElement.innerHTML = content;
		pElement.classList.add('card-content');
		pElement.style.visibility = 'hidden';
		cardElement.style.animationDuration = `${Math.round(250 + Math.random() *750).toString()}ms`;
		cardElement.style.animationDelay = `${Math.round(50 + Math.random() * 750).toString()}ms`;

		return cardElement;
	}

}


/*
===================================================================
-------------------------------------------------------------------
			CARD SET BASE CLASS
-------------------------------------------------------------------
===================================================================
*/


class CardSetBase {
	constructor(nbOfPairs) {
		this.cards = [];
		this.valuesSet = [];
		this.populateCardSet(nbOfPairs);
	}

	// makes as many card as nbOfPairs times 2 and store them in the cards array
	populateCardSet(nbOfPairs) {
		for (let pairId = 0; pairId < nbOfPairs; pairId++) {
			const cardElements = this.makeOnePair(pairId);
			this.cards.push(cardElements[0], cardElements[1]);
		}
	}

	isAllFound() {
		return !this.cards.some(card => !card.isFound());
	}

	findCard(predicate) {
		return this.cards.find(predicate);
	}

	// // generates one card, each derived class will implement its own factory
	// makeOnePair() { }

	// // generate values for cards
	// populateValueSet(nbOfPairs) { }

	// // returns true if two cards are from the same paire (i.e. has the same innerHTML)
	cardCmp(cardA, cardB) {
		return cardA.pairId === cardB.pairId;
	 }

	revealAllCards() {
		for (const card of this.cards) {
			card.unsetSneakPeak()
			card.revealCard();
		}
	}

	logCards() {
		console.log(`CARDS LEN = ${this.cards.length}`);
		console.log('CARDS = ', this.cards);
	}
}


/*
===================================================================
-------------------------------------------------------------------
			CARD SET CHILDREN CLASSES
-------------------------------------------------------------------
===================================================================
*/

class RandomNbrCardSet extends CardSetBase {
	constructor(nbOfPairs) {
		super(nbOfPairs);
	}

	// populateValueSet(nbOfPairs) {
	// 	for (let i = 0; i < nbOfPairs; i++) {
	// 		let value;
	// 		do {
	// 			value = Math.floor(Math.random() * 10000);
	// 		} while(this.valuesSet.some(v => value === v))
	// 		this.valuesSet.push(value);
	// 	}
	// }

	makeOnePair(pairId) {
		// const value = this.valuesSet.pop();
		const value = Math.floor(Math.random() * 10000);
		return [new Card(pairId, value), new Card(pairId, value)];
	}
}
