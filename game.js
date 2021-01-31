var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function(){
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
       
        nextSequence();
       
        started = true;
      }
   
})

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}

$(".btn").click(function() {
   
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
   
    playSound(userChosenColor);
    animatePress(this.id);

   checkAnswer(userClickedPattern.length - 1);

    
 });

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
          userClickedPattern = [];
        }, 1000);

      }

    } else {
        
        playSound("wrong");
        $("#level-title").html("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
     setTimeout(function() {
          $("body").removeClass("game-over");
     }, 200);
     
     startOver();
    }

}


 
 
 function nextSequence(){

    level++;

    $("#level-title").text("level : "+level);
    
    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
 
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  
 
   
 }
 
 
 function playSound(name){
     var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
 }
 
 function animatePress(currentColor){
 
     var delayInMilliseconds = 500; //1 second
     
     $("#"+currentColor).addClass("pressed");
     
     setTimeout(function() {
          $("#"+currentColor).removeClass("pressed");
     }, delayInMilliseconds);
    
 }



