
// The Shop
function shopDisplay() {
    $("#shop-layout")
      .show()
      .css("opacity", "1");
    $("#sims-audio")[0].load();
    $("#sims-audio")[0].play();
  
    $("#race-btn").mouseenter(function() {
      $("#pick-character-hover")[0].play();
    });
  
    $("#upgrade-btn").mouseenter(function() {
      $("#pick-character-hover")[0].play();
    });
  
    $("#back-alley-btn").mouseenter(function() {
      $("#pick-character-hover")[0].play();
    });
  
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
    $(".buy-douchbag-btn").show();
  }
  
  function upgradeRunner() {
    $("#shop-layout").hide();
    $(".buy-douchbag-btn").hide();
    $("#upgrade-room").show();
    $("#upgrade-gamepad-player-one").show();
    $("#upgrade-gamepad-player-two").show();
    $("#upgrade-gamepad-player-three").show();
    $("#upgrade-gamepad-player-four").show();
    $("#exit-upgrade").mouseenter(function() {
      $("#pick-character-hover")[0].play();
    });
    $("#exit-upgrade").click(function() {
      $("#upgrade-room").hide();
      $("#upgrade-gamepad-player-one").hide();
      $("#upgrade-gamepad-player-two").hide();
      $("#upgrade-gamepad-player-three").hide();
      $("#upgrade-gamepad-player-four").hide();
      $(".buy-douchbag-btn").show();
      $("#shop-layout").show();
    });
  }
  
  function backAlley() {
    $("#shop-layout").hide();
    $(".buy-douchbag-btn").hide();
    $("#back-alley").show();
    $("#betting-gamepad-player-one").show();
    $("#betting-gamepad-player-two").show();
    $("#betting-gamepad-player-three").show();
    $("#betting-gamepad-player-four").show();
    $("#exit-alley").mouseenter(function() {
      $("#pick-character-hover")[0].play();
    });
    $("#exit-alley").click(function() {
      $("#back-alley").hide();
      $("#betting-gamepad-player-one").hide();
      $("#betting-gamepad-player-two").hide();
      $("#betting-gamepad-player-three").hide();
      $("#betting-gamepad-player-four").hide();
      $(".buy-douchbag-btn").show();
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
  }
  
  // The Run Display
  
  function displayVisuals() {
    $(".buy-douchbag-btn").hide();
    $("#sims-audio")[0].pause();
    gamearea.addClass("gamearea-img");
    $("#attack-gamepad-player-one").show();
    $("#attack-gamepad-player-two").show();
    $("#attack-gamepad-player-three").show();
    $("#attack-gamepad-player-four").show();
    playersSetUp();
  }
  
  function playersSetUp() {
    playerFour.runnerImage();
    playerThree.runnerImage();
    playerTwo.runnerImage();
    playerOne.runnerImage();
    countdownToStart();
  }
  
  function countdownToStart() {
    $("#danktrain-audio")[0].load();
    $("#danktrain-audio")[0].play();
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
        playerThree.eventGenerator(playerThree.intelligence);
        playerFour.eventGenerator(playerFour.intelligence);
      }
    }, 1000);
  }
  
  // The Run
  function theRun() {
    playerOne.position = 0;
    playerTwo.position = 0;
    playerThree.position = 0;
    playerFour.position = 0;
    game.start();
  }
  
  function theRunFinished(winner) {
    $("#upcoming-winner-of-race").show();
    $("#upcoming-winner-of-race").append(
      "<h4 class='winner-of-race'>Congratulation " + winner.name + "!!</h4>"
    );
  }
  