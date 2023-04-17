var buttonColours = ["red", "blue", "green", "yellow"];
var coloursSequence = [];
var counter = 0;
var level = 1;

function addNextColour() {
    randomNumber = Math.floor(Math.random() * 4);
    coloursSequence.push(buttonColours[randomNumber]);
}

function reveilCorrectKey(colour) {
    currentKey = $("#" + colour);
    currentKey.addClass("pressed");
    var tone = new Audio("sounds/" + colour + ".mp3")
    tone.play()
    setTimeout(() => {
        currentKey.removeClass("pressed");
    }, 200);
}

function checkUserInput(colour) {
    if (colour == coloursSequence[counter]) {
        reveilCorrectKey(colour);
        if (counter == coloursSequence.length - 1) {
            setTimeout(() => {
                levelUp();
            }, 1000);
        } else {
            counter += 1;
        }
    } else {
        restartGame();
    }
}

function levelUp() {
    level += 1;
    addNextColour();
    $("h1").text("Level " + level);
    setTimeout(() => {
        reveilCorrectKey(coloursSequence.slice(-1)[0]);
    }, 100);
    counter = 0
}

function restartGame() {
    var tone = new Audio("sounds/wrong.mp3");
    tone.play();
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    resetScreen();
}

function resetScreen() {
    coloursSequence = [];
    counter = 0;
    level = 1;
    $("h1").text("Press any key to restart game");

}

$(document).keypress(function () {
    if (coloursSequence.length == 0) {
        addNextColour();
        $("h1").text("Level " + level);
        setTimeout(() => {
            reveilCorrectKey(coloursSequence[0]);
        }, 100);

    }
});

$(".btn").click(function () {
    colour = $(this).attr("id");
    if (coloursSequence.length > 0) {
        checkUserInput(colour);
    }
})