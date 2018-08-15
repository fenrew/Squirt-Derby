var Game = function() {
  this.players = [];
  this.finishedPlayers = [];

  this.addPlayer = function(player) {
    this.players.push(player);
  };

  this.start = function() {
    this.players.forEach(function(player) {
      player.run();
    });
  };

  this.finish = function(id, name) {
    this.finishedPlayers.push(name);
    if (this.finishedPlayers.length == 2) {
      theRunFinished(id, this.finishedPlayers[0]);
    }
  };
};

// Runner
var Runner = function(name, game, speed, intelligence, id) {
  this.name = name;
  this.game = game;
  this.position = 0;
  this.speed = speed;
  this.intelligence = intelligence;
  this.id = id;
  this.eventArray = [];
  this.running = false;
  this.events = [];
  var that = this;
  this.cash = 200;

  this.run = function() {
    this.running = true;
    this.runInterval = setInterval(function() {
      that.moveFunc();
      if (that.position > 1050) {
        that.running = false;
        clearInterval(that.runInterval);
        that.game.finish(that.id, that.name);
      }
    }, 1000 / this.speed);
  };

  this.cleaningUp = function() {
    this.reference.remove();
  }

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
    }
  };

  this.moveFunc = function() {
    this.position += 1;
    this.checkEvents();
    this.imgReference.css("left", this.position + "px");
  };

  this.speedUp = function() {
    clearInterval(this.runInterval);
    this.speed *= 2;
    this.run();
    setTimeout(function() {
      clearInterval(that.runInterval);
      that.speed *= 0.5;
      if (that.running) that.run();
    }, 1000);
  };

  this.speedDown = function() {
    clearInterval(this.runInterval);
    this.speed *= 0.5;
    this.run();
    setTimeout(function() {
      clearInterval(that.runInterval);
      that.speed *= 2;
      if (that.running) that.run();
    }, 1000);
  };

  this.checkEvents = function() {
    var pos = this.position; // just to make sure we capture the event, otherwise the find method actually takes too long and this.position would be changed before the find method reaches a potential event
    var matchingEvent = this.events.find(function(event) {
      if (event.position === pos) return true;
    });
    if (matchingEvent) this.handleEvent(matchingEvent.type);
  };

  this.handleEvent = function(type) {
    switch (type) {
      case "lightning-icon":
        this.speedUp();
        break;
      case "poop-icon":
        this.speedDown();
        break;
      default:
        break;
    }
  };

  this.eventGenerator = function(intelligence) {
    for (var i = 0; i < 2; i++) {
      var eventsIcons = ["lightning-icon", "poop-icon"];
      var randomNumber =
        Math.random() * 2 + (intelligence * 1.1 - intelligence);
      var randomPosition = Math.floor(Math.random() * 900 + 50);
      if (randomNumber > 1.5) {
        var eventRandomIconClass = $(
          "<div class=" + eventsIcons[0] + "></div>"
        );
        that.reference.append(eventRandomIconClass);
        eventRandomIconClass.css("left", randomPosition);
        that.events.push({ position: randomPosition, type: eventsIcons[0] });
      } else if (randomNumber < 0.5) {
        var eventRandomIconClass = $(
          "<div class=" + eventsIcons[1] + "></div>"
        );
        that.reference.append(eventRandomIconClass);
        eventRandomIconClass.css("left", randomPosition);
        that.events.push({ position: randomPosition, type: eventsIcons[1] });
      }
    }
  };
};
