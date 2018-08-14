//global variables
var gamearea = $("#gamearea");
var player1;
var player2;
var player3;
var player4;
var framerates = 0;

//Initiation
$("#option").hide();
$("#shop-layout").hide();
$("#upgrade-room").hide();
$("#back-alley").hide();
setUpOption();
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

    $("#back-alley-btn").click(function() {
      backAlley();
    })

};

function upgradeRunner(){
  $("#shop-layout").hide();
  $("#upgrade-room").show();
  $("#exit-upgrade").click(function(){
    $("#upgrade-room").hide();
    $("#shop-layout").show();
  })
};

function backAlley() {
  $("#shop-layout").hide();
  $("#back-alley").show();
  $("#exit-alley").click(function(){
    $("#back-alley").hide();
    $("#shop-layout").show();
  })
  $("#talking-bubble-alley").text("Welcome to the dark alley! This is the place you can illigally bet on other players to win. You'll recive 2x your bet if you bet correctly! But be careful, the police might be right around the corner")
  $("#talking-bubble-alley").click(function(){
    $("#talking-bubble-alley").text("Want to bet already?? You better make it a fat bet aswell... Like your mom")
    $("#talking-bubble-alley").click(function(){
      $("#talking-bubble-alley").text("Comon man, don't be like that... Just place your bet and be gone, like all women around you...");
      $("#talking-bubble-alley").click(function(){
        $("#talking-bubble-alley").hide();
    })})});
  
};


//The Run Display

function displayVisuals(param){
  if (param === true){
    gamearea.addClass("gamearea-img");
    playersSetUp();
  } else if (param === false){
  }
}

function playersSetUp() {
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
        theRun();
        return false;
      }
    }, 1000);
} 


//The Run
function theRun() {
  var game = new Game();
  var playerOne = new Runner("Football", game, 130, 4, playerOne);
  game.addPlayer(playerOne);
  playerOne.runnerImage();
  game.start();
  playerOne.eventGenerator(playerOne.intelligence);
}

function theRunFinished(name){
  $("#upcoming-winner-of-race").append("<h4 class='winner-of-race'>Congratulation " + name + "!!<h4>");
  $("#upcoming-winner-of-race").click(function() {
    $("#upcoming-winner-of-race").hide();
    gamearea.removeClass("gamearea-img");
    //$("#upcoming-winner-of-race").empty();
    shopDisplay();
  });
};

