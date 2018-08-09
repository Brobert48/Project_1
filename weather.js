// https://openweathermap.org/api
// https://openweathermap.org/current
// https://openweathermap.org/forecast5
// api key = 0c44f3ccfc31563e53f247c356d15c09

/*
1.  Do not send requests more than 1 time per 10 minutes from one device/one API key. Normally the weather is not changing so frequently.
2.  Use the name of the server as api.openweathermap.org. Please never use the IP address of the server.
3.  Call API by city ID instead of city name, city coordinates or zip code. In this case you get precise respond exactly for your city.
    The cities' IDs can be found in the following file: Cities' IDs list.
4.  Free and Startup accounts have limitation of capacity and data availability.
    If you do not get respond from server do not try to repeat your request immediately,
    but only after 10 min. Also we recommend to store your previous request data.

    <!><!><!>
    If account exceeds the limits, then a notification about limits exceeding is sent.
    If it repeats again, then the account is blocked for an hour. Therefore, the lock period is increased by one hour until 4 hours block sets.
    When blocking repeats the fifth time, then the lock period lasts 24 hours. This rule is cycled. Please be carefull with the number of API calls you complete.
    <!><!><!> 
*/

//var location;
var city;
var country;
var currentURL;
var forecastURL;

// for current weather
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city +"," + country + "&APPID=0c44f3ccfc31563e53f247c356d15c09";


// for 5-day forecast
var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q" + city +"," + country + "&APPID=0c44f3ccfc31563e53f247c356d15c09";