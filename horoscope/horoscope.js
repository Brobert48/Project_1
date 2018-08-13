


// aries,
// taurus,
// gemini,
// cancer,
// leo,
// virgo,
// libra,
// scorpio,
// sagittarius,
// capricorn,
// aquarius,
// pisces 
$("#submit-zodiac").on("click", function() {
    var zodiac = $("#zodiac-search").val();
    console.log("this is search: " + zodiac);
    getData(zodiac);



});




// var zodiac = "aries";


function getData(zodiac) {
    var queryURL = "http://horoscope-api.herokuapp.com/horoscope/today/"+ zodiac;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
       

        // $("#stock-"+ i +"-data").text(stockPrice);
        // $("#stock-"+ i +"-name").text(symbol);
    });
};

