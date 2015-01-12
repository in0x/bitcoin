
//entry point  
$(document).ready(function()
{
  //focus first input, hide elements, ready message
  //assign important variables
  $("#input1").focus();
  $("#powered").hide();
  console.log('ready event')
  HideElement();
  var isLeft = false;
  var allPrices = {}
  var allCodes = []

  // Returns the input value for the currency to convert to
  function GetInputValuesString() 
  {  
    return $('#currencyMenu').val().toUpperCase();
  }

  //Gets 'last' price from data, and calculates result based on user input
  //also manages info overlay
  function Calculate() 
  {
    if(infoDisplayed) 
    {
      $("#infoOverlay").fadeOut(400);
      $("#powered").fadeOut(400);
    }
    var curCode = GetInputValuesString(); //Get CurrencyCode from User input 
    var currency = allPrices[curCode]['last']; 
    var bit = $('#input1').val();
    currency = parseFloat(currency);
    bit = parseFloat(bit);
    var result = bit * currency;
    result = result.toFixed(3);

    DisplayResult(result);
    DisplayInfo(currency);
    var infoDisplayed = true;
    $("#infoOverlay").fadeIn(400);
    $("#powered").fadeIn(400);
  }

  //help function for DisplayInfo, gets certain value from ticker data
  function FetchFromData(code)
  {
    return allPrices[curCode][code];
  }

  //for displaying calculate results
  function DisplayResult(result) 
  {
    var ipt2 = $('#input2');
    ipt2.val(result);
  }

  //Displays the complete key value pairing for the users choice as an overlay
  function DisplayInfo(currency)
  {
    curCode = GetInputValuesString();
    $("#curCode").html(FetchFromData("symbol"));
    $("#last").html("Last: " + currency);
    $("#buy").html("Buy: " + FetchFromData("buy"));
    $("#sell").html("Sell: " + FetchFromData("sell"));
  }

  //Returns all value codes from ticker data as an array
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

  //Writes data list from array into html, for laziness and future-proofing
  function WriteDataList()
  {
    for(i = 0; i < allCodes.length; i++)
    {
      $('#currencies').append('<option value= ' + allCodes[i] + '>');
    }
  }

  function TestArray()
  {
    for(var i = 0; i < allCodes.length; i++) console.log(allCodes[i]);
  }

  function HideElement()
  {
    $(".helpMenu").hide();
  }

  function TestClick()
  {
    $( ".helpPa" ).click( function( event ) {
    if ( event.originalEvent === undefined ) {
        console.log( 'not human' )
    } else {
        console.log( 'human' );
    }
    });
  }

  //Shifts "?" button left and back on click
  $('.helpPa').click(function()
  {
      $('.helpMenu').toggle(400);
      if (!(isLeft))
      {
        $(this).animate({"left": "-248px"}, "medium");

        isLeft = true;
      }
      else
      {
        $(this).animate({"left": "0px"}, "medium");;

        isLeft = false;
      }
  });
  
  //removes placeholder value for currency
  $('#currencyMenu').focus(function()
  {
      $(this).removeAttr('placeholder');
  });
   
    $('#currencyMenu').change(Calculate);
    $('#currencyMenu').keydown(Calculate);
    $('.btnTo').click(Calculate)

  //Where the magic happens
  //Issues CORS-Request to provided URL, gets its data and returns it as an object
  //Then writes datalist into html for user input prediction
  $.getJSON('https://blockchain.info/de/ticker?cors=true', function(data) 
  { 
    allPrices = data; 
    GetAllCodes();
    WriteDataList();
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

// !!! Depreciated code !!! Was supposed to adjust input width according to content
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

