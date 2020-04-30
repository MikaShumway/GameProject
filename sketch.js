/*
	
	Mika Shumway's Game Project
	
	Extension 1 - Advanced Graphics
		I made constructor functions to create objects for each item in the scene and pushed them to arrays.  I used a literal object for the flagpole as I only needed one.  I wrote for-loops to run conditional statements on each interactive item (such as collectables and canyons).
	
	Extension 2 - Sound
		I added sound and used the rate() method to modify the pitch/speed of each sound.  I also used Math.random() to randomise the pitch so the sounds wouldn’t get too annoying.  I recorded sounds from musiclab.chromeexperiments.com and midi.city for my game.
	
*/


// Game
var game = {

	dim: {	// Dimensions
		width: document.documentElement.clientWidth,	// Width
		height: document.documentElement.clientHeight	// Height
	},
	
	speed: Math.cbrt(document.documentElement.clientWidth) * 0.25,	// Speed
	
	preset: {	// Preset
		clouds: 6,
		canyons: 3,
		mountains: 6,
		trees: 3,
		crystals: 0
	},
	
	// State
	start: false,		// Start
	complete: false,	// Complete
	screen: 'start',	// Screen
	
	time: 0,			// Time
	timeLimit: 10,		// Time limit (Seconds)
	timePeriod: 0,		// Time period
	
	scoreLimit: 5,		// Score limit
	scoreboard: {		// Score
		
		draw: function() {	// Draw
			
			noStroke();
			
			// Player Score
			fill('red');
			textSize((game.dim.width / 3 + game.dim.height / 3) / 20);
			text("Score: " + player.stats.score + "/" + game.scoreLimit, game.dim.width * 0.01, 50);
			
			// Player Lifes
			push();
				
				noFill();
				stroke('green');
				rect(game.dim.width / 2 - 250, 11, 500, 50);
				
				fill('lightGreen');
				rect(game.dim.width / 2 - 250, 11, player.stats.lifes * 100 - 1, 50);
			pop();
			
			fill('blue');
			text("Life", game.dim.width * 0.5 - 32.5, 50);
			
			// Game Time
			fill('white');
			text("Time: " + Math.round(game.time / 50), game.dim.width * 0.9, 50);
			
		}
		
	},
	
	reset : function() {	// Reset
		
		// Reset Game State
		this.start = false;
		this.complete = false;
		
		// Reset Game Time
		this.time = 0;
		this.timePeriod = 0;
		
		// Reset Score Limit
		this.scoreLimit = 5;
		
		this.preset.crystals = 0;
		
		scene.reset();	// Reset scene
		player.reset();	// Reset player
		
	}
	
};

var _screen = {	// Screen
	
	paused: false,	// State
	
	draw: function() {	// Draw
	
		noStroke();
		
		if (game.screen == 'start') {	// Start Screen
			
			// Background
			fill('black');
			rect(0, 0, game.dim.width, game.dim.height);
			
			// Content
			push();
				rectMode(RADIUS);
				
				// Button
				fill(0, 0, 0, 50);
				stroke('red');
				strokeWeight(4);
				rect(game.dim.width / 2, game.dim.height / 2, game.dim.width / 10, game.dim.height / 10);
				
				// Text
				noStroke();
				fill('red');
				textSize((game.dim.width / 5 + game.dim.height / 5) / 10);
				text('START', game.dim.width / 2.22, game.dim.height / 1.92);
			pop();
			
		}
		
		if (game.screen == 'pause') {	// Pause Screen
			
			if (!this.paused) {	// Screen is not paused
				
				// Background Overlay
				fill(127, 127, 127, 50);	// Transparent Gray
				rect(0, 0, game.dim.width, game.dim.height);
				
				this.paused = true;	// Change screen state
				
			}
			
			// Text
			fill('white');
			textSize((game.dim.width / 5 + game.dim.height / 5) / 10);
			text('PAUSED', game.dim.width / 2.22, game.dim.height / 1.92);
			
		}
		
		if (game.screen == 'gameover') {	// Start Screen
			
			// Background
			fill('black');
			rect(0, 0, game.dim.width, game.dim.height);
			
			// Text
			noStroke();
			fill('white');
			textSize((game.dim.width / 5 + game.dim.height / 5) / 10);
			text('GAME OVER', game.dim.width / 2.4, game.dim.height / 1.92);
			
		}
		
		if (game.screen == 'complete') {	// Start Screen
			
			// Background
			fill('black');
			rect(0, 0, game.dim.width, game.dim.height);
			
			// Text
			noStroke();
			fill('lightGreen');
			textSize((game.dim.width / 5 + game.dim.height / 5) / 10);
			text('LEVEL COMPLETE', game.dim.width / 2.65, game.dim.height / 2.5);
			
			// Score
			noStroke();
			fill('red');
			textSize((game.dim.width / 5 + game.dim.height / 5) / 10);
			text(player.stats.score + " / " + game.scoreLimit, game.dim.width / 2.1, game.dim.height / 2);
			
		}
		
	}
	
};


// Arrays
var clouds = [];
var mountains = [];
var trees = [];
var crystals = [];
var canyons = [];


