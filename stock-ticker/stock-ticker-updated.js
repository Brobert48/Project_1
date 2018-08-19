var config = {
    apiKey: "AIzaSyCiPgGOcvsJ0Ws54KMX1p0mCia3a1hJ2UI",
    authDomain: "project-1-firebase-1b2fb.firebaseapp.com",
    databaseURL: "https://project-1-firebase-1b2fb.firebaseio.com",
    projectId: "project-1-firebase-1b2fb",
    storageBucket: "project-1-firebase-1b2fb.appspot.com",
    messagingSenderId: "693404188715"
};
firebase.initializeApp(config);


var database = firebase.database();
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        stockApp();
    }

    else {

    }
});

let stockApp = function () {

    // button to open window to add new stock
    $("#enter-new-symbol").on("click", function () {
        $(".stock-input-container").show();
    });


    // click to add new stock 
    $("#submit-stock").on("click", function (event) {
        event.preventDefault();
        $(".stock-input-container").hide();
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
        $("#stock-results").empty();

        database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("stocks").child("MyStocks").on("value", function (snapshot) {

            snapshot.forEach(function (child) {
                var stockName = child.key;
                var stockPrice = snapshot.child(stockName).child("stock-price").val();
                var priceChange = snapshot.child(stockName).child("price-change").val();

                var stockDiv = $("<div>").attr("class", stockName).attr("data-name", stockName);
                var name = $("<span>").attr("class", "stock-name").css("margin-right", "10px").text(stockName);
                var price = $("<span>").attr("class", "stock-price").css("margin-right", "10px").text(stockPrice);
                var change = $("<span>").attr("class", "stock-change").text(priceChange);

                if (priceChange < 0) {
                    change.css("color", "red");
                } else {
                    change.css("color", "green");
                };

                stockDiv.append(name).append(price).append(change);
                var b = $("<span>").attr("data-name", stockName).addClass("delete").css("margin-right", "10px").css("font-size", "10px").text("remove").css("color", "red");
                stockDiv.prepend(b);
                $("#stock-results").append(stockDiv);
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

