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
      losses:0,
      choice:""
    });
  }

 var count=0;
 var user1Selection="";
 var user2Selection="";
 var choicesNumber=0;
 

 var timer= setInterval(updateData, 1000);

 function updateData(){
    firebase.database().ref("users").once("value").then(function(snapshot) {
        count = snapshot.numChildren();
        for(let i=1;i<=count;i++){
            parseDB("player"+i);
            if (count===2){

                $(".battle").text("select rock, paper, scissor");
                $(".userNameInput").css("display","none");
                $(".icons").css("display", "block");

            }
        }
        var user1SelectionDatabase = snapshot.child("player1/choice").val();
        var user2SelectionDatabase = snapshot.child("player2/choice").val();
        if(user1SelectionDatabase!=="" && user2SelectionDatabase!==""){
            calculateresults(user1SelectionDatabase,user2SelectionDatabase);
        }

    });

}

  $("#startButton").on('click',function(event){
    event.preventDefault();
    count++;
    var name = $(".username").val();
 
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
        $(".icons").css("display", "block");

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
    
    firebase.database().ref("users/"+playerID).once("value").then(function(snapshot) {
        console.log(snapshot.child("username").val());
        var uname = snapshot.child("username").val();
        var choice = snapshot.child("choice").val();
        $("#"+playerID).text(uname);
      }); 
  }

 
  
  $(".button1").click(function() {
    if(user1Selection===""){
    var fired_button = $(this).attr("id");
    user1Selection = fired_button;
   
    firebase.database().ref("users/player1").child("choice").set(user1Selection);
    choicesNumber++;
}

});

$(".button2").click(function() {
    if(user2Selection===""){
    var fired_button = $(this).attr("id");
    user2Selection = fired_button;
   
    firebase.database().ref("users/player2").child("choice").set(user2Selection);
    
    choicesNumber++
}
});

function calculateresults(user1Selection,user1Selection){
 if(user1Selection===user2Selection){
     alert("friendship wins");
     //clearInterval(timer);
 }
}