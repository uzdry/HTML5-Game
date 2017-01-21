var game = new Game();

function Game(){
    var self = this;

    this.handleOrientationEvent = function(event){
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;

        $("#gyroscope").text("alpha: " + alpha.toFixed(3) + " | beta: " + beta.toFixed(3) + " | gamma: " + gamma.toFixed(3));

    };


    this.handleLocationResponse = function(position){
        $('#location').text("lat: " + position.coords.latitude + " | lon: " + position.coords.longitude);

    };

    this.handleMotionEvent = function (event) {

        var x = event.accelerationIncludingGravity.x;
        var y = event.accelerationIncludingGravity.y;
        var z = event.accelerationIncludingGravity.z;

        $("#acceleration").text("x: " + x.toFixed(3) + " | y: " + y.toFixed(3) + " | z: " + z.toFixed(3));

    };

    this.handleAbsoluteOrientationEvent = function (event) {
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;

        $("#absolute").text("alpha: " + alpha.toFixed(3) + " | beta: " + beta.toFixed(3) + " | gamma: " + gamma.toFixed(3));
    };

    this.toggleFullScreen = function() {
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

    this.updateBatteryUI = function(battery) {
        $("#battery").text("Bat: " + (battery.level * 100) + '% | Sec: ' + battery.chargingTime + " | Sec: " + battery.dischargingTime);
    };

    this.monitorBattery = function(battery) {

        console.log("Never called");
        // Update the initial UI.
        this.updateBatteryUI(battery);

        // Monitor for futher updates.
        battery.addEventListener('levelchange',
            this.updateBatteryUI.bind(null, battery));
        battery.addEventListener('chargingchange',
            this.updateBatteryUI.bind(null, battery));
        battery.addEventListener('dischargingtimechange',
            this.updateBatteryUI.bind(null, battery));
        battery.addEventListener('chargingtimechange',
            this.updateBatteryUI.bind(null, battery));
    };


    window.addEventListener("devicemotion", self.handleMotionEvent, true);
    window.addEventListener('deviceorientation', self.handleOrientationEvent, true);
    window.addEventListener('deviceorientationabsolute', self.handleAbsoluteOrientationEvent, true);

    // check for Geolocation support
    if (navigator.geolocation) {
        console.log('Geolocation is supported!');
        window.onload = function() {
            navigator.geolocation.getCurrentPosition(self.handleLocationResponse);

            navigator.vibrate([15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15,100,15]);


            $("#goFS").on('click', function(event){
                console.log("Trying to go fullscreen");
                self.toggleFullScreen();
                window.open("new.html");
            });

            if (navigator.getBattery) {
                navigator.getBattery().then(this.monitorBattery.bind(this));
            } else if (battery) {
                this.monitorBattery(battery);
            }

        }.bind(this);
    }
    else {
        console.log('Geolocation is not supported for this Browser/OS.');
    }



};