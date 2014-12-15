
/*$(document).ready(function() {
		$('.myMenu > li').bind('mouseover', openSubMenu);
		$('.myMenu > li').bind('mouseout', closeSubMenu);
		
		function openSubMenu() {
			$(this).find('ul').css('visibility', 'visible').slideDown();	
		};
		
		function closeSubMenu() {
			$(this).find('ul').css('visibility', 'hidden');	
		};
				   
}); */

$(document).ready(function(){
	/*$.ajax({
		url: "prices.json",
		datatype: "text",
		success: function(data){
			var prices = $.parseJSON(data);
			console.log(json.EUR);
		}
	});*/
	

	// Assign handlers immediately after making the request,
	// and remember the jqxhr object for this request
	var jqxhr = $.getJSON( "http://users.multimediatechnology.at/~fhs37246/prices.json", function() {
	  console.log( "success" );
	})
	  .done(function() {
	    console.log( "second success" );
	  })
	  .fail(function() {
	    console.log( "error" );
	  })
	  .always(function() {
	    console.log( "complete" );
	  });
	 
	// Perform other work here ...
	 
	// Set another completion function for the request above
	jqxhr.complete(function() {
	  console.log( "second complete" );
	});	

	/*function getPriceEuro(){
	var s = prices.EUR.7d;
	console.log(s);
	}*/
});


