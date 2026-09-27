var currentRoom = 0;
var currObstacle;
const obstacles = ["zombie", "blocked", "chance"];
var side;
const sides = ["right", "left"];
const voiceLines = ["car.mp3", "makeItHome.mp3", "mustOut", "pathTake"];
var aquiredBall = false;

//makes light follow mouse
document.body.addEventListener("mousemove", function (e) {
    document.documentElement.style.setProperty(
        "--x",
        e.clientX + "px"
    );

    document.documentElement.style.setProperty(
        "--y",
        e.clientY + "px"
    );
});


const flashlight = document.querySelector('.flashlight');

//flashlight movement
document.addEventListener('mousemove', (e) => {
    // Get image center coordinates
    const rect = flashlight.getBoundingClientRect();
    const imageCenterX = rect.left + rect.width / 2;
    const imageCenterY = rect.top + rect.height / 2;

    // Calculate difference between mouse and image center
    const deltaX = e.clientX - imageCenterX;
    const deltaY = e.clientY - imageCenterY;

    // Calculate angle in radians (atan2 returns -PI to PI)
    const angleRad = Math.atan2(deltaY, deltaX);

    // Convert to degrees. 
    // Note: Adjust the offset (e.g., -90) if your image points in a different default direction (like up or down).
    const angleDeg = angleRad * (180 / Math.PI) + 90;

    var cappedAngle = Math.max(-45, Math.min(60, angleDeg));
    if (angleDeg > 250) cappedAngle = -45;
    // Apply rotation
    flashlight.style.transform = `rotate(${cappedAngle}deg)`;
});

//hover over zombie 
const zombie = document.getElementById("zombie");
const snarl = new Audio('assets/snarl.mp3');

zombie.addEventListener('mouseover', () => {
    snarl.play();
})

//magic 8 ball 
const ball = document.getElementById("ball");
const ballText = document.getElementById("ballText");
const shaking = new Audio("assets/shaking.mp3");
shaking.volume = .4;
ball.addEventListener("click", function () {
    ball.src = "assets/inprocess.png";
    ballText.innerHTML = "";
    shaking.play();
    gsap.to("#ball", {
        y: "+=20",
        duration: 0.08,
        repeat: 9,
        yoyo: true,
        onComplete: () => {
            shaking.pause();
            shaking.currentTime = 0;
            if (currObstacle == "chance") {
                if (side == "right") {
                    ball.src = "assets/goleft.png";
                    ballText.innerHTML = "GO LEFT";
                }
                if (side == "left") {
                    ball.src = "assets/goright.png";
                    ballText.innerHTML = "GO RIGHT";
                }
            }
            else {
                ball.src = "assets/noluck.png";
                ballText.innerHTML = "GOODLUCK :)";
            }
        }
    });
})

const lArrow = document.getElementById("leftarrow");
const rArrow = document.getElementById("rightarrow");

lArrow.addEventListener('click', function () {
    moveRoom("left");
});

rArrow.addEventListener('click', function () {
    moveRoom("right");
});

const blockade = document.getElementById("blockade");

//creates room, random obstacle and correct side
function generateRoom() {
    blockade.style.display = "none";
    zombie.style.display = "none";
    currObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
    side = sides[Math.floor(Math.random() * sides.length)];
    document.body.style.setProperty("--circle-size", "300px");
    flashlight.style.display = "block";
    lArrow.style.display = "block";
    rArrow.style.display = "block";
    ball.style.display = "block";
    if (currObstacle == "zombie") {
        zombie.style.display = "block";
        if (side == "left") {
            zombie.style.left = "5%";
            zombie.style.top = "45%"
        }
        else {
            zombie.style.left = "67%";
            zombie.style.top = "40%"
        }
    }
    else if (currObstacle == "blocked") {
        blockade.style.display = "block";
        if (side == "left") {
            blockade.style.left = "14%";
            blockade.style.top = "50%"
        }
        else {
            blockade.style.left = "75%";
            blockade.style.top = "50%"
        }
    }
}

const running = new Audio("assets/runningSound.mp3");
const breathing = new Audio("assets/breathing.mp3");
const blocked = new Audio("assets/blocked.mp3");
const continued = new Audio("assets/blockedC.mp3");
function moveRoom(choseSide) {
    document.body.style.setProperty("--circle-size", "0px");
    console.log("Side: " + side+
        "Obstacle: " + currObstacle
    );
    if (side == choseSide && currObstacle == "blocked") {
        blocked.play();
        blocked.onended = () => {
            continued.play();
        }
    }
    else if (side == choseSide && currObstacle == "zombie") {
        moving();
        reset();
    }
    else {
        moving();
        running.play();
        running.onended = () => {
            breathing.play();
            generateRoom();
            currentRoom++;
            breathing.onended =() =>{
                const dialog = new Audio("assets/voicelines/"+voiceLines[Math.floor(Math.random() * voiceLines.length)]);
                dialog.play();
            }
        }
    }
}

function reset() {
    currentRoom = 0;
}

function moving(){
    flashlight.style.display = "none";
    lArrow.style.display = "none";
    rArrow.style.display = "none";
    ball.style.display = "none";
    ball.src = "assets/inprocess.png";
    ballText.innerHTML = "";
}

generateRoom();