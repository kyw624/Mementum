const IMG_NUMBER = 6;

function paintImage(imgNumber) {
    const img = new Image();
    img.src = `images/${imgNumber}.png`;
    img.onload = function() {
        document.body.prepend(img);
        img.classList.add("bgImage");
    }
}

function generateRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
    return number;
}

function init() {
    const randomNumber = generateRandom();
    paintImage(randomNumber);
}

init();