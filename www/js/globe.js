onlineForLife.Globe = {
	init: function(){
		onlineForLife.Globe.setupGlobe();
	},	

	setupGlobe: function(){
		var fullHeight = 900;
		var fullWidth = 3400;
		var maxWidth = 500;
		var $section = $('.section-globe');
		var $globe = $section.find('.globe');
		var windowWidth = $(window).width();
		windowWidthTotal = windowWidth;
		var paddingLeft = parseInt($section.css('paddingLeft').replace('px',''));
		var paddingRight = parseInt($section.css('paddingRight').replace('px',''));
		var paddingTotal = paddingLeft+paddingRight;
		var windowWidth = windowWidth - paddingTotal;
		if(windowWidth>maxWidth){
			windowWidth = maxWidth;
		}
		var scale = windowWidth/fullHeight;
		var globeWidth = fullWidth;
		var globeHeight = fullHeight;
		var imageWidth = globeWidth*scale;
		var imageHeight = globeHeight*scale;
		//$globe.css('-webkit-transform','scale(' + scale + ',' + scale + ')');
		
		console.log('windowWidthTotal',windowWidthTotal);
		console.log('maxWidth',maxWidth);
		console.log('paddingLeft',paddingLeft);
		console.log('paddingRight',paddingRight);
		console.log('paddingTotal',paddingTotal);
		console.log('windowWidth',windowWidth);
		console.log('#######################');
		console.log('fullWidth',fullWidth);
		console.log('fullHeight',fullHeight);
		console.log('scale',scale);
		console.log('imageWidth',imageWidth);
		console.log('imageHeight',imageHeight);
		console.log('globeWidth',globeWidth);
		console.log('globeHeight',globeHeight);
		console.log('=======================');
		$('#globe').spinningGlobe({
			imageWidth:imageWidth,
			imageHeight:imageHeight,
			earthWidth: 3400,
			earthHeight: 900,
			prefix: 'img/globe/',
			logo: false,
			resistance: 15
		});

		
	},				

	setupGlobeOld: function(){
		var windowWidth = $(window).width();
		windowWidthTotal = windowWidth;
		var dataKey = 9;
		if(windowWidth<1000){
			dataKey = windowWidth.toString().charAt(0);
		}
		dataKey = (parseInt(dataKey)*100);
		console.log('dataKey',dataKey);
		var globeWidth = 100;//data object removed
		var globeHeight = 100;
		
		console.log('windowWidthTotal',windowWidthTotal);
		console.log('windowWidth',windowWidth);
		console.log('globeWidth',globeWidth);
		console.log('globeHeight',globeHeight); 
		$('#globe').spinningGlobe({
			earthWidth: globeWidth, 
			earthHeight: globeHeight,
			prefix: 'img/globe/' + globeHeight + '/',
			logo: false,
			resistance: 15
		});
	}
	
};

