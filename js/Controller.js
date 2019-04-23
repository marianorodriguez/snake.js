const Controller = (function(){

  Controller.prototype.lastKeyDown = 'ArrowUp';
  Controller.prototype.intervalTimeMS = 800;

  function Controller(model) {
    this.model = model;
    this.interval = setInterval(() => {
      this.model.advance(this.lastKeyDown);
    }, this.intervalTimeMS);

    document.addEventListener('keydown', (e) => {
      if(this.model.canAdvance(e.code)) {
        clearInterval(this.interval);
        this.lastKeyDown = e.code;
        this.model.advance(this.lastKeyDown);
        this.interval = setInterval(() => {
          this.model.advance(this.lastKeyDown);
        }, this.intervalTimeMS);
      }
    }, false);
  }

  return Controller;
})();