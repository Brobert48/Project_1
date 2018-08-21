
var globalUID;
var zip;
var city;
var country = "us";
var currentURL;
var forecastURL;
var previousCallTime = "2018-08-11 11:00:00";       // pull from firebase on page load
var currentWeatherCallData = "nothing yet";         // store the API call here
var fiveDayForecastCallData = "nothing yet";        // store the API call here
var timeFormat = "YYYY-MM-DD HH:mm:ss";


// for current weather
var queryCurrentWeatherURL;


// for 5-day forecast
var queryFiveDayForecastURL;

var database = firebase.database();


function constructCurrentWeatherURL() {
    queryCurrentWeatherURL =
        "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + country
        + "&APPID=0c44f3ccfc31563e53f247c356d15c09&units=imperial";
}



function constructFiveDayWeatherURL() {
    queryFiveDayForecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "," + country
        + "&APPID=0c44f3ccfc31563e53f247c356d15c09&units=imperial";
}



//pull data from firebase on page load
$(document).ready(function () {
    database.ref().once("value").then(function (childSnap) {
        var uid = firebase.auth().currentUser.uid;
        globalUID = uid;

        $("#weather-card-text").text("Last Updated: " + previousCallTime);
        zip = childSnap.child("users").child(uid).child("zip").val();
        city = childSnap.child("users").child(uid).child("city").val();
        constructCurrentWeatherURL();
        constructFiveDayWeatherURL();
        displayCurrentWeather();
    });
});



// link weather API call to button click for control purposes
// <!><!><!>
// limit to no more than 1 API call every 15 minutes (limit is 10, but we'll use 15 to be safe)
// <!><!><!>
$(document).on("click", "#weather-button", function () {
    event.preventDefault();
    // sets local uid to the current user's uid stored in globalUID
    var uid = globalUID;
    // record current time
    var currentTime = moment();
    // set recorded current time to desired format
    var adjustedTime = moment(currentTime).format(timeFormat);
    // calculate and record number of minutes since last call time
    var elapsedMinutes = moment(adjustedTime).diff(moment(previousCallTime, timeFormat), "minutes");
    // if it has not been 15 minutes since last API call, do nothing and print a console message
    if (elapsedMinutes < 15) {
        // make no API call, instead use previous API data stored in firebase
        displayCurrentWeather();
    }
    else {
        // update time of last API call to current time
        previousCallTime = adjustedTime;
        // AJAX call
        $.ajax({
            url: queryCurrentWeatherURL,
            method: "GET"
        })
            .then(function (response) {
                currentWeatherCallData = response;
                // send response data to Firebase
                // (will be able to read from Firebase as often as we like, since we can only call from the API once every 10 minutes)
                database.ref().child("users").child(uid).child("widgets").child("weather").child("data").set({
                    firebaseLastWeatherCallTime: adjustedTime,
                    firebaseWeatherAPIData: currentWeatherCallData
                });
                //updated display of last call time
                $("#weather-card-text").text("Last Update: " + previousCallTime);

                displayCurrentWeather();
            });
    }
});


// Call this to update the weather widget with the correct data.
function displayCurrentWeather() {
    database.ref().once("value").then(function (childSnap) {
        var uid = firebase.auth().currentUser.uid;
        var temperature = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("main").child("temp").val();
        var humidity = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("main").child("humidity").val();
        var clouds = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("clouds").child("all").val();
        var conditions = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("weather").child("0").child("main").val();
        var description = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("weather").child("0").child("description").val().toUpperCase();
        var iconCode = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("weather").child("0").child("icon").val();
        var windSpeed = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("wind").child("speed").val();

        // weather output to display on widget
        $("#weather-card-img").attr("src", "https://openweathermap.org/img/w/" + iconCode + ".png");
        $("#weather-card-img").attr("height", "30%");
        $("#weather-card-img").attr("alt", "weather icon");
        $("#weather-card-img").attr("class", "center");
        $("#weather-card-text").prepend("<br />");
        $("#weather-card-text").prepend("Wind: " + windSpeed + "mph");
        $("#weather-card-text").prepend("<br />");
        $("#weather-card-text").prepend("Humidity: " + humidity + "%");
        $("#weather-card-text").prepend("<br />");
        $("#weather-card-text").prepend(temperature + "°");
        $("#weather-card-text").prepend("<br />");
        $("#weather-card-text").prepend(description);
    });
}

