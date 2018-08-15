// global variables
var gamearea = $('#gamearea');
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
var audioCounter = 0;

// Initiation
$('#option').hide();
$('#shop-layout').hide();
$('#upgrade-room').hide();
$('#back-alley').hide();
setUpOption();
$('#character-selection').hide();
$('#betting-gamepad-player-one').hide();
$('#betting-gamepad-player-two').hide();
$('#betting-gamepad-player-three').hide();
$('#betting-gamepad-player-four').hide();
$("#upgrade-gamepad-player-one").hide();
$("#upgrade-gamepad-player-two").hide();
$("#upgrade-gamepad-player-three").hide();
$("#upgrade-gamepad-player-four").hide();
$("#attack-gamepad-player-one").hide();
$("#attack-gamepad-player-two").hide();
$("#attack-gamepad-player-three").hide();
$("#attack-gamepad-player-four").hide();
// $("#thomas-selection").hide();
// $("#football-selection").hide();
// $("#loading-screen").hide(Image);

// Set-up
function setUpOption() {
    var option = true;
    $('#loading-screen').click(function() {
        $('#loading-screen').css('opacity', '0');
        if (option !== false) {
            $('#option')
                .show()
                .css('opacity', '1');
        }
    });
    $('#new-game').click(function() {
        $('#option').hide();
        $('#loading-screen').hide();
        game = new Game();
        characterSelection();
        option = false;
    });

    $('#race-btn').click(function() {
        displayVisuals();
        $('#shop-layout').hide();
    });

    $('#upgrade-btn').click(function() {
        upgradeRunner();
    });

    $('#back-alley-btn').click(function() {
        backAlley();
    });

    $('#upcoming-winner-of-race').click(function() {
        game.end();
        $('#upcoming-winner-of-race').empty();
        $('#upcoming-winner-of-race').hide();
        $('#gamearea').removeClass('gamearea-img');
        $('#thomas-audio')[0].pause();
        audioCounter += 1;
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
};

function characterSelection() {
    $('#character-selection').show();
    var characterCounter = 0;
    $('#hotdog-selection').click(function() {
      playerFour = new Runner('Hotdog', game, 120, 2, 'playerFour', "player-four", "4");
      game.addPlayer(playerFour);
      characterCounter += 1;
      $('#hotdog-selection').hide();
      if (characterCounter == 4) {
          $('#character-selection').hide();
          shopDisplay();
          bettingButtons();
      }
    });

    $('#dude-selection').click(function() {
      playerThree = new Runner('Dude', game, 110, 9, 'playerThree', "player-three", "3");
      game.addPlayer(playerThree);
      characterCounter += 1;
      $('#dude-selection').hide();
      if (characterCounter == 4) {
          $('#character-selection').hide();
          shopDisplay();
          bettingButtons();
      }
    });

    $('#thomas-selection').click(function() {
        playerTwo = new Runner('Thomas', game, 135, 3, 'playerTwo', "player-two", "2");
        game.addPlayer(playerTwo);
        characterCounter += 1;
        $('#thomas-selection').hide();
        if (characterCounter == 4) {
            $('#character-selection').hide();
            shopDisplay();
            bettingButtons();
        }
    });
    $('#football-selection').click(function() {
        playerOne = new Runner('Football', game, 130, 4, 'playerOne', "player-one", "1");
        game.addPlayer(playerOne);
        characterCounter += 1;
        $('#football-selection').hide();
        if (characterCounter == 4) {
            $('#character-selection').hide();
            bettingButtons();
            shopDisplay();
        }
    });
}

function bettingButtons(){
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


// The Shop
function shopDisplay() {
    $('#shop-layout')
        .show()
        .css('opacity', '1');
    $('.talking-bubble').text(
        'Welcome to Squirt Derby, this is the common area that you will meet up in after every race. You can click on this bubble to get more information'
    );
    $('.talking-bubble').click(function() {
        $('.talking-bubble').text(
            'You can upgrade your character after every race, or you can bet your money on another player. You will return double the amount of betted money if the bet is suceeded!'
        );
        $('.talking-bubble').click(function() {
            $('.talking-bubble').text(
                'Click on Upgrades to upgrade your character, or click on the Casino if you want to bet money on a player. Click on RACE when you\'re good to go! Good luck!'
            );
            $('.talking-bubble').click(function() {
                $('.talking-bubble').hide();
            });
        });
    });
}

function upgradeRunner() {
    $('#shop-layout').hide();
    $('#upgrade-room').show();
    $("#upgrade-gamepad-player-one").show();
    $("#upgrade-gamepad-player-two").show();
    $("#upgrade-gamepad-player-three").show();
    $("#upgrade-gamepad-player-four").show();
    $('#exit-upgrade').click(function() {
        $('#upgrade-room').hide();
        $("#upgrade-gamepad-player-one").hide();
        $("#upgrade-gamepad-player-two").hide();
        $("#upgrade-gamepad-player-three").hide();
        $("#upgrade-gamepad-player-four").hide();
        $('#shop-layout').show();
    });
}

function backAlley() {
    $('#shop-layout').hide();
    $('#back-alley').show();
    $('#betting-gamepad-player-one').show();
    $('#betting-gamepad-player-two').show();
    $('#betting-gamepad-player-three').show();
    $('#betting-gamepad-player-four').show();
    $('#exit-alley').click(function() {
        $('#back-alley').hide();
        $('#betting-gamepad-player-one').hide();
        $('#betting-gamepad-player-two').hide();
        $('#betting-gamepad-player-three').hide();
        $('#betting-gamepad-player-four').hide();
        $('#shop-layout').show();
    });
    $('#talking-bubble-alley').text(
        'Welcome to the dark alley! This is the place you can illigally bet on other players to win. You\'ll recive 2x your bet if you bet correctly! But be careful, the police might be right around the corner'
    );
    $('#talking-bubble-alley').click(function() {
        $('#talking-bubble-alley').text(
            'Want to bet already?? You better make it a fat bet aswell... Like your mom'
        );
        $('#talking-bubble-alley').click(function() {
            $('#talking-bubble-alley').text(
                'Comon man, don\'t be like that... Just place your bet and be gone, like all women around you...'
            );
            $('#talking-bubble-alley').click(function() {
                $('#talking-bubble-alley').hide();
            });
        });
    });
}

// The Run Display

function displayVisuals() {
    gamearea.addClass('gamearea-img');
    $("#attack-gamepad-player-one").show();
    $("#attack-gamepad-player-two").show();
    $("#attack-gamepad-player-three").show();
    $("#attack-gamepad-player-four").show();
    playersSetUp();
};

function playersSetUp() {
  playerFour.runnerImage();
  playerThree.runnerImage();
  playerTwo.runnerImage();
  playerOne.runnerImage();
  countdownToStart();
};

function countdownToStart() {
    var countdownCounter = 2;
    if (!$('#countdown').length) {
        // TODO probably better to find the real cause
        $('#upcoming-countdown').append('<div id=\'countdown\'></div>');
    }

    $('#countdown').text('3');
    var intervalCountdown = setInterval(function() {
        if (countdownCounter <= 0) {
            $('#countdown').css('left', '420px');
            $('#countdown').text('GO!');
        } else {
            $('#countdown').text(countdownCounter);
        }
        countdownCounter -= 1;
        if (countdownCounter < -2) {
            $('#countdown').remove();
            clearInterval(intervalCountdown);
            theRun();
            playerOne.eventGenerator(playerOne.intelligence);
            playerTwo.eventGenerator(playerTwo.intelligence);
            playerThree.eventGenerator(playerThree.intelligence);
            playerFour.eventGenerator(playerFour.intelligence);
        }
    }, 100);
}

// The Run
function theRun() {
    playerOne.position = 0;
    playerTwo.position = 0;
    playerThree.position = 0;
    playerFour.position = 0;
    game.start();
    // if (audioCounter == 0) {
    //     $('#thomas-audio')[0].play();
    // } else $('#thomas-audio-speed')[0].play();
}

function theRunFinished(winner) {
    $('#upcoming-winner-of-race').show();
    $('#upcoming-winner-of-race').append(
        '<h4 class=\'winner-of-race\'>Congratulation ' + winner.name + '!!</h4>'
    );
}

