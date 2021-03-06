
var database = firebase.database();
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        setTimeout(stockApp, 500);

    }

    else {

    }
});

let stockApp = function () {

    // click to add new stock 
    $("#submit-stock").on("click", function (event) {
        event.preventDefault();
        var stock = $("#add-stock").val().trim();
        stock = stock.toUpperCase();
        $("#add-stock").val("");
        getData(stock);
    });


    // ajax request and code to populate the dom
    function getData(stock) {
        var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + stock + "&interval=5min&apikey=RKF8M9LS2831VAA1";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var gobal = response;
            var objectArray = Object.keys(gobal["Time Series (5min)"]);
            var secondArray = Object.keys(gobal["Time Series (5min)"][objectArray[0]]);
            var stockPrice = Math.round(gobal["Time Series (5min)"][objectArray[0]][secondArray[3]] * 100) / 100;
            var openPrice = Math.round(gobal["Time Series (5min)"][objectArray[0]][secondArray[0]] * 100) / 100;
            var priceChange = Math.round((stockPrice - openPrice) * 100) / 100;
            database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("stocks").child("MyStocks").child(stock).update({
                "stock-price": stockPrice,
                "price-change": priceChange,
            }).then(function () {

                getFromDatabase();

            }, function (err) {
                console.log(err);// Error: "It broke"
            });

        });
    };


    function getFromDatabase() {
        $("#stockResults").empty();

        database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("stocks").child("MyStocks").on("value", function (snapshot) {

            snapshot.forEach(function (child) {
                var stockName = child.key;
                var stockPrice = snapshot.child(stockName).child("stock-price").val();
                var priceChange = snapshot.child(stockName).child("price-change").val();

                var stockDiv = $("<div>").attr("class", stockName).attr("data-name", stockName);
                var name = $("<span>").attr("class", "stock-name").text(stockName + " : ").css('font-size', '0.90rem').css("margin-right", "10px");
                var price = $("<span>").attr("class", "stock-price").text("$" + stockPrice).css('font-size', '1rem').css("margin-right", "10px");
                var change = $("<span>").attr("class", "stock-change").css('font-size', '0.75rem').text("$" + priceChange);

                if (priceChange < 0) {

                    change.css("color", "red");
                } else {

                    change.css("color", "green");
                };

                stockDiv.append(name).append(price).append(change);
                var b = $("<span>").attr("data-name", stockName).addClass("delete").css("margin-right", "10px").css("line-height", "3").css("font-size", "10px").text("X").css("color", "red");
                stockDiv.prepend(b);
                $("#stockResults").append(stockDiv);

            });  // end of snapshot for each child

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    };

    // onclick to remove the selected stock
    $(document).on("click", ".delete", function (event) {

        event.preventDefault();
        var stock = $(this).attr("data-name");
        database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("stocks").child("MyStocks").child(stock).remove();
        getFromDatabase();

    }); // end of delete f


    // this click will refresh the page
    $("#click-me").on("click", function () {
        event.preventDefault();
        $("#stock-results").empty();
        getFromDatabase();
    });


    // call the function to put the array on the page at load

    getFromDatabase();

};

