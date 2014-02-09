var GMO = window.GMO || {};
GMO.App = GMO.App || {};
GMO.Data = GMO.Data || {};
GMO.Globe = GMO.Globe || {};
GMO.Tracking = GMO.Tracking || {};
GMO.Push = GMO.Push || {};
window.AppData = {};
GMO.App = {
	init: function(){
		GMO.App.setupListeners();
		GMO.App.getAppData();
	},	

	setupListeners:function(){
		//document.addEventListener('touchmove', function (e) {e.preventDefault();}, false);
		$(document).on("AppDataLoaded", GMO.App.setupApp);
	},	

	setupApp:function(){
		//console.log('}}}}}}}}}}}}}}}}}} setupApp');
		GMO.Globe.init();
		GMO.App.buildStats();
		GMO.App.setupHandlers();
	},	

	buildStats:function(){
		var $gospelValue = $('.stats-gospel .stats-value');
		var $decisionsValue = $('.stats-decisions .stats-value');
		var $connectionsValue = $('.stats-connections .stats-value');
		
	},	

	setupHandlers:function(){
		$(window).resize(function() {
			GMO.App.handleResize();
		});
		
		$('#calculatorInput').on('keyup',function(e){
			GMO.App.handleInputChange($(this));
		});
		$('#calculatorInput').on('focus',function(e){
			GMO.App.resetInput($(this));
		});
		GMO.App.setDefaultInput();
	},	

	getAppData:function(){
		var url = 'js/api-app.js';
		GMO.App.getAPIData('App',url,"AppDataLoaded","AppDataFail",'load');
	},

	getAPIData:function(key,url,triggerSuccess,triggerFail,method){
		var jqxhr = $.get(url, function(data){},'json');
		jqxhr.done(function(data) {
			GMO.App.handleApiSuccess(key,data,triggerSuccess,method);
		});
		jqxhr.fail(function(data) {
			GMO.App.handleApiError(key,data,triggerFail,method);
		});
	},

	handleApiSuccess:function(key,response,trigger,method){
		//console.log('handleApiSuccess');
		//console.log(key);
		//console.log(response);
		//console.log(trigger);
		var data = GMO.Data || {};
		data[key]=response;
		AppData[key]=response;
		$(document).trigger({type:trigger,method:method});
	},	

	handleApiError:function(key,response){
		//console.log('handleApiError');
		//console.log(key);
		//console.log(response);
	},
	
	setDefaultInput:function(){
		GMO.App.handleInputChange($('#calculatorInput').val(100000));
	},
	
	resetInput:function(){
		$('#calculatorInput').val('')
	},
	
	handleInputChange:function($input){
		//console.log('handleFormChange');
		var $form = $('.form-calculator');
		var $result = $form.find('#calculatorResult');
		
		var inputVal = $input.val().replace('$','').replace(',','').replace(',','').replace(',','').replace(',','').replace(',','').replace(',','').replace(',','');
		//console.log('TYPE inputVal 1: ',typeof(inputVal));
		//console.log('inputVal 1: ',inputVal);
		if(inputVal==''){
			//console.log('inputVal ==""');
			inputVal=0;
		}
		else{
			//console.log('inputVal ELSE');
			inputVal = parseInt(inputVal);
		}
		//console.log('TYPE inputVal 2: ',typeof(inputVal));
		//console.log('inputVal 2: ',inputVal);
		$input.data('inputVal',inputVal);
		var formattedVal = inputVal;
		formattedVal = formattedVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		//console.log('formattedVal 1: ',formattedVal);
		formattedVal = '$'+formattedVal;
		//console.log('formattedVal 2: ',formattedVal);
		
		var test = false;
		
		if(test){
			var string = inputVal.toString();
			var len = string.length;
			var string1 = '';
			var string2 = '';
			var string3 = '';
			var string4 = '';
			var string5 = '';
			var output = '';
			if(len==4){
				string1 = string.substring(0,1);
				string2 = string.substring(1,4);
				output = string1 +','+ string2;
			}
			else if(len==5){
				string1 = string.substring(0,2);
				string2 = string.substring(2,5);
				output = string1 +','+ string2;
			}
			else if(len==6){
				string1 = string.substring(0,3);
				string2 = string.substring(3,6);
				output = string1 +','+ string2;
			}
			else{
				output = string;
			}
			//console.log('string: ' + string);
			//console.log('string1: ' + string1);
			//console.log('string2: ' + string2);
			//console.log('len: ' + len);
			//console.log('output: ' + output);
		}	
		
		
		$input.val(formattedVal);
		//$input.val(output);
		
		var multiplier = GMO.Data.App.config.calculator.multiplier;
		var calcResult = inputVal*multiplier;
		calcResult = calcResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'+';
		$result.val(calcResult);
		//console.log('calcResult 1: ',calcResult);
		
		//toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		
		//oninput="calculatorResult.value='$' + (parseInt(calculatorInput.value) * 20).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'+';"
		
	},
	 

	

	handleResize:function(){
		GMO.Globe.setupGlobe();
	}
	
};
$(function() {
	GMO.App.init();
});
