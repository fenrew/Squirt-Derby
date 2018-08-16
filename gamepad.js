$(window).on("keydown", function(evt) {
  switch (evt.which) {
    //q
    case 81:
      playerOne.specialPowerCounter -= 1;
      if (playerOne.specialPowerCounter > -1) {
        playerOne.specialPower();
      }
      break;
    //r
    case 82:
      playerTwo.specialPowerCounter -= 1;
      if (playerTwo.specialPowerCounter > -1) {
        playerTwo.specialPower();
      }
      break;
    //p
    case 80:
      playerThree.specialPowerCounter -= 1;
      if (playerThree.specialPowerCounter > -1) {
        playerThree.specialPower();
      }
      break;
    //arrow right
    case 39:
      playerFour.specialPowerCounter -= 1;
      if (playerFour.specialPowerCounter > -1) {
        playerFour.specialPower();
      }
      break;
    default:
      console.log("");
  }
});