// Sky
var sky = {
	pos: {	// Positions
		x: 0,	// Horizontal
		y: 0	// Vertical
	},
	dim: {	// Dimensions
		width: game.dim.width,	// Width
		height: game.dim.height	// Height
	},
	specs: {	// Specifications
		color1: 'black',	// Top Color
		color2: 'darkBlue'	// Bottom Color
	},
	
	draw: function() {
		noFill();
		
		for (y = 0; y < this.dim.height; y++) {
			inter = map(y, 0, this.dim.height, 0, 1);
			c = lerpColor(color(this.specs.color1), color(this.specs.color2), inter);
			
			stroke(c);
			line(0, y, this.dim.width, y);
		}
	}
};

// Canyon
function Canyon() {
	
	this.pos = {	// Position
		x: ground.dim.width,	// Horizontal
		y: ground.pos.y			// Vertical
	};
	
	this.dim = {	// Dimensions
		width: player.size * ((Math.random()*3)+1),	// Width
		height: ground.dim.height					// Height
	};
	
	this.specs = {	// Specifications
		color: 'black'	// Color
	};
	
	this.draw = function() {	// Draw
		noStroke();
		
		// Canyon
		fill(this.specs.color);
		rect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
	};
	
}

// Ground
var ground = {
	pos: {	// Position
		x: 0,	// Horizontal
		y: game.dim.height * 0.8	// Vertical
	},
	dim: {	// Dimensions
		width: game.dim.width,	// Width
		height: game.dim.height * 0.2	// Height
	},
	specs: {	// Specifications
		color: 'darkGreen', // Color
	},
	
	draw: function() {
		noStroke();
		
		fill(this.specs.color);
		rect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
	}
};

// Mountain
function Mountain() {
	
	this.pos = {	// Position
		x: ground.dim.width,	// Horizontal
		y: ground.pos.y			// Vertical
	};
	
	this.dim = {	// Dimensions
		width: game.dim.width * (((Math.random()*3)+1) / 10),	// Width
		height: game.dim.height * (((Math.random()*6)+1) / 10)	// Height
	};
	
	this.specs = {	// Specifications
		color1: 'rgba(0, 0, 50, 1)',		// Base Color
		color2: 'rgba(255, 255, 255, .5)'	// Tip Color
	};
	
	this.draw = function() {	// Draw
		noStroke();
		
		// Mountain Base
		fill(this.specs.color1);
		triangle(this.pos.x + this.dim.width / 2, this.pos.y - this.dim.height, this.pos.x, this.pos.y, this.pos.x + this.dim.width, this.pos.y);
		
		// Mountain Tip
		fill(this.specs.color2);
		triangle(this.pos.x + this.dim.width / 2, this.pos.y - this.dim.height, this.pos.x + this.dim.width / 3.2, this.pos.y - this.dim.height / 1.6, this.pos.x + this.dim.width / 1.4545, this.pos.y - this.dim.height / 1.6);
	};
	
}

// Cloud
function Cloud() {
	this.size = Math.round(Math.random() * 4) + 1;	// Size
	this.pos = {	// Position
		x: 0,	// Horizontal
		y: (Math.round(Math.random() * 7) + 1) * 10	// Vertical
	};
	this.specs = {	// Specifications
		color: 'SlateGray',	// Color
	};
	this.speed = (Math.round(Math.random() * 4) + 1) / 8;	// Speed
	
	this.draw = function() {
		this.pos.x += this.speed * this.size;	// Move cloud to the right
		
		noStroke();
		
		fill(this.specs.color);
		ellipse(this.pos.x, this.pos.y + this.size * 20, this.size * 20, this.size * 20);	// Center Poof
		ellipse(this.pos.x - (this.size * 20 / 1.6), this.pos.y + this.size * 20, this.size * 20, this.size * 20);	// Left Poof
		ellipse(this.pos.x + (this.size * 20 / 1.6), this.pos.y + this.size * 20, this.size * 20, this.size * 20);	// Right Poof
		ellipse(this.pos.x, this.pos.y + (this.size * 20 / 2), (this.size * 20 * 1.375), this.size * 20);	// Top Poof
	};
}

// Tree
function Tree() {
	this.dim = {	// Dimensions
		width: 50,	// Width
		height: 120	// Height
	};
	this.pos = {	// Position
		x: game.dim.width + this.dim.width,	// Horizontal
		y: ground.pos.y						// Vertical
	};
	this.specs = {	// Specifications
		color1: 'saddleBrown',	// Trunk Color
		color2: 'green'			// Leaf Color
	};
	
	this.leafs = {	// Leafs
		size: this.dim.width * 2,	// Leaf Size
		corners: 80					// Leaf Corners (0-10)
	};
	
	this.draw = function() {	// Draw
		// Trunk
		fill(this.specs.color1);
		rect(this.pos.x, this.pos.y - this.dim.height, this.dim.width, this.dim.height);
		
		// Leafs
		fill(this.specs.color2);
		rect(this.pos.x - this.leafs.size, this.pos.y - this.dim.height - this.leafs.size / 3, this.leafs.size, this.leafs.size, this.leafs.corners, 0,0, this.leafs.corners);	// Left
		rect(this.pos.x + this.dim.width, this.pos.y - this.dim.height - this.leafs.size / 3, this.leafs.size, this.leafs.size, 0, this.leafs.corners * 10, this.leafs.corners * 10, 0);	// Right
		rect(this.pos.x - ((this.leafs.size / 2) - (this.dim.width / 2)), this.pos.y - this.dim.height - this.leafs.size, this.leafs.size, this.leafs.size, this.leafs.corners, this.leafs.corners, 0,0);	// Top
	};
}

