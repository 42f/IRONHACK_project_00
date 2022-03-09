
/*
===================================================================
-------------------------------------------------------------------
			CARD
-------------------------------------------------------------------
===================================================================
*/


class Card {
	constructor(content) {
		this.cardElement = this.generateCardElement(content);
		this.sneakPeakTimeout = null;
		this.state = {
			sneakPeak: false,
			hidden: true,
			found: false
		}
	}

	isFound() {	return this.state.found; }
	getElement() {	return this.cardElement; }
	getSneakPeakState() {	return this.state.sneakPeak; }

	setSneakPeak() {
		this.state.sneakPeak = true;
		this.revealCard();
		this.sneakPeakTimeout = setTimeout(() => {
			this.unsetSneakPeak();
		}, 1000);
	}

	unsetSneakPeak() {
		this.state.sneakPeak = false;
		if (this.sneakPeakTimeout) {
			clearTimeout(this.sneakPeakTimeout);
			this.sneakPeakTimeout = null;
		}
	}

	generateCardElement(content) {
		const cardElement = document.createElement('div');
		const pElement = cardElement.appendChild(document.createElement('p'));
		cardElement.classList.add('card');
		pElement.innerText = content;
		pElement.classList.add('card-content');
		pElement.style.visibility = 'hidden';
		cardElement.style.animationDuration = `${Math.round(50 + Math.random() * 250).toString()}ms`;
		cardElement.style.animationDelay = `${Math.round(50 + Math.random() * 750).toString()}ms`;

		return cardElement;
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
		}, 300);
	}

	toggleCardVisibility(isFailure) {
		this.state.hidden ? this.revealCard(isFailure) : this.hideCard();
	}

	setCardAsFound() {
		this.revealCard();
		this.state.found = true;
		this.cardElement.classList.toggle('success');
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
		this.populateCardSet(nbOfPairs);
		// this.setAllEventListenner();
	}

	// makes as many card as nbOfPairs times 2 and store them in the cards array
	populateCardSet(nbOfPairs) {
		for (let pair = 0; pair < nbOfPairs; pair++) {
			const cardElements = this.makeOnePair();
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


	// // returns true if two cards are from the same paire (i.e. has the same innerHTML)
	// cardCmp(cardA, cardB) { }

	revealAllCards() {
		for (const card of this.cards) {
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

	cardCmp(cardA, cardB) {
		// console.log('CMP FUNCTION between:', cardA, cardB);
		const valueA = cardA.cardElement.querySelector('p').innerHTML;
		const valueB = cardB.cardElement.querySelector('p').innerHTML;
		console.log(`compare -> ${valueA} / ${valueB}`);

		return valueA === valueB;
	}

	makeOnePair() {
		let value = Math.floor(Math.random() * 10000);
		// implement do while to make sure cards don't have same value twice
		// do  {
		// } while (this.)
		return [new Card(value), new Card(value)];
	}
}
