var canvasH = 340;
var canvasW = 600;

setTimeout(function(){
    console.log("world");

}, 3000);

console.log("hello");

// grabs canvas by ID from index.php
var canvas = document.getElementById('screen');

//getContext makes context object that is filled with functions for drawing
var ctx = canvas.getContext('2d');
/*block class
*/
function block(x, y, width, height){
    //upper left corner
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;
    //lower right corner
    this.x2 = this.x + this.width;
    this.y2 = this.y + this.height;
    this.position = [this.x, this.y, this.x2, this.y2]; 
    //draws the block
    ctx.fillStytle = "rgb(0, 0, 0)";
    ctx.save();
    ctx.restore();
    ctx.fillRect(x, y, width, height);
    //velocity horizontal and vertical(postive = down)
    this.vx = 1;
    this.vy = -1;

    this.getVX = function(){
        return this.vx;
    };
    this.getVY = function(){
        return this.vy;
    };

    this.bounceX = function(){
        this.vx = this.vx*-1;
    };

    this.bounceY = function(){
        this.vy = this.vy*-1;
    };

    this.getCoor = function(){
        return this.position;
    };

    this.draw = function(){
       
    };

    this.moveBlock = function(){
        //console.log("moving");
        ctx.clearRect(this.x, this.y, this.width, this.height);
        this.x = this.x+(1*this.vx);
        this.y = this.y+(1*this.vy);
        ctx.fillRect(this.x, this.y, this.width,  this.height);
    };

    this.collision = function(){
        
    }

};

var block1 = new block(canvasW/2, canvasH/2, 75, 75);
var block2 = new block(canvasW/2-80, canvasH/2-80, 75, 75);
setInterval(function(){
    block1.moveBlock();
    block2.moveBlock();
}, 25);