// Collectable - Crystal
function Crystal() {
	this.size = 3;	// Size
	this.pos = {
		x: game.dim.width,	// Horizontal Position
		y: ground.pos.y - this.size * 20												// Vertical Position
	};
	this.specs = {
		color: 'darkRed',			// Crystal Color
		glow: 'rgba(255, 0, 0, .5)'	// Outline Color
	};
	this.exists = true;	// Crystal State
	
	this.draw = function() {	// Draw
		if (this.exists) {
			stroke(this.specs.glow);	// Outline
			
			// Base
			fill(this.specs.color);
			ellipse(this.pos.x, this.pos.y, this.size * 10, this.size * 10);
		}
	};
}

// Flagpole
var flag = {
	pos: {	// Position
		x: game.dim.width,	// Horizontal
		y: ground.pos.y		// Vertical
	},
	dim: {	// Dimensions
		width: game.dim.width / 40,	// Width
		height: game.dim.height * 0.6,	// Height
	},
	
	draw: function() {	// Draw
		
		noStroke();
		
		// Pole
		fill('grey');
		rect(this.pos.x, this.pos.y - this.dim.height, this.dim.width, this.dim.height);
		
		// Flag
		fill('red');
		rect(this.pos.x, this.pos.y - this.dim.height - (this.dim.height / 4), this.dim.width * 6, (this.dim.height / 4));
	}
};


