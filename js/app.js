// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // Enemy inital Location (x,y)
    this.x = x;
    this.y = y;
    // Enemy Speed in the game
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    
    // the speed on the x axis
    this.x += this.speed * dt;

    // when enemies are off the screen
    // reset postions random 
    // check if x > width of canvas
    if (this.x > 505) { 
        // delay of position x to show again in canvas with random speed
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 256);
    };
    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 85 && 85  + player.x > this.x 
        && player.y < this.y + 25 && 25 + player.y > this.y) {
        player.x = 205;
        player.y = 385;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
 
// player of the game
class Player {    
    constructor(x, y) {
        // player inital Location (x,y)
        this.x = x;
        this.y = y;
        // player Speed in the game is constant to move from one block to other
        this.speed = 51;
        // The image/sprite for player
        this.sprite = 'images/char-boy.png';
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {
        // to prevent player of moving down out canvas 
        if (this.y > 385) {
            this.y = 385;
        }
        // to prevent player of moving right out canvas 
        if (this.x > 400) {
            this.x = 400;
        }
        // to prevent player of moving left out canvas 
        if (this.x < 0) {
            this.x = 0;
        }
        // Check if player win and reach water , reset player position
        if (this.y < 0) {
            this.x = 205;
            this.y = 385;            
            $("#myModal").modal()
        }
    }
    handleInput(keyPress) {
        switch (keyPress) {
            case 'left':
            this.x -= this.speed + 50;
            break;
            case 'right':
            this.x += this.speed + 50;
            break;
            case 'up':
            this.y -= this.speed + 30;
            break;
            case 'down':
            this.y += this.speed + 30;
            break;
        }
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Enemy Position Y 
var enemiesPosition = [60, 145 ,225];
var player = new Player(205, 385);
var newEnemy;

// make 3 Enemies of random speed
for(let i = 0; i < enemiesPosition.length; i++)
{
    newEnemy = new Enemy(0, enemiesPosition[i], 100 + Math.floor(Math.random() * 256));
    allEnemies.push(newEnemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
