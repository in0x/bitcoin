	var prices,
	 	result,
	 	currencyCode;

	
	$.getJSON( "prices.json", function(data) {		//Gets the content of a grammatically correct JSON File and returns 
		prices = data;								//it as a JS Object 
	});												//Object Data{Key USD(contains Object){Key "7d"(contains value): 300}}
	
	function getInputValuesString(){				// Returns the input value for the currency to convert

		currencyCode = document.getElementById('currencyMenu').value;

		currencyCode = currencyCode.toUpperCase();		// TODO: Trim Strings (whitespace)

		return currencyCode;
	}

	function calculate(){
		
		var curCode = getInputValuesString();		//Get CurrencyCode from User input TODO: verify if valid currency code

		var currency = prices[curCode]["7d"];		//Position 

		var bit = document.getElementById('input1').value;

		currency = parseFloat(currency);
		bit = parseFloat(bit);

		result = bit * currency;
		result = result.toFixed(3);

		console.log(result);
			displayResult();
	}

	function displayResult(){
		$("#input2").val(result);
		document.getElementById("input2").focus();
	}



//TODO: Fix center positioning of elements to prevent elements falling out of center on resize
/*
	$("input").change(function() {
	    console.log('working');     
		var $inputElement = $(this) 						//get a jquery element
		    $temp = $('<span />'), 					//create a span
		    $body = $('body'); 						//get the body
		 
		$temp.html($inputElement.val());		//get string 
		$body.append($temp);							//append temp element to body
		var theWidth = $temp.width();				//get width of temp
		$temp.remove();								//remove temp
		var widthToSet = (2 *  theWidth) + 'px';	//get pixel value
		if(widthToSet > theWidth)
			$inputElement.width(widthToSet);
		}											//set width of input element to pixel value
	}); 	

*/



