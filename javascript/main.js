
// detect mobile client

// if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
//   // true for mobile device
//   document.write("mobile device");
// }else{
//   // false for not mobile device
//   document.write("not mobile device");
// }

const state = {
	displayInfos: false,
	volume: true,
	splash: false
}

const game = new Game(1);
game.startGame();

// const audioBip = document.querySelector('#audio-bip');
// console.log(audioBip.innerHTML);

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

function toggleVolume() {
	state.volume = !state.volume;
	const mutted = document.querySelector('#muteOn');
	const unmutted = document.querySelector('#muteOff');
	if (game) {
		game.setVolume(!state.volume);
	}
	if (state.volume) {
		setVisibility(unmutted, 'visible')
		setVisibility(mutted, 'hidden')
	} else {
		setVisibility(mutted, 'visible')
		setVisibility(unmutted, 'hidden')
	}
}

function startGame(event) {
	// const game = new Game(event.target.dataset.lvl);

	// toggleSplashScreen();

}

toggleVolume();

// Commented for debug
// toggleSplashScreen();


document.querySelector('#info-btn')?.addEventListener('click', toggleInfos);
document.querySelector('#volume')?.addEventListener('click', toggleVolume);
const levelButtons = document.querySelectorAll('#splash .button');
levelButtons.forEach(btn => btn.addEventListener('click', startGame));
