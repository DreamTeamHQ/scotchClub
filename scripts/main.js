var scotchApp = {};

scotchApp.apiKey = 'MDpiNWNjYzYyMi03NzY4LTExZTUtOWMxYi01M2MyMTlmYjk0MGU6UVA1bFkyNmhBOGg2NUhwQklHYjVUbXhGaVJENnZQS0tHQVR6';





scotchApp.formSubmit = function(){
	$('.submit-form').on('submit',function(e){
		e.preventDefault();
		scotchApp.findScotch();
	});
};





scotchApp.findScotch = function(){
	var apiURL = 'http://lcboapi.com/products';
	$.ajax({
		url:apiURL,
		method:'GET',
		dataType:'jsonp',
		data:{
			key:scotchApp.apiKey,
			q:'scotch',
			per_page:100
		}
	}).then(function(res){
		scotchApp.filterPrice(res.result);
	});
};





scotchApp.filterPrice = function(result){
	var threshold = 60
	var bottleFilter = result.filter(function(value){
		var priceInDollars = (value.price_in_cents/ 100).toFixed(2);			
		if($('input[value=over60]:checked').length > 0){
			return priceInDollars >= threshold && value.image_thumb_url
		
		} else {
			return priceInDollars < threshold && value.image_thumb_url

		} 
	});
	scotchApp.filterType(bottleFilter);
};


scotchApp.filterType = function(result){
	var typeFilter = result.filter(function(value){
		if($('input[value=single]:checked').length > 0){
			return value.varietal === 'Scotland Malt'
		
		} else {
			return value.varietal === 'Scotland Blend'
		}
	});
	scotchApp.displayScotch(typeFilter)
};






scotchApp.displayScotch = function(lotsOfScotch){
	$('.clubHeader').hide();
	$('.results').html('');
	$.each(lotsOfScotch, function(i,value){
		var priceInDollars = (value.price_in_cents/ 100).toFixed(2);
			$('<p>').addClass('scotchPrice').text('$' + value.price_in_cents);
		var name = $('<h3>').addClass('scotchName').text(value.name);
		var bottle = $('<img>').addClass('scotchBottle').attr('src',value.image_thumb_url);
		var variety = $('<p>').addClass('scotchVariety').text(value.varietal);
		var container = $('<div>').addClass('scotchInfo').append(name,priceInDollars,bottle,variety);
		$('.results').append(container);
	});
};









scotchApp.init = function(){
	scotchApp.formSubmit();
	// scotchApp.findScotch();
	// 	$(#priceOption).on('change',function(){
	// 		var priceOption = $(this).val();
	// 	});
	// 	$(#typeOption).on('change',function(){
	// 		var typeOption = $(this).val();
	// 	});
	};





$(function(){
	scotchApp.init();
});








// result will be a filtered list based on price and type
// displayed in flickity format

// When user finds scotch they want, clicking on a picture
// of the bottle will bring up additional information
// and a map to the nearest LCBO with the desired product
// in stock.



