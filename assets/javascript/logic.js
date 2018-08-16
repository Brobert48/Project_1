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
      var widget = `<div class="grid-stack-item" id="${widgetName}" data-gs-x="${currentX}" data-gs-y="0" data-gs-width="${widgetW}" data-gs-height="${widgetH}"><div class="grid-stack-item-content card border border-primary">${widgetContent}</div></div>`
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
      height: 4,
      template: `<div class="card float-left">
   <img class="card-img-top" id="weather-card-img" src="" alt="Card image cap">
   <div class="card-body">
       <h5 class="card-title">weather</h5>
       <p class="card-text" id="weather-card-text">todays weather highlights</p>
       <a href="#" class="btn btn-primary" id="weather-button">Update Weather</a>
   </div>
</div>`
    }
    var newsApp = {
      name: "news",
      text1: "",
      width: 2,
      height: 4,
      template: `<div class="container">
    <div class="row">
        <div class="col-xs-3"></div>
        <div class="col-xs-6 text-center">
            <div class="card">
                <div class="card-title text-center" id="search-title">Top News Stories</div>
                    <!-- search box popup -->
                <div class="search-container">
                    <div class="search-title text-center">Select a search topic</div>
                        <div class="row-fluid">
                            <div class="col-xs-6 text-center">
                                <form id="form">
                                    <select name="search" id="article-search">
                                        <option value="world">world</option>
                                        <option value="national">national</option>
                                        <option value="politics">politics</option>
                                        <option value="business">business</option>
                                        <option value="technology">technology</option>
                                        <option value="science">science</option>
                                        <option value="Technology">Technology</option>
                                        <option value="health">health</option>
                                        <option value="fashion">fashion</option>
                                        <option value="obituaries">obituaries</option>
                                    </select>
                                </form>
                            </div>
                            <div class="col-xs-1"></div>
                            <div class="col-xs-5">
                                <button class="btn btn-default" id="submit-article">Submit</button>
                            </div>
                    </div>    
                </div>
                    <!-- end of search popup -->
                <div class="results-refresh-area">
                    <div class="text-center" id="display-search-title"></div>
                    <div class="display-top-stories" id="display-results"></div>
                    <div class="card-body">
                        <div class="refresh">Check for new stories</div>
                        <div id="menu" class="glyphicon">&#xe236;</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
    }
    var stockApp = {
      name: "stocks",
      width: 3,
      height: 4,
      template: `<div class="modal fade" id="stock-input-area" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog" role="document">
     <div class="modal-content">
         <div class="modal-header">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
             </button>

             <h3 class="modal-title">Add a stock ticker symbol to your watchlist.</h3>
             <h5 class="modal-title-sub">(Up to 5 stocks can be saved.)</h5>


         </div>
         <div class="modal-body">
             <form>
                 <span class="text-for-input">Enter Stock Symbol Here: </span>
                 <input type="text" id="add-stock">

             </form>
         </div>
         <div class="modal-footer">
             <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
             <button class="btn btn-default" data-dismiss="modal" id="submit-stock">Submit</button>
         </div>
     </div>
 </div>
</div>



<!-- widget area  -->

<div class="container">
<div class="row">
 <div class="col-xs-4"></div>
 <div class="col-xs-4">

         <div class="stock-widget-container">
         
             <!-- <div id="menu"><span class="glyphicon">&#xe236;</span></div> -->
             <div id="menu" data-toggle="modal" data-target="#stock-input-area"><span class="glyphicon">&#xe236;</span></div>
         
            

             <div class="card text-center" >
                     
                     <div class="card-body text-center">
                         <div class="card-title">Your Favorite Stocks</div>

                         <div class="card-text stock stock-0">
                             <span id="stock-0-name"></span>
                             <span id="stock-0-data"></span>
                             <span id="stock-0-change"></span>
                         </div>

                         <div class="card-text stock stock-1">
                             <span id="stock-1-name"></span>
                             <span id="stock-1-data"></span>
                             <span id="stock-1-change"></span>
                         </div>

                         <div class="card-text stock stock-2">
                             <span id="stock-2-name"></span>
                             <span id="stock-2-data"></span>
                             <span id="stock-2-change"></span>
                         </div>



                   </div>
         
         
         </div>
         <div class="refresh-area text-center" id="click-me">Click to refresh</div>
         </div>

 </div>
 <div class="col-xs-4"></div>
</div>
</div>`
    }
    var todoApp={
      name:"todo",
      width: 2,
      height: 4,
      template:`<div class="row">
      <div class="col-xs-12">
          <div class="panel panel-default" id="panel-list-body">
              <div class="panel-heading" id="heading-box">
                  <h1 class="panel-title" id="title"><span id="title-1">Get It Done List,</span><span id="title-2"> powered by firebase.</span></h1>
              </div>
              <div class="panel-body" id="input-body">
                  <div class="row" id="top-row">
                      <div class="col-xs-3 box">
                          <div id="store-title">Task</div>
                      </div>
                      <div class="col-xs-3 box">
                          <div id="item-title">Notes</div>
                      </div>
                      <div class="col-xs-3 box"></div>
                      <div class="col-xs-3 box"></div>
  
                  </div>
  
                  <div class="row" id="bottom-row">
                      <div class="col-xs-3 box">
                          <input type="text" id="task-input" placeholder=" Enter Task">
                      </div>
                      <div class="col-xs-3 box">
                          <input type="text" id="note-input" placeholder=" Enter notes">
                      </div>
                      <div class="col-xs-3 box"></div>
                      <div class="col-xs-3 box">
                          <button class="w3-button w3-border w3-xlarge" id="submit">Submit <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  
  
  <div class="row">
      <div class="col-xs-1"></div>
      <div class="col-xs-10">
          <p id="list-heading">Things To Do....</p>
          <div id="list"></div>
      </div>
      <div class="col-xs-1"></div>
  </div>`
    }

    database.ref().once('value').then(function (childsnap) {
      // weather check
      if (childsnap.child('users').child(uid).child('widgets').child('weather').child('active').val() === "on") {
        populateWidgets(weatherApp.name, weatherApp.width, weatherApp.height, currentx, weatherApp.template);
      }
      // stock check
      if (childsnap.child('users').child(uid).child('widgets').child('stocks').child('active').val() === "on") {
        populateWidgets(stockApp.name, stockApp.width, stockApp.height, currentx, stockApp.template);
      }
      // todo check
      if (childsnap.child('users').child(uid).child('widgets').child('todo').child('active').val() === "on") {
        populateWidgets(todoApp.name, todoApp.width, todoApp.height, currentx, todoApp.template);
      }
      // news check
      if (childsnap.child('users').child(uid).child('widgets').child('news').child('active').val() === "on") {
        populateWidgets(newsApp.name, newsApp.width, newsApp.height, currentx, newsApp.template);
      }
      // notes check
      if (childsnap.child('users').child(uid).child('widgets').child('notes').child('active').val() === "on") {
        populateWidgets(weatherApp.name, weatherApp.width, weatherApp.height, currentx, weatherApp.template);
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

