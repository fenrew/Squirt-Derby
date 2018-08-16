// Runner
var Runner = function(name, game, speed, intelligence, id, playerhtml, p) {
  this.p = p;
  this.playerhtml = playerhtml;
  this.name = name;
  this.game = game;
  this.position = 0;
  this.speed = speed;
  this.intelligence = intelligence;
  this.id = id;
  this.eventArray = [];
  this.running = false;
  this.events = [];
  this.cash = 200;
  this.placedBets = [];
  this.specialPowerCounter = 1;

  this.run = function() {
    this.running = true;
    this.runInterval = setInterval(
      function() {
        this.moveFunc();
        if (this.position > 1050) {
          this.running = false;
          clearInterval(this.runInterval);
          this.game.finish(this);
        }
      }.bind(this),
      1000 / this.speed
    );
  };

  this.cleaningUp = function() {
    this.running = false;
    this.reference.remove();
  };

  this.runnerImage = function() {
    switch (this.name) {
      case "Football":
        this.reference = $(
          "<div id='" +
            this.id +
            "'><img src='./img/football.png' alt='' width='60px' class='football-img'></div>"
        );
        $("#gamearea").prepend(this.reference);
        this.imgReference = $(".football-img");
        break;
      case "Thomas":
        this.reference = $(
          "<div id='" +
            this.id +
            "'><img src='./img/ThomasTheTankEngine.png' alt='' width='60px' class='thomas-img'></div>"
        );
        $("#gamearea").prepend(this.reference);
        this.imgReference = $(".thomas-img");
        break;
      case "Dude":
        this.reference = $(
          "<div id='" +
            this.id +
            "'><img src='./img/Dude-p3.png' alt='' width='60px' class='dude-img'></div>"
        );
        $("#gamearea").prepend(this.reference);
        this.imgReference = $(".dude-img");
        break;
      case "Hotdog":
        this.reference = $(
          "<div id='" +
            this.id +
            "'><img src='./img/Hotdog-p4.jpg' alt='' width='60px' class='hotdog-img'></div>"
        );
        $("#gamearea").prepend(this.reference);
        this.imgReference = $(".hotdog-img");
        break;
    }
  };

  this.moveFunc = function() {
    this.position += 1;
    this.checkEvents();
    this.imgReference.css("left", this.position + "px");
  };

  // Events

  this.speedUp = function() {
    clearInterval(this.runInterval);
    this.speed *= 4;
    this.run();
    setTimeout(
      function() {
        clearInterval(this.runInterval);
        this.speed /= 4;
        if (this.running) this.run();
      }.bind(this),
      1000
    );
  };

  this.speedDown = function() {
    clearInterval(this.runInterval);
    this.speed /= 3;
    this.run();
    setTimeout(
      function() {
        clearInterval(this.runInterval);
        this.speed *= 3;
        if (this.running) this.run();
      }.bind(this),
      1000
    );
  };

  this.checkEvents = function() {
    var pos = this.position; // just to make sure we capture the event, otherwise the find method actually takes too long and this.position would be changed before the find method reaches a potential event
    var matchingEvent = this.events.find(function(event) {
      if (event.position === pos) return true;
    });
    if (matchingEvent) this.handleEvent(matchingEvent.type, pos);
  };

  this.handleEvent = function(type, pos) {
    switch (type) {
      case "lightning-icon":
        this.speedUp();
        $("#" + this.id + " #a" + pos).remove();
        break;
      case "poop-icon":
        this.speedDown();
        $("#" + this.id + " #b" + pos).remove();
        break;
      default:
        break;
    }
  };

  this.eventGenerator = function(intelligence) {
    for (var i = 0; i < 5; i++) {
      var eventsIcons = ["lightning-icon", "poop-icon"];
      var randomNumber =
        Math.random() * 2 + (intelligence * 1.07 - intelligence);
      var randomPosition = Math.floor(Math.random() * 900 + 50);
      if (randomNumber > 1.8) {
        var eventRandomIconClass = $(
          '<div id="a' +
            randomPosition +
            '" class=' +
            eventsIcons[0] +
            "></div>"
        );
        this.reference.append(eventRandomIconClass);
        eventRandomIconClass.css("left", randomPosition);
        this.events.push({ position: randomPosition, type: eventsIcons[0] });
      } else if (randomNumber < 0.7) {
        var eventRandomIconClass = $(
          '<div id="b' +
            randomPosition +
            '" class=' +
            eventsIcons[1] +
            "></div>"
        );
        this.reference.append(eventRandomIconClass);
        eventRandomIconClass.css("left", randomPosition);
        this.events.push({ position: randomPosition, type: eventsIcons[1] });
      }
    }
  };

  this.specialPower = function() {
    var randomPlayer = Math.floor(Math.random()*4);
    clearInterval(game.players[randomPlayer].runInterval);
    var playerPosition = game.players[randomPlayer].position;
    $("#explosion-audio")[0].play();
    game.players[randomPlayer].reference.append("<div class='explosion-icon'></div>");
    game.players[randomPlayer].reference.find(".explosion-icon").css("left", playerPosition);
    if (game.players[randomPlayer].position < 1050) {
      setTimeout(function() {
        game.players[randomPlayer].reference.find(".explosion-icon").remove();
        game.players[randomPlayer].position = playerPosition;
        game.players[randomPlayer].run();
      }.bind(this), 2000);
    }
  };

  // Gamepad

  this.increaseSpeed = function() {
    if (this.cash >= 100) {
      this.speed += 8;
      this.cash -= 100;
      $("#" + this.playerhtml + "-gamepad h3").text(
        "P" + this.p + ": $" + this.cash
      );
    } else prompt("No sufficient funds!");
  };

  this.increaseIntelligence = function() {
    if (this.cash >= 100) {
      this.intelligence += 1;
      this.speed += 3;
      this.cash -= 100;
      $("#" + this.playerhtml + "-gamepad h3").text(
        "P" + this.p + ": $" + this.cash
      );
    } else prompt("No sufficient funds!");
  };

  this.placeBet = function(playerToBetOn) {
    var inputBet = $("#" + this.id + "-bet-input").val();
    if (inputBet <= this.cash){
      this.cash -= inputBet;
      $("#" + this.playerhtml + "-gamepad h3").text(
        "P" + this.p + ": $" + this.cash
      );
      this.placedBets.push(playerToBetOn.id);
      this.placedBets.push(inputBet);
    }
  }

  this.refreshCash = function(){
    $("#" + this.playerhtml + "-gamepad h3").text(
      "P" + this.p + ": $" + this.cash
    );
  }

  this.buyDouche = function() {
    if (this.cash >= 50) {
    this.cash -= 50;
    this.refreshCash();
    this.specialPowerCounter += 1;
    }
  }
};
