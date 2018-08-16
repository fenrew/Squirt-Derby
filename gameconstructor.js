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

  this.finish = function(player) {
    this.finishedPlayers.push(player);
    if (this.finishedPlayers.length === this.players.length) {
      theRunFinished(this.finishedPlayers[0]);
    }
  };

  this.cleanUp = function(winner) {
    this.finishedPlayers = [];
    this.players.forEach(function(player) {
      player.cash += 100;
      for (var i = 0; i < player.placedBets.length; i++){
        if (player.placedBets[i] == winner.id){
          player.cash += player.placedBets[i+1]*2.5;
        }
      }
      player.refreshCash();
      player.cleaningUp();
      player.events = [];
    });
  };

  this.end = function() {
    var winner = this.finishedPlayers[0];
    winner.cash += 200;
    winner.score += 1;
    winner.refreshCash();
    this.cleanUp(winner);
  };
};