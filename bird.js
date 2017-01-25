function Bird(){
    this.y = height/2;
    this.x = width/2;
    this.r = 20;

    this.velX = 0;
    this.velY = 0;

    this.vertical = 0;
    this.horizontal = 0;

    this.show = function(){
        fill(240);
        ellipse(this.x, this.y, this.r);
    };

    this.update = function(){
        this.velX += motion.absGamma/6;
        this.velY += motion.absBeta/6;
        this.velX += this.horizontal;
        this.velY += this.vertical;

        this.x += this.velX;
        this.y += this.velY;

        this.velX = 0;
        this.velY = 0;

        if(this.x > width) this.x = width;
        if(this.x < 0) this.x = 0;
        if(this.y > height) this.y = height;
        if(this.y < 0) this.y = 0;

    };

    this.checkHit = function(r_x, r_y, r_w, r_h){
        var distX = Math.abs(this.x - r_x-r_w/2);
        var distY = Math.abs(this.y - r_y-r_h/2);

        if (distX > (r_w/2 + this.r)) { return false; }
        if (distY > (r_h/2 + this.r)) { return false; }

        if (distX <= (r_w/2)) { return true; }
        if (distY <= (r_h/2)) { return true; }

        var dx=distX-r_w/2;
        var dy=distY-r_h/2;
        return (dx*dx+dy*dy<=(this.r*this.r));
    };


    this.hits = function(obst){
        var left = this.checkHit(0, obst.y, obst.start, obst.h);

        if(left){
            return true;
        }

        var right = this.checkHit(obst.start + obst.space, obst.y, (width-obst.start-obst.space), obst.h);

        if(right){
            return true;
        }

        return false;
    };

}