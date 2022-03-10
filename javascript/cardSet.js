
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

	isFound() { return this.state.found; }
	getElement() { return this.cardElement; }
	getSneakPeakState() { return this.state.sneakPeak; }

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
		if (content) {
			pElement.innerHTML = content;
		}
		pElement.classList.add('card-content');
		pElement.style.visibility = 'hidden';
		cardElement.style.animationDuration = `${Math.round(250 + Math.random() * 750).toString()}ms`;
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
	constructor() {
		this.cards = [];
	}

	getName() { return this.name; };
	isAllFound() { return !this.cards.some(card => !card.isFound()); }
	findCard(predicate) { return this.cards.find(predicate); }
	cardCmp(cardA, cardB) { return cardA.pairId === cardB.pairId; }

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
		this.name = 'Random numbers'
		this.valuesSet = [];
		this.populateValueSet(nbOfPairs);
		this.populateCardSet(nbOfPairs);
	}

	// makes as many value as nbOfPairs times 2 and store them in the valueSet
	// array only when it does not already exist
	populateValueSet(nbOfPairs) {
		for (let i = 0; i < nbOfPairs; i++) {
			let value;
			do {
				value = this.makeOneValue();
			} while (this.valuesSet.some(v => value === v))
			this.valuesSet.push(value);
		}
	}

	// makes as many card as nbOfPairs times 2 and store them in the cards array
	populateCardSet(nbOfPairs) {
		for (let pairId = 0; pairId < nbOfPairs; pairId++) {
			const cardElements = this.makeOnePair(pairId, this.valuesSet.pop());
			this.cards.push(cardElements[0], cardElements[1]);
		}
	}

	makeOneValue() {
		return Math.floor(Math.random() * (100));
	}

	makeOnePair(pairId, value) {
		return [new Card(pairId, value), new Card(pairId, value)];
	}
}


class randomColorCardSet extends CardSetBase {
	constructor(nbOfPairs) {
		super();
		this.colors = [
			'crimson',
			'black',
			'silver',
			'gray',
			'white',
			'maroon',
			'red',
			'purple',
			'fuchsia',
			'green',
			'lime',
			'olive',
			'yellow',
			'navy',
			'blue',
			'teal',
			'aqua'
		]
		this.populateCardSet(nbOfPairs);
		this.name = 'Random CSS colors'
	}

	setColorElementInCard(card) {
		const pColorElement = card.getElement().querySelector('p');
		const colorDiv = document.createElement('div');

		colorDiv.style.width = '50px'
		colorDiv.style.height = '50px'
		colorDiv.style.borderRadius = '25px'
		colorDiv.style.backgroundColor = pColorElement.innerHTML;
		pColorElement.innerHTML = '';
		pColorElement.appendChild(colorDiv);
	}

	generateValue() {
		const randomIndex = Math.floor(Math.random() * this.colors.length);
		return this.colors.splice(randomIndex, 1)[0];
	}

	populateCardSet(nbOfPairs) {
		for (let pairId = 0; pairId < nbOfPairs && this.colors.length; pairId++) {

			const value = this.generateValue();
			const pair = this.makeOnePair(pairId, value);
			this.setColorElementInCard(pair[0]);


			this.cards.push(pair[0], pair[1]);
		}
	}

	makeOnePair(pairId, value) {
		return [new Card(pairId, value), new Card(pairId, value)];
	}
}



