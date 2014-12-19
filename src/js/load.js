var imgPlayer     = new Image();
var imgLaser1     = new Image();
var imgLaser2     = new Image();
var imgEnemy1     = new Image();
var imgEnemy2     = new Image();
var imgEnemy3     = new Image();
var imgEnemy4     = new Image();
var imgBackground = new Image();
var imgGreenBonus = new Image();
var imgBlueBonus  = new Image();
var imgRedBonus   = new Image();

var choosePlayer;


imgBackground.onerror = handleImageError;
switch(chooseBackground) {
    case 0:
        imgBackground.src = "src/img/tatooine.png";
        break;
    case 1:
        imgBackground.src = "src/img/hoth.png";
        break;
    case 2:
        imgBackground.src = "src/img/mustafar.png";
        break;
    case 3:
        imgBackground.src = "src/img/coruscante.png";
        break;
    case 4:
        imgBackground.src = "src/img/endor.png";
        break;
    case 5:
        imgBackground.src = "src/img/nabooBackground.png";
        break;
}

function choosePlayerFunction()
{
    if(selected_spaceship.xwing) choosePlayer = 3;
    if(selected_spaceship.naboo) choosePlayer = 2;
    if(selected_spaceship.millenium) choosePlayer = 1;
    if(selected_spaceship.interceptor) choosePlayer = 0;
}

function init() 
{
    // canvas = document.getElementById("canvas");
    choosePlayerFunction();
    
    // imgPlayer.onload  = handleImageLoad;
        imgPlayer.onerror = handleImageError;
        switch(choosePlayer) {
        case 0:
            imgPlayer.src = "src/img/Interceptor3Sprites.png";
            break;
        case 1:
            imgPlayer.src = "src/img/MilleniumFalcon3Sprites.png";
            break;
        case 2:
            imgPlayer.src = "src/img/Naboo3Sprites.png";
            break;
        case 3:
            imgPlayer.src = "src/img/XWing3Sprites.png";
            break;  
    	}
	//imgPlayer.src = "src/img/XWing3Sprites.png";
    
    if(!replay)
    {

        // imgLaser1.onload   = handleImageLoad;
        imgLaser1.onerror     = handleImageError;
        imgLaser1.src         = "src/img/Laser_jedi.png";

        // imgLaser2.onload   = handleImageLoad;
        imgLaser2.onerror     = handleImageError;
        imgLaser2.src         = "src/img/Laser_enemy.png";

        // imgEnemy1.onload   = handleImageLoad;
        imgEnemy1.onerror     = handleImageError;
        imgEnemy1.src         = "src/img/GauntletFighterGame.png";

        // imgEnemy2.onload   = handleImageLoad;
        imgEnemy2.onerror     = handleImageError;
        imgEnemy2.src         = "src/img/GunshipDroid.png";

        // imgEnemy3.onload   = handleImageLoad;
        imgEnemy3.onerror     = handleImageError;
        imgEnemy3.src         = "src/img/intercepteurTIE.png";

        // imgEnemy4.onload   = handleImageLoad;
        imgEnemy4.onerror     = handleImageError;
        imgEnemy4.src         = "src/img/VultureDroid.png";

        imgGreenBonus.onerror = handleImageError;
        imgGreenBonus.src     = "src/img/greenBonus.png";

        imgBlueBonus.onerror = handleImageError;
        imgBlueBonus.src     = "src/img/blueBonus.png";

        imgRedBonus.onload  = handleImageLoad;
        imgRedBonus.onerror = handleImageError;
        imgRedBonus.src     = "src/img/redBonus.png";
    }
    else 
    {
        stage.removeChild(bmpPlayer);
        createPlayer();
        resetGame();
    }
}

function handleImageLoad(e) 
{
    startGame();
}

//called if there is an error loading the image (usually due to a 404)
function handleImageError(e) {
    console.log("Error Loading Image : " + e.target.src);
}