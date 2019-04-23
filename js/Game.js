const GameStatus = {
    'IDLE': 0,
    'PLAYING': 1,
    'PAUSED': 2,
    'LOST': 3,
}

const Game = {
    status: GameStatus.IDLE,
    interval: null,
    gameSpeed: 800,
    start() {
        if (this.status === GameStatus.PAUSED) {
            this.status = GameStatus.PLAYING;
            return;
        }
        this.initGame();
        this.status = GameStatus.PLAYING;
    },
    initGame() {
        this.model = new Model(50, 50);
        this.view = new View(this.model.getMatrix());
        this.controller = new Controller(this.model);
    },
}