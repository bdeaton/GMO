GMO.Globe = {
	init: function(){
		GMO.Globe.setupListeners();
		GMO.Globe.buildGlobeData();
		GMO.Globe.getMapData();
	},	

	setupListeners:function(){
		$(document).on("PointsDataLoaded", GMO.Globe.handlePointsDataLoaded);
		$(document).on("PointsDomLoaded", GMO.Globe.handlePointsDomLoaded);

		$(document).on("PointsDataUpdated", GMO.Globe.handlePointsDataUpdated);
	},	

	getMapData:function(){
		var url = 'js/api-points.js';
		url = 'js/api-points-test.js';
		GMO.App.getAPIData('MapPoints',url,'PointsDataLoaded','PointsDataFail','init');
	},

	getMapDataUpdate:function(){
		var url = 'js/api-points-update.js';
		GMO.App.getAPIData('MapPointsUpdate',url,'PointsDataUpdated','PointsDataUpdatedFail','update');
	},

	handlePointsDataLoaded: function(event){
		if(event.method=='init'){
			GMO.Globe.buildPointsHtmlAll();
		}
	},

	handlePointsDataUpdated: function(event){
		GMO.Globe.buildPointsHtmlUpdate();
	},

	getPxPosition: function(lat,lon){
		console.log('               ');
		console.log('============================ getPxPosition: ' + lat + ' - ' + lon);
		var scale = AppData.globeData.scale;		//0.5555555555555556
		var mapWidth = AppData.globeData.width;		//3400
		var mapHeight = AppData.globeData.height;	//900
		
		
		var pxLonOffset = lon * AppData.globeData.pxPerDegreeLon;
		var pxLatOffset = -(lat * AppData.globeData.pxPerDegreeLat);
		var pxLonPos = (pxLonOffset + AppData.globeData.zeroDegreesLon);
		var pxLatPos = (pxLatOffset + AppData.globeData.zeroDegreesLat);
		var pxLonPosScaled = pxLonPos * scale;
		var pxLatPosScaled = pxLatPos * scale;
		
		console.log('lat: ' + lat);
		console.log('lon: ' + lon);
		console.log('scale: ' + scale);
		console.log('mapWidth: ' + mapWidth);
		console.log('mapHeight: ' + mapHeight);
		console.log('pxLon: ' + pxLonOffset);
		console.log('pxLat: ' + pxLatOffset);
		console.log('pxLonPos: ' + pxLonPos);
		console.log('pxLatPos: ' + pxLatPos);
		console.log('pxLonPosScaled: ' + pxLonPosScaled);
		console.log('pxLatPosScaled: ' + pxLatPosScaled);

		
		posData = {};
		posData.left1 = pxLonPosScaled;
		posData.top1 = pxLatPosScaled;
		posData.left2 = pxLonPosScaled + AppData.globeData.map2OffsetLon;
		posData.top2 = pxLatPosScaled + AppData.globeData.map2OffsetLat;
		console.log('left1: ' + posData.left1);
		console.log('top1: ' + posData.top1);
		console.log('left2: ' + posData.left2);
		console.log('top2: ' + posData.top2);
		console.log('               ');
		return posData;
	},

	buildPointsHtmlAll: function(){
		console.log('               ');
		console.log('============================ buildPointsHtmlAll');
		var pointsHtml = '';
		var pointsData = AppData.MapPoints.points;
		var iClass = 'loaded-true';
		var max = 99;
		var i = 0;
		$.each(pointsData,function(key,data){
			if(i<=max){
				i++;
				console.log(data);
				var lastId = AppData.globeData.mapPoints.lastId;
				var lat = data.a;
				var lon = data.o;
				var type = data.t;
				var posData = GMO.Globe.getPxPosition(lat,lon);
				var left1 = posData.left1;
				var left2 = posData.left2;
				var top1 = posData.top1;
				var top2 = posData.top2;
				var iClass = 'displayed-false type-' + type;
				var map1Id = 'item1-' + lastId;
				var map2Id = 'item2-' + lastId;
				
				AppData.globeData.mapPoints.itemsToShow.push(lastId);
				pointsHtml += '<i data-lookup="' + lastId + '" id="' + map1Id + '" style="left:' + left1 + 'px;top:' + top1 + 'px;" class="' + iClass + '"></i><i data-lookup="' + lastId + '" id="' + map1Id + '" style="left:' + left2 + 'px;top:' + top2 + 'px;" class="' + iClass + '"></i>';
				AppData.globeData.mapPoints.lastId += 1;
			}
		});
		//$(document).trigger({type:'PointsDomLoaded',pointsHtml:pointsHtml});
		GMO.Globe.handlePointsDomLoaded(pointsHtml);
	},

	handlePointsDomLoaded: function(pointsHtml){
		GMO.Globe.buildGlobe(pointsHtml);
	},

	handleGlobeBuilt: function(){
		GMO.Globe.showNextPoint();
	},

	showNextPoint: function(){
		var $mapPoints = $('.map-points-foreground');
		var id = AppData.globeData.mapPoints.itemsToShow[0];
		var $i = $mapPoints.find('#item1-' + id + ', #item2-' + id);
		setTimeout(function() {
			//$i.css('outline','3px solid green').removeClass('displayed-false');
			$i.css('outline','5px solid yellow').removeClass('displayed-false');
			AppData.globeData.mapPoints.itemsToShow.splice(0,1);
			GMO.Globe.showNextPoint();
		},500);
	},

	buildPointsHtmlUpdate: function(){
		
	},

	buildGlobeData: function(){
		console.log('   ');
		console.log('@@@@@@@@@@@@@@@@@@ buildGlobeData');
		AppData.globeData = {};
		AppData.globeData.mapPoints = {};
		AppData.globeData.mapPoints.itemsToShow = [];
		AppData.globeData.mapPoints.lastId = 0;
		AppData.globeData.FullWidth = 3400;
		AppData.globeData.FullHeight = 900;
		
		AppData.globeData.degreesMaxLon = 360;
		AppData.globeData.degreesMaxLat = 180;
		
		AppData.globeData.globeWidthEach = AppData.globeData.FullWidth/2;
		AppData.globeData.globeHeightEach = AppData.globeData.FullHeight;
		
		AppData.globeData.zeroDegreesLon = AppData.globeData.globeWidthEach/2;
		AppData.globeData.zeroDegreesLat = AppData.globeData.globeHeightEach/2;
		
		AppData.globeData.pxPerDegreeLon = AppData.globeData.globeWidthEach/AppData.globeData.degreesMaxLon;
		AppData.globeData.pxPerDegreeLat = AppData.globeData.globeHeightEach/AppData.globeData.degreesMaxLat;
		
		console.log('FullWidth: ' + AppData.globeData.FullWidth);
		console.log('FullHeight: ' + AppData.globeData.FullHeight);
		console.log('degreesMaxLon: ' + AppData.globeData.degreesMaxLon);
		console.log('degreesMaxLat: ' + AppData.globeData.degreesMaxLat);
		console.log('globeWidthEach: ' + AppData.globeData.globeWidthEach);
		console.log('globeHeightEach: ' +AppData.globeData. globeHeightEach);
		console.log('zeroDegreesLon: ' + AppData.globeData.zeroDegreesLon);
		console.log('zeroDegreesLat: ' + AppData.globeData.zeroDegreesLat);
		console.log('pxPerDegreeLon: ' + AppData.globeData.pxPerDegreeLon);
		console.log('pxPerDegreeLat: ' + AppData.globeData.pxPerDegreeLat);
		
		GMO.Globe.setupGlobe();
	},
	

	buildGlobe: function(pointsHtml){
		var imageWidth = AppData.globeData.imageWidth;
		var imageHeight = AppData.globeData.imageHeight;
		$('#globe').spinningGlobe({
			imageWidth:imageWidth,
			imageHeight:imageHeight,
			earthWidth: 3400,
			earthHeight: 900,
			prefix: 'img/globe/',
			logo: false,
			resistance: 15,
			pointsHtml: pointsHtml,
			spin:1,
			testMode:0
		});
	},

	setupGlobe: function(){
		var fullWidth = AppData.globeData.FullWidth;
		var fullHeight = AppData.globeData.FullHeight;
		var maxWidth = AppData.App.config.globe.maxWidth;
		var maxHeight = AppData.App.config.globe.maxHeight;
		var $section = $('.section-globe');
		var $globe = $section.find('.globe');
		var windowWidth = $(window).width();
		windowWidthTotal = windowWidth;
		var paddingLeft = parseInt($section.css('paddingLeft').replace('px',''));
		var paddingRight = parseInt($section.css('paddingRight').replace('px',''));
		var paddingTotal = paddingLeft+paddingRight;
		var windowWidth = windowWidth - paddingTotal;
		if(maxWidth!=null && windowWidth>maxWidth){
			windowWidth = maxWidth;
		}
		if(maxHeight!=null && windowWidth>maxHeight){
			windowWidth = maxHeight;
		}
		
		var scale = windowWidth/fullHeight;
		AppData.globeData.scale = scale;
		AppData.globeData.map2OffsetLon = ( (AppData.globeData.FullWidth/2) * scale);
		AppData.globeData.map2OffsetLat = 0;
		AppData.globeData.width = fullWidth;
		AppData.globeData.height = fullHeight;
		var globeWidth = fullWidth;
		var globeHeight = fullHeight;
		var imageWidth = globeWidth*scale;
		var imageHeight = globeHeight*scale;
		AppData.globeData.imageWidth = imageWidth;
		AppData.globeData.imageHeight = imageHeight;
		//$globe.css('-webkit-transform','scale(' + scale + ',' + scale + ')');
		
		/*
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
		*/
	}
	
};

