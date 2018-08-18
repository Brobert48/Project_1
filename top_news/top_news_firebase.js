
//  var config = {
//     apiKey: "AIzaSyCiPgGOcvsJ0Ws54KMX1p0mCia3a1hJ2UI",
//     authDomain: "project-1-firebase-1b2fb.firebaseapp.com",
//     databaseURL: "https://project-1-firebase-1b2fb.firebaseio.com",
//     projectId: "project-1-firebase-1b2fb",
//     storageBucket: "project-1-firebase-1b2fb.appspot.com",
//     messagingSenderId: "693404188715"
// };


// firebase.initializeApp(config);


var database = firebase.database();


function pushToDatabase(topic) {
    database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("news").child("topic").update({
        "category":topic,
    }); // end of push to database

    getFromDatabase();
};

// get the category keyword from the database, then calls the api function
function getFromDatabase() {
    database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("news").once("value", function (snapshot) {
        console.log(snapshot.child("topic").exists());
      
        if (snapshot.child("topic").exists()) {
            console.log(snapshot.val().topic.category);
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



$(document).on("click", "#submit-article" ,function () {
    var topic;
    console.log('News submit clicked')
    // $(".search-container").hide();
    // $(".results-refresh-area").show();
    topic = $("#article-search").val().toLowerCase();
    topic2 = $("#article-search").val().toUpperCase();
    $("#display-search-title").text(topic2);
    pushToDatabase(topic);

    // getData(topic);
});


// $(".refresh").on("click", function () {
//     if(!topic) {
//         alert("Use the menu to begin a search.");
//     } else {
//         $("#display-search-title").text(topic);
//         getData(topic);
//     };
// });


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
        console.log(result);

        for (var i = 0; i < 3; i++) {

            var abstract = (result.results[i].abstract);
            // var date = (result.results[i].published_date);
            var date = moment(result.results[i].published_date);
            date.format("MM/DD/YYYY hh:mm a");
            var image = (result.results[i].multimedia[0].url);
            var author = (result.results[i].byline);
            var title = result.results[i].title;
            var link = result.results[i].url;
            console.log("this is image: " + image);

           

    

            // title div with modal onclick
            var modalDiv = $("<div>");
            modalDiv.text("¶ " +title);
            modalDiv.addClass("modal-area");
            modalDiv.attr("id", "show-article");
            modalDiv.attr("data-toggle", "modal");
            modalDiv.attr("data-target", "#modal-" + i);

            $("#display-results").append(modalDiv);


            // modal container includes all new <elements> below
            var container = $("<div>");
            container.addClass("container");

            // modal
            var modal = $("<div>");
            modal.addClass("modal").addClass("fade");
            modal.attr("id", "modal-" + i);
            modal.attr("role", "dialog");

            // modal inner div 1
            var modal1 = $("<div>");
            modal1.addClass("modal-dialog");

            // modal inner div 2
            var modal2 = $("<div>");
            modal2.addClass("modal-content");

            modal1.append(modal2);

            modal.append(modal1);

            container.append(modal);


            // modal header
            var modalHeader = $("<div>");
            modalHeader.addClass("modal-header");
            // modalHeader.text(title);

            //modal inner button
            var modalClose = $("<button>");
            modalClose.attr("type", "button");
            modalClose.attr("data-dismiss", "modal");
            modalClose.addClass("close");
            modalClose.text("X");

            // modal title
            var modalTitle = $("<div>");
            modalTitle.addClass("modal-title");
            modalTitle.text(title);

            modalHeader.append(modalClose).append(modalTitle);

            modal2.append(modalHeader);

            // modal body
            var modalBody = $("<div>");
            modalBody.addClass("modal-body");

            // modal image
            var modalImage = $("<img>");
            modalImage.attr("src", image);
            modalImage.addClass("modal-image");

            // modal date
            var modalDate = $("<div>");
            modalDate.addClass("modal-date");
            modalDate.addClass("text-center");
            modalDate.text(date);

            // modal article
            var modalArticle = $("<div>");
            modalArticle.addClass("modal-article");
            modalArticle.text(abstract);

            // modal author
            var modalAuthor = $("<div>");
            modalAuthor.addClass("modal-author");
            modalAuthor.text(author);

            // modal link
            var modallink = $("<a>");
            modallink.addClass("modal-link");
            modallink.attr("href", link)
            modallink.text(link);

            modalBody.append(modalImage).append(modalArticle).append(modalAuthor).append(modalDate).append(modallink);

            modal2.append(modalBody);

            $("#newsModals").append(container);
        };


    }).fail(function (err) {
        throw err;
    });


};





