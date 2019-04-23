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
            this.changeStatus(GameStatus.PLAYING);
            return;
        }
        this.initGame();
        this.changeStatus(GameStatus.PLAYING);
    },
    togglePause() {
        if(this.status === GameStatus.PLAYING) {
            this.changeStatus(GameStatus.PAUSED);
        } else {
            this.changeStatus(GameStatus.PLAYING);
        }
    },
    initGame() {
        this.model = new Model(50, 50);
        this.view = new View(this.model.getMatrix());
        this.controller = new Controller(this.model);
    },
    changeStatus(status) {
        this.status = status;
        this.statusEvent.notify(this.status);
    }
}