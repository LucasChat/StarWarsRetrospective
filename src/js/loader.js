var $elements = $('body').find('img[src]');
$('body [style]').each(function() {
	var src = $(this).css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
	if(src && src != 'none') {
		$elements = $elements.add($('<img src="' + src + '"/>'));
	}
});
.animate({pourcentage:pourcentage}, {
	duration: duration,
	step: animateStep
});
function animateStep(now, fx) {
	$chargementInfos.text(parseInt(now)+'%');
}


$(document).ready(function() {
	// Le dom est chargé
	// ici notre loader
	$.pageLoader() ;
})

$(window).load(function() {
	// La page est intégralement chargée
	// votre code ici…
	// code déjà présent dans le plug-in jQuery
}) ;