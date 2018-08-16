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
      var uid = firebase.auth().currentUser.uid;
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
      settingsLi.attr('class', 'nav-item');
      var settingsA = $('<a>');
      settingsA.attr('class', 'nav-link')
        .attr('href', 'settings.html')
        .text('Personalize');
      settingsLi.append(settingsA);
      targetDiv.append(settingsLi);
      // Username navbar text
      var userNameLi = $('<li>');
      userNameLi.attr('class', 'nav-item');
      var userNameH5 = $('<h5>');
      userNameH5.attr('class', 'navbar-text')
        .text(firebase.auth().currentUser.displayName);
      userNameLi.append(userNameH5);
  
      targetDiv.append(userNameH5);
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
  
    }
    else {
      window.location = "login.html";
    }
  });
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
