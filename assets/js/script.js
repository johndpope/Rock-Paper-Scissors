var firebaseConfig = {
    apiKey: "AIzaSyC0kpxe63TnL4vvgCNno30pJ_W6wLn3FB0",
    authDomain: "rock-paper-scissors-challange.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-challange.firebaseio.com",
    projectId: "rock-paper-scissors-challange",
    storageBucket: "",
    messagingSenderId: "81088028553",
    appId: "1:81088028553:web:48b026bd42e15df5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  function writeUserData(userId, name) {
    database.ref('users/' + userId).set({
      username: name,
      wins:0,
      losses:0
    });
  }
 var count=0;

  
  $("#startButton").on('click',function(event){
    event.preventDefault();
    count++;
    var name = $(".username").val();
    var title = $("<h5>").text(name);
    $(".player"+count).html(title);
    firebase.database().ref("users").once("value").then(function(snapshot) {
        count = snapshot.numChildren();
      });
 
      if(count<=2 && name !==''){
    writeUserData("player"+count,name);

      }
      else{
          console.log("only 2 users can join at atime")
      }
 
  })