// Character
var player = {
	
	size: 60,	// Size
	
	stats: {	// Status
		lvl: 1,		// Level
		score: 0,	// Score
		lifes: 5	// Lifes
	},
	
	pos: {	// Position
		x: ground.dim.width / 30,	// Horizontal
		y: ground.pos.y	// Vertical
	},
	
	color: {	// Colors
		primary: 'black',	// Cloak
		secondary: 'grey',	// Face
		tertiary: 'white'	// Eyes
	},
	
	speed: {	// Speed
		default: Math.cbrt(game.dim.width),	// Default Speed
		current: Math.cbrt(game.dim.width)	// Current Speed
	},
	
	jump: {	// Jumping
		count: 0,	// Jumps Used
		limit: 1,	// Max Jumps
		speed: 12,	// Jump Speed
		height: 0	// Currrent Jump Height
	},
	
	// State
	state: 'idle',
	isFalling: false,
	
	canyon: -1,	// Current Canyon
	
	draw: function() {	// Draw
	
		noStroke();
		
		if (this.state == 'idle') {		// Idle
			// Head
			fill(this.color.primary);
			ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2), (this.size / 2));
			
			// Body
			fill(this.color.primary);
			triangle(this.pos.x, this.pos.y - this.size, this.pos.x - (this.size / 3), this.pos.y, this.pos.x + (this.size / 3), this.pos.y);
			
			// Face
			fill(this.color.secondary);
			ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2.8), (this.size / 2.7));
			
			// Eyes
			fill(this.color.tertiary);
			ellipse(this.pos.x - (this.size / 10), this.pos.y - this.size, (this.size / 8), (this.size / 10));	// Left
			ellipse(this.pos.x + (this.size / 10), this.pos.y - this.size, (this.size / 8), (this.size / 10));	// Right
		}
		
		if (this.state == 'left') {		// Walk Left
			push();
				// Flip Horizontaly
				translate(this.pos.x * 2,0);
				scale(-1.0,1.0);
				
				// Head
				fill(this.color.primary);
				ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2), (this.size / 2));
				
				// Body
				fill(this.color.primary);
				triangle(this.pos.x, this.pos.y - this.size, this.pos.x - (this.size / 3), this.pos.y, this.pos.x + (this.size / 3.5), this.pos.y);
				
				// Face
				fill(this.color.secondary);
				ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2.8), (this.size / 2.7));
				
				// Hood
				fill(this.color.primary);
				ellipse(this.pos.x, this.pos.y - (this.size * 1.1), (this.size / 2), (this.size / 4));	// Top
				ellipse(this.pos.x - (this.size / 15), this.pos.y - this.size, (this.size / 3.5), (this.size / 2.5));	// Back
				
				// Eyes
				fill(this.color.tertiary);
				ellipse(this.pos.x + (this.size / 7), this.pos.y - this.size, (this.size / 16), (this.size / 10));	// Eye
			pop();
		}
		
		if (this.state == 'leftUp') {	// Jump Left
			push();
				// Flip Horizontaly
				translate(this.pos.x * 2,0);
				scale(-1.0,1.0);
				
				// Head
				fill(this.color.primary);
				ellipse(this.pos.x - (this.size / 10), this.pos.y - (this.size / 1.03), (this.size / 3), (this.size / 2));
				
				// Body
				fill(this.color.primary);
				triangle(this.pos.x + (this.size / 20), this.pos.y - this.size, this.pos.x - (this.size / 2.5), this.pos.y - (this.size / 10), this.pos.x, this.pos.y);
				
				// Face
				fill(this.color.secondary);
				ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2.8), (this.size / 2.7));
				
				// Hood
				fill(this.color.primary);
				ellipse(this.pos.x - (this.size / 25), this.pos.y - (this.size * 1.1), (this.size / 4), (this.size / 4));	// Top
				ellipse(this.pos.x - (this.size / 7), this.pos.y - (this.size / 1.05), (this.size / 4), (this.size / 3));	// Back
				ellipse(this.pos.x - (this.size / 20), this.pos.y - this.size, (this.size / 4), (this.size / 2));	// Side
				
				// Eyes
				fill(this.color.tertiary);
				ellipse(this.pos.x + (this.size / 7), this.pos.y - (this.size * 1.1), (this.size / 16), (this.size / 10));	// Eye
			pop();
		}
		
		if (this.state == 'right') {	// Walk Right
			// Head
			fill(this.color.primary);
			ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2), (this.size / 2));
			
			// Body
			fill(this.color.primary);
			triangle(this.pos.x, this.pos.y - this.size, this.pos.x - (this.size / 3), this.pos.y, this.pos.x + (this.size / 3.5), this.pos.y);
			
			// Face
			fill(this.color.secondary);
			ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2.8), (this.size / 2.7));
			
			// Hood
			fill(this.color.primary);
			ellipse(this.pos.x, this.pos.y - (this.size * 1.1), (this.size / 2), (this.size / 4));	// Top
			ellipse(this.pos.x - (this.size / 15), this.pos.y - this.size, (this.size / 3.5), (this.size / 2.5));	// Back
			
			// Eyes
			fill(this.color.tertiary);
			ellipse(this.pos.x + (this.size / 7), this.pos.y - this.size, (this.size / 16), (this.size / 10));	// Eye
		}
		
		if (this.state == 'rightUp') {	// Jump Right
			// Head
			fill(this.color.primary);
			ellipse(this.pos.x - (this.size / 10), this.pos.y - (this.size / 1.03), (this.size / 3), (this.size / 2));
			
			// Body
			fill(this.color.primary);
			triangle(this.pos.x + (this.size / 20), this.pos.y - this.size, this.pos.x - (this.size / 2.5), this.pos.y - (this.size / 10), this.pos.x, this.pos.y);
			
			// Face
			fill(this.color.secondary);
			ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2.8), (this.size / 2.7));
			
			// Hood
			fill(this.color.primary);
			ellipse(this.pos.x - (this.size / 25), this.pos.y - (this.size * 1.1), (this.size / 4), (this.size / 4));	// Top
			ellipse(this.pos.x - (this.size / 7), this.pos.y - (this.size / 1.05), (this.size / 4), (this.size / 3));	// Back
			ellipse(this.pos.x - (this.size / 20), this.pos.y - this.size, (this.size / 4), (this.size / 2));	// Side
			
			// Eyes
			fill(this.color.tertiary);
			ellipse(this.pos.x + (this.size / 7), this.pos.y - (this.size * 1.1), (this.size / 16), (this.size / 10));	// Eye
		}
		
		if (this.state == 'up') {		// Jump Up
			// Head
			fill(this.color.primary);
			ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2), (this.size / 2));
			
			// Body
			fill(this.color.primary);
			triangle(this.pos.x, this.pos.y - this.size, this.pos.x - (this.size / 3), this.pos.y, this.pos.x + (this.size / 3), this.pos.y);
			
			// Face
			fill(this.color.secondary);
			ellipse(this.pos.x, this.pos.y - this.size, (this.size / 2.8), (this.size / 2.7));	// Face
			
			// Eyes
			fill(this.color.tertiary);
			ellipse(this.pos.x - (this.size / 10), this.pos.y - (this.size * 1.1), (this.size / 8), (this.size / 10));	// Left
			ellipse(this.pos.x + (this.size / 10), this.pos.y - (this.size * 1.1), (this.size / 8), (this.size / 10));	// Right
		}
		
	},
	
	move: function(direction) {	// Movement
	
		// Start game upon player movement
		if (!game.start && !game.complete) {	// Game hasn't started
			
			game.start = true;	// Start game
			
		}
		
		// Directions
		if (direction == 'left') {	// Left
		
			this.state = 'left';
			this.pos.x -= this.speed.current;	// Move left
			
		}
		
		if (direction == 'right') {	// Right
		
			this.state = 'right';
			this.pos.x += this.speed.current;	// Move right
		}
		
		if (direction == 'up') {	// Up
			
			this.pos.y -= this.jump.speed;			// Move up
			this.jump.height -= this.jump.speed;	// Consume Jump Height
			
		}
		
		if (direction == 'down') { // Down
			
			this.pos.y += this.jump.speed;	// Move down
			
		}
		
	},
	
	reset: function() {	// Player Reset
		
		// Player Status
		if (player.stats.lifes == 0) {	// Player is out of lifes
			
			game.screen = 'gameover';	// Game Over
			
			player.stats.lvl = 1;	// Level
			player.stats.lifes = 5;	// Reset player lifes
			
			sounds.death.rate(0.5);	// Half pitch
			sounds.death.play();	// Play death sound
			
		} else if (game.screen == 'complete') {	// Level complete
			
			player.stats.score = 0;	// Score
			player.stats.lvl = 1;	// Level
			player.stats.lifes = 5;	// Reset player lifes
			
		} else {	// Player death
		
			sounds.death.rate(Math.random()*1+2);	// Random pitch and speed
			sounds.death.play();					// Play death sound
			
		}
		
		// Player state
		player.isFalling = false;	// Reset falling state
		player.canyon = -1;			// Reset Player's canyon
		
		// Reset Position
		player.pos.x = ground.dim.width / 30;	// Horizontal
		player.pos.y = ground.pos.y;			// Vertical
		
		// Reset jump
		player.jump.count = 0;
		player.jump.height = 0;
		
		player.speed.current = player.speed.default;	// Reset Speed
	}
	
};

