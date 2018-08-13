//global variables
var gamearea = $("#gamearea");
var player1;
var player2;
var player3;
var player4;

//Initiation
$("#option").hide();
$("#shop-layout").hide();
$("#upgrade-room").hide();
$("#back-alley").hide();
// $("#loading-screen").hide(Image);




//Set-up

function setUpOption () {
  var option = true;
    $("#loading-screen").click(function() {
      $("#loading-screen").css("opacity", "0");
      if (option !== false) {
        $("#option").show().css("opacity", "1");
      }
    });
      $("#new-game").click(function() {
        $("#option").hide();
        $("#loading-screen").hide();
        //displayVisuals(true);
        shopDisplay();
        option = false;
      });
}

setUpOption();


//The Shop
function shopDisplay() {
  $("#shop-layout").show().css("opacity", "1");
  $(".talking-bubble").text("Welcome to Squirt Derby, this is the common area that you will meet up in after every race. You can click on this bubble to get more information")
  $(".talking-bubble").click(function(){
    $(".talking-bubble").text("You can upgrade your character after every race, or you can bet your money on another player. You will return double the amount of betted money if the bet is suceeded!")
    $(".talking-bubble").click(function(){
      $(".talking-bubble").text("Click on Upgrades to upgrade your character, or click on the Casino if you want to bet money on a player. Click on RACE when you're good to go! Good luck!");
      $(".talking-bubble").click(function(){
        $(".talking-bubble").hide();
    })})});

    $("#race-btn").click(function() {
      displayVisuals(true);
      $("#shop-layout").hide();
    });

    $("#upgrade-btn").click(function() {
      upgradeRunner();
    });

    $("back-alley-btn").click(function() {
      backAlley();
    })

}

function upgradeRunner(){
  $("#shop-layout").hide();
  $("#upgrade-room").show();

}

function backAlley() {
  $("#shop-layout").hide();
  $("#back-alley").show();
}


//The Run Display

function displayVisuals(param){
  if (param === true){
    gamearea.addClass("gamearea-img");
    playersSetUp();
  } else if (param === false){
  }
}

function playersSetUp() {
  player1 = new Runner("Football", 1000, 4, "playerOne");
  player1.runnerImage();
  //Add for more players!
  countdownToStart();
}

function countdownToStart() {
  var countdownCounter = 2;
  $("#upcoming-countdown").append("<div id='countdown'></div>");
  $("#countdown").text("3");
    var intervalCountdown = setInterval(function() {
      if (countdownCounter <= 0) {
        $("#countdown").css("left", "570px");
        $("#countdown").text("GO!")
      } else {
        $("#countdown").text(countdownCounter);
      }
      countdownCounter -= 1;
      if (countdownCounter === -3) {
        $("#countdown").remove();
        clearInterval(intervalCountdown);
        theRun(true);
      }
    }, 1000);
} 


//The Run

function theRun() {
  (player1)
  var state = true;
  if (state === true) {
    runnerMovement(player1);
    var eventInterval = setInterval(function() {
      runEventPowerUps(player1, player1.intelligence);
    }, 600)
  } else if (state === false) {
    clearInterval(eventInterval);
    return;
  }
}

function runnerMovement(player) {
  var movementInterval = setInterval(function() {
   var array = player.runningArray;
    movement(array);
    var lengthMovement = array.length * 30 + "px";
    player.imgReference.css("left", lengthMovement);
    if (array.length === 5) {
      clearInterval(movementInterval);
      theRunFinished(player.name);
      return;
    }
  }, player.speed);
};

function movement(moveArray) {
    return moveArray.unshift(0)
}

function theRunFinished(name){
  $("#upcoming-winner-of-race").append("<h4>Congratulation " + name + "!!<h4>");
  clearInterval(eventInterval);
}

// the Run Events

function runEventPowerUps(player, intelligence) {
  for (var i = 0; i < intelligence; i++) {
    var events = ["lightning-icon", "poop-icon"]
    var randomNumber = Math.random()*events.length*1.5/(intelligence*0.002);
    var randomIcon = Math.floor(Math.random()*events.length);
    var array = [];
    if (events.length >= randomNumber) {
      var eventRandomIconClass = $("<div class=" + events[randomIcon] + "></div>");
      runEventPosition(array);
      var arrayLength = array.length * 30 + "px";
      player.reference.append(eventRandomIconClass);
      eventRandomIconClass.css("left", arrayLength);
    };
  }
}

function runEventPosition(array) {
  var randomPosition = Math.floor(Math.random()*24) + 4;
  for (var i = 0; i<randomPosition; i++) {
    movement(array);
  } return array;
}