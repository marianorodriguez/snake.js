const View = (function() {
    View.prototype.cellTypes = {
        0: 'empty',
        1: 'snake-head',
        2: 'snake-body',
        3: 'dot',
    }
    function View(matrix) {
        this.matrix = matrix;
        this.rows = matrix.data.length;
        this.cols = matrix.data[0].length;
        Game.statusEvent.attach(this.statusChange.bind(this));
        this.matrix.updated.attach(this.matrixUpdated.bind(this));
        
        const boardElm = document.getElementById('board');
        this.table = document.createElement('table');
        boardElm.innerHTML = '';
        boardElm.appendChild(this.table);
        for(let i = 0; i < this.rows; i++) {
            let row = this.table.insertRow();
            for(let j = 0; j < this.cols ; j++) {
                let cell = row.insertCell();
                cell.className = 'empty';
            }
        }
    }
    View.prototype.statusChange = function(source, status) {
        if (status === GameStatus.PAUSED) {
            this.table.className = 'paused';
        } else if (status === GameStatus.PLAYING) {
            this.table.className = 'playing';
        } else if (status === GameStatus.LOST) {
            this.table.className = 'lost';
        }
    }

    View.prototype.matrixUpdated = function() {
        for(let x = 0; x < this.rows; x++) {
            for(let y = 0; y < this.cols; y++) {
                this.table.rows[x].cells[y].className = this.cellTypes[this.matrix.data[x][y]];
            }
        }
    }
    return View;
})();