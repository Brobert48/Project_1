# Project_1

Git Hub:    https://github.com/Brobert48/Project_1.git

Firebase:   (Weather Widget Firebase,
            Stock Ticker Firebase,
            Login Credentials Firebase...)
            All data stored on single firebase:
            https://project-1-firebase-1b2fb.firebaseio.com
            project-1-firebase-1b2fb

Coding Requirements:
    • Must use at least two APIs
        - ✓
        1. weather - https://openweathermap.org/api
        2. stock ticker - https://www.alphavantage.co/documentation/
    • Must use AJAX to pull data
        - ✓
    • Must utilize at least one new library or technology that we haven’t discussed
        - ✓
        1. gridstack
    • Must have a polished frontend / UI
        -  ⃠ 
        - looks great already, but not yet polished
        - Bootswatch recommended by Kevin
    • Must meet good quality coding standards (indentation, scoping, naming)
        - ✓
    • Must NOT use alerts, confirms, or prompts (look into modals!)
        - ✓
    • Must have some sort of repeating element (table, columns, etc)
        - ✓
        - widget area with dynamically generated widgets
        - to-do list planned
    • Must use Bootstrap or Alternative CSS Framework
        - ✓
        - Bootstrap
    • Must be Deployed (Github Pages)
        - ✓
        - https://brobert48.github.io/Project_1/
    • Must have User Input Validation
        - ✓
        - Firebase

Widget list
    • Weather ✓
    • Horoscope (cancelled)
    • Traffic (cancelled)
    • To-do list (in progress)
    • Stock ticker ✓
    • Chat (in-progress)
    • Top News ✓


Stock ticker widget

files
- stock_ticker-updated.js
this app uses the api, https://www.alphavantage.co/documentation/

the stocks will be displayed on the widget screen
the user can click the refresh button to get the current price

if the user wishes to add a new stock
- click the menu button in the top left corner
- enter the stock symbol and click submit
- the stock entered last will show at the top of the users list.


To do list
- user inputs the task and notes.
- the information input appears in the datbase and list with a checkbox
- if the checkbox is clicked the information is removed from the database
list is saved to firebase



Top News
- top_news_firebase.js
- uses the NYT devloper API
- searches the predefiend topice and returns the latest stories
- last 3 stores are displayed.
- click the story line to open the modal to view additional information


weather
- uses api.openweathermap.org API
- user will enter their city location on setup
- the users information is stored and the current weather considtions displayed

chat
- users can use the chat function to send messages to other app users

display information
- the users name will appear in the jumbotron along with a welcome depending on the time of day


widget area
- each app can be repositioned in the screen by clicking and dragging the app to the desired location
- apps will not be overlapped but pushed out of the way of the current app while it is in focus.

Firebase auth
- Firebase is used to allow each user to create a user id and have a personalized widget.

