firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var targetDiv = $('.navbar-nav');
      // Today navbar link
      var todayLi =$('<li>');
      todayLi.attr('class','nav-item');
      var todayA = $('<a>');
      todayA.attr('class', 'nav-link')
      .attr('href','index.html')
      .text('Today');
      todayLi.append(todayA);
      targetDiv.append(todayLi);
      // Week navbar link
      var weekLi =$('<li>');
      weekLi.attr('class','nav-item');
      var weekA = $('<a>');
      weekA.attr('class', 'nav-link')
      .attr('href','#')
      .text('Week Ahead');
      weekLi.append(weekA);
      targetDiv.append(weekLi);
      // Calender navbar link
      var calenderLi =$('<li>');
      calenderLi.attr('class','nav-item');
      var calenderA = $('<a>');
      calenderA.attr('class', 'nav-link')
      .attr('href','#')
      .text('Calender');
      calenderLi.append(calenderA);
      targetDiv.append(calenderLi);
      // Personalize navbar link
      var settingsLi =$('<li>');
      settingsLi.attr('class','nav-item');
      var settingsA = $('<a>');
      settingsA.attr('class', 'nav-link')
      .attr('href','#')
      .text('Personalize');
      settingsLi.append(settingsA);
      targetDiv.append(settingsLi);
      // Username navbar text
      var userNameLi = $('<li>');
      userNameLi.attr('class', 'nav-item');
      var userNameH5 = $('<h5>');
      userNameH5.attr('class','navbar-text')
      .text(firebase.auth().currentUser.displayName);
      userNameLi.append(userNameH5);
      targetDiv.append(userNameH5);
      // Logout navbar link
      var logoutLi =$('<li>');
      logoutLi.attr('class','nav-item');
      var logoutA = $('<a>')
      logoutA.attr('class','nav-link')
      .attr('onclick','firebase.auth().signOut()')
      .attr('href','login.html')
      .text('Logout');
      logoutLi.append(logoutA);
      targetDiv.append(logoutLi);

    } 
    else if(window.location.href=="https://brobert48.github.io/Project_1/login.html"){
      
    }
    else {
       window.location = "login.html";

      
    }
  });
{/* <li class="nav-item">
            <a class="nav-link" href="index.html">Today</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Your Week Ahead</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Calender</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Settings</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="login.html">Login/Signup
              <span class="sr-only">(current)</span>
            </a>
          </li> */}
  // <li class="nav-item active">
  //           <a class="nav-link" href="login.html">Login/Signup
  //             <span class="sr-only">(current)</span>
  //           </a>
  //         </li>
  // <li class="nav-item">
  //           <a class="nav-link"  onclick="firebase.auth().signOut()" href="#">logout</a>
  //         </li>