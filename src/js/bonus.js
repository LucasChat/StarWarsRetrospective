var bmpBonusTab = [];


function createBonus(type)
{
    switch(type)
    {
        case 0:
            var bonus = imgGreenBonus;
            break;
        case 1:
            var bonus = imgBlueBonus;
            break;
        case 2:
            var bonus = imgRedBonus;
            break;
    }

	var spriteSheet = new createjs.SpriteSheet({
	    // image to use
	    images: [bonus], 
	    // width, height & registration point of each sprite
	    frames: {width: bonus.width, height: bonus.height}, 
	    // animations: {	
		   //  walk: [0, 0, "walk"]
	    // }
    });
	
    // create a BitmapAnimation instance to display and play back the sprite sheet:
	bmpBonus = new createjs.BitmapAnimation(spriteSheet);

    // start playing the first sequence:
    // bmpBonus.gotoAndPlay("walk"); 	//animate
	
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    //bmpBonus.shadow = new createjs.Shadow("#454", 0, 5, 4);

    bmpBonus.name = "Bonus";
    bmpBonus.which = type;
    //bmpBonus.direction = 90;
    bmpBonus.x = canvas.width + bonus.width/2;
    bmpBonus.y = Math.floor(Math.random() * (canvas.height-(bonus.height*2))) + (bonus.height);
    
    //bmpBonus.bounds = 50;
    //bmpBonus.hit = bmpBonus.bounds;
    bmpBonus.width = bonus.width;
    bmpBonus.height = bonus.height;
    bmpBonus.speedX = -2.5;
		
    // have each monster start at a specific frame
    bmpBonus.currentFrame = 0;
    bmpBonusTab.push(bmpBonus);
    stage.addChild(bmpBonus);
		
    // we want to do some work before we update the canvas,
    // otherwise we could use Ticker.addListener(stage);
    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
}

function useGreenBonus(i)
{
    bmpPlayer.greenBonus = true;
    stage.removeChild(bmpBonusTab[i]);
    bmpBonusTab.splice(i, 1);
}

function useRedBonus(i)
{
    bmpPlayer.redBonus = true;
    stage.removeChild(bmpBonusTab[i]);
    bmpBonusTab.splice(i, 1);
}

function useBlueBonus(i)
{
    if(bmpPlayer.life < 3) 
    {
        bmpPlayer.life = bmpPlayer.life + 1;
        impact(false);
        stage.removeChild(bmpBonusTab[i]);
        bmpBonusTab.splice(i, 1);
    }
}

var fireBonus = setInterval(function(){
    if(bmpEnemys.length > 8)
    {
        if(Math.random() > 0.5) createBonus(Math.floor(Math.random()*3));
    }
}, 3000);