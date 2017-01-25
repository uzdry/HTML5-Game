function Obstacle(){
    this.space = 80;
    this.start = random(width-this.space);
    this.y = 0;
    this.h = 20;
    this.speed = 2;


    this.show = function(){
        fill(255);
        rect(0, this.y, this.start, this.h);
        rect(this.start + this.space, this.y, (width-this.start-this.space), this.h);
    };

    this.update = function(){
        this.y += this.speed;
    }

}