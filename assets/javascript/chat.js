let timeout= function() {
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
              console.log(message);
              li.appendChild(
                document.createTextNode(`${message.sender.name}: ${message.text}`)
              );
              ul.appendChild(li);
            }
          },
          messageLimit: 20,
        });
        console.log(currentUser);

        const form = document.getElementById("message-form");
        form.addEventListener("submit", e => {
          e.preventDefault();
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
    //   var element = document.getElementById("message-list");
    // element.scrollTop = element.scrollHeight;
    setTimeout(scrollSmoothToBottom,1000)
}
function scrollSmoothToBottom () {
    var div = document.getElementById('message-list');
    $('#' + 'message-list').animate({
       scrollTop: div.scrollHeight - div.clientHeight
    }, 500);
 }
      setTimeout(timeout, 1000)