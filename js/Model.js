const Model = (function() {
    Model.prototype.lastDirection = 'ArrowUp';
    
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
        this.dotEaten = new GameEvent(this);
        this.clearMatrix();

        this.actualPosition = [Math.floor(rows / 2), Math.floor(cols / 2)];
        this.matrix.data[this.actualPosition[0]][this.actualPosition[1]] = this.cellTypes.SNAKE_HEAD;
        
        this.tailLength = 2;
        this.tailPosition = [];
        for (let i = 0; i < this.tailLength; i++) {
            this.tailPosition.push([this.actualPosition[0] + i + 1, this.actualPosition[1]]);
            this.matrix.data[this.actualPosition[0] + i + 1][this.actualPosition[1]] = this.cellTypes.SNAKE_BODY;
        }
        
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
    Model.prototype.clearMatrix = function() {
        for (let x=0; x < this.rows; x++) {
            this.matrix.data[x] = new Array(this.cols);
        }
        
        for (let x=0; x < this.rows; x++) {
            for (let y=0; y < this.cols; y++) {
                this.matrix.data[x][y] = this.cellTypes.EMPTY
            }
        }
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
        const lastHeadPosition = Object.assign([], this.actualPosition);
        this.actualPosition = this.calculateMovement(this.actualPosition, direction);
        this.verifyGameStatus();
        if(Game.status === GameStatus.PLAYING) {
            this.clearMatrix();
            
            this.matrix.data[this.actualPosition[0]][this.actualPosition[1]] = this.cellTypes.SNAKE_HEAD;

            this.tailPosition = this.calculateTailPosition(lastHeadPosition);
            this.tailPosition.forEach(position => {
                this.matrix.data[position[0]][position[1]] = this.cellTypes.SNAKE_BODY;
            });

            this.matrix.data[this.dotPosition[0]][this.dotPosition[1]] = this.cellTypes.DOT;
            
            this.lastDirection = direction;
            this.matrix.updated.notify();
        }
    }

    Model.prototype.calculateMovement = function(position, direction) {
        if(direction === 'ArrowUp') {
            position[0] -= 1;
        }
        if(direction === 'ArrowDown') {
            position[0] += 1;
        }
        if(direction === 'ArrowLeft') {
            position[1] -= 1;
        }
        if(direction === 'ArrowRight') {
            position[1] += 1;
        }
        return position;
    }
    Model.prototype.calculateTailPosition = function(lastHeadPosition) {
        let to = lastHeadPosition;
        for(let i = 0; i < this.tailPosition.length; i ++) {
            const tmpPosition = Object.assign([], this.tailPosition[i]);
            this.tailPosition[i] = lastHeadPosition;
            lastHeadPosition = tmpPosition;
        }
        if(this.tailLength > this.tailPosition.length) {
            this.tailPosition.push(lastHeadPosition);
        }
        return this.tailPosition;
    }

    Model.prototype.verifyGameStatus = function() {
        const [actualX, actualY] = this.actualPosition;
        if(
            actualX < 0 || actualX >= this.rows
            || actualY < 0 || actualY >= this.cols
            || this.matrix.data[actualX][actualY] === this.cellTypes.SNAKE_BODY
        ) {
            Game.changeStatus(GameStatus.LOST);
        }

        if(this.actualPosition[0] === this.dotPosition[0] && this.actualPosition[1] === this.dotPosition[1]) {
            this.tailLength += 1;
            this.dotPosition = this.getRandomEmptyPosition();
            this.dotEaten.notify();
        }
    }

    return Model;
})();