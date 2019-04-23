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
        this.actualPosition = [Math.floor(rows / 2), Math.floor(cols / 2)];
        this.matrix = {
            data: new Array(this.rows),
            updated: new GameEvent(this),
        }
        for (let x=0; x < this.rows; x++) {
            this.matrix.data[x] = new Array(this.cols);
        }
    
        for (let x=0; x < this.rows; x++) {
            for (let y=0; y < this.cols; y++) {
                if (this.actualPosition[0] === x && this.actualPosition[1] === y) {
                    this.matrix.data[x][y] = this.cellTypes.SNAKE_HEAD;
                } else {
                    this.matrix.data[x][y] = this.cellTypes.EMPTY;
                }
            }
        }
    }
    Model.prototype.getMatrix = function() {
        return this.matrix;
    }
    
    Model.prototype.advance = function (direction) {
        const [lastX, lastY] = this.actualPosition;
        if(direction === 'ArrowUp' && this.lastDirection !== 'ArrowDown') {
            this.actualPosition[0] -= 1;
        }
        if(direction === 'ArrowDown' && this.lastDirection !== 'ArrowUp') {
            this.actualPosition[0] += 1;
        }
        if(direction === 'ArrowLeft' && this.lastDirection !== 'ArrowRight') {
            this.actualPosition[1] -= 1;
        }
        if(direction === 'ArrowRight' && this.lastDirection !== 'ArrowLeft') {
            this.actualPosition[1] += 1;
        }
        this.matrix.data[lastX][lastY] = this.cellTypes.EMPTY;
        this.matrix.data[this.actualPosition[0]][this.actualPosition[1]] = this.cellTypes.SNAKE_HEAD;
        if(lastX !== this.actualPosition[0] || lastY !== this.actualPosition[1]) {
            this.lastDirection = direction;
        }
        this.matrix.updated.notify();
    }
    return Model;
})();