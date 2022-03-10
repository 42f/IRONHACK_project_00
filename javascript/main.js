const state = {
	displayInfos: false,
	volume: localStorage.getItem('volume') === 'true' ? true : false,
	splash: false,
	replay: false
}

let currentGame;

function setVisibility(element, visibilityProperty) {
	element.style.visibility = visibilityProperty;
}

function toggleInfos() {
	state.displayInfos = !state.displayInfos;
	const infosModal = document.querySelector('#infos');
	state.displayInfos ? setVisibility(infosModal, 'visible') : setVisibility(infosModal, 'hidden')
}

function toggleSplashScreen() {
	state.splash = !state.splash;
	const splashModal = document.querySelector('#splash');
	state.splash ? setVisibility(splashModal, 'visible') : setVisibility(splashModal, 'hidden')
}

function toggleReplayScreen(result) {
	state.replay = !state.replay;
	const replayModal = document.querySelector('#replay');
	state.replay ? setVisibility(replayModal, 'visible') : setVisibility(replayModal, 'hidden')
	const resultElement = document.querySelector('.game-result p');
	const content = result === 'won' ? 'YOU WON 🎉' : 'YOU LOST 🤷‍♂️'
	resultElement.innerHTML = content;
}

function toggleVolume(game) {
	state.volume = !state.volume;
	localStorage.setItem('volume', state.volume);
	setGameVolume(game);
	renderVolumeBtn();
}

function setGameVolume(game) {
	if (game) {
		game.setVolume(!state.volume);
	}
}

function renderVolumeBtn() {
	const mutted = document.querySelector('#muteOn');
	const unmutted = document.querySelector('#muteOff');
	setVisibility(mutted, 'hidden')
	setVisibility(unmutted, 'hidden')
	const showBtn = state.volume ? unmutted : mutted;
	setVisibility(showBtn, 'visible')
}

function restartGame() {
	if (currentGame) {
		delete currentGame;
	}
	toggleReplayScreen();
	toggleSplashScreen();
}

async function startGame(event) {
	currentGame = new Game(event.target.dataset.lvl);
	setGameVolume(currentGame);
	toggleSplashScreen();
	await currentGame.startGame(event)
		.then(() => toggleReplayScreen('won'))
		.catch(() => toggleReplayScreen('lost'));
}

function clickHandler(event) {

	switch (event.target.id) {
		case 'muteOn':
		case 'muteOff':
			toggleVolume(currentGame);
			break;

		case 'btn-play':
			startGame(event);
			break;

		case 'btn-infos':
			toggleInfos();
			break;

		case 'btn-see-cards':
			toggleReplayScreen();
			break;

		case 'btn-replay':
			restartGame();
			break;
	}
}

function main() {
	toggleSplashScreen();
	document.addEventListener('click', (event) => clickHandler(event));
	renderVolumeBtn();
}

main();
