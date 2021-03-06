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
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    runSettings();
  }

  else {
    window.location = "login.html";
  }
});

let runSettings = function () {
  var targetDiv = $('.navbar-nav');
  // Today navbar link
  var todayLi = $('<li>');
  todayLi.attr('class', 'nav-item');
  var todayA = $('<a>');
  todayA.attr('class', 'nav-link')
    .attr('href', 'index.html')
    .text('Home');
  todayLi.append(todayA);
  targetDiv.append(todayLi);
  // Personalize navbar link
  var settingsLi = $('<li>');
  settingsLi.attr('class', 'nav-item  active');
  var settingsA = $('<a>');
  settingsA.attr('class', 'nav-link')
    .attr('href', 'settings.html')
    .text('Personalize');
  settingsLi.append(settingsA);
  targetDiv.append(settingsLi);
  // Logout navbar link
  var logoutLi = $('<li>');
  logoutLi.attr('class', 'nav-item');
  var logoutA = $('<a>')
  logoutA.attr('class', 'nav-link')
    .attr('onclick', 'firebase.auth().signOut()')
    .attr('href', 'login.html')
    .text('Logout');
  logoutLi.append(logoutA);
  targetDiv.append(logoutLi);

  database.ref().once('value').then(function (childsnap) {
    var storedfName = childsnap.child('users').child(firebase.auth().currentUser.uid).child('first').val();
    var storedlName = childsnap.child('users').child(firebase.auth().currentUser.uid).child('last').val();
    var storedCity = childsnap.child('users').child(firebase.auth().currentUser.uid).child('city').val();
    var storedState = childsnap.child('users').child(firebase.auth().currentUser.uid).child('state').val();
    var storedZip = childsnap.child('users').child(firebase.auth().currentUser.uid).child('zip').val();
    var storedStocks = childsnap.child('users').child(firebase.auth().currentUser.uid).child('widgets').child('stocks').child('active').val();
    var storedWeather = childsnap.child('users').child(firebase.auth().currentUser.uid).child('widgets').child('weather').child('active').val();
    var storedchat = childsnap.child('users').child(firebase.auth().currentUser.uid).child('widgets').child('chat').child('active').val();
    var storedNews = childsnap.child('users').child(firebase.auth().currentUser.uid).child('widgets').child('news').child('active').val();
    var storedTodo = childsnap.child('users').child(firebase.auth().currentUser.uid).child('widgets').child('todo').child('active').val();

    $('#fNameInput').val(storedfName);
    $('#lNameInput').val(storedlName);
    $('#cityInput').val(storedCity);
    $('#stateInput').val(storedState);
    $('#zipInput').val(storedZip);
    if (storedStocks === "on") {
      $('#stocksON').attr('checked', 'checked')
      $('#stocks1').attr('class', 'btn btn-secondary active')
    }
    else {
      $('#stocksOFF').attr('checked', 'checked')
      $('#stocks2').attr('class', 'btn btn-secondary active')
    }

    if (storedWeather === "on") {
      $('#weatherON').attr('checked', 'checked')
      $('#weather1').attr('class', 'btn btn-secondary active')
    }
    else {
      $('#weatherOFF').attr('checked', 'checked')
      $('#weather2').attr('class', 'btn btn-secondary active')
    }

    if (storedchat === "on") {
      $('#chatON').attr('checked', 'checked')
      $('#chat1').attr('class', 'btn btn-secondary active')
    }
    else {
      $('#chatOFF').attr('checked', 'checked')
      $('#chat2').attr('class', 'btn btn-secondary active')
    }

    if (storedNews === "on") {
      $('#newsON').attr('checked', 'checked')
      $('#news1').attr('class', 'btn btn-secondary active')
    }
    else {
      $('#newsOFF').attr('checked', 'checked')
      $('#news2').attr('class', 'btn btn-secondary active')
    }

    if (storedTodo === "on") {
      $('#todoON').attr('checked', 'checked')
      $('#todo1').attr('class', 'btn btn-secondary active')
    }
    else {
      $('#todoOFF').attr('checked', 'checked')
      $('#todo2').attr('class', 'btn btn-secondary active')
    }
  })
};




$('#settingSubmit').on('click', function () {
  var fName = $('#fNameInput').val();
  var lName = $('#lNameInput').val();
  var city = $('#cityInput').val();
  var state = $('#stateInput').val();
  var zip = $('#zipInput').val();
  var stocks = $(':radio[name=stocks]:checked').val();
  var weather = $(':radio[name=weather]:checked').val();
  var chat = $(':radio[name=chat]:checked').val();
  var news = $(':radio[name=news]:checked').val();
  var todo = $(':radio[name=todo]:checked').val();

  var uid = firebase.auth().currentUser.uid;

  var userRef = database.ref('/users');
  database.ref('/users').child(uid);
  userRef.child(uid).child('first').set(fName);
  userRef.child(uid).child('last').set(lName);
  userRef.child(uid).child('city').set(city);
  userRef.child(uid).child('state').set(state);
  userRef.child(uid).child('zip').set(zip);
  userRef.child(uid).child('widgets').child('news').child('active').set(news);
  database.ref("/users").child(firebase.auth().currentUser.uid).child("widgets").child("news").child("topic").update({
    "category": "national",
  });
  userRef.child(uid).child('widgets').child('stocks').child('active').set(stocks);
  userRef.child(uid).child('widgets').child('weather').child('active').set(weather);
  userRef.child(uid).child('widgets').child('chat').child('active').set(chat);
  userRef.child(uid).child('widgets').child('todo').child('active').set(todo);

});

// BlakedPotato