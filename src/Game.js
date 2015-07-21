Animal.Game = function(game) {
	this.map = null;
	this.layer = null;
	this.player = null;
	this.count = 0;
	this.enemies = null;
	this.items = null;
};
	
Animal.Game.prototype = {
	/* ORDER MATTERS -- the screen will be rendered in the order of each position.
	 * Also, the game world has no fixed size, with (0, 0) as the center.
	 */ 
	create: function() {
		
		/* ---------- Stage set-up ---------- */
		
		// Enable Arcade Physics system
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// Simple background
		this.game.stage.backgroundColor = '#33ccff';
		
		this.map = this.game.add.tilemap('world1');
		this.map.addTilesetImage('Tiles_64x64');
		
		this.layer = this.map.createLayer('Background1');
		this.layer = this.map.createLayer('World1');
		
		this.map.setCollisionBetween(1, 2000, true, 'World1');
		
		this.layer.resizeWorld();
		this.layer.debug = true;
		
		
		/* ---------- Player set-up ---------- */
		
		// The player and its settings
		this.player = this.game.add.sprite(128, this.game.world.height - 150, 'dude');
		
		// Enable physics for the player
		this.game.physics.arcade.enable(this.player);
		
		// Player physics properties
		this.player.body.bounce.y = 0.2;
		this.player.body.tilePadding.set(32);
		this.player.body.gravity.y = 300;
		this.player.body.collideWorldBounds = true;
		
		// Walk left and right
		// Parameters: .add('name', [frame #], frames/sec, loop])
		this.player.animations.add('left',  [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		// Follow the character
		this.game.camera.follow(this.player);
		
		// Number of enemies & items
		this.count = 3;
		
		/* ---------- Enemy set-up ---------- */
		this.enemies = this.game.add.group();
		this.enemies.enableBody = true;
		
		for (var i = 0; i < this.count; ++i) {
			this.enemy = this.enemies.create(this.game.world.randomX, this.game.world.randomY - 150, 'baddie');
			this.enemy.body.bounce.y = 0.2;
			this.enemy.body.tilePadding.set(32);
			this.enemy.body.gravity.y = 300;
		}
		
		
		/* ---------- Item set-up ---------- */	
		this.items = this.game.add.group();
		this.items.enableBody = true;
		
		for (var i = 0; i < this.count; ++i) {
			this.item = this.items.create(this.game.world.randomX, this.game.world.randomY - 150, 'star');
			this.item.body.gravity.y = 300;
			this.item.body.tilePadding.set(32);
			this.item.body.bounce.y = 0.7 + Math.random() * 0.2;
		}
	},
	
	managePause: function() {
		
	},

	update: function() {
		
		// Collide the player and items with the platform
		this.game.physics.arcade.collide(this.player, this.layer);
		this.game.physics.arcade.collide(this.enemies, this.layer);
		this.game.physics.arcade.collide(this.items, this.layer);
		
		// Check overlap between player and item
		this.game.physics.arcade.overlap(this.player, this.enemies, Animal.action.tagEnemy, null, this);
		this.game.physics.arcade.overlap(this.player, this.items, Animal.action.collectItem, null, this);
		
		
		/* ---------- Keyboard set-up ---------- */
		var cursors = this.game.input.keyboard.createCursorKeys();
		var wasd = {
			up:    this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			down:  this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			left:  this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
		};
		
		// Reset the player's velocity (movement)
		this.player.body.velocity.x = 0;
		
		// Move left
		if (cursors.left.isDown || wasd.left.isDown) {
			this.player.body.velocity.x = -150;
			this.player.animations.play('left');
		}
		
		// Move right
		else if (cursors.right.isDown || wasd.right.isDown) {
			this.player.body.velocity.x = 150;
			this.player.animations.play('right');
		}
		
		// Stand still
		else {
			this.player.animations.stop();
			this.player.frame = 4;
		}
		
		// Jump, only if the player is touching the ground
		if (this.player.body.onFloor() && (cursors.up.isDown || wasd.up.isDown)) {
			// Vertical velocity: 350px/sec sq
			this.player.body.velocity.y = -450;
		}
	}	
};

Animal.action = {
	tagEnemy: function(player, enemy) {
		enemy.kill();
	},
	
	collectItem: function(player, item) {
		item.kill();
	}
};