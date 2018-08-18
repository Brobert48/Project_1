// console.log("Is this even running?");

var globalUID;
var firstName;
var timeFormat = "dddd, MMMM Do YYYY hh:mm:ss a";
var datetime = null,
        date = null;
var database = firebase.database();



var update = function () {
    date = moment(new Date())
    datetime.html(date.format(timeFormat));
};



$(document).ready(function() {
    database.ref().once("value").then(function(childSnap) {
        var uid = firebase.auth().currentUser.uid;
        globalUID = uid;
        firstName = childSnap.child("users").child(uid).child("first").val();
        updateHeaderDisplay();
    });
    datetime = $('#index-lead-text')
    update();
    setInterval(update, 1000);
});



function updateHeaderDisplay() {
    $("#index-header-text").text("Good " + getTimeOfDay(moment()) + ", " + firstName + ".");
    //$("#index-header-text").text("Hello, " + firstName + ".");
}



function getTimeOfDay (time) {   //enter moment(), so getTimeOfDay( moment() );
    var period = null; //return period
    
    if(!time || !time.isValid()) {
         return; //if we can't find a valid or filled moment, we return.
    }
    
	var startAfternoon = 12 //24hr time to split the afternoon
	var startEvening = 17 //24hr time to split the evening
	var currentHour = parseFloat(time.format("HH"));
	if(currentHour >= startAfternoon && currentHour <= startEvening) {
		period = "Afternoon";
	} else if(currentHour >= startEvening) {
		period = "Evening";
	} else {
		period = "Morning";
	}
	return period;
}