// Scene
var scene = {
	
	enabled: false,	// Scene State
	
	draw: function() {	// Draw
		
		// Defaults
		for (i = clouds.length; i < game.preset.clouds; i++) {	// Clouds
			
			clouds.push(new Cloud());										// Create new cloud
			clouds[i].pos.x = Math.round(Math.random() * game.dim.width);	// Place randomly
			
		}
		
		if (!this.enabled) {	// Starting Scene
			
			// Canyons
			canyons.push(new Canyon());											// Create new canyon
			canyons[0].pos.x = game.dim.width / 2 - canyons[0].dim.width / 2;	// Place at middle of screen
			
			// Mountains
			mountains.push(new Mountain());	// Create new mountain
			mountains[0].pos.x = 0;			// Place at left side of screen
			
			// Trees
			trees.push(new Tree());					// Create new tree
			trees[0].pos.x = game.dim.width * 0.8;	// Place at left side of screen
			
			// Collectables
			crystals.push(new Crystal());										// Create new tree
			crystals[0].pos.x = canyons[0].pos.x + canyons[0].dim.width / 2;	// Place at left side of screen
			
			this.enabled = true;	// Enable scene
			
		}
			
		if (game.start) {	// Random Scene Generator
		
			// Canyons
			for (i = canyons.length; i < game.preset.canyons; i++) {		// For each canyon yet to be created
				
				canyons.push(new Canyon());	// Add new canyon
				
				if (canyons.length > 0) {	// Multiple canyons exist
				
					l = i - 1;	// Get last canyon
					
					// Last canyon is too close
					if (canyons[i].pos.x < canyons[l].pos.x + canyons[l].dim.width + player.size) {
						
						// Place canyon random distance away from last canyon
						canyons[i].pos.x = canyons[l].pos.x + canyons[l].dim.width + player.size * ((Math.random()*6)+1);
						
					}
					
				}
				
			}
			
			// Mountains
			for (i = mountains.length; i < game.preset.mountains; i++) {	// For each mountain yet to be created
				
				mountains.push(new Mountain());	// Add new mountain
				
				if (mountains.length > 1) {	// Multiple mountains exist
				
					l = i - 1;	// Get last mountain
					
					// Last mountain is too close
					if (mountains[i].pos.x < mountains[l].pos.x + mountains[l].dim.width) {
						
						// Place mountain random distance away from last mountain
						mountains[i].pos.x = mountains[l].pos.x + (mountains[l].dim.width * ((Math.random()*2)+1));
						
					}
					
				}
				
			}
			
			// Trees
			for (i = trees.length; i < game.preset.trees; i++) {			// For each tree yet to be created
				
				trees.push(new Tree());	// Add new tree
				trees[i].pos.x += trees[i].dim.width + trees[i].leafs.size;
				
				if (trees.length > 0) {	// Multiple trees exist
				
					l = i - 1;	// Get last tree
					
					if (trees[i].pos.x < trees[l].pos.x + trees[l].dim.width) {	// Last tree is too close
						
						// Place tree random distance away from last tree
						trees[i].pos.x = trees[i].leafs.size + trees[l].pos.x + (trees[l].dim.width + trees[l].leafs.size) * ((Math.random()*6)+1);
						
					}
					
				}
				
			}
			
			// Crystals
			for (i = crystals.length; i < game.preset.crystals; i++) {		// For each crystal yet to be created
				
				crystals.push(new Crystal());	// Add new crystal
				
			}
			
		}
		
		
		// Draw Scene
		sky.draw();		// Sky
		ground.draw();	// Ground
		
		// Canyons
		for (i = 0; i < canyons.length; i++) {	// For each canyon
			
			canyons[i].draw();	// Draw canyon
			
			if (canyons[i].pos.x + canyons[i].dim.width < 0) {	// Canyon is left of left border
				
				canyons[i] = new Canyon();	// Reset canyon
				
				l = canyons.length - 1;	// Get last canyon
				
				// Last canyon is too close
				if (canyons[i].pos.x < canyons[l].pos.x + canyons[l].dim.width + player.size) {
					
					// Place canyon random distance away from last canyon
					canyons[i].pos.x = canyons[l].pos.x + canyons[l].dim.width + player.size * ((Math.random()*6)+1);
					
				}
				
				canyons.sort(function(a, b){return a.pos.x - b.pos.x});	// Sort canyons by horizontal position
				
			}
			
		}
		
		// Mountains
		for (i = 0; i < mountains.length; i++) {	// For each mountain
			
			mountains[i].draw();	// Draw mountain
			
			if (mountains[i].pos.x + mountains[i].dim.width < 0) {	// Mountain is behind left game border
				
				mountains[i] = new Mountain();	// Reset mountain
				
				l = mountains.length - 1;	// Get last mountain
				
				// Last mountain is too close
				if (mountains[i].pos.x < mountains[l].pos.x + mountains[l].dim.width) {
					
					// Place mountain random distance away from last mountain
					mountains[i].pos.x = mountains[l].pos.x + (mountains[l].dim.width * ((Math.random()*2)+1));
					
				}
				
				canyons.sort(function(a, b){return a.pos.x - b.pos.x});	// Sort canyons by horizontal position
				
			}
			
		}
		
		// Clouds
		for (i = 0; i < clouds.length; i++) {	// For each cloud
			
			clouds[i].draw();	// Draw cloud
			
			if (clouds[i].pos.x > (game.dim.width + clouds[i].size * 25)) {	// Cloud is past right game border
				
				clouds[i] = new Cloud();					// Reset cloud
				clouds[i].pos.x = 0 - clouds[i].size * 25;	// Place left game border
				
			} else if (clouds[i].pos.x < (0 - clouds[i].size * 25)) {	// Cloud is behind left game border
				
				clouds[i] = new Cloud();								// Reset cloud
				clouds[i].pos.x = game.dim.width + clouds[i].size * 25;	// Place right game border
				
			}
			
		}
		
		// Trees
		for (i = 0; i < trees.length; i++) {	// For each tree
			
			trees[i].draw();	// Draw tree
			
			if (trees[i].pos.x + trees[i].dim.width + trees[i].leafs.size < 0) {	// Tree is behind left game border
				
				trees[i] = new Tree();	// Reset tree
				
				l = trees.length - 1;	// Get last tree
				
				// Last tree is too close
				if (trees[i].pos.x < trees[l].pos.x + trees[l].dim.width) {
					
					// Place tree random distance away from last tree
					trees[i].pos.x = trees[l].pos.x + (trees[l].dim.width * ((Math.random()*2)+1));
					
				}
				
				trees.sort(function(a, b){return a.pos.x - b.pos.x});	// Sort trees by horizontal position
				
			}
			
		}
			
		// Crystals
		for (i = 0; i < crystals.length; i++) {	// For each crystal
			
			crystals[i].draw();	// Draw crystal
			
		}
		
		// Flagpole
		if (game.complete) {
			
			flag.draw();	// Draw flagpole
			
		}
		
	},
	
	scroll: function() {	// Side Scrolling
		
		// Move Scene
		for (i = 0; i < canyons.length; i++) {	// For each canyon
			
			canyons[i].pos.x -= game.speed;	// Move left at game speed
			
		}
		
		for (i = 0; i < mountains.length; i++) {	// For each mountain
			
			mountains[i].pos.x -= game.speed / 2;	// Move left at half of game speed
			
		}
		
		for (i = 0; i < trees.length; i++) {	// For each tree
			
			trees[i].pos.x -= game.speed;	// Move left at game speed
			
		}
		
		for (i = 0; i < crystals.length; i++) {	// For each crystal
			
			crystals[i].pos.x -= game.speed;	// Move left at game speed
			
		}
		
		for (i = 0; i < clouds.length; i++) {	// For each cloud
		
			clouds[i].pos.x -= game.speed;
			
		}
		
		// Player
		player.pos.x -= game.speed;	// Move left at game speed
		
		// Flagpole
		if (game.complete) {
			
			flag.pos.x -= game.speed;	// Move left at game speed
			
		}
		
	},
	
	reset: function() {	// Reset Scene
		
		// Reset Scene State
		this.enabled = false;
		
		// Reset Arrays
		clouds = [];
		canyons = [];
		mountains = [];
		trees = [];
		crystals = [];
		
		// Reset Flagpole
		flag.pos.x = game.dim.width;
		
	}
	
};


function preload() {	// Load Assets
	
	soundFormats('mp3', 'ogg', 'wav');	// Sound Formats
	
	sounds = {	// Sounds
		start: loadSound('Assets/Audio/start.ogg'),			// Start
		jump: loadSound('Assets/Audio/jump.ogg'),			// Jump
		land: loadSound('Assets/Audio/land.ogg'),			// Land
		death: loadSound('Assets/Audio/death.ogg'),			// Death
		crystal: loadSound('Assets/Audio/crystal.ogg'),		// Crystal
		complete: loadSound('Assets/Audio/complete2.ogg')	// Complete
	};
	
}

function setup() {	// Setup Game
	
	createCanvas(game.dim.width, game.dim.height);	// Create Canvas
	
}

function draw() {	// Draw Game
	
	// Screen State
	if (game.screen == 'start') {	// Start
		
		_screen.draw();	// Draw Scene
		return 0;		// Return from function
		
	} else if (game.screen == 'pause') {	// Pause
		
		_screen.draw();	// Draw Scene
		return 0;		// Return from function
		
	} else if (game.screen == 'gameover') {	// Game over
	
		_screen.draw();	// Draw Scene
		return 0;		// Return from function
		
	}  else if (game.screen == 'complete') {	// Level Complete
	
		_screen.draw();	// Draw Scene
		return 0;		// Return from function
		
	} else {	// Play
	
		scene.draw();			// Draw scene
		game.scoreboard.draw();	// Draw scoreboard
		
	}
	
	
	// Game State
	if (game.start) {	// Start
	
		scene.scroll();	// Scroll through scene
		
		game.time++;	// Add to game time
		
	}
	
	
	player.draw();	// Draw Player
	
	
	// Falling and Jumping
	if (player.jump.height > 0) {	// Player is jumping
		
		player.isFalling = false;	// Disable player fall
		player.move('up');			// Move player up
		
	} else {	// Player is not jumping
		
		if (player.jump.height < 0) {	// Player jump height is negative
		
			player.jump.height = 0;	// Reset jump
			
		}
		
		if (player.pos.y < ground.pos.y) {	// Player is above ground level
			
			player.isFalling = true;	// Enable player fall
			player.canyon = -1;			// Reset Canyon
			
		} else if (player.pos.y == ground.pos.y) {	// Player is at ground level
			
			for (i = 0; i < canyons.length; i++) {	// For each canyon
				
				// Player is inside canyon
				if (player.pos.x - player.size / 3 > canyons[i].pos.x && player.pos.x + player.size / 3 < canyons[i].pos.x + canyons[i].dim.width) {
					
					player.canyon = i;	// Identify Canyon
					
					break;	// Stop loop
					
				}
				
				if (i == canyons.length - 1) {	// Reached end of loop
				
					player.canyon = -1;	// Reset Canyon
					
				}
				
			}
			
			if (player.canyon < 0) {	// Player is outside canyon
				
				player.isFalling = false;	// Disable player fall
				
				if (player.jump.count > 0) {	// Player has used jumps
				
					player.jump.count = 0;	// Reset player jumps
					
					sounds.land.rate(Math.random()*1+1);	// Random pitch and speed
					sounds.land.play();						// Play landing sound
					
				}
				
			} else {	// Player is inside canyon
				
				player.isFalling = true;	// Enable player fall
				
			}
			
		} else {	// Player is below ground
		
			for (i = 0; i < canyons.length; i++) {	// For each canyon
				
				if (player.pos.x - player.size / 3 > canyons[i].pos.x && player.pos.x + player.size / 3 < canyons[i].pos.x + canyons[i].dim.width) {	// Player is inside canyon
					
					player.canyon = i;	// Identify Canyon
					
					break;	// Stop loop
					
				}
				
				if (player.canyon < 0) {	// Player is outside canyon
					
					player.isFalling = false;		// Disable player fall
					player.pos.y = ground.pos.y;	// Place player at ground level
					
				} else {	// Player is inside canyon
					
					player.isFalling = true;	// Enable player fall
					
				}
				
			}
			
		}
		
	}
	
	if (player.isFalling) {			// Player is falling
	
		player.move('down');	// Move player down
		
	}
	
	// Player Death
	if (player.pos.y - player.size >= game.dim.height) {	// If player falls out of view
	
		player.stats.lifes--;	// Player looses life
		player.stats.score = 0;	// Score
		
		game.reset();	// Reset Game
		
	}
	
	
	// Game Borders
	if (player.pos.x <= player.size / 3) {	// Player is passing left border
		
		if (player.state.includes('left')) {	// Player is moving left
		
			player.speed.current = 0;	// Stop player
			
		} else {	// Player is not moving left
		
			player.speed.current = player.speed.default;	// Release player
			
		}
		
		player.pos.x = player.size / 3;	// Place player at left border
		
	} else if (player.pos.x + player.size / 3 >= game.dim.width) {	// Player is passing right border
		
		if (player.state.includes('right')) {	// Player is moving left
		
			player.speed.current = 0;	// Stop player
			
		} else {	// Player is not moving right
		
			player.speed.current = player.speed.default;	// Release player
			
		}
		
		player.pos.x = game.dim.width - player.size / 3;	// Place player at left border
		
	} else if (player.pos.y > ground.pos.y) {	// Player is below ground level
		
		if (player.canyon >= 0) {	// Player is in canyon
			
			c = player.canyon;	// Get current canyon
			
			// Player is moving into canyon border
			if (player.pos.x - player.size / 3 < canyons[c].pos.x) {	// Left border
				
				if (player.state.includes('left')) {	// Player is moving left
				
					player.speed.current = 0;	// Stop player
					
				} else {	// Player is not moving left
				
					player.speed.current = player.speed.default;	// Release player
					
				}
				
				player.pos.x = canyons[c].pos.x + player.size / 3;	// Place player in canyon
				
			} else if (player.pos.x > canyons[c].pos.x + canyons[c].dim.width - player.size / 3) {	// Right border
				
				if (player.state.includes('right')) {	// Player is moving right
				
					player.speed.current = 0;	// Stop player
					
				} else {	// Player is not moving right
				
					player.speed.current = player.speed.default;	// Release player
					
				}
				
				player.pos.x = canyons[c].pos.x + canyons[c].dim.width - player.size / 3;	// Place player in canyon
				
			}
			
		}
		
	} else {	// Player is not passing any borders
	
		player.speed.current = player.speed.default;	// Reset player speed
		
	}
	
	
	// Collectables
	for (i = 0; i < crystals.length; i++) {
		
		if (crystals[i].exists && dist(player.pos.x, player.pos.y, crystals[i].pos.x, crystals[i].pos.y) <= crystals[i].size * 25) {
			
			crystals[i].exists = false;	// Remove crystal
			
			player.stats.score++;	// Add to score
			
			sounds.crystal.rate(Math.random()*1+2);	// Random pitch and speed
			sounds.crystal.play();					// Play crystal sound
			
		}
		
	}
	
	if (Math.round(game.time / 50) == Math.round(game.timeLimit * game.timePeriod)) {	// Distribute crystals according to the time limit
		
		if (!game.complete) {
			
			game.preset.crystals++;
			game.timePeriod += 1 / (game.scoreLimit - 1);
			
		}
		
	}
	
	
	// Game End
	if (Math.round(game.time / 50) == game.timeLimit) {	// End of level
		
		game.complete = true;
		
	}

	// Check Flagpole
	if (game.complete && player.pos.x + player.size / 3 >= flag.pos.x) {	// Flagpole reached
		
		game.start = false;			// Stop game
		game.screen = 'complete';	// Change screen
		
		sounds.complete.rate(Math.random()*1+1);	// Random pitch and speed
		sounds.complete.play();						// Play complete sound
		
	}
	
	
	// Controls
	if ((keyIsDown(65) || keyIsDown(37)) && player.state != 'right' && player.state != 'rightUp') {	// Left
		
		player.move('left');	// Move player left
		
		if (keyIsDown(87) || keyIsDown(38) || keyIsDown(32)) {	// Space Bar
			
			player.state = 'leftUp';	// Change player state
			
		}
		
	} else if ((keyIsDown(68) || keyIsDown(39)) && player.state != 'left' && player.state != 'leftUp') {	// Right
		
		player.move('right');	// Move player right
		
		if (keyIsDown(87) || keyIsDown(38) || keyIsDown(32)) {	// Space Bar
			
			player.state = 'rightUp';	// Change player state
			
		}
		
	} else {	// Other
		
		if (keyIsDown(87) || keyIsDown(38) || keyIsDown(32)) {	// Space Bar
			
			player.state = 'up';	// Change player state
			
		} else {	// No keys
			
			player.state = 'idle';	// Change player state
			
		}
		
	}
	
	if (mouseIsPressed) {	// While the mouse is pressed
		
		if (mouseY < player.pos.y - player.size) {
			
			if (mouseX > player.pos.x + player.size / 3) {
				
				player.state = "rightUp";
				player.move('right');	// Move player right
				
			} else if (mouseX < player.pos.x - player.size / 3) {
				
				player.state = "leftUp";
				player.move('left');	// Move player right
				
			} else {
				
				player.state = "up";
				
			}
			
			if (player.jump.count < player.jump.limit) {	// Hasn't used all jumps
			
				player.jump.height += player.size * 3;	// Increase jump height
				player.jump.count++;					// Add to jump count
				
				sounds.jump.rate(Math.random()*1+1);	// Random pitch and speed
				sounds.jump.play();						// Play jump sound
				
			}
			
		} else if (mouseX > player.pos.x + player.size / 3) {
			
			player.state = "right";
			player.move('right');	// Move player right
			
		} else if (mouseX < player.pos.x - player.size / 3) {
			
			player.state = "left";
			player.move('left');	// Move player right
			
		} else {
			
			player.state = "idle";
			
		}
		
	}
	
}


function keyPressed() {	// When a key is pressed
	
	if (keyIsDown(87) || keyIsDown(38) || keyIsDown(32)) {	// Space Bar
		
		if (player.jump.count < player.jump.limit) {	// Hasn't used all jumps
		
			player.jump.height += player.size * 3;	// Increase jump height
			player.jump.count++;					// Add to jump count
			
			sounds.jump.rate(Math.random()*1+1);	// Random pitch and speed
			sounds.jump.play();						// Play jump sound
			
		}
		
	}
	
	if (keyIsDown(27)) {	// 'Esc' Key
		
		// Toggle Pause Screen
		if (game.screen == 'play') {	// Screen is set to 'play'
			
			game.screen = 'pause';	// Set screen to 'pause'
			
		} else if (game.screen == 'pause') {	// Screen is set to 'pause'
			
			game.screen = 'play';	// Set screen to 'play'
			_screen.paused = false;	// Reset screen state
			
		}
		
	}
	
}

function mouseClicked() {	// When the mouse is clicked
	
	if (game.screen == 'start' || game.screen == 'gameover') {	// Screen is set to 'start'
		
		sounds.start.rate(Math.random()*1+1);	// Random pitch and speed
		sounds.start.play();					// Play start sound
		
		game.screen = 'play';	// Set screen to 'play'
		
	} else if (game.screen == 'complete') {	// Screen is set to 'complete'
		
		game.reset();	// Reset game
		
		game.screen = 'start';	// Set screen to 'start'
		
	} else if (game.screen == 'pause') {	// Screen is set to 'pause'
		
		game.screen = 'play';	// Set screen to 'play'
		_screen.paused = false;	// Reset screen state
		
	}
	
}