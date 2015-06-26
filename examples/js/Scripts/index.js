$(document).ready(function () {
	var currentDate = new Date();
	$('p#copyright').text($('p#copyright').text()+ ' ' + currentDate.getFullYear());

	/* Images demo */
    var database = new Database();
    var urlDemo = new UrlDemo(database.scene, database.overlayScene, database.design, database.floorDesign, database.contrastDesign);
	
	var defaultImageWidth = 250;
	var defaultImageHeight = 250;
	
	var defaultSceneUrl = urlDemo.GetBaseSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#simpleScene').attr('src', defaultSceneUrl);
	
	var defaultDesignUrl = urlDemo.GetDefaultDesignUrl(defaultImageWidth, defaultImageHeight);
	$('img#simpleDesign').attr('src', defaultDesignUrl);
    
	var colorSceneUrl = urlDemo.GetColorSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#colorScene').attr('src', colorSceneUrl);
    
	var designSceneUrl = urlDemo.GetDefaultMappedSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designScene').attr('src', designSceneUrl);
	
	var designPlacingPointXSceneUrl = urlDemo.GetDesignPlacingPointXSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designPlacingPointX').attr('src', designPlacingPointXSceneUrl);
		
	var designPlacingPointYSceneUrl = urlDemo.GetDesignPlacingPointYSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designPlacingPointY').attr('src', designPlacingPointYSceneUrl);
		
	var designRepeatSceneUrl = urlDemo.GetDesignRepeatSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designRepeat').attr('src', designRepeatSceneUrl);
	
	var designDropXSceneUrl = urlDemo.GetDesignDropXSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designDropX').attr('src', designDropXSceneUrl);	
	
	var designDropYSceneUrl = urlDemo.GetDesignDropYSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designDropY').attr('src', designDropYSceneUrl);
	
	var designFlipSceneUrl = urlDemo.GetDesignFlipSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designFlip').attr('src', designFlipSceneUrl);
	
	var designMirrorSceneUrl = urlDemo.GetDesignMirrorSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designFlipRotate').attr('src', designMirrorSceneUrl);
	
	var designContrastMappedSceneUrl = urlDemo.GetDesignContrastMappedSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designWithoutContrast').attr('src', designContrastMappedSceneUrl);
	
	var designContrastSceneUrl = urlDemo.GetDesignContrastSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#designContrast').attr('src', designContrastSceneUrl);
	
	var singleOverlaySceneUrl = urlDemo.GetSingleOverlaySceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#singleOverlay').attr('src', singleOverlaySceneUrl);
	
	var multipleOverlaySceneUrl = urlDemo.GetMultipleOverlaySceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#multipleOverlay').attr('src', multipleOverlaySceneUrl);
	
	var textSceneUrl = urlDemo.GetTextSceneUrl(defaultImageWidth, defaultImageHeight);
	$('img#text').attr('src', textSceneUrl);
	
	/* Coordinates demo */
	var coordsSceneUrl = urlDemo.GetBaseSceneUrl(750, 750);
	$('img#coordsScene').attr('src', coordsSceneUrl);
	
	var coordsUrl = urlDemo.GetSceneCoordsUrl();
		
	var coordinatesDemo = new CoordinatesDemo(coordsUrl);
	var $coordSceneImage = $('img#coordsScene');
	
	$("img#coordsScene").one("load", function() {
	  coordinatesDemo.GetCoords($(this).width(), $(this).height());
	});
	
	$('img#coordsScene').bind('mousemove', $.proxy(coordinatesDemo.OnMouseDown, coordinatesDemo));
});