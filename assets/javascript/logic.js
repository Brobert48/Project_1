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

let runLogic = function () {
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
        var widget = `<div class="grid-stack-item" data-gs-no-resize="true" id="${widgetName}" data-gs-x="${currentX}" data-gs-y="${currentY}" data-gs-width="${widgetW}" data-gs-height="${widgetH}"><div class="grid-stack-item-content bg-info card" style="border: 2px ;border-style: groove">${widgetContent}</div></div>`
        Target.append(widget);
        // widgetContainer = $('<div>')    // widgetContainer.attr('class','grid-stack')    // .attr('id', widgetName) //change based on widget name    // widgetlocation = $('<div>')    // widgetlocation.attr('class','grid-stack-item')    // .attr('data-gs-x', currentX) //location on grid x-axis    // .attr('data-gs-y','0') //location on grid y-axis    // .attr('data-gs-width', widgetW) //width of widget    // .attr('data-gs-height', widgetH) //height of widget    // lastwidgetLayer = $('<div>')    // .attr('class','grid-stack-item-content card float-left border border-primary')    // TargetDiv.prepend(widgetContainer);    // widgetContainer.append(widgetlocation);    // widgetlocation.append(lastwidgetLayer);    // lastwidgetLayer.append(widgetContent);
        currentx = currentX + widgetW;
        if (currentx >= 9) {
            currenty++;
            currentx = 0;
        }
    }

    // weatherOBJ
    var weatherApp = {
        name: "weather",
        width: 3,
        height: 3,
        template: `<div class=" p-0 m-0">
        <img class="m-0" id="weather-card-img" src="">
        <div class="card-body m-0 pt-0">
    
       <p class="card-text m-0 text-primary" id="weather-card-text"></p>
       <a href="#" class="btn btn-primary text-white m-0" id="weather-button">Update Weather</a>
   </div>
</div>`
    }
    
    var newsApp = {
        name: "news",
        text1: "",
        width: 4,
        height: 3,
        template: `
            <div class="row no-gutters">
                <div class="col text-center">
                <div class="alert m-0" style="background-color:chocolate">
  <h4 class="alert-heading">Top News Stories</h4>
                                      
  </div>
                         <!-- search box popup -->
                                 <div class="row">
                                    <div class="col-6 text-center">
                                       
                                    </div>
                                    <div class="col-1"></div>
                                    
                            </div> 
                        </div>
                            <!-- end of search popup -->
                        <div class="results-refresh-area">
                            <div class="text-center text-white" id="display-search-title"></div>
                            <div class="display-top-stories" id="display-results"></div>
                            <form id="form">
  <select name="search" id="article-search">
     <option></option>
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
  <button class="btn btn-success" id="submit-article" onclick="changeCat()">Submit</button>

</form>
                        </div>
                    </div>
                </div>
            </div>`
    }
    var stockApp = {
        name: "stocks",
        width: 2,
        height: 3,
        template: `

              <div class="stock-widget-container">
                  <div class="card text-center bg-info" >
                          <div class="alert m-0" style="background-color:chocolate">
  <h4 class="alert-heading">Your Favorite Stocks</h4></div>
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
                  <button id="menu" data-toggle="modal" data-target="#stock-input-area"><span class="glyphicon">Add Symbol</span></button>

                        </div>
              </div>
              
      </div>
      
  </div>
</div>`
    }
    var todoApp = {
        name: "todo",
        width: 4,
        height: 5,
        template: `
           
        <div class="row">
            <div class="col-12">
                <div class="to-do-header">
                    <div class="todo-heading">
                        <div class="todo-title text-center" id="title">
                        <div class="alert m-0" style="background-color:chocolate">
                            <h4 class="alert-heading">Get It Done List</h4>
                            <h5> powered by firebase.</h5>
                        </div>
                    </div>
                    
                    <div class="input-body" >
                                <input class="text-center" type="text" id="task-input" placeholder=" Enter Task">
                        <br>
                                <input class="text-center" style="margin-top: 10px;" type="text" id="note-input" placeholder=" Enter chat">
                        <br>
                            <div class="button-area text-center" style="margin-bottom: 10px;">
                                    <button class="btn btn-warning" id="submit-todo">Submit</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
            <div class="col">
            <div id="list-heading" class="alert alert-secondary m-0">
                <h4 class="alert-heading">Things To Do....</h4>
            </div>
                <div style="overflow: auto; text-align: left; height: 70%; width:100%;" id="list"></div>
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
        <div class="alert m-0" style="background-color:chocolate">
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
        // chat check
        if (childsnap.child('users').child(uid).child('widgets').child('chat').child('active').val() === "on") {
        populateWidgets(chatApp.name, chatApp.width, chatApp.height, currentx, currenty, chatApp.template);

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

