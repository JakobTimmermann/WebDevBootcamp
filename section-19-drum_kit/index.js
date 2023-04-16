function convertCharIntoSound(char) {
    switch (char) {
        case "w":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
        default:
            break;
    }
};

function buttonAnimation (char) {
    if (["w", "a", "s", "d", "j", "k", "l"].includes(char)) {
        var activeButton = document.querySelector("." + char);
        activeButton.classList.add("pressed");
        setTimeout(() => {
            activeButton.classList.remove("pressed");
        }, 100);
    }
}

var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonText = this.textContent;
        convertCharIntoSound(buttonText);
        buttonAnimation(buttonText);
    });

}

document.addEventListener("keydown", function (event) {
    convertCharIntoSound(event.key);
    buttonAnimation(event.key);
});

convertCharIntoSound()