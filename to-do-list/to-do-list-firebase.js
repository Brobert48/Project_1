


var config = {
    apiKey: "AIzaSyCiPgGOcvsJ0Ws54KMX1p0mCia3a1hJ2UI",
    authDomain: "project-1-firebase-1b2fb.firebaseapp.com",
    databaseURL: "https://project-1-firebase-1b2fb.firebaseio.com",
    projectId: "project-1-firebase-1b2fb",
    storageBucket: "project-1-firebase-1b2fb.appspot.com",
    messagingSenderId: "693404188715"
};

firebase.initializeApp(config);

$(document).ready(function () {
    var database = firebase.database();


    function wait() {
        console.log(firebase.auth().currentUser.uid);

        database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("notes").child("list").on("value", function (snapshot) {

            clearDom();
            putOnPage(snapshot);
        });

    };

    setTimeout(wait, 1000); 
   



    function putOnPage(snapshot) {

        snapshot.forEach(function (child) {
            var task = child.key;
            var taskName = $("<div>").attr("class", "task");
            var a = $("<p>").attr("class", "task-name").attr("id", "task-" + task);
            taskName.append(a);
            $("#list").append(taskName);

            //--------this area puts the notes under the task from above ---
            var list = snapshot.child(task).val();

            for (var i in list) {

                var key = i;
                var value = list[i];
                var p = $("<p>").attr("id", key).text("  " + key + "  :  " + value).attr("class", "task-items");
                var b = $("<button class='delete'>").text("✓").attr("data-key", key).attr("data-task", task);
                p.prepend(b);
                $("#task-" + task).append(p);
            }

        });  // end of snapshot for each child

    };  // end of putOnPage function



    //----------- beginning of onclick area to add items -----

    $("#submit").on("click", function (event) {
        event.preventDefault();

        var task = capitalizeFirstLetter($("#task-input").val().trim());
        var note = $("#note-input").val().trim();

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("notes").child("list").child(task).update({
            [task]: note,
        }); // end of push to database


        $("#task-input").val('');
        $("#note-input").val('');

    });  // end of onclick for adding items

    //------------ delete onclick area-----------

    $(document).on("click", "button.delete", function (event) {
        event.preventDefault();
        var key = $(this).attr("data-key");
        var task = $(this).attr("data-task");
        console.log(task);

        // this is a "confirm", may need to add something else to look better
        if (confirm('Are you sure?')) {
            database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("notes").child("list").child(task).child(key).remove();
            // firebase.database().ref("/list").child(task).child(key).remove();

        }; // end of if statement

    }); // end of delete function onclick

    //----- clear the dom function-------
    function clearDom() {
        $("#list").empty();
    };

});  // end document ready






