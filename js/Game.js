const GameStatus = {
    'IDLE': 0,
    'PLAYING': 1,
    'PAUSED': 2,
    'LOST': 3,
}

const Game = {
    status: GameStatus.IDLE,
    statusEvent: new GameEvent(this),
    interval: null,
    gameSpeed: 800,
    start() {
        if (this.status === GameStatus.PAUSED) {
            this.status = GameStatus.PLAYING;
            this.statusEvent.notify(this.status);
            return;
        }
        this.initGame();
        this.status = GameStatus.PLAYING;
        this.statusEvent.notify(this.status);
    },
    togglePause() {
        if(this.status === GameStatus.PLAYING) {
            this.status = GameStatus.PAUSED;
        } else {
            this.status = GameStatus.PLAYING;
        }
        this.statusEvent.notify(this.status);
    },
    initGame() {
        this.model = new Model(50, 50);
        this.view = new View(this.model.getMatrix());
        this.controller = new Controller(this.model);
    },
}