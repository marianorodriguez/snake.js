const Controller = (function(){

  Controller.prototype.lastKeyDown = 'ArrowUp';
  Controller.prototype.intervalTimeMS = 400;

  function Controller(model) {
    this.model = model;
    this.interval = setInterval(() => {
      if(this.model.canAdvance(this.lastKeyDown)) {
        this.model.advance(this.lastKeyDown);
      }
    }, this.intervalTimeMS);

    document.addEventListener('keydown', (e) => {
      if(this.model.canAdvance(e.code)) {
        this.lastKeyDown = e.code;
        this.model.advance(this.lastKeyDown);
      }
    }, false);
  }

  return Controller;
})();