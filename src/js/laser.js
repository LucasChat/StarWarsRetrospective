var bmpPlayerLasers = [];
var bmpLaser;
var bmpEnemyLasers = [];

function createNewLaser(player, enemy, shift)
{
	if(player) var img = imgLaser1
	else var img = imgLaser2
	// if(player)
	// {
	var spriteSheet = new createjs.SpriteSheet({
	    images: [img],
	    // width, height & registration point of each sprite
	    frames: {width: img.width, height: img.height, regX: img.width/2, regY: img.height/2}, 
    });
	
    // create a BitmapAnimation instance to display and play back the sprite sheet:
	bmpLaser = new createjs.BitmapAnimation(spriteSheet);
 
    bmpLaser.name = "Laser";
    bmpLaser.width = img.width;
    bmpLaser.height = img.height;
    bmpLaser.currentFrame = 0;
    if(player) 
    {
    	bmpLaser.speedX = 15;
    	bmpLaser.x = mouse.x + imgPlayer.width/6;
    	bmpLaser.y = mouse.y + shift;
    	bmpPlayerLasers.push(bmpLaser);
    }
    else 
    {
    	bmpLaser.speedX = -10;
    	bmpLaser.x = enemy.x - imgEnemy1.width/2;
    	bmpLaser.y = enemy.y;
    	bmpEnemyLasers.push(bmpLaser);
    }
   
    stage.addChild(bmpLaser);
		
    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
}