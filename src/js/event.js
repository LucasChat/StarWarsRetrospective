var gameOver = document.querySelector('.game_over');
var pauseScreen = document.querySelector('.pause');
var victoryScreen = document.querySelector(".success");
var audio = document.querySelector(".audio");
var gamePaused = false;
var maxTime;


if(document.all) 
{
    document.onfocus = focusActive;
    document.onblur = focusDesactive;
}
window.onblur = function (){
    if(canvas.style.display == "block" && gameOver.style.display == "none" && victoryScreen.style.display == "none")
    {
        console.log("pause");
        paused();
        pauseScreen.style.display = "block";
    }
}
document.onblur = window.onblur;


function sound()
{
	if(audio.volume == 0) audio.volume = 1;
	else audio.volume = 0;
}


audio.addEventListener('ended',function(e)
{
    victory();
});


canvas.onmousedown = function()
{

	if(bmpPlayer.greenBonus && bmpPlayer.alive)
	{
		console.log("3");
		createNewLaser(true, null, bmpPlayer.height/4);
		createNewLaser(true, null, -bmpPlayer.height/4);
	}
	else
	{
		if(bmpPlayer.alive) createNewLaser(true, null, 0);
	}
	bmpPlayer.firing = true;
}


canvas.onmouseup = function()
{
	bmpPlayer.firing = false;
}


function paused()
{
	createjs.Ticker.setPaused(true);
	gamePaused = true;
	clearInterval(intervalEnemy);
	audio.pause();
}


function resume()
{
	createjs.Ticker.setPaused(false);
	gamePaused = false;
	audio.play();
	var intervalEnemy = setInterval(newEnemy, timingSongPreci);
	pauseScreen.style.display = 'none';
	gameOver.style.display = 'none';
    victoryScreen.style.display = "none";
}


function victory()
{
    paused();
    victoryScreen.style.display = "block";
}


function touche(event)
{
	var touche = event.keyCode;
	if(touche == 27)
	{
		if(pauseScreen.style.display == "none") 
		{
			paused();
			pauseScreen.style.display = "block";
		}
		else 
		{
			resume();
			pauseScreen.style.display = "none";
		}
	}
}