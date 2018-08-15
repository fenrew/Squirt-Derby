// global variables
var gamearea = $("#gamearea");
var player1;
var player2;
var player3;
var player4;
var framerates = 0;
var game;
var playerOne;
var playerTwo;
var playerThree;
var playerFour;

// Initiation
$("#option").hide();
$("#shop-layout").hide();
$("#upgrade-room").hide();
$("#back-alley").hide();
setUpOption();
$("#character-selection").hide();
$("#betting-gamepad-player-one").hide();
$("#betting-gamepad-player-two").hide();
$("#betting-gamepad-player-three").hide();
$("#betting-gamepad-player-four").hide();
// $("#thomas-selection").hide();
// $("#football-selection").hide();
// $("#loading-screen").hide(Image);

// Set-up
function setUpOption() {
  var option = true;
  $("#loading-screen").click(function() {
    $("#loading-screen").css("opacity", "0");
    if (option !== false) {
      $("#option")
        .show()
        .css("opacity", "1");
    }
  });
  $("#new-game").click(function() {
    $("#option").hide();
    $("#loading-screen").hide();
    game = new Game();
    characterSelection();
    option = false;
  });
}

function characterSelection() {
  $("#character-selection").show()
  var characterCounter = 0;
  $("#thomas-selection").click(function() {
    playerTwo = new Runner('Thomas', game, 150, 3, 'playerTwo');
    characterCounter += 1;
    $("#thomas-selection").hide();
    if (characterCounter == 2) {
      $("#character-selection").hide()
      shopDisplay();
    }
  });
  $("#football-selection").click(function(){
    playerOne = new Runner('Football', game, 130, 4, 'playerOne');
    characterCounter += 1;
    $("#football-selection").hide();
    if (characterCounter == 2) {
      $("#character-selection").hide();
      shopDisplay();
    }
  });
}


// The Shop
function shopDisplay() {
  $("#shop-layout")
    .show()
    .css("opacity", "1");
  $(".talking-bubble").text(
    "Welcome to Squirt Derby, this is the common area that you will meet up in after every race. You can click on this bubble to get more information"
  );
  $(".talking-bubble").click(function() {
    $(".talking-bubble").text(
      "You can upgrade your character after every race, or you can bet your money on another player. You will return double the amount of betted money if the bet is suceeded!"
    );
    $(".talking-bubble").click(function() {
      $(".talking-bubble").text(
        "Click on Upgrades to upgrade your character, or click on the Casino if you want to bet money on a player. Click on RACE when you're good to go! Good luck!"
      );
      $(".talking-bubble").click(function() {
        $(".talking-bubble").hide();
      });
    });
  });

  $("#race-btn").click(function() {
    displayVisuals();
    $("#shop-layout").hide();
  });

  $("#upgrade-btn").click(function() {
    upgradeRunner();
  });

  $("#back-alley-btn").click(function() {
    backAlley();
  });
}

function upgradeRunner() {
  $("#shop-layout").hide();
  $("#upgrade-room").show();
  $("#exit-upgrade").click(function() {
    $("#upgrade-room").hide();
    $("#shop-layout").show();
  });
}

function backAlley() {
  $("#shop-layout").hide();
  $("#back-alley").show();
  $("#betting-gamepad-player-one").show();
  $("#betting-gamepad-player-two").show();
  $("#betting-gamepad-player-three").show();
  $("#betting-gamepad-player-four").show();
  $("#exit-alley").click(function() {
    $("#back-alley").hide();
    $("#betting-gamepad-player-one").hide();
    $("#betting-gamepad-player-two").hide();
    $("#betting-gamepad-player-three").hide();
    $("#betting-gamepad-player-four").hide();
    $("#shop-layout").show();
  });
  $("#talking-bubble-alley").text(
    "Welcome to the dark alley! This is the place you can illigally bet on other players to win. You'll recive 2x your bet if you bet correctly! But be careful, the police might be right around the corner"
  );
  $("#talking-bubble-alley").click(function() {
    $("#talking-bubble-alley").text(
      "Want to bet already?? You better make it a fat bet aswell... Like your mom"
    );
    $("#talking-bubble-alley").click(function() {
      $("#talking-bubble-alley").text(
        "Comon man, don't be like that... Just place your bet and be gone, like all women around you..."
      );
      $("#talking-bubble-alley").click(function() {
        $("#talking-bubble-alley").hide();
      });
    });
  });
};


// The Run Display

function displayVisuals() {
    gamearea.addClass("gamearea-img");
    playersSetUp();
    console.log("displayVisuals");
};

function playersSetUp() {
  playerTwo.runnerImage();
  playerOne.runnerImage();
  countdownToStart();
  console.log("PlayerSetUp")
}

function countdownToStart() {
  var countdownCounter = 2;
  if (!$("#countdown").length) {
    // TODO probably better to find the real cause
    $("#upcoming-countdown").append("<div id='countdown'></div>");
  }

  $("#countdown").text("3");
  var intervalCountdown = setInterval(function() {
    if (countdownCounter <= 0) {
      $("#countdown").css("left", "420px");
      $("#countdown").text("GO!");
    } else {
      $("#countdown").text(countdownCounter);
    }
    countdownCounter -= 1;
    if (countdownCounter < -2) {
      $("#countdown").remove();
      clearInterval(intervalCountdown);
      theRun();
      playerOne.eventGenerator(playerOne.intelligence);
      playerTwo.eventGenerator(playerTwo.intelligence);
    }
  }, 100);
}

var audioCounter = 0;
// The Run
function theRun() {
  game.addPlayer(playerOne);
  game.addPlayer(playerTwo);
  playerOne.position = 0;
  playerTwo.position = 0;
  game.start();
  if (audioCounter == 0) {
  $("#thomas-audio")[0].plause();
  } else 
  $("#thomas-audio-speed")[0].plause();
}

function theRunFinished(id, name) {
  $("#upcoming-winner-of-race").append(
    "<h4 class='winner-of-race'>Congratulation " + name + "!!</h4>"
  );
  $("#upcoming-winner-of-race").click(function() {
    id.cash += 200;
    console.log(id);
    console.log(id.cash);
    console.log(playerOne.cash);
    $("#upcoming-winner-of-race").empty();
    $("#upcoming-winner-of-race").hide();
    gamearea.removeClass("gamearea-img");
    playerOne.cleaningUp();
    playerTwo.cleaningUp();
    $("#thomas-audio")[0].pause();
    audioCounter += 1;
    shopDisplay();
  });
};
