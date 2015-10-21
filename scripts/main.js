var scotchApp = {};

scotchApp.apiKey = 'MDpiNWNjYzYyMi03NzY4LTExZTUtOWMxYi01M2MyMTlmYjk0MGU6UVA1bFkyNmhBOGg2NUhwQklHYjVUbXhGaVJENnZQS0tHQVR6';

scotchApp.findScotch = function(){
	var apiURL = 'http://lcboapi.com/products';
	$.ajax({
		url:apiURL,
		method:'GET',
		dataType:'jsonp',
		data:{
			key:scotchApp.apiKey,
			q:'scotch',
		}
	}).then(function(res){
		scotchApp.displayScotch(res.result);	
	});
};

scotchApp.displayScotch = function(lotsOfScotch){
	$.each(lotsOfScotch, function(i,value){
		var name = $('<h3>').addClass('scotchName').text(value.name);
		var bottle = $('<img>').addClass('scotchBottle').attr('src',value.image_thumb_url);
		var container = $('<div>').addClass('scotchInfo').append(name,bottle);
		$('.results').append(container);
	});
	// console.log(lotsOfScotch);
};