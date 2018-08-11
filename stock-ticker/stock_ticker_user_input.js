

$( document ).ready(function() {
    $(".stock-input-container").hide();


// button to open window to add new stock
$("#enter-new-symbol").on("click", function() {
    $(".stock-input-container").show();
});


// array to hold the 3 stocks
var symbolArray = ["INX", "DJI", "IXIC"];

// click to add new stock and remove the last in the existing array
$("#submit-stock").on("click", function(event) {
    event.preventDefault();
    $(".stock-input-container").hide();
    console.log(symbolArray);
    var stock = $("#add-stock").val().trim();
    stock = stock.toUpperCase();
    $("#add-stock").val("");
    console.log(stock);
 
    if (symbolArray.length <= 2) {
        console.log("less than 3");
        symbolArray.unshift(stock);
    } else if (symbolArray.length >= 3) {
        symbolArray.unshift(stock);
        symbolArray.splice(3, 1,);
    };

    console.log(symbolArray);
   putOnPage();
  });


// ajax request and code to populate the dom
function getData(symbol, i) {
    var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=RKF8M9LS2831VAA1";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var gobal = response;
        var objectArray = Object.keys(gobal["Time Series (5min)"]);
        // console.log(objectArray[0]);
        // console.log(gobal["Time Series (5min)"][objectArray[0]]);
        var secondArray = Object.keys(gobal["Time Series (5min)"][objectArray[0]]);
        // console.log(secondArray[3]);
        // console.log(gobal["Time Series (5min)"][objectArray[0]][secondArray[3]]);
        var stockPrice = Math.round(gobal["Time Series (5min)"][objectArray[0]][secondArray[3]] * 100) / 100;
        // var newSpan = $("<span>");
        // // console.log("this is symbol: " + symbol);
        // newSpan.text(symbol + ": " + stockPrice + " ");

        $("#stock-"+ i +"-data").text(stockPrice);
        $("#stock-"+ i +"-name").text(symbol);
    });
};


// function to call the ajax with each index of the array
function putOnPage() {
    $("#stock-1-data").empty();
    for (var i = 0; i < symbolArray.length; i++) {
        getData(symbolArray[i], i);
    };
};


// this click will refresh the page
$("#click-me").on("click", function () {
    putOnPage();
});


// call the function to put the array on the page at load
putOnPage();

});
