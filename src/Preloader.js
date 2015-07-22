Animal.Preloader = function(game) {};

Animal.Preloader.prototype = {
	preload: function () {
		this.load.tilemap('world1', 'assets/tilemaps/world1.json', null, Phaser.Tilemap.TILED_JSON);
	
		this.load.image('Tiles_64x64', 'assets/tilemaps/Tiles_64x64.png');
		this.load.image('star', 'assets/sprites/star.png');
		
		this.load.spritesheet('sheep', 'assets/sprites/sheep_v2.png', 64, 64);
		this.load.spritesheet('baddie', 'assets/sprites/baddie.png', 32, 32);
	},
	
	create: function() {
		this.game.state.start('Game');
	}
};