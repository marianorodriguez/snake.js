const Controller = (function(){

  Controller.prototype.lastKeyDown = 'ArrowUp';
  Controller.prototype.intervalTimeMS = 700;
  Controller.prototype.dotsEaten = 0;

  Controller.prototype.resetInterval = function() {
    clearInterval(this.interval);
      this.interval = setInterval(() => {
        if(this.model.canAdvance(this.lastKeyDown)) {
          this.model.advance(this.lastKeyDown);
        }
      }, this.intervalTimeMS);
  }

  Controller.prototype.onDotEaten = function() {
    if(++this.dotsEaten % 3 === 0) {
      this.intervalTimeMS -= 25;
      this.resetInterval();
    }
  }

  function Controller(model) {
    this.model = model;
    this.model.dotEaten.attach(this.onDotEaten.bind(this));
    this.resetInterval();

    document.addEventListener('keydown', (e) => {
      if(this.model.canAdvance(e.code)) {
        this.lastKeyDown = e.code;
        this.model.advance(this.lastKeyDown);
        this.resetInterval();
      }
    }, false);
  }

  return Controller;
})();