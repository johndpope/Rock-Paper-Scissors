
var firebaseConfig = {
    apiKey: "AIzaSyC0kpxe63TnL4vvgCNno30pJ_W6wLn3FB0",
    authDomain: "rock-paper-scissors-challange.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-challange.firebaseio.com",
    projectId: "rock-paper-scissors-challange",
    storageBucket: "",
    messagingSenderId: "81088028553",
    appId: "1:81088028553:web:48b026bd42e15df5"
  };


   var count=0;
   var usersPlayed=0;
   var user1Selection="";
   var user2Selection="";

  firebase.initializeApp(firebaseConfig);


  var database = firebase.database();

  function writeUserData(userId, name) {
    database.ref('users/' + userId).set({
      username: name,
      wins:0,
      losses:0,
      choice:"",
      played:false
    });
  }


   
 parseDB("player"+count);

 var timer= setInterval(updateData, 100);

 
 function updateData(){


    firebase.database().ref("users").once("value").then(function(snapshot) {
        count = snapshot.numChildren();

        for(let i=1;i<=count;i++){
            parseDB("player"+i);


        }
        
        var user1Name=snapshot.child("player1/username").val();
        var user2Name=snapshot.child("player2/username").val();
        var user1SelectionDatabase = snapshot.child("player1/choice").val();
        var user2SelectionDatabase = snapshot.child("player2/choice").val();
        var user1WinsDatabase = snapshot.child("player1/wins").val();
        var user2WinsDatabase = snapshot.child("player2/wins").val();
        var user1LossesDatabase = snapshot.child("player1/losses").val();
        var user2LossesDatabase = snapshot.child("player2/losses").val();
        if(user1SelectionDatabase !==null && user2SelectionDatabase!==null){
            console.log(user1SelectionDatabase);
            console.log(user2SelectionDatabase);

            if(user1SelectionDatabase!="" && user2SelectionDatabase!=""){
                if(user1SelectionDatabase===user2SelectionDatabase){
                    $(".battletitle").text("friendship wins");

                }
                else if(user1SelectionDatabase!==user2SelectionDatabase){
                    if(user1SelectionDatabase==='paper' && user2SelectionDatabase==="scissors"){
                        $(".battletitle").text(user2Name+ " wins!!");
                        if(snapshot.child("player1/played").val()===false || snapshot.child("player2/played").val()===false){
                            user1LossesDatabase++;
                            user2WinsDatabase++
                            firebase.database().ref("users/player1").child("losses").set(user1LossesDatabase);
                            firebase.database().ref("users/player2").child("wins").set(user2WinsDatabase);
                            firebase.database().ref("users/player1").child("played").set(true);
                            firebase.database().ref("users/player2").child("played").set(true);
                        }
                    }


                    else if(user1SelectionDatabase==='paper' && user2SelectionDatabase==="rock"){
                        $(".battletitle").text(user1Name+ " wins!!");
                        if(snapshot.child("player1/played").val()===false || snapshot.child("player2/played").val()===false){
                            user2LossesDatabase++;
                            user1WinsDatabase++
                            firebase.database().ref("users/player1").child("wins").set(user1WinsDatabase);
                            firebase.database().ref("users/player2").child("losses").set(user2LossesDatabase);
                            firebase.database().ref("users/player1").child("played").set(true);
                            firebase.database().ref("users/player2").child("played").set(true);
                        }
                    }

                     else if(user1SelectionDatabase==='rock' && user2SelectionDatabase==="paper"){
                        $(".battletitle").text(user2Name+ " wins!!");
                            if(snapshot.child("player1/played").val()===false || snapshot.child("player2/played").val()===false){
                            user1LossesDatabase++;
                            user2WinsDatabase++
                            firebase.database().ref("users/player1").child("losses").set(user1LossesDatabase);
                            firebase.database().ref("users/player2").child("wins").set(user2WinsDatabase);
                            firebase.database().ref("users/player1").child("played").set(true);
                            firebase.database().ref("users/player2").child("played").set(true);
                        }
                     }

                     else if(user1SelectionDatabase==='scissors' && user2SelectionDatabase==="paper"){
                        $(".battletitle").text(user1Name+ " wins!!");
                        if(snapshot.child("player1/played").val()===false || snapshot.child("player2/played").val()===false){
                            user1WinsDatabase++;
                            user2LossesDatabase++
                            firebase.database().ref("users/player1").child("wins").set(user1WinsDatabase);
                            firebase.database().ref("users/player2").child("losses").set(user2LossesDatabase);
                            firebase.database().ref("users/player1").child("played").set(true);
                            firebase.database().ref("users/player2").child("played").set(true);
                        }
                     }
                     else if(user1SelectionDatabase==='scissors' && user2SelectionDatabase==="rock"){
                        $(".battletitle").text(user2Name+ " wins!!");
                        if(snapshot.child("player1/played").val()===false || snapshot.child("player2/played").val()===false){
                            user1LossesDatabase++;
                            user2WinsDatabase++
                            firebase.database().ref("users/player1").child("losses").set(user1LossesDatabase);
                            firebase.database().ref("users/player2").child("wins").set(user2WinsDatabase);
                            firebase.database().ref("users/player1").child("played").set(true);
                            firebase.database().ref("users/player2").child("played").set(true);
                        }
                     }
                     else if(user1SelectionDatabase==='rock' && user2SelectionDatabase==="scissors"){
                        $(".battletitle").text(user1Name+ " wins!!");
                        if(snapshot.child("player1/played").val()===false || snapshot.child("player2/played").val()===false){
                            user1WinsDatabase++;
                            user2LossesDatabase++
                            firebase.database().ref("users/player1").child("wins").set(user1WinsDatabase);
                            firebase.database().ref("users/player2").child("losses").set(user2LossesDatabase);
                            firebase.database().ref("users/player1").child("played").set(true);
                            firebase.database().ref("users/player2").child("played").set(true);
                        }
                     }
                   // clearInterval(timer);
                }
           // clearInterval(timer);
            }
        }

     
    });
 }

 $(".battleStart").on('click',function(event){
    
    resetSelection();
    setInterval(updateData, 2000);

  });


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
            $("#startButton").prop("disabled",true);
      }

    }
  
    parseDB("player"+count);

  })
  
