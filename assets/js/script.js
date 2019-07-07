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


 setInterval(updateData, 1000);
 function updateData(){
    firebase.database().ref("users").once("value").then(function(snapshot) {
     count = snapshot.numChildren();
        for(let i=1;i<=count;i++){
        parseDB("player"+i);
     }
     if (count===2){

        $(".battle").text("select rock, paper, scissor");
        $(".userNameInput").css("display","none");

      }
  });
}

  $("#startButton").on('click',function(event){
    event.preventDefault();
    count++;
    var name = $(".username").val();
    var title = $("<h5>").text(name);
 
    firebase.database().ref("users").once("value").then(function(snapshot) {
        count = snapshot.numChildren();
      });
 
     if(count<=2){
          if( name !==''){
          writeUserData("player"+count,name);

      }
      if (count===2){

        $(".battle").text("select rock, paper, scissor");
        $(".userNameInput").css("display","none");
      }
    }
  
    parseDB("player"+count);

  })
if (sessionStorage.getItem("is_reloaded")) {
    alert ("reloaded");
    firebase.database().ref("users").remove();
}

sessionStorage.setItem("is_reloaded", true);

function parseDB(playerID){
    console.log("users/"+playerID);
    var userName = firebase.database().ref("users/"+playerID).once("value").then(function(snapshot) {
        console.log(snapshot.child("username").val());
        var uname = snapshot.child("username").val();
        $("."+playerID).text(uname);
      }); 
  }

