
var buttonColours = ["red", "blue", "green", "yellow"];

var sounds = ["./sounds/red.mp3","./sounds/blue.mp3","./sounds/green.mp3","./sounds/yellow.mp3","./sounds/wrong.mp3"];

var gamePattern = [];
var userPatter = [];

var level = 0;

function nextSequence() {
    return Math.floor(Math.random() * 4);
}

function animateFlash(colorId) {
    var curBtn = document.querySelector("." + buttonColours[colorId]);
    
    curBtn.classList.add("flash");
    setTimeout(function () {
        curBtn.classList.remove("flash");
    }, 300);

    var audio = new Audio(sounds[colorId]);
    audio.play();

}

function gameOver() {
    var audio = new Audio(sounds[4]);
    audio.play();
    document.querySelector("h1").innerHTML = "Game Over !! <br> Press 's' to Start Again";
    userPatter = [];
    gamePattern = [];
    var btns = document.querySelectorAll(".btn");

    btns.forEach(ele => {
        ele.removeEventListener("click", addMove);
    })
}

function compare() {
    for (var i = 0; i < userPatter.length; i++){
        if (gamePattern[i] != userPatter[i])
            return false;
    }
    return true;
}

function addMove() {
    var curBtn = this.classList[1];
    userPatter.push(curBtn);
    animateFlash(buttonColours.indexOf(curBtn));
    if (!compare()) {
        gameOver();
    }
    else if (gamePattern.length === userPatter.length) {
        setTimeout(nextLevel, 1000);
    }
}

function nextLevel() {
    var nextRandom = nextSequence();
    var nextColor = buttonColours[nextRandom];
    gamePattern.push(nextColor);
    
    animateFlash(nextRandom);
    userPatter = [];
    level++;
    document.querySelector("h1").innerHTML = "Game Started "+"Level: "+level;
}

function startGame(Event) {
    var key = Event.key;
    if (key !== "s")
    return;
    gamePattern = [];
    userPatter = [];
    level = 0;
    
    document.querySelector("h1").innerHTML = "Game Started "+"Level: "+level;
    
    var btns = document.querySelectorAll(".btn");
    
    btns.forEach(ele => {
        ele.addEventListener("click", addMove);
    })
    setTimeout(nextLevel, 1000);
}

document.addEventListener("keydown", startGame,Event);