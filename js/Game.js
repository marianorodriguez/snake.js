const GameStatus = {
    'IDLE': 0,
    'PLAYING': 1,
    'PAUSED': 2,
    'LOST': 3,
}

const Game = {
    status: GameStatus.IDLE,
    statusChanged: null,
    interval: null,
    gameSpeed: 800,
    start() {
        if (this.status === GameStatus.PAUSED) {
            this.status = GameStatus.PLAYING;
            this.statusChanged.notify(this.status);
            return;
        }
        this.initGame();
        this.status = GameStatus.PLAYING;
        this.statusChanged.notify(this.status);
    },
    pause() {
        if (this.status !== GameStatus.PAUSED) {
            this.status = GameStatus.PAUSED;
            this.statusChanged.notify(this.status);
        }
    },
    initGame() {
        this.statusChanged = new GameEvent(this);
        this.model = new Model(50, 50);
        this.view = new View(this.model.getMatrix());
    },
}