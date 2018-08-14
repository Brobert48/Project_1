var config = {
    apiKey: "AIzaSyCiPgGOcvsJ0Ws54KMX1p0mCia3a1hJ2UI",
    authDomain: "project-1-firebase-1b2fb.firebaseapp.com",
    databaseURL: "https://project-1-firebase-1b2fb.firebaseio.com",
    projectId: "project-1-firebase-1b2fb",
    storageBucket: "project-1-firebase-1b2fb.appspot.com",
    messagingSenderId: "693404188715"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

$('#settingSubmit').on('click',function(){
    var fName = $('#fNameInput').val();
    var lName = $('#lNameInput').val();
    var city = $('#cityInput').val();
    var state = $('#stateInput').val();
    var zip = $('#zipInput').val();
    var stocks = $(':radio[name=stocks]:checked').val();
    var weather = $(':radio[name=weather]:checked').val();
    var notes = $(':radio[name=notes]:checked').val();
    var news = $(':radio[name=news]:checked').val();
    var todo = $(':radio[name=todo]:checked').val();
    // targeting the user ID
    var uid = firebase.auth().currentUser.uid;
    console.log(fName, lName, city, state, zip, stocks,weather,notes,news,todo);
    console.log('clicked');

    var userRef = database.ref('/users');
    database.ref('/users').child(uid);
    userRef.child(uid).child('first').set(fName);
    userRef.child(uid).child('last').set(lName);
    userRef.child(uid).child('city').set(city);
    userRef.child(uid).child('state').set(state);
    userRef.child(uid).child('zip').set(zip);
    userRef.child(uid).child('widgets').child('news').child('active').set(news);
    userRef.child(uid).child('widgets').child('stocks').child('active').set(stocks);
    userRef.child(uid).child('widgets').child('weather').child('active').set(weather);
    userRef.child(uid).child('widgets').child('notes').child('active').set(notes);
    userRef.child(uid).child('widgets').child('todo').child('active').set(todo);








});
