const GameStatus = {
    'PLAYING': 1,
    'PAUSED': 2,
    'LOST': 3,
}

const Game = {
    status: GameStatus.PAUSED,
    statusEvent: new GameEvent(this),
    interval: null,
    start() {
        if (this.status === GameStatus.PAUSED) {
            this.changeStatus(GameStatus.PLAYING);
        }
    },
    togglePause() {
        if(this.status === GameStatus.PLAYING) {
            this.changeStatus(GameStatus.PAUSED);
        } else if (this.status === GameStatus.PAUSED) {
            this.changeStatus(GameStatus.PLAYING);
        }
    },
    initGame() {
        this.model = new Model(25, 25);
        this.view = new View(this.model);
        this.controller = new Controller(this.model);
        this.model.matrix.updated.notify();
        this.changeStatus(GameStatus.PLAYING);
    },
    changeStatus(status) {
        this.status = status;
        this.statusEvent.notify(this.status);
    }
}