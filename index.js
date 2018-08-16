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
$("#upgrade-gamepad-player-one").hide();
$("#upgrade-gamepad-player-two").hide();
$("#upgrade-gamepad-player-three").hide();
$("#upgrade-gamepad-player-four").hide();
$("#attack-gamepad-player-one").hide();
$("#attack-gamepad-player-two").hide();
$("#attack-gamepad-player-three").hide();
$("#attack-gamepad-player-four").hide();
$(".buy-douchbag-btn").hide();

// Set-up
function setUpOption() {
  var option = true;
  $("#option-sound").prop("volume", 0.25);
  $("#new-game").mouseenter(function() {
    $("#option-sound")[0].play();
  });
  $("#credits").mouseenter(function() {
    $("#option-sound")[0].play();
  });

  $("#loading-screen").click(function() {
    $("#explosion-audio").prop("volume", 0.5);
    $("#explosion-audio")[0].play();
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

  $("#upcoming-winner-of-race").click(function() {
    game.end();
    $("#upcoming-winner-of-race").empty();
    $("#upcoming-winner-of-race").hide();
    $("#gamearea").removeClass("gamearea-img");
    $("#danktrain-audio")[0].pause();
    $("#attack-gamepad-player-one").hide();
    $("#attack-gamepad-player-two").hide();
    $("#attack-gamepad-player-three").hide();
    $("#attack-gamepad-player-four").hide();
    shopDisplay();
  });

  $("#upgrade-speed-playerOne").click(function() {
    playerOne.increaseSpeed();
  });

  $("#upgrade-intelligence-playerOne").click(function() {
    playerOne.increaseIntelligence();
  });

  $("#upgrade-speed-playerTwo").click(function() {
    playerTwo.increaseSpeed();
  });

  $("#upgrade-intelligence-playerTwo").click(function() {
    playerTwo.increaseIntelligence();
  });

  $("#upgrade-speed-playerThree").click(function() {
    playerThree.increaseSpeed();
  });

  $("#upgrade-intelligence-playerThree").click(function() {
    playerThree.increaseIntelligence();
  });

  $("#upgrade-speed-playerFour").click(function() {
    playerFour.increaseSpeed();
  });

  $("#upgrade-intelligence-playerFour").click(function() {
    playerFour.increaseIntelligence();
  });
}

function characterSelection() {
  $("#hotdog-selection").mouseenter(function() {
    $("#pick-character-hover")[0].play();
  });
  $("#dude-selection").mouseenter(function() {
    $("#pick-character-hover")[0].play();
  });
  $("#thomas-selection").mouseenter(function() {
    $("#pick-character-hover")[0].play();
  });
  $("#football-selection").mouseenter(function() {
    $("#pick-character-hover")[0].play();
  });

  $("#character-selection").show();
  var characterCounter = 0;
  $("#hotdog-selection").click(function() {
    playerFour = new Runner(
      "Tormod",
      game,
      124,
      6,
      "playerFour",
      "player-four",
      "4"
    );
    game.addPlayer(playerFour);
    characterCounter += 1;
    $("#hotdog-selection").hide();
    if (characterCounter == 4) {
      $("#character-selection").hide();
      shopDisplay();
      bettingButtons();
    }
  });

  $("#dude-selection").click(function() {
    playerThree = new Runner(
      "Haakon",
      game,
      115,
      9,
      "playerThree",
      "player-three",
      "3"
    );
    game.addPlayer(playerThree);
    characterCounter += 1;
    $("#dude-selection").hide();
    if (characterCounter == 4) {
      $("#character-selection").hide();
      shopDisplay();
      bettingButtons();
    }
  });

  $("#thomas-selection").click(function() {
    playerTwo = new Runner(
      "Markus",
      game,
      133,
      1,
      "playerTwo",
      "player-two",
      "2"
    );
    game.addPlayer(playerTwo);
    characterCounter += 1;
    $("#thomas-selection").hide();
    if (characterCounter == 4) {
      $("#character-selection").hide();
      shopDisplay();
      bettingButtons();
    }
  });
  $("#football-selection").click(function() {
    playerOne = new Runner(
      "Maxence",
      game,
      127,
      4,
      "playerOne",
      "player-one",
      "1"
    );
    game.addPlayer(playerOne);
    characterCounter += 1;
    $("#football-selection").hide();
    if (characterCounter == 4) {
      $("#character-selection").hide();
      bettingButtons();
      shopDisplay();
    }
  });

  $("#buy-douche-playerOne").click(function() {
    playerOne.buyDouche();
  });

  $("#buy-douche-playerTwo").click(function() {
    playerTwo.buyDouche();
  });

  $("#buy-douche-playerThree").click(function() {
    playerThree.buyDouche();
  });

  $("#buy-douche-playerFour").click(function() {
    playerFour.buyDouche();
  });
}

function bettingButtons() {
  // Beting Buttons
  $("#bet-football-playerOne").click(function() {
    playerOne.placeBet(playerOne);
  });

  $("#bet-thomas-playerOne").click(function() {
    playerOne.placeBet(playerTwo);
  });

  $("#bet-dude-playerOne").click(function() {
    playerOne.placeBet(playerThree);
  });

  $("#bet-hotdog-playerOne").click(function() {
    playerOne.placeBet(playerFour);
  });

  $("#bet-football-playerTwo").click(function() {
    playerTwo.placeBet(playerOne);
  });

  $("#bet-thomas-playerTwo").click(function() {
    playerTwo.placeBet(playerTwo);
  });

  $("#bet-dude-playerTwo").click(function() {
    playerTwo.placeBet(playerThree);
  });

  $("#bet-hotdog-playerTwo").click(function() {
    playerTwo.placeBet(playerFour);
  });

  $("#bet-football-playerThree").click(function() {
    playerThree.placeBet(playerOne);
  });

  $("#bet-thomas-playerThree").click(function() {
    playerThree.placeBet(playerTwo);
  });

  $("#bet-dude-playerThree").click(function() {
    playerThree.placeBet(playerThree);
  });

  $("#bet-hotdog-playerThree").click(function() {
    playerThree.placeBet(playerFour);
  });

  $("#bet-football-playerFour").click(function() {
    playerFour.placeBet(playerOne);
  });

  $("#bet-thomas-playerFour").click(function() {
    playerFour.placeBet(playerTwo);
  });

  $("#bet-dude-playerFour").click(function() {
    playerFour.placeBet(playerThree);
  });

  $("#bet-hotdog-playerFour").click(function() {
    playerFour.placeBet(playerFour);
  });
}
