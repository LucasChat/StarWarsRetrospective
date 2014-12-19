var chooseBackground = Math.floor(Math.random() * 6);
var bmpBackground = null;

function createBackground()
{
	var spriteSheet = new createjs.SpriteSheet({
	    // image to use
	    images: [imgBackground], 
	    // width, height & registration point of each sprite
	    frames: {width: imgBackground.width, height: imgBackground.height}, 

    });
	
    // create a BitmapAnimation instance to display and play back the sprite sheet:
	bmpBackground = new createjs.BitmapAnimation(spriteSheet);

    bmpBackground.name = "Background";
    //bmpBackground.direction = 90;
    bmpBackground.x = 0;
    bmpBackground.y = 0;
    
    //bmpBackground.bounds = 50;
    //bmpBackground.hit = bmpBackground.bounds;
    bmpBackground.width = imgBackground.width;
    bmpBackground.height = imgBackground.height;
    bmpBackground.widthTravel = bmpBackground.width - canvas.width;
    bmpBackground.speedX = 2;
    bmpBackground.decal = 0;
		
    // have each monster start at a specific frame
    bmpBackground.currentFrame = 0;
    stage.addChild(bmpBackground);
		
    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
}