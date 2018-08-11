
function getData(symbol) {
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

        var newSpan = $("<span>");
        console.log("this is symbol: " + symbol);
        newSpan.text(symbol + ": " + stockPrice + " ");

        $("#stock-1-data").append(newSpan);

        // #stock-1-name
        // #stock-1-data 

    });

    
}

var symbolArray = ["INX", "DJI", "IXIC"];



$("#click-me").on("click", function () {

    for (var i = 0; i < symbolArray.length; i++) {
        

        getData(symbolArray[i]);
       
    }


});
