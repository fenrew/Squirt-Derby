

$(window).on("keydown", function(evt) {
  switch (evt.which) {
    //q
    case 81:
    if (playerOne.specialPowerCounter > 0) {
        playerOne.specialPower();
    }
    playerOne.specialPowerCounter -= 1;
      break;
    //r
    case 82:
    if (playerTwo.specialPowerCounter > 0) {
        playerTwo.specialPower();
    }
    playerTwo.specialPowerCounter -= 1;
      break;
    //p
    case 80:
    if (playerThree.specialPowerCounter > 0) {
        playerThree.specialPower();
    }
    playerThree.specialPowerCounter -= 1;
      break;
    //arrow right
    case 39:
    if (playerFour.specialPowerCounter > 0) {
        playerFour.specialPower();
    }
    playerFour.specialPowerCounter -= 1;
      break;
    default:
      console.log("");
  }
});
