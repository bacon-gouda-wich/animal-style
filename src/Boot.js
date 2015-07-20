var Animal = {
	_WIDTH: 800,
	_HEIGHT: 600
};

Animal.Boot = function(game) {};

Animal.Boot.prototype = {
	preload: function() {
		
	},
	
	create: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.state.start('Preloader');
	}
};