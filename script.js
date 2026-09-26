
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

    // Apply rotation
    flashlight.style.transform = `rotate(${angleDeg}deg)`;
});