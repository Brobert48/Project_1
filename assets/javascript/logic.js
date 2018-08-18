var database = firebase.database();
var currentx = 0;
var currenty = 0;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        runLogic();
    }
        
        else {
            window.location = "login.html";
        }
    });

let runLogic = function(){
        var uid = firebase.auth().currentUser.uid;
        var targetDiv = $('.navbar-nav');
        // Today navbar link
        var todayLi = $('<li>');
        todayLi.attr('class', 'nav-item active');
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
        // var userNameLi = $('<li>');
        // userNameLi.attr('class', 'nav-item');
        // var userNameH5 = $('<h5>');
        // userNameH5.attr('class', 'navbar-text')
        //   .text(firebase.auth().currentUser.displayName);
        // userNameLi.append(userNameH5);

        // targetDiv.append(userNameH5);
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
        let populateWidgets = function (widgetName, widgetW, widgetH, currentX, currentY, widgetContent) {
            var Target = $('#widgetArea')
            var widget = `<div class="grid-stack-item" data-gs-no-resize="true" id="${widgetName}" data-gs-x="${currentX}" data-gs-y="${currentY}" data-gs-width="${widgetW}" data-gs-height="${widgetH}"><div class="grid-stack-item-content card">${widgetContent}</div></div>`
            Target.append(widget);
            // widgetContainer = $('<div>')    // widgetContainer.attr('class','grid-stack')    // .attr('id', widgetName) //change based on widget name    // widgetlocation = $('<div>')    // widgetlocation.attr('class','grid-stack-item')    // .attr('data-gs-x', currentX) //location on grid x-axis    // .attr('data-gs-y','0') //location on grid y-axis    // .attr('data-gs-width', widgetW) //width of widget    // .attr('data-gs-height', widgetH) //height of widget    // lastwidgetLayer = $('<div>')    // .attr('class','grid-stack-item-content card float-left border border-primary')    // TargetDiv.prepend(widgetContainer);    // widgetContainer.append(widgetlocation);    // widgetlocation.append(lastwidgetLayer);    // lastwidgetLayer.append(widgetContent);
            currentx = currentX + widgetW;
            if (currentx >= 10) {
                currenty++;
                currentx = 0;
            }
        }

        // weatherOBJ
        var weatherApp = {
            name: "weather",
            width: 2,
            height: 3,
            template: `<div class="bg-info p-0 m-0">
        <img class="m-0" id="weather-card-img" src="">
        <div class="card-body m-0 pt-0">
    
       <p class="card-text m-0" id="weather-card-text"></p>
       <a href="#" class="btn btn-primary m-0" id="weather-button">Update Weather</a>
   </div>
</div>`
        }
        var newsApp = {
            name: "news",
            text1: "",
            width: 4,
            height: 3,
            template: `<div class="container">
            <div class="row">
                <div class="col text-center">
                    <div class="card">
                        <div class="card-title text-center" id="search-title">Top News Stories</div>
                            <!-- search box popup -->
                                 <div class="row">
                                    <div class="col-6 text-center">
                                        <form id="form">
                                            <select name="search" id="article-search">
                                                <option value="world">World</option>
                                                <option value="national">National</option>
                                                <option value="politics">Politics</option>
                                                <option value="business">Business</option>
                                                <option value="technology">Technology</option>
                                                <option value="science">Science</option>
                                                <option value="health">Health</option>
                                                <option value="fashion">Fashion</option>
                                                <option value="obituaries">Obituaries</option>
                                            </select>
                                        </form>
                                    </div>
                                    <div class="col-1"></div>
                                    <div class="col-5" id="catChange">
                                        <button class="btn btn-default" id="submit-article" onclick="changeCat()">Submit</button>
                                    </div>
                            </div> 
                        </div>
                            <!-- end of search popup -->
                        <div class="results-refresh-area">
                            <div class="text-center" id="display-search-title"></div>
                            <div class="display-top-stories" id="display-results"></div>
                            
                        </div>
                    </div>
                </div>
            </div>`
        }
        var stockApp = {
            name: "stocks",
            width: 3,
            height: 4,
            template: `
<!-- widget area  -->
<div class="container">
  <div class="row">
      <div class="col">
              <div class="stock-widget-container">
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
      
  </div>
</div>`
        }
        var todoApp = {
            name: "todo",
            width:3,
            height: 4,
            template: `
            <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="to-do-header">
                    <div class="todo-heading">
                        <div class="todo-title text-center" id="title">
                            <div id="title-1" style="font-size: 26px;">Get It Done List,</div>
                            <div id="title-2" style="font-size: 12px;"> powered by firebase.</div>
                        </div>
                    </div>
                    <hr>
                    <div class="input-body" >
                                <input class="text-center" type="text" id="task-input" placeholder=" Enter Task">
                        <br>
               
                                <input class="text-center" style="margin-top: 10px;" type="text" id="note-input" placeholder=" Enter notes">
                        <br>
                        <br>
                            <div class="button-area text-center" style="margin-bottom: 10px;">
                                    <button class="btn btn-default" id="submit-todo">Submit</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="overflow: auto;">
            <div class="col-xs-1"></div>
            <div class="col-xs-10">
                <p id="list-heading">Things To Do....</p>
                <div style="overflow-y: auto;" id="list"></div>
            </div>
           
        </div>
    </div>
        `
        }
        var chatApp = {
            name: "chat",
            height: 3,
            width: 4,
            template: `
        <div class="alert alert-warning m-0">
  <h4 class="alert-heading">Chat Room!</h4></div>
          <ul class="text-white bg-primary mb-0" style="height:90%; list-style: none; text-align: left; width:100%;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;" id="message-list"></ul>
        <form id="message-form">
        <div class="input-group mb-0">
        <input type="text" class="form-control" id="message-text">
        <div class="input-group-append">
          <button class="btn btn-success" onClick="event.preventDefault()" id="chatSubmit">Send</button>
        </div>
      </div>
        </form>`
        }

        database.ref().once('value').then(function (childsnap) {
            populateWidgets(chatApp.name, chatApp.width, chatApp.height, currentx, currenty, chatApp.template);

            // weather check
            if (childsnap.child('users').child(uid).child('widgets').child('weather').child('active').val() === "on") {
                populateWidgets(weatherApp.name, weatherApp.width, weatherApp.height, currentx, currenty, weatherApp.template);
            }
            // stock check
            if (childsnap.child('users').child(uid).child('widgets').child('stocks').child('active').val() === "on") {
                populateWidgets(stockApp.name, stockApp.width, stockApp.height, currentx, currenty, stockApp.template);
            }
            // todo check
            if (childsnap.child('users').child(uid).child('widgets').child('todo').child('active').val() === "on") {
                populateWidgets(todoApp.name, todoApp.width, todoApp.height, currentx, currenty, todoApp.template);
            }
            // news check
            if (childsnap.child('users').child(uid).child('widgets').child('news').child('active').val() === "on") {
                populateWidgets(newsApp.name, newsApp.width, newsApp.height, currentx, currenty, newsApp.template);
            }
            // notes check
            if (childsnap.child('users').child(uid).child('widgets').child('notes').child('active').val() === "on") {
                populateWidgets(weatherApp.name, weatherApp.width, weatherApp.height, currentx, currenty, weatherApp.template);
            }
            gridstackConfig();
        })

    };
    

let gridstackConfig = function () {
    console.log('ran')
    var options = {
        cellHeight: 80,
        verticalMargin: 10
    };
    $('.grid-stack').gridstack(options);

}

