var database = firebase.database();
var currentx = 0;
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
      .text('Today');
    todayLi.append(todayA);
    targetDiv.append(todayLi);
    // Week navbar link
    var weekLi = $('<li>');
    weekLi.attr('class', 'nav-item');
    var weekA = $('<a>');
    weekA.attr('class', 'nav-link')
      .attr('href', '#')
      .text('Week Ahead');
    weekLi.append(weekA);
    targetDiv.append(weekLi);
    // Calender navbar link
    var calenderLi = $('<li>');
    calenderLi.attr('class', 'nav-item');
    var calenderA = $('<a>');
    calenderA.attr('class', 'nav-link')
      .attr('href', '#')
      .text('Calender');
    calenderLi.append(calenderA);
    targetDiv.append(calenderLi);
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



    // Populate Widgets
    let populateWidgets = function (widgetName, widgetW, widgetH, currentX, widgetContent) {
      var Target = $('#widgetArea')
      var widget = `<div class="grid-stack-item" id="${widgetName}" data-gs-x="${currentX}" data-gs-y="0" data-gs-width="${widgetW}" data-gs-height="${widgetH}"><div class="grid-stack-item-content card float-left border border-primary">${widgetContent}</div></div>`
      Target.append(widget);
      // widgetContainer = $('<div>')    // widgetContainer.attr('class','grid-stack')    // .attr('id', widgetName) //change based on widget name    // widgetlocation = $('<div>')    // widgetlocation.attr('class','grid-stack-item')    // .attr('data-gs-x', currentX) //location on grid x-axis    // .attr('data-gs-y','0') //location on grid y-axis    // .attr('data-gs-width', widgetW) //width of widget    // .attr('data-gs-height', widgetH) //height of widget    // lastwidgetLayer = $('<div>')    // .attr('class','grid-stack-item-content card float-left border border-primary')    // TargetDiv.prepend(widgetContainer);    // widgetContainer.append(widgetlocation);    // widgetlocation.append(lastwidgetLayer);    // lastwidgetLayer.append(widgetContent);
      currentx = currentX + widgetW;
    }

    // weatherOBJ
    var weatherApp = {
      name: "weather",
      text1: 'todays weather highlights',
      text2: 'Full Weather',
      width: 2,
      height: 4
    }
    weatherTemplate = `<div class="card float-left">
   <img class="card-img-top" id="weather-card-img" src="" alt="Card image cap">
   <div class="card-body">
       <h5 class="card-title">${weatherApp.name}</h5>
       <p class="card-text" id="weather-card-text">${weatherApp.text1}</p>
       <a href="#" class="btn btn-primary" id="weather-button">${weatherApp.text2}</a>
   </div>
</div>`



    database.ref().once('value').then(function (childsnap) {
      // weather check
      if (childsnap.child('users').child(uid).child('widgets').child('weather').child('active').val() === "on") {
        populateWidgets(weatherApp.name, weatherApp.width, weatherApp.height, currentx, weatherTemplate);
      }
      // stock check
      if (childsnap.child('users').child(uid).child('widgets').child('stocks').child('active').val() === "on") {
        populateWidgets(weatherApp.name, weatherApp.width, weatherApp.height, currentx, weatherTemplate);
      }
      // todo check
      if (childsnap.child('users').child(uid).child('widgets').child('todo').child('active').val() === "on") {
        populateWidgets(weatherApp.name, weatherApp.width, weatherApp.height, currentx, weatherTemplate);
      }
      // news check
      if (childsnap.child('users').child(uid).child('widgets').child('news').child('active').val() === "on") {
        populateWidgets(weatherApp.name, weatherApp.width, weatherApp.height, currentx, weatherTemplate);
      }
      // notes check
      if (childsnap.child('users').child(uid).child('widgets').child('notes').child('active').val() === "on") {
        populateWidgets(weatherApp.name, weatherApp.width, weatherApp.height, currentx, weatherTemplate);
      }
      gridstackConfig();
    })

  }
  else {
    window.location = "login.html";
  }
});

let gridstackConfig = function () {
  console.log('ran')
  var options = {
    cellHeight: 80,
    verticalMargin: 10
  };
  $('.grid-stack').gridstack(options);
}
