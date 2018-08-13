

var Runner = function(name, speed, intelligence, id) {
  this.name = name;
  this.speed = speed;
  this.intelligence = intelligence;
  this.id = id;
  this.runningArray = [0];
}


  // FILL INN FOR ALL RUNNERS
  Runner.prototype.runnerImage = function() {
    switch (this.name) {
      case "Football":
      this.reference = $("<div id='" + this.id + "'><img src='./img/football.png' alt='' width='60px' class='football-img'></div>");
      $("#gamearea").prepend(this.reference);
      this.imgReference = $(".football-img");
      break;
    }
  };