if (sessionStorage.getItem("is_reloaded")) {
    //alert ("reloaded");
    firebase.database().ref("users").remove();
}

sessionStorage.setItem("is_reloaded", true);

function parseDB(playerID){
    
    firebase.database().ref("users/"+playerID).once("value").then(function(snapshot) {
      
        var uname = snapshot.child("username").val();
        var choice = snapshot.child("choice").val();
        var wins = snapshot.child("wins").val();
        var losses = snapshot.child("losses").val();
        $("#"+playerID).text(uname);
        $(".wins"+playerID).text(wins);
        $(".losses"+playerID).text(losses);
        
      }); 
  }

 
  
  $(document).on("click",".button1", function() {


        if ($(".username").val() === $("#player1").text()){
            if(user1Selection==="" ){
                var fired_button = $(this).attr("id");
                user1Selection = fired_button;
   
                firebase.database().ref("users/player1").child("choice").set(user1Selection);
                usersPlayed++;
        }
    }
});

    $(document).on("click",".button2",function() {

        if ($(".username").val() === $("#player2").text()) {
            if(user2Selection==="" ){
                var fired_button = $(this).attr("id");
                user2Selection = fired_button;

                firebase.database().ref("users/player2").child("choice").set(user2Selection);
                usersPlayed++;
            }
         }
});

function resetSelection(){
    firebase.database().ref("users").once("value").then(function(snapshot) {
   $(".battletitle").text("select rock, paper, scissor");
        if ($(".username").val()===snapshot.child("player1/username").val()){

            firebase.database().ref("users/player1/played").set(false);
            firebase.database().ref("users/player1/choice").set("");
            user1Selection="";


        }
        if ($(".username").val()===snapshot.child("player2/username").val()){
           firebase.database().ref("users/player2/played").set(false);
           firebase.database().ref("users/player2/choice").set("");
           user2Selection="";
        }
        usersPlayed=0;
});
}

window.onbeforeunload = function () {
    firebase.database().ref("users").remove();
};