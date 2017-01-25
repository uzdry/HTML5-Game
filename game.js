var started = false;
var motion;
var floppy;
var obstacles = [];
var score = 0;
var highscore = getCookie("highscore");
var hit = false;

var isMobile = false;

function setup() {
    testMobile();

    // HIGHSCORE
    var cookie = getCookie("highscore");
    if(cookie) highscore = cookie;
    else highscore = 0;

    // Only if it is a mobile make it fullscreen
    if(isMobile) createCanvas(displayWidth, displayHeight);
    else         createCanvas(400, 600);


    motion = new Motion();
    floppy = new Bird();
}

function draw() {
    // Only start when the started Button is pressed
    if(!started) return;
    background(0);

    floppy.update();
    floppy.show();

    if(frameCount % 70 == 0){
        obstacles.push(new Obstacle());
    }

    var tempHit = false;

    for(var i = obstacles.length-1; i >= 0; i--){
        obstacles[i].update();
        obstacles[i].show();

        if(floppy.hits(obstacles[i])){

            tempHit = true;
            score = 0

        }

        if(obstacles[i].y > height){
            obstacles.splice(i, 1);
            score++;
            if(score > highscore) highscore = score;
        }
    }

    if(tempHit) {
        if (!hit) {
            navigator.vibrate(100);
            hit = true;
        }
    }else {
        hit = false;
    }


    textSize(32);
    textAlign(LEFT);
    text("Score: " + score, 10, 30);
    textAlign(RIGHT);
    text("Highscore: " + highscore, width - 10, 30);

}

/*-----------------------------
 * Key Pressed Features
 -----------------------------*/
function keyPressed(){
    if(keyCode === UP_ARROW){
        floppy.vertical = -8;
    }else if(keyCode === DOWN_ARROW){
        floppy.vertical = 8;
    }else if(keyCode === RIGHT_ARROW){
        floppy.horizontal = 8;
    }else if(keyCode === LEFT_ARROW){
        floppy.horizontal = -8;
    }
}

function keyReleased(){
    if(keyCode === UP_ARROW || keyCode === DOWN_ARROW){
        floppy.vertical = 0;
    }else if(keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW){
        floppy.horizontal = 0;
    }
}

/*---------------------------
 * Non Game Specific Stuff
 ---------------------------*/

function touchMoved() {
    return false;
}

function startApp(){
    started = true;
    document.getElementById("startButton").outerHTML = "";
    if(isMobile) toggleFullScreen();
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

function testMobile(){
    testExp = new RegExp('Android|webOS|iPhone|iPad|' +
        'BlackBerry|Windows Phone|'  +
        'Opera Mini|IEMobile|Mobile' ,
        'i');

    if (testExp.test(navigator.userAgent)) {
        isMobile = true;
    }else{
    }
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

setInterval(function(){
    document.cookie = "highscore=" + highscore + ";";
})