var bmpEnemys = [];
var fireEnemy0;
var fireEnemy1;
var fireEnemy2;
var fireEnemy3;
var tabSongEnemy;
var timingSongPreci;
var whichMusic;
var intervalEnemy;
var statEnemy = [
					[-4, 2, 2000],
					[-3, -1, 2222],
					[-6, 0, 2700],
					[-8, 0, 3100]
				];


function createNewEnemy(type)
{
	switch(type)
	{
		case 0:
			var img = imgEnemy1;
			break;
		case 1:
			var img = imgEnemy2;
			break;
		case 2:
			var img = imgEnemy3;
			break;
		case 3:
			var img = imgEnemy4;
			break;
	}
	var spriteSheet = new createjs.SpriteSheet({
	    // image to use
	    images: [img], 
	    // width, height & registration point of each sprite
	    frames: {width: img.width, height: img.height, regX: img.width/2, regY: img.height/2}, 
    });
	
    // create a BitmapAnimation instance to display and play back the sprite sheet:
	bmpEnemy = new createjs.BitmapAnimation(spriteSheet);

    bmpEnemy.which = type;
    bmpEnemy.name = "Enemy";
    bmpEnemy.speedX = statEnemy[type][0];
    bmpEnemy.speedY = statEnemy[type][1];
    bmpEnemy.width = img.width;
    bmpEnemy.height = img.height;
    bmpEnemy.x = canvas.width + img.width/2;
    bmpEnemy.y = Math.floor(Math.random() * (canvas.height-(img.height*2))) + (img.height);
    bmpEnemy.currentFrame = 0;
    bmpEnemys.push(bmpEnemy);
    stage.addChild(bmpEnemy);
		
    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
}


function launchEnemyFire() 
{

	fireEnemy0 = setInterval(fireEnemy0Function	, statEnemy[0][2]);

	fireEnemy1 = setInterval(function(){
		for(i = 0 ; i < bmpEnemys.length ; i++)
		{
			if(bmpEnemys[i].which == 1) createNewLaser(false, bmpEnemys[i]);
		}
	}, statEnemy[1][2]);

	fireEnemy2 = setInterval(function(){
		for(i = 0 ; i < bmpEnemys.length ; i++)
		{
			if(bmpEnemys[i].which == 2) createNewLaser(false, bmpEnemys[i]);
		}
	}, statEnemy[2][2]);

	fireEnemy3 = setInterval(function(){
		for(i = 0 ; i < bmpEnemys.length ; i++)
		{
			if(bmpEnemys[i].which == 3) createNewLaser(false, bmpEnemys[i]);
		}
	}, statEnemy[3][2]);
}

function fireEnemy0Function(){
	for(i = 0 ; i < bmpEnemys.length ; i++)
	{
		if(bmpEnemys[i].which == 0) createNewLaser(false, bmpEnemys[i]);
	}
}


function generateEnemy()
{
	tabSongEnemy = whichMusic.slice(0); // correspond au timing des ennemis selon la musique, copie du bon tableau musique à chaque fois
	
	timingSongPreci = 50;
	maxTime = audio.duration;

	function newEnemy(){
		if(tabSongEnemy.length >= 0 && audio.currentTime >= tabSongEnemy[0]){
			tabSongEnemy.shift(); // on enlève le premier élément du tableau
			createNewEnemy(Math.floor(Math.random() * 4));
			//return; // la musique correspond
		}
	}

	intervalEnemy = setInterval(newEnemy, timingSongPreci); //ne pas oublier de le clear !
}

function newEnemy()
{
    if(tabSongEnemy.length >= 0 && audio.currentTime >= tabSongEnemy[0])
    {
    	tabSongEnemy.shift(); // on enlève le premier élément du tableau
    	createNewEnemy(Math.floor(Math.random() * 4));
    }
}