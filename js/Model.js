const Model = (function() {
    
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
                this.matrix.data[x][y] = this.cellTypes.EMPTY;
            }
        }
    }
    Model.prototype.getMatrix = function() {
        return this.matrix;
    }

    Model.prototype.advance = function (direction) {
        console.log(direction);
    }
    return Model;
})();