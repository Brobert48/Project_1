
$(document).ready(function () {

    function wait() {
        console.log(firebase.auth().currentUser.uid);

        database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("todo").on("value", function (snapshot) {


            clearDom();
            putOnPage(snapshot);
        });

    };

    setTimeout(wait, 2000); 
   



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

    $(document).on("click", "#submit-todo",  function (event) {
        event.preventDefault();
alert('yada');
        var task = capitalizeFirstLetter($("#task-input").val().trim());
        var note = $("#note-input").val().trim();

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("todo").child(task).update({

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

            database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("todo").child(task).child(key).remove();

            // firebase.database().ref("/list").child(task).child(key).remove();

        }; // end of if statement

    }); // end of delete function onclick

    //----- clear the dom function-------
    function clearDom() {
        $("#list").empty();
    };

});  // end document ready






