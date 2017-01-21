function Bird(){
    this.y = height/2;
    this.x = width/2;

    this.show = function(){
        fill(240);
        ellipse(this.x, this.y, 20);
        console.log("height: " + height + " | width: " + width);
    }
}