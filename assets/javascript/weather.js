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
var city;
var country;
var currentURL;
var forecastURL;
var previousCallTime;


// for current weather
// example: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0c44f3ccfc31563e53f247c356d15c09
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&APPID=0c44f3ccfc31563e53f247c356d15c09";

// for 5-day forecast
var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q" + city + "," + country + "&APPID=0c44f3ccfc31563e53f247c356d15c09";


// link weather API call to button click for control purposes
// <!><!><!>
// limit to no more than 1 API call every 10 minutes
// <!><!><!>
$(document).on("click", "#weather-button", function () {
    
    console.log("Clicked 'Make Weather API Request'.");
    // AJAX call
    
    // commented out to prevent accidental calls, uncomment when click control timer has been added
    /*
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(queryURL);
        console.log(response);
    });
    */

    // send response data to Firebase
    //(will be able to read from Firebase as often as we like, since we can only call from the API once every 10 minutes)
    
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
    
    
});

