var currentRoom = 0;
var currObstacle;
const obstacles = ["zombie", "blocked", "chance"];
var side;
const sides = ["right", "left"];
var aquiredBall= false; 

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
ball.addEventListener("click", function () {
    ball.src = "assets/inprocess.png";
    gsap.to("#ball", {
        y: "+=20",
        duration: 0.08,
        repeat: 9,
        yoyo: true,
        onComplete: () => {
            if (currObstacle == "chance") {
                if (side == "right") ball.src = "assets/goleft.png";
                if(side == "left") ball.src = "assets/goright.png";
            }
            else{
                ball.src = "assets/noluck.png";
            }
        }
    });
})

//creates room, random obstacle and correct side
function generateRoom() {
    currObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
    side = sides[Math.floor(Math.random(sides.length))];
    document.body.style.setProperty("--circle-size", "300px");
}

function moveRoom(choseSide) {
    if(side == choseSide) reset();
    else{
        generateRoom();
        currentRoom++;
    }
}

function reset(){
    currentRoom = 0;
}