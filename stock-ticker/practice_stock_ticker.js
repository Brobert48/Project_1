

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


$( document ).ready(function() {
    $(".stock-input-container").hide();


// button to open window to add new stock
$("#enter-new-symbol").on("click", function() {
    $(".stock-input-container").show();
});


// array to hold up to  3 stocks
var symbolArray = [];

// click to add new stock and remove the last in the existing array
$("#submit-stock").on("click", function(event) {
    event.preventDefault();
    $(".stock-input-container").hide();
    
   
    var stock = $("#add-stock").val().trim();
    stock = stock.toUpperCase();
    $("#add-stock").val("");


    if (symbolArray.length < 3) {
        symbolArray.push(stock);
    } else if (symbolArray >= 3) {
        symbolArray.shift();
        symbolArray.push(stock);
    };
    // console.log(symbolArray);

    // pushing the new array to the database 

database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("stocks").update({
        "stocksArray":symbolArray,
      });

    getFromDatabase();
  });


// ajax request and code to populate the dom
function getData(symbol, i) {
    console.log("get me in there");
    var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=RKF8M9LS2831VAA1";
    console.log(queryURL);

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
        // console.log("this is stockPrice: " + stockPrice)
        // var newSpan = $("<span>");
        // // console.log("this is symbol: " + symbol);
        // newSpan.text(symbol + ": " + stockPrice + " ");
        var openPrice = Math.round(gobal["Time Series (5min)"][objectArray[0]][secondArray[0]] * 100) /100;
        // console.log("this is open price: " + openPrice)

        var priceChange = Math.round((stockPrice - openPrice) * 100) / 100;
        console.log("this is priceChange: " + priceChange);

        $("#stock-"+ i +"-data").text("$" +stockPrice);
        $("#stock-"+ i +"-name").text(symbol);


        if (priceChange < 0) {
            $("#stock-"+ i +"-change").css("color", "red");
        } else {
            $("#stock-"+ i +"-change").css("color", "green");
        };

        $("#stock-"+ i +"-change").text("$"+priceChange);

        
        
    });
};






// function to call the ajax with each index of the array
function getFromDatabase() {
    var arrayFromDatabase = [];
    $("#stock-1-data").empty();
    database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("stocks").on("value", function (snapshot) {

        


        
        // console.log(snapshot.val());
        arrayFromDatabase = snapshot.val().stocksArray;
        console.log(arrayFromDatabase);

        for (var i = 0; i < arrayFromDatabase.length; i++) {
            getData(arrayFromDatabase[i], i);
        };



      
       
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

    //   console.log("this is the array:")
    //   console.log(arrayFromDatabase)

      

    // for (var i = 0; i < arrayFromDatabase.length; i++) {
    //     getData(arrayFromDatabase[i], i);
    // };
};


// this click will refresh the page
$("#click-me").on("click", function () {
    alert("refreshing");
    getFromDatabase();
});


// call the function to put the array on the page at load
setTimeout(getFromDatabase, 1000);
// getFromDatabase();

});

