
var firebaseConfig = {
    apiKey: "AIzaSyC0kpxe63TnL4vvgCNno30pJ_W6wLn3FB0",
    authDomain: "rock-paper-scissors-challange.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-challange.firebaseio.com",
    projectId: "rock-paper-scissors-challenge",
    storageBucket: "",
    messagingSenderId: "81088028553",
    appId: "1:81088028553:web:48b026bd42e15df5"
  };


   var count=0;
var whoLeft ="";
   var user1Selection="";
   var user2Selection="";

  firebase.initializeApp(firebaseConfig);


  var database = firebase.database();
  $( document ).ready(function (){
    firebase.database().ref("users").once("value").then(function(snapshot) {
      if (snapshot.numChildren()>2){
        $(".game-zone").text("GAME ROOM IS CURRENTLY OCCUPIED");
      }
    });
  });
  function writeUserData(userId, name) {
    database.ref('users/' + userId).set({
      username: name,
      wins:0,
      losses:0,
      choice:"",
      played:0,
      updated:false,
      message: "",
     
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
        var user1PlayedDatabase = snapshot.child("player1/played").val();
        var user2PlayedDatabase = snapshot.child("player2/played").val();


        if(user1SelectionDatabase !==null && user2SelectionDatabase!==null){
            console.log(user1SelectionDatabase);
            console.log(user2SelectionDatabase);

            if(user1SelectionDatabase!="" && user2SelectionDatabase!=""){

            if(user1PlayedDatabase===user2PlayedDatabase){
                if(user1SelectionDatabase===user2SelectionDatabase){
                    $(".battletitle").text("friendship wins");

                }
                else if(user1SelectionDatabase!==user2SelectionDatabase){
                    if(user1SelectionDatabase==='paper' && user2SelectionDatabase==="scissors"){
                        $(".battletitle").text(user2Name+ " wins!!");
                        if(snapshot.child("player1/updated").val()===false || snapshot.child("player2/updated").val()===false){
                            user1LossesDatabase++;
                            user2WinsDatabase++
                            firebase.database().ref("users/player1").child("losses").set(user1LossesDatabase);
                            firebase.database().ref("users/player2").child("wins").set(user2WinsDatabase);
                            firebase.database().ref("users/player1").child("updated").set(true);
                            firebase.database().ref("users/player2").child("updated").set(true);
                        }
                        clearInterval(timer);
                    }


                    else if(user1SelectionDatabase==='paper' && user2SelectionDatabase==="rock"){
                        $(".battletitle").text(user1Name+ " wins!!");
                        if(snapshot.child("player1/updated").val()===false || snapshot.child("player2/updated").val()===false){
                            user2LossesDatabase++;
                            user1WinsDatabase++
                            firebase.database().ref("users/player1").child("wins").set(user1WinsDatabase);
                            firebase.database().ref("users/player2").child("losses").set(user2LossesDatabase);
                                                      firebase.database().ref("users/player1").child("updated").set(true);
                                                        firebase.database().ref("users/player2").child("updated").set(true);
                                                    }
                                                    clearInterval(timer);

                    }

                     else if(user1SelectionDatabase==='rock' && user2SelectionDatabase==="paper"){
                        $(".battletitle").text(user2Name+ " wins!!");
                        if(snapshot.child("player1/updated").val()===false || snapshot.child("player2/updated").val()===false){
                            user1LossesDatabase++;
                            user2WinsDatabase++
                            firebase.database().ref("users/player1").child("losses").set(user1LossesDatabase);
                            firebase.database().ref("users/player2").child("wins").set(user2WinsDatabase);
                                                      firebase.database().ref("users/player1").child("updated").set(true);
                                                        firebase.database().ref("users/player2").child("updated").set(true);
                                                    }
                                                    clearInterval(timer);
                     }

                     else if(user1SelectionDatabase==='scissors' && user2SelectionDatabase==="paper"){
                        $(".battletitle").text(user1Name+ " wins!!");
 if(snapshot.child("player1/updated").val()===false || snapshot.child("player2/updated").val()===false){
                            user1WinsDatabase++;
                            user2LossesDatabase++
                            firebase.database().ref("users/player1").child("wins").set(user1WinsDatabase);
                            firebase.database().ref("users/player2").child("losses").set(user2LossesDatabase);
                                                      firebase.database().ref("users/player1").child("updated").set(true);
                                                        firebase.database().ref("users/player2").child("updated").set(true);
                                                    }
                                                    clearInterval(timer);
                     }
                     else if(user1SelectionDatabase==='scissors' && user2SelectionDatabase==="rock"){
                        $(".battletitle").text(user2Name+ " wins!!");
 if(snapshot.child("player1/updated").val()===false || snapshot.child("player2/updated").val()===false){
                            user1LossesDatabase++;
                            user2WinsDatabase++
                            firebase.database().ref("users/player1").child("losses").set(user1LossesDatabase);
                            firebase.database().ref("users/player2").child("wins").set(user2WinsDatabase);
                                                      firebase.database().ref("users/player1").child("updated").set(true);
                                                        firebase.database().ref("users/player2").child("updated").set(true);
                                                    }
                                                    clearInterval(timer);

                     }
                     else if(user1SelectionDatabase==='rock' && user2SelectionDatabase==="scissors"){
                        $(".battletitle").text(user1Name+ " wins!!");
 if(snapshot.child("player1/updated").val()===false || snapshot.child("player2/updated").val()===false){
                            user1WinsDatabase++;
                            user2LossesDatabase++
                            firebase.database().ref("users/player1").child("wins").set(user1WinsDatabase);
                            firebase.database().ref("users/player2").child("losses").set(user2LossesDatabase);
                                                      firebase.database().ref("users/player1").child("updated").set(true);
                                                        firebase.database().ref("users/player2").child("updated").set(true);
                                                    }
                                                    clearInterval(timer);

                     }
                   // clearInterval(timer);
                }
           // clearInterval(timer);
            }
        }
        }


    });
 }

 $(".battleStart").on('click',function(event){
    
    resetSelection();
    setInterval(updateData, 100);

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
            $("body").attr("id","playerWindowID"+count);
            $("#startButton").prop("disabled",true);
            $(".username").prop("disabled",true);

      }

    }
  
    parseDB("player"+count);

  })
  
