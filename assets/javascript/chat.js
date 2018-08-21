

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    runChat();
  }

  else {
    window.location = "login.html";
  }
});

let runChat = function () {



  let timeout = function () {
    const tokenProvider = new Chatkit.TokenProvider({
      url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/11950995-bcfd-44da-8dac-b36da8dc825c/token",

    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:11950995-bcfd-44da-8dac-b36da8dc825c",
      userId: firebase.auth().currentUser.uid,
      tokenProvider: tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onNewMessage: message => {
              const ul = document.getElementById("message-list");
              const li = document.createElement("li");

              li.appendChild(
                document.createTextNode(`${message.sender.name}: ${message.text}`)
              );
              ul.appendChild(li);
              scrollSmoothToBottom();
            }
          },
          messageLimit: 10,
        });


        const form = document.getElementById("message-form");
        $("#chatSubmit").on('click', function () {
          event.preventDefault();
          const input = document.getElementById("message-text");
          currentUser.sendMessage({
            text: input.value,
            roomId: currentUser.rooms[0].id
          });
          input.value = "";
        });
      })
      .catch(error => {
        console.error("error:", error);
      });

  }
  function scrollSmoothToBottom() {
    var div = document.getElementById('message-list');
    $('#' + 'message-list').animate({
      scrollTop: div.scrollHeight - div.clientHeight
    }, 1);
  }
  setTimeout(timeout, 300)
}

// BlakedPotato