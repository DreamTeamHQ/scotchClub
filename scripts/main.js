var scotchApp = {};
scotchApp.priceInDollars = 

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
		scotchApp.blah = res;
	});
};


scotchApp.displayScotch = function(lotsOfScotch){
	$.each(lotsOfScotch, function(i,value){
		var name = $('<h3>').addClass('scotchName').text(value.name);
		var priceInDollars = (value.price_in_cents/ 100).toFixed(2);
			$('<p>').addClass('scotchPrice').text('$' + value.price_in_cents);
		var bottle = $('<img>').addClass('scotchBottle').attr('src',value.image_thumb_url);
		var variety = $('<p>').addClass('scotchVariety').text(value.varietal);
		var container = $('<div>').addClass('scotchInfo').append(name,priceInDollars,bottle,variety);
		$('.results').append(container);
	});
	// console.log(lotsOfScotch);
};








