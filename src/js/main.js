var canvas = document.getElementById("canvas");
var stage = null;
var replay = false;


function resetGame() 
{
    stage.removeAllChildren();
    createjs.Ticker.removeAllListeners();
    pauseScreen.style.display = "none";
    gameOver.style.display = "none";
    victoryScreen.style.display = "none";
    bmpEnemyLasers = [];
    bmpEnemys = [];
    bmpBonusTab = [];
    clearInterval(fireEnemy0);
    clearInterval(fireEnemy1);
    clearInterval(fireEnemy2);
    clearInterval(fireEnemy3);
    clearInterval(fireBonus);
    clearInterval(firePlayer);
    createjs.Ticker.setPaused(false);
	gamePaused = false;
    startGame();
}


function returnMenu()
{
    replay = true;
    pauseScreen.style.display = "none";
    gameOver.style.display = "none";
    victoryScreen.style.display = "none";
    paused();
    selected_spaceship.xwing = false;
    selected_spaceship.naboo = false;
    selected_spaceship.millenium = false;
    selected_spaceship.interceptor = false;
    choose_spaceship.style.display = "block";
    canvas.style.display = "none";
}


function startGame() 
{
	stage = new createjs.Stage(canvas);

	createBackground();
	createPlayer();
	generateEnemy();
	audio.currentTime = 0;
	audio.play();
	launchEnemyFire();
    launchFirePlayer();   
}


function tick() {
    if(replay)
    {
        replay = false;
        stage.removeChild(bmpPlayer);
        createPlayer();
    }

        // BACKGROUND
	bmpBackground.decal = bmpBackground.decal + bmpBackground.speedX; 

	if (bmpBackground.decal > bmpBackground.widthTravel) bmpBackground.decal = bmpBackground.decal - bmpBackground.widthTravel ;

	bmpBackground.x = -bmpBackground.decal;


    	// DEPLACEMENT JOUEUR
    if(inGameScreenTest(mouse, bmpPlayer))
	{
        bmpPlayer.x = mouse.x;
        bmpPlayer.y = mouse.y;
    }
    else
    {
    	outGameScreen();
    }

    	//  BONUS
    for(var i = 0 ; i < bmpBonusTab.length ; i++)
    {
    	// DEPLACEMENT BONUS
    	bmpBonusTab[i].x = bmpBonusTab[i].x + bmpBonusTab[i].speedX;
    	// COLLISION BONUS
    	if (bmpPlayer.alive && hitBox(bmpPlayer, bmpBonusTab[i])) 
	    {
	    	switch(bmpBonusTab[i].which)
	    	{
	    		case 0:
	    			useGreenBonus(i);
			        break;
			    case 1:
			    	useBlueBonus(i);
			    	break;
			    case 2:
			    	useRedBonus(i);
			    	break;
	    	}
	        
		}
    }

    	// LASER ENEMY
    for(var i = 0; i < bmpEnemyLasers.length; i++)
    {
	    bmpEnemyLasers[i].x = bmpEnemyLasers[i].x + bmpEnemyLasers[i].speedX;
		// bmpEnemyLasers[i].y = bmpEnemyLasers[i].y;
		if (!bmpPlayer.wounded && hitBox(bmpPlayer, bmpEnemyLasers[i])) 
        {
            bmpPlayer.life = bmpPlayer.life - 1;
            stage.removeChild(bmpEnemyLasers[i]);
            bmpEnemyLasers.splice(i, 1);
            impact(true);
            return;
        }
	}
	

    	// ENNEMIS
    for(var k = 0 ; k < bmpEnemys.length ; k ++)
    {
    	//IMPACT
    	if (bmpPlayer.alive && !bmpPlayer.wounded && hitBox(bmpPlayer, bmpEnemys[k])) 
        {
            bmpPlayer.life = bmpPlayer.life - 1;
            stage.removeChild(bmpEnemys[k]);
            bmpEnemys.splice(k, 1);
            impact(true);
            return;
    	}

    	// DEPLACEMENT
    	if(bmpEnemys[k].y > canvas.height - bmpEnemys[k].height/1.9 || bmpEnemys[k].y < bmpEnemys[k].height/1.9) bmpEnemys[k].speedY *= -1;
    	if(inGameScreenTestEnemy(bmpEnemys[k], bmpEnemys[k]))
    	{
    		bmpEnemys[k].x = bmpEnemys[k].x + bmpEnemys[k].speedX;
    		bmpEnemys[k].y = bmpEnemys[k].y + bmpEnemys[k].speedY;
    	}
    	else
    	{
    		stage.removeChild(bmpEnemys[k]);
            bmpEnemys.splice(k, 1);
    	}
    }


    	// LASERS
    for(var i = 0; i < bmpPlayerLasers.length; i++)
    {
  	
    	// DEPLACEMENT
    	if(bmpPlayerLasers.length != 0)
    	{
	    	if(inGameScreenTest(bmpPlayerLasers[i], bmpPlayerLasers[i]))
	    	{
	    		//console.log(bmpPlayerLasers[i].x + "  | " + (canvas.offsetWidth-bmpPlayerLasers[i].width/2));
	    		bmpPlayerLasers[i].x = bmpPlayerLasers[i].x + bmpPlayerLasers[i].speedX;
	        	// bmpPlayerLasers[i].y = bmpPlayerLasers[i].y;
	        }
	        // SORTIE CANVAS
	        else
	        {
	        	//console.log("delete");
	        	stage.removeChild(bmpPlayerLasers[i]);
	        	bmpPlayerLasers.splice(i, 1);
	        	return;
	        }
    	}

    		// Impact Laser Player
    	for(var j = 0 ; j < bmpEnemys.length ; j++)
    	{
    		if (bmpPlayer.alive && hitBox(bmpPlayerLasers[i], bmpEnemys[j])) 
	        {
				stage.removeChild(bmpEnemys[j]);
				bmpEnemys.splice(j, 1);
				if(!bmpPlayer.redBonus)
				{
					stage.removeChild(bmpPlayerLasers[i]);
					bmpPlayerLasers.splice(i, 1);
				}
	            return;
	        }
    	}

        
    }
    // update the stage:
    stage.update();
}