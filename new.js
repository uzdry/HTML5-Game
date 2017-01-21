var started = false;
var floppy;


function setup() {
    createCanvas(displayWidth, displayHeight);
    floppy = new Bird();
}

function draw() {
    // Only start when the started Button is pressed
    if(!started) return;

    // Set the background to light black
    background(50);
    noStroke();
    fill(255, 192);

    floppy.show();


    for (var i = 0; i < touches.length; i++) {
        ellipse(touches[i].x, touches[i].y,
            100+sin(i+frameCount*0.1)*50,
            100+sin(i+frameCount*0.1)*50);
    }



}

function touchMoved() {
    return false;
}

function startApp(){
    started = true;
    document.getElementById("startButton").outerHTML = "";
    toggleFullScreen();
}

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
};