var allPrices = {}
var allCodes = []

// Returns the input value for the currency to convert
function GetInputValuesString() 
{ 
  return $('#currencyMenu').val().toUpperCase();
}


function Calculate() 
{
  var curCode = GetInputValuesString(); //Get CurrencyCode from User input 
  var currency = allPrices[curCode]['last']; 
  var bit = $('#input1').val();
  currency = parseFloat(currency);
  bit = parseFloat(bit);
  var result = bit * currency;
  result = result.toFixed(3);

  DisplayResult(result);
}

function DisplayResult(result) 
{
  var ipt2 = $('#input2')
  ipt2.val(result);
}

function GetAllCodes()
{
  var arrayPos = 0;
  for(var key in allPrices)
  {
    if(allPrices.hasOwnProperty(key))
    {
      allCodes[arrayPos] = key;
      arrayPos++;
    }
  }
}

function WriteDataList()
{
  for(i = 0; i < allCodes.length; i++)
  {
    $('#currencies').append('<option value= ' + allCodes[i] + '>');
  }
}

$(document).ready(function()
{
  console.log('ready event')
  $.getJSON('https://blockchain.info/de/ticker?cors=true', function(data) 
  { //Gets the content of a grammatically correct JSON File and returns 
    allPrices = data; //it as a JS Object
    GetAllCodes();
    WriteDataList();
    $('#currencyMenu').change(Calculate);
    $('#currencyMenu').keydown(Calculate);
    $('.btnTo').click(Calculate)
  })
  .always(function(){
    console.log("complete");
  })
  .fail(function(){
    console.log("error");
  })
  .done(function(){
    console.log("success");
  }); 
})

function TestArray()
{
  for(var i = 0; i < allCodes.length; i++) console.log(allCodes[i]);
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
//For fuck sake just kill me I need an api that allows cross origin resource sharing 

