var bmpPlayer = null;
var firePlayer;

function createPlayer()
{
    var spriteSheet = new createjs.SpriteSheet({
        // image to use
        images: [imgPlayer], 
        // width, height & registration point of each sprite
        frames: {width: imgPlayer.width/3, height: imgPlayer.height, regX: imgPlayer.width/6, regY: imgPlayer.height/2}, 
        animations: {   
            good: [0, 0, false],
            middle: [1, 1, false],
            bad: [2, 2, false]
        }
    });
    
    // create a BitmapAnimation instance to display and play back the sprite sheet:
    bmpPlayer = new createjs.BitmapAnimation(spriteSheet);

    // start playing the first sequence:
    bmpPlayer.gotoAndPlay("good");  //animate
    
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    //bmpPlayer.shadow = new createjs.Shadow("#454", 0, 5, 4);

    bmpPlayer.name = "Player";
    //bmpPlayer.direction = 90;
    // bmpPlayer.vX = 4;
    bmpPlayer.x = 100;
    bmpPlayer.y = 300;
    bmpPlayer.alive = true;
    bmpPlayer.wounded = false;
    bmpPlayer.greenBonus = false;
    bmpPlayer.redBonus = false;
    bmpPlayer.life = 3;
    bmpPlayer.alpha = 1;
    //bmpPlayer.bounds = 50;
    //bmpPlayer.hit = bmpPlayer.bounds;
    bmpPlayer.width = imgPlayer.width/3;
    bmpPlayer.height = imgPlayer.height;
        
    // have each monster start at a specific frame
    bmpPlayer.currentFrame = 0;
    stage.addChild(bmpPlayer);
        
    // we want to do some work before we update the canvas,
    // otherwise we could use Ticker.addListener(stage);
    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
}


function launchFirePlayer()
{
    firePlayer = setInterval(function(){
        if(bmpPlayer.firing && bmpPlayer.alive) 
        {
            if(bmpPlayer.greenBonus)
            {
                console.log("3");
                createNewLaser(true, null, bmpPlayer.height/4);
                createNewLaser(true, null, -bmpPlayer.height/4);
            }
            else
            {
                createNewLaser(true, null, 0);
            }
        }
    }, 200);
}


function alpha() {
    bmpPlayer.alpha = 1;
    bmpPlayer.wounded = false;
}


function outGameScreen () {
    if(mouse.x < bmpPlayer.width/2 && mouse.y > bmpPlayer.height/2 && mouse.y < canvas.offsetHeight-bmpPlayer.height/2)
        {
            bmpPlayer.x = bmpPlayer.width/2;
            bmpPlayer.y = mouse.y;
        }
        if(mouse.x > canvas.offsetWidth-bmpPlayer.width/2 && mouse.y > bmpPlayer.height/2 && mouse.y < canvas.offsetHeight-bmpPlayer.height/2)
        {
            bmpPlayer.x = canvas.width - bmpPlayer.width/2;
            bmpPlayer.y = mouse.y;
        }
        if(mouse.y < bmpPlayer.height/2 && mouse.x > bmpPlayer.width/2 && mouse.x < canvas.offsetWidth-bmpPlayer.width/2)
        {
            bmpPlayer.x = mouse.x;
            bmpPlayer.y = bmpPlayer.height/2;
        }
        if(mouse.y > canvas.offsetHeight-bmpPlayer.height/2 && mouse.x > bmpPlayer.width/2 && mouse.x < canvas.offsetWidth-bmpPlayer.width/2)
        {
            bmpPlayer.x = mouse.x;
            bmpPlayer.y = canvas.height - bmpPlayer.height/2;
        }
}