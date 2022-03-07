
class Game {
	constructor(level) {
		this.timerElement = document.querySelector('#tourTimer');
		this.lvl = level;
		this.timer = new Timer();
		this.timer.start(() => {
			this.renderTime(this.timer.split());
		});
	}

	renderTime(timeStr) {
		if (this.timerElement) {
			this.timerElement.innerText = timeStr;
		}
	}


}
