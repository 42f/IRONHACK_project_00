const state = {
	displayInfos: false,
	volume: localStorage.getItem('volume') === 'true' ? true : false,
	splash: false
}

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

function startGame(event) {
	const game = new Game(event.target.dataset.lvl);
	document.querySelector('#volume')?.addEventListener('click', () => {toggleVolume(game)});
	setGameVolume(game);
	toggleSplashScreen();
	game.startGame(event);
}

function main() {
	toggleSplashScreen();
	renderVolumeBtn();

	document.querySelector('#info-btn')?.addEventListener('click', toggleInfos);

	const levelButtons = document.querySelectorAll('#splash .button');
	levelButtons.forEach(btn => btn.addEventListener('click', startGame));
}

main();
