Animal.Preloader = function(game) {};

Animal.Preloader.prototype = {
	preload: function () {		
		this.load.image('sky', 'assets/sky.png');
		this.load.image('ground', 'assets/platform.png');
		this.load.image('star', 'assets/star.png');
		
		this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		this.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	},
	
	create: function() {
		this.game.state.start('Game');
	}
};