/**
 * Created by soads on 21.01.2017.
 */
function Motion(){

    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.gyroAlpha = 0;
    this.gyroBeta = 0;
    this.gyroGamma = 0;
    this.absAlpha = 0;
    this.absBeta = 0;
    this.absGamma = 0;

    this.handleMotionEvent = function (event) {

        this.x = event.accelerationIncludingGravity.x;
        this.y = event.accelerationIncludingGravity.y;
        this.z = event.accelerationIncludingGravity.z;
        this.gyroAlpha = event.rotationRate.alpha;
        this.gyroBeta = event.rotationRate.beta;
        this.gyroGamma = event.rotationRate.gamma;

    };

    this.handleOrientationEvent = function(event){
        this.absAlpha = event.alpha;
        this.absBeta = event.beta;
        this.absGamma = event.gamma;
    };

    window.addEventListener("devicemotion", this.handleMotionEvent.bind(this), true);
    window.addEventListener("deviceorientation", this.handleOrientationEvent.bind(this), true);


}