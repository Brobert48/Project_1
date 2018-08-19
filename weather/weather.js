// https://openweathermap.org/api
// https://openweathermap.org/current
// https://openweathermap.org/forecast5
// our api key = 0c44f3ccfc31563e53f247c356d15c09

/*
From website:
1.  Do not send requests more than 1 time per 10 minutes from one device/one API key.
    Normally the weather is not changing so frequently.
2.  Use the name of the server as api.openweathermap.org. Please never use the IP address of the server.
3.  Call API by city ID instead of city name, city coordinates or zip code.
    In this case you get precise respond exactly for your city.
    The cities' IDs can be found in the following file: Cities' IDs list.
4.  Free and Startup accounts have limitation of capacity and data availability.
    If you do not get respond from server do not try to repeat your request immediately,
    but only after 10 min. Also we recommend to store your previous request data.

    <!><!><!>
    If account exceeds the limits, then a notification about limits exceeding is sent.
    If it repeats again, then the account is blocked for an hour.
    Therefore, the lock period is increased by one hour until 4 hours block sets.
    When blocking repeats the fifth time, then the lock period lasts 24 hours. This rule is cycled.
    Please be careful with the number of API calls you complete.
    <!><!><!> 
*/

//var location = city + "," + country;
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



// example: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0c44f3ccfc31563e53f247c356d15c09
// metric: units=metric
// imperial: units=imperial
// api.openweathermap.org/data/2.5/weather?zip=94040,us

// for current weather
var queryCurrentWeatherURL; 
    // "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country 
    // + "&APPID=0c44f3ccfc31563e53f247c356d15c09&units=imperial";
    // "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + country 
    // + "&APPID=0c44f3ccfc31563e53f247c356d15c09&units=imperial";

// for 5-day forecast
var queryFiveDayForecastURL; 
    // "http://api.openweathermap.org/data/2.5/forecast?q" + city + "," + country 
    // + "&APPID=0c44f3ccfc31563e53f247c356d15c09&units=imperial";
    // "http://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "," + country 
    // + "&APPID=0c44f3ccfc31563e53f247c356d15c09&units=imperial";



// Initialize Firebase
// https://project-1-firebase-1b2fb.firebaseio.com
// var config = {
//     apiKey: "AIzaSyCiPgGOcvsJ0Ws54KMX1p0mCia3a1hJ2UI",
//     authDomain: "project-1-firebase-1b2fb.firebaseapp.com",
//     databaseURL: "https://project-1-firebase-1b2fb.firebaseio.com",
//     projectId: "project-1-firebase-1b2fb",
//     storageBucket: "",
//     messagingSenderId: "693404188715"
// };
// firebase.initializeApp(config);

var database = firebase.database();
// var connectionsRef = database.ref("/connections");
// var connectedRef = database.ref(".info/connected");



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
$(document).ready( function() {
    //console.log("previousCallTime is: " + previousCallTime);
    database.ref().once("value").then(function(childSnap) {
        var uid = firebase.auth().currentUser.uid;
        globalUID = uid;
        //console.log("Page load, uid is: " + uid);
    
        // pull last API call time from firebase
        //database.ref().child("users").child(uid).child("widgets").child("weather").child("data").val();
        // previousCallTime = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseLastWeatherCallTime").val();
        // pull weather data from firebase
        // currentWeatherCallData = childSnap.val().firebaseWeatherAPIData;
        // displayCurrentWeather();
        //console.log("Now previousCallTime is: " + previousCallTime);
        $("#weather-card-text").text("Last Updated: " + previousCallTime);
        //console.log("Zip code was: " + zip);
        zip = childSnap.child("users").child(uid).child("zip").val();
        city = childSnap.child("users").child(uid).child("city").val();
        //console.log("Zip code is: " + zip);
        constructCurrentWeatherURL();
        //console.log(queryCurrentWeatherURL);
        constructFiveDayWeatherURL();
        //console.log(queryFiveDayForecastURL);
        displayCurrentWeather();
    });
});



// link weather API call to button click for control purposes
// <!><!><!>
// limit to no more than 1 API call every 15 minutes (limit is 10, but we'll use 15 to be safe)
// <!><!><!>
$(document).on("click", "#weather-button", function () {
    event.preventDefault();
    // console.log("Clicked 'Make Weather API Request'.");
    // sets local uid to the current user's uid stored in globalUID
    var uid = globalUID;
    // var uid = firebase.auth().currentUser.uid;
    // console.log("Clicked 'Make Weather API Request', uid is: " + uid);
    // record current time
    var currentTime = moment();
    // set recorded current time to desired format
    var adjustedTime = moment(currentTime).format(timeFormat);
    // console.log("Adjusted current time is " + adjustedTime);
    // calculate and record number of minutes since last call time
    var elapsedMinutes = moment(adjustedTime).diff(moment(previousCallTime, timeFormat), "minutes");
    // console.log("It has been " + elapsedMinutes + " minutes since " + previousCallTime);
    // if it has not been 15 minutes since last API call, do nothing and print a console message
    if (elapsedMinutes < 15) {
        // make no API call, instead use previous API data stored in firebase
        // console.log("It has not been 15 minutes yet. No current weather update.");
        // currentWeatherCallData = databaseChildThing.val().firebaseWeatherAPIData;
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
        .then(function(response) {
            // console.log("----------------------------------------");
            // console.log("current weather URL below");
            // console.log(queryCurrentWeatherURL);
            // console.log("----------------------------------------");
            // console.log("'response' below");
            // console.log(response);
            // console.log("----------------------------------------");
            currentWeatherCallData = response;
            // console.log("currentWeatherCallData below should match 'response' above");
            // console.log(currentWeatherCallData);
            // console.log("----------------------------------------");
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



// rework for weather folder placed in UID stuff
/*
Firebase Project-1
    users
        (user-id)
            widgets
                news
                notes
                stocks
                todo
                weather
                    active
                    data
                        firebaseLastWeatherCallTime
                        firebaseWeatherAPIData
                        firebaseFiveDayAPIData

var uid = firebase.auth().currentUser.uid;

database.ref().child("users").child(uid).child("widgets").child("weather").child("data").set({
    firebaseLastWeatherCallTime: adjustedTime,
    firebaseWeatherAPIData: currentWeatherCallData,
    firebaseFiveDayAPIData: fiveDayForecastCallData
})
*/



// Five Day Forecast Functionality
/*
$(document).on("click", "#five-day-weather-button", function () {
    console.log("Clicked 'Make Five Day Weather API Request'.");
    // record current time
    var currentTime = moment();
    // set recorded current time to desired format
    var adjustedTime = moment(currentTime).format(timeFormat);
    console.log("Adjusted current time is " + adjustedTime);
    // calculate and record number of minutes since last call time
    var elapsedMinutes = moment(adjustedTime).diff(moment(previousCallTime, timeFormat), "minutes");
    console.log("It has been " + elapsedMinutes + " minutes since " + previousCallTime);
    // if it has not been 15 minutes since last API call, do nothing and print a console message
    if (elapsedMinutes < 15) {
        // make no API call, instead use previous API data stored in firebase
        console.log("It has not been 15 minutes yet. No five day forecast update.");
        // currentWeatherCallData = databaseChildThing.val().firebaseWeatherAPIData;
        // displayCurrentWeather();
    }
    else {
        // update time of last API call to current time
        previousCallTime = adjustedTime;
        // AJAX call
        $.ajax({
            url: queryFiveDayForecastURL,
            method: "GET"
        })
        .then(function(response) {
            console.log("----------------------------------------");
            console.log("current weather URL below");
            console.log(queryFiveDayForecastURL);
            console.log("----------------------------------------");
            console.log("'response' below");
            console.log(response);
            console.log("----------------------------------------");
            fiveDayForecastCallData = response;
            console.log("currentWeatherCallData below should match 'response' above");
            console.log(fiveDayForecastCallData);
            console.log("----------------------------------------");
            // send response data to Firebase
            // (will be able to read from Firebase as often as we like, since we can only call from the API once every 10 minutes)
            database.ref("/Weather").set({
                firebaseLastWeatherCallTime: adjustedTime,      
                firebaseFiveDayAPIData: fiveDayForecastCallData         
            });
            //updated display of last call time
            $("#weather-card-text").text("Last API call time was: " + previousCallTime);
            displayCurrentWeather();
        });
    }  
});
*/



// Call this to update the weather widget with the correct data.
function displayCurrentWeather() {
    database.ref().once("value").then(function(childSnap) {
        var uid = firebase.auth().currentUser.uid;
        var temperature = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("main").child("temp").val();
        var humidity = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("main").child("humidity").val();
        var clouds = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("clouds").child("all").val();
        var conditions = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("weather").child("0").child("main").val();
        var description = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("weather").child("0").child("description").val().toUpperCase();
        var iconCode = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("weather").child("0").child("icon").val();
        var windSpeed = childSnap.child("users").child(uid).child("widgets").child("weather").child("data").child("firebaseWeatherAPIData").child("wind").child("speed").val();
        // console.log("Temperature: " + temperature);
        // console.log("Clouds: " + clouds);
        // console.log("Conditions: " + conditions);
        // console.log("Description: " + description);
        // console.log("Icon code: " + iconCode);
        // console.log("Wind speed: " + windSpeed);
        
        // weather output to display on widget
        $("#weather-card-img").attr("src", "https://openweathermap.org/img/w/" + iconCode +".png");
        $("#weather-card-img").attr("height", "30%");
        // $("#weather-card-img").attr("width", "30%");
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
        // $("#weather-card-text").prepend("<br />");
    });
}

