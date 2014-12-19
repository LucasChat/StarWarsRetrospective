var mouse = {x:0,y:0};

function impact(paramImpact) {
	switch(bmpPlayer.life)
    {
    	case 3:
    		bmpPlayer.gotoAndPlay("good");
    		bmpPlayer.alpha = 0.2;
			bmpPlayer.wounded = true;
    		invulnerability = setTimeout(alpha, 2200);
    		break;
    	case 2:
    		bmpPlayer.gotoAndPlay("middle");
    		bmpPlayer.alpha = 0.2;
			bmpPlayer.wounded = true;
    		invulnerability = setTimeout(alpha, 2200);
    		break;
    	case 1:
    		bmpPlayer.gotoAndPlay("bad");
    		bmpPlayer.alpha = 0.2;
			bmpPlayer.wounded = true;
    		invulnerability = setTimeout(alpha, 2200);
    		break;
    	case 0:
    		bmpPlayer.alive = false;
			stage.removeChild(bmpPlayer);
            gameOver.style.display = "block";
            paused();
			break;
    }
    if(paramImpact)
    {
    	bmpPlayer.redBonus   = false;
    	bmpPlayer.greenBonus = false;
    }
}

function inGameScreenTest (position, element){
    if(position.x < element.width/2) return false;
    if(position.x > canvas.offsetWidth-element.width/2) return false;
    if(position.y < element.height/2) return false;
    if(position.y > canvas.offsetHeight-element.height/2) return false;
    return true;
}

function inGameScreenTestEnemy (position, element){
    if(position.x < -element.width/2) return false;
    if(position.x > canvas.offsetWidth+element.width/2) return false;
    if(position.y < element.height/2) return false;
    if(position.y > canvas.offsetHeight-element.height/2) return false;
    return true;
}

function hitBox(player, danger) 
{
    if(danger.x - (danger.width/2.8) > player.x + (player.width/2.8)) return false;
    if(danger.y - (danger.height/2.8) > player.y + (player.height/2.8)) return false;
    if(danger.x + (danger.width/2.8) < player.x - (player.width/2.8)) return false;
    if(danger.y + (danger.height/2.8) < player.y - (player.height/2.8)) return false;
    return true;
}


window.onmousemove = function(e)
{
    mouse.x = e.clientX - canvas.offsetLeft;
    mouse.y = e.clientY - canvas.offsetTop;
};