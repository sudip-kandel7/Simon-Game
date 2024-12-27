$(document).ready(function () {
  const buttonColors = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userClickedPattern = [];
  let started = false;
  let level = 0;

  // Start the game when a key is pressed
  $(document).keypress(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  // Check Color clicked by user
  $(".btn").click(function () {
    const userChosenColor = $(this).attr("class").split(" ")[1];
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });

  // Sequence
  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColor);
  }

  // Check sequence of game and sequence of user are same or not
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press A Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }

  function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
      $("." + currentColor).removeClass("pressed");
    }, 100);
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
});
