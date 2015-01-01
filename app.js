var allPrices = {}

function getInputValuesString() { // Returns the input value for the currency to convert
  return $('#currencyMenu').val().toUpperCase();
}

function getSelectValue(){
  //return $('#dropDown option:selected').text().toUpperCase();

  if($('#dropDown option:selected').val() !== "0") 
  {
    return $('#dropDown option:selected').val().toUpperCase();
  }
}
  

function calculate() {
  var curCode = getInputValuesString(); //Get CurrencyCode from User input 
  var code = "-1";
  code = getSelectValue();
  console.log(curCode);
  if(code != "-1"){
    curCode = code;
  }
  var currency = allPrices[curCode]['last']; //Position 
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

$(document).ready(function(){
  console.log('ready event')
  $.getJSON('https://blockchain.info/de/ticker?cors=true', function(data) { //Gets the content of a grammatically correct JSON File and returns 
    allPrices = data; //it as a JS Object
    $('#dropDown').change(calculate);
    $('.btnTo').click(calculate)
  })
  .always(function(){
    console.log("complete");
  })
  .fail(function(){
    console.log("error");
  })
  .done(function(){
    console.log("success");
  }); //Object Data{Key USD(contains Object){Key '7d'(contains value): 300}}
})

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
//For fuck sake just kill me I need an api that allows cross origin resource sharing 