if (sessionStorage.getItem("is_reloaded")) {
    //alert ("reloaded");
    var playerWindowID = $("body").attr("id");
    firebase.database().ref("users"+playerWindowID).remove();
    //firebase.database().ref("users").remove();
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
                        firebase.database().ref("users/player1").once("value").then(function(snapshot) {
                            var played1Value = snapshot.child("played").val();
                                firebase.database().ref("users/player1").child("played").set(played1Value+1);
                        });
            if(user1Selection==="" ){
                var fired_button = $(this).attr("id");
                user1Selection = fired_button;
   
                firebase.database().ref("users/player1").child("choice").set(user1Selection);


                }



    }
});

    $(document).on("click",".button2",function() {

        if ($(".username").val() === $("#player2").text()) {
                        firebase.database().ref("users/player2").once("value").then(function(snapshot) {
                            var played2Value = snapshot.child("played").val();
                                firebase.database().ref("users/player2").child("played").set(played2Value+1);
                        });
            if(user2Selection==="" ){
                var fired_button = $(this).attr("id");
                user2Selection = fired_button;

                firebase.database().ref("users/player2").child("choice").set(user2Selection);

            }
         }
});

function resetSelection(){
    firebase.database().ref("users").once("value").then(function(snapshot) {
   $(".battletitle").text("Select rock, paper, scissors");
        if ($(".username").val()===snapshot.child("player1/username").val()){


            firebase.database().ref("users/player1/choice").set("");
            user1Selection="";
          firebase.database().ref("users/player1").child("updated").set(false);



        }
        if ($(".username").val()===snapshot.child("player2/username").val()){

           firebase.database().ref("users/player2/choice").set("");
           user2Selection="";
             firebase.database().ref("users/player2").child("updated").set(false);
        }

});
}

window.onbeforeunload = function () {
    var playerWindowID = $("body").attr("id");
    var lastNumber = playerWindowID.substr(playerWindowID.length -1);
    firebase.database().ref("users/player"+lastNumber).remove();
    whoLeft = playerWindowID;
};

$("#send").on("click",function(event){
event.preventDefault();

if ($(".username").val() === $("#player1").text()){
  firebase.database().ref("users/player1").once("value").then(function(snapshot) {
        var name = $(".username").val().toUpperCase();
        var message = $(".message-input").val();
        firebase.database().ref("users/player1").child("message").set(name+": " +message);

        var messagePar = $("<p>");
        messagePar.html(name+ ": " +message);
        $(".container-chat").append(messagePar);
  });

}

if ($(".username").val() === $("#player2").text()){
  firebase.database().ref("users/player2").once("value").then(function(snapshot) {
        var name = $(".username").val();
        var message = $(".message-input").val().toUpperCase();

        firebase.database().ref("users/player2").child("message").set(name + ": " +message);

        var messagePar = $("<p>");
        messagePar.html(name+ ": " +message);
        $(".container-chat").append(messagePar);
  });


}

});

if (whoLeft!==""){
  firebase.database().ref("users/player2").once("value").then(function(snapshot) {
    var message = snapshot.child(whoLeft + "/username").val()+"player has left";
    var messagePar = $("<p>").text(message);
    $(".container-chat").append(messagePar);
  });
}

lastOpponentMsg = "";

function readMessageFromDB(){
  firebase.database().ref("users").once("value").then(function(snapshot) {
    count = snapshot.numChildren();

    for(let i=1;i<=count;i++){
      
      if($(".username").val() !== snapshot.child("player"+i+"/username").val()){
        var message = snapshot.child("player"+i+"/message").val();
        var messagePar = $("<p>").text(message);
        console.log($( "div.container-chat p:last-child" ).text());
        console.log(message);
        console.log( $( "div.container-chat p:last-child" ).text()!== message );
        if(lastOpponentMsg!== message){
           $(".container-chat").append(messagePar);
           lastOpponentMsg = message;
        }

      }

    }
  });

}

setInterval(readMessageFromDB,100);