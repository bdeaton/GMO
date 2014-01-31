onlineForLife.App = onlineForLife.App || {};
onlineForLife.Globe = onlineForLife.Globe || {};
onlineForLife.Tracking = onlineForLife.Tracking || {};
onlineForLife.Push = onlineForLife.Push || {};
onlineForLife.App = {
	init: function(){
		onlineForLife.Globe.setupGlobe();
		onlineForLife.App.setupHandlers();
	},	

	setupHandlers:function(){
		$(window).resize(function() {
			onlineForLife.App.handleResize();
		});
	},	

	handleResize:function(){
		onlineForLife.App.setupGlobe();
	}
	
};
$(function() {
	onlineForLife.App.init();
});

