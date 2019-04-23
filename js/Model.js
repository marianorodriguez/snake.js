const Model = (function() {
    Model.prototype.lastDirection = null;
    
    Model.prototype.cellTypes = {
        EMPTY: 0,
        SNAKE_HEAD: 1,
        SNAKE_BODY: 2,
        DOT: 3,
    }

    function Model(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = {
            data: new Array(this.rows),
            updated: new GameEvent(this),
        }
        for (let x=0; x < this.rows; x++) {
            this.matrix.data[x] = new Array(this.cols);
        }
        
        for (let x=0; x < this.rows; x++) {
            for (let y=0; y < this.cols; y++) {
                this.matrix.data[x][y] = this.cellTypes.EMPTY
            }
        }

        this.actualPosition = [Math.floor(rows / 2), Math.floor(cols / 2)];
        this.matrix.data[this.actualPosition[0]][this.actualPosition[1]] = this.cellTypes.SNAKE_HEAD;
        
        this.dotPosition = this.getRandomEmptyPosition();
        this.matrix.data[this.dotPosition[0]][this.dotPosition[1]] = this.cellTypes.DOT;
    }

    Model.prototype.getRandomEmptyPosition = function() {
        let ranX, ranY;
        do {
            ranX = Math.floor(Math.random() * this.rows);
            ranY = Math.floor(Math.random() * this.cols);
        } while (this.matrix.data[ranX][ranY] !== this.cellTypes.EMPTY);

        return [ranX, ranY];
    }

    Model.prototype.getMatrix = function() {
        return this.matrix;
    }

    Model.prototype.canAdvance = function(code) {
        return Game.status === GameStatus.PLAYING &&
            (
                code === 'ArrowUp' && this.lastDirection !== 'ArrowDown'
                || code === 'ArrowDown' && this.lastDirection !== 'ArrowUp'
                || code === 'ArrowRight' && this.lastDirection !== 'ArrowLeft'
                || code === 'ArrowLeft' && this.lastDirection !== 'ArrowRight'
            )
    }
    
    Model.prototype.advance = function (direction) {
        const [lastX, lastY] = this.actualPosition;
        this.matrix.data[lastX][lastY] = this.cellTypes.EMPTY;
        if(direction === 'ArrowUp') {
            this.actualPosition[0] -= 1;
        }
        if(direction === 'ArrowDown') {
            this.actualPosition[0] += 1;
        }
        if(direction === 'ArrowLeft') {
            this.actualPosition[1] -= 1;
        }
        if(direction === 'ArrowRight') {
            this.actualPosition[1] += 1;
        }
        this.verifyGameStatus();
        if(Game.status === GameStatus.PLAYING) {
            this.matrix.data[this.actualPosition[0]][this.actualPosition[1]] = this.cellTypes.SNAKE_HEAD;
            this.matrix.data[this.dotPosition[0]][this.dotPosition[1]] = this.cellTypes.DOT;
            this.lastDirection = direction;
            this.matrix.updated.notify();
        }
    }
    Model.prototype.verifyGameStatus = function() {
        if(
            this.actualPosition[0] < 0 || this.actualPosition[0] >= this.rows
            || this.actualPosition[1] < 0 || this.actualPosition[1] >= this.cols
        ) {
            Game.changeStatus(GameStatus.LOST);
        }

        if(this.actualPosition[0] === this.dotPosition[0] && this.actualPosition[1] === this.dotPosition[1]) {
            this.dotPosition = this.getRandomEmptyPosition();
        }
    }

    return Model;
})();