
  
$(document).ready(function()
{
  $("#input1").focus();
  $("#powered").hide();
  console.log('ready event')
  HideElement();
  var isLeft = false;
  var allPrices = {}
  var allCodes = []

  // Returns the input value for the currency to convert
  function GetInputValuesString() 
  {  
    return $('#currencyMenu').val().toUpperCase();
  }


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

  function FetchFromData(code)
  {
    return allPrices[curCode][code];
  }

  function DisplayResult(result) 
  {
    var ipt2 = $('#input2');
    ipt2.val(result);
  }

  function DisplayInfo(currency)
  {
    curCode = GetInputValuesString();
    $("#curCode").html(FetchFromData("symbol"));
    $("#last").html("Last: " + currency);
    $("#buy").html("Buy: " + FetchFromData("buy"));
    $("#sell").html("Sell: " + FetchFromData("sell"));
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
  
  $('#currencyMenu').focus(function()
  {
      $(this).removeAttr('placeholder');
    });
   
    $('#currencyMenu').change(Calculate);
    $('#currencyMenu').keydown(Calculate);
    $('.btnTo').click(Calculate)


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

