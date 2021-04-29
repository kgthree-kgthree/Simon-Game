// alert("File linked");


var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function() {
  if(!started) {
    $("#level-title").text("Level "+level);
    started = true;
    level = 0;
    console.log("Game start");
    nextSequence();
  }
});

// $().one("keypress", function() {
  // console.log("key pressed");
   // $("#level-title").text("Level "+level);
  // nextSequence();
// });

// detect the button clicked by user and storing in userClickedPattern
$(".btn").click(function(event) {
  var userChosenColor = event.currentTarget.id;
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("user chose: "+ userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
  // only when the length of the array is given as i/p it will wait for user to finish clicking the pattern
});

function nextSequence() {
  // Update level
  level++;
  $("#level-title").text("Level "+level);
  // Reset user pattern
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor); // randomly chosen color

  // Make the chosen color blink
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //play the corresponding sound of the chosen color
  playSound(randomChosenColor);
  console.log("given Color: " + randomChosenColor);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success upto level : "+(currentLevel+1));
    // console.log("game "+gamePattern.slice(0,currentLevel+1));
    // console.log("user "+ userClickedPattern.slice(0,currentLevel+1));
    if ( gamePattern.length === userClickedPattern.length ) {
      console.log("Success again");
      console.log("Game Pattern: " + gamePattern);
      //Trigger Next Sequence after 1 s delay
      setTimeout( function() {
        nextSequence();
      }, 1000);
      // else - wait for user to finish sequence
    }

  }
  else {
    console.log("wrong\n"+ "Game pattern: "+ gamePattern + "\nUser Pattern: " + userClickedPattern );
    gameOver();
  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over. Press any key to restart");
  console.log("Game Over - level " + (level) + " failed");
  started = false;
  level = 0;
  gamePattern = [];
  setTimeout( function() {
    $("body").removeClass("game-over");
  }, 200);
}

function playSound(name) {
  var soundFile = new Audio("sounds/"+name+".mp3");
  soundFile.play();
}

// to give the effect of pressed on click
function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
    // console.log("pressed");
  }, 100);
}
