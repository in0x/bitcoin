var allPrices = {}
var allCurrencies = []

function getInputValuesString() { // Returns the input value for the currency to convert
  return $('#currencyMenu').val().toUpperCase();
}

function calculate() {
  var curCode = getInputValuesString(); //Get CurrencyCode from User input TODO: verify if valid currency code
  var currency = allPrices[curCode]['7d']; //Position 
  var bit = $('#input1').val();

  currency = parseFloat(currency);
  bit = parseFloat(bit);
  var result = bit * currency;
  result = result.toFixed(3);

  displayResult(result);
}

function displayResult(result) {
  var ipt2 = $('#input2')
  ipt2.val(result).focus();
}



//TODO: Fix center positioning of elements to prevent elements falling out of center on resize
/*
  $('input').change(function() {
      console.log('working');
    var $inputElement = $(this)             //get a jquery element
        $temp = $('<span />'),          //create a span
        $body = $('body');            //get the body

    $temp.html($inputElement.val());    //get string
    $body.append($temp);              //append temp element to body
    var theWidth = $temp.width();       //get width of temp
    $temp.remove();               //remove temp
    var widthToSet = (2 *  theWidth) + 'px';  //get pixel value
    if(widthToSet > theWidth)
      $inputElement.width(widthToSet);
    }                     //set width of input element to pixel value
  });

*/



$(document).ready(function(){
  console.log('ready event')
  $.getJSON('prices.json', function(data) { //Gets the content of a grammatically correct JSON File and returns 
    allPrices = data; //it as a JS Object
    allCurrencies = Object.keys(allPrices)
    var findTimestamp = allCurrencies.indexOf('timestamp')
    if(findTimestamp > -1) {
      allCurrencies.splice(findTimestamp, 1)
    }
    $('.btnTo').click(calculate)
  }); //Object Data{Key USD(contains Object){Key '7d'(contains value): 300}}
})
