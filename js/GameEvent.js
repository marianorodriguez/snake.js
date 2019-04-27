var GameEvent = function (sender) {
	this.sender = sender;
	this.listeners = [];
}

GameEvent.prototype = {

	attach: function (listener) {
		this.listeners.push(listener);
	},

	notify: function (args) {
		for (var i = 0; i < this.listeners.length; i++) {
			this.listeners[i](this.sender, args);
		}
	}

};
