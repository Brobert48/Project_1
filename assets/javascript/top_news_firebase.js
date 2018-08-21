
var database = firebase.database();


function pushToDatabase(topic) {
    database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("news").child("topic").update({
        "category": topic,
    }); // end of push to database

    getFromDatabase();
};

// get the category keyword from the database, then calls the api function
function getFromDatabase() {
    database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("news").once("value", function (snapshot) {

        if (snapshot.child("topic").exists()) {
            var topicFromDatabase = snapshot.val().topic.category;
            var topic2 = snapshot.val().topic.category.toUpperCase();
            $("#display-search-title").text(topic2);
            getData(topicFromDatabase);

        } else {
            return;
        };
    });
};

// puts the stories on the page on load
setTimeout(getFromDatabase, 1000);



$(document).on("click", "#submit-article", function () {
    var topic;
    event.preventDefault();
    topic = $("#article-search").val().toLowerCase();
    topic2 = $("#article-search").val().toUpperCase();
    $("#display-search-title").text(topic2);
    pushToDatabase(topic);
    $('.carousel-inner').empty();
});

function getData(topic) {
    $("#display-results").empty();

    var url = "https://api.nytimes.com/svc/topstories/v2/" + topic + ".json";
    url += '?' + $.param({
        'api-key': "23586a59849d4b34bb6e7aeecae82f77"
    });

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {

        for (var i = 0; i < 10; i++) {

            var abstract = (result.results[i].abstract);
            var date = moment(result.results[i].published_date);
            date.format("MM/DD/YYYY hh:mm a");
            var image = (result.results[i].multimedia[4].url);
            var author = (result.results[i].byline);
            var title = result.results[i].title;
            var link = result.results[i].url;



            var carouselTemplate = `<div class="carousel-item content-center"><img src="${image}" data-holder-rendered="true"><a href="${link}" target="_blank"><div class="carousel-caption d-none d-md-block text-primary"><h6>${title}</h6><p>${abstract}</p></div></div>`;

            $('.carousel-inner').append(carouselTemplate);
            if (i === 0) {
                $('.carousel-item').attr('class', 'carousel-item active content-center')
            }
        };


    }).fail(function (err) {
        throw err;
    });


};





