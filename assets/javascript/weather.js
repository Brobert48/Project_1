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
var city = "Concord";
var country = "us";
var currentURL;
var forecastURL;
var previousCallTime = "2018-08-11 11:00:00";       // pull from firebase on page load
var callData = "nothing yet";                       // store the API call here

var timeFormat = "YYYY-MM-DD HH:mm:ss";


// for current weather
// example: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0c44f3ccfc31563e53f247c356d15c09
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&APPID=0c44f3ccfc31563e53f247c356d15c09";

// for 5-day forecast
var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q" + city + "," + country + "&APPID=0c44f3ccfc31563e53f247c356d15c09";



// Initialize Firebase
var config = {
    apiKey: "AIzaSyCiPgGOcvsJ0Ws54KMX1p0mCia3a1hJ2UI",
    authDomain: "project-1-firebase-1b2fb.firebaseapp.com",
    databaseURL: "https://project-1-firebase-1b2fb.firebaseio.com",
    projectId: "project-1-firebase-1b2fb",
    storageBucket: "",
    messagingSenderId: "693404188715"
};
firebase.initializeApp(config);

var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");


//pull data from firebase on page load
$(document).ready( function() {
    console.log("previousCallTime is: " + previousCallTime);
    database.ref().once("value").then(function(childSnap) {
        // pull last API call time from firebase
        previousCallTime = childSnap.val().lastWeatherCallTime;
        // pull weather data from firebase
        // callData = childSnap.val().storedWeatherAPIData;
        console.log("Now previousCallTime is: " + previousCallTime);
        $("#weather-card-text").text("Last API call time was: " + previousCallTime);
    });
});

// link weather API call to button click for control purposes
// <!><!><!>
// limit to no more than 1 API call every 15 minutes (limit is 10, but we'll use 15 to be safe)
// <!><!><!>
$(document).on("click", "#weather-button", function () {
    
    console.log("Clicked 'Make Weather API Request'.");

    var currentTime = moment();
    //console.log(currentTime);
    console.log("----------------------------------------");
    var adjustedTime = moment(currentTime).format(timeFormat);
    console.log("Adjusted current time is " + adjustedTime);

    var elapsedMinutes = moment(adjustedTime).diff(moment(previousCallTime, timeFormat), "minutes");
    console.log("It has been " + elapsedMinutes + " minutes since " + previousCallTime);

    // if it has not been 15 minutes since last API call, do nothing and print a console message
    if (elapsedMinutes < 15) {
        // make no API call, instead use previous API data stored in firebase
        console.log("It has not been 15 minutes yet.");
        // callData = databaseChildThing.val().storedWeatherAPIData;
    }
    else {

        // update time of last API call to current time
        previousCallTime = adjustedTime;

        // AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log("----------------------------------------");
            console.log("current weather URL below");
            console.log(queryURL);
            console.log("----------------------------------------");
            console.log("'response' below");
            console.log(response);
            console.log("----------------------------------------");
            callData = response;
            console.log("callData below should match 'response' above");
            console.log(callData);
            console.log("----------------------------------------");

            // send response data to Firebase
            // (will be able to read from Firebase as often as we like, since we can only call from the API once every 10 minutes)
            database.ref().set({
                lastWeatherCallTime: adjustedTime,      // call it "firebaseLastWeatherCallTime"?
                storedWeatherAPIData: callData,         // call it "firebaseWeatherAPIData"?
            });

            $("#weather-card-text").text("Last API call time was: " + previousCallTime);

        });
        





    }


    
    
});

