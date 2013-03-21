var canvasH = 340;
var canvasW = 600;

setTimeout(function(){
    console.log("world");

}, 3000);

console.log("hello");

// grabs canvas by ID from index.html
var canvas = document.getElementById('screen');

//getContext makes context object that is filled with functions for drawing
var ctx = canvas.getContext('2d');
/*
block class, includes coordinates, velocities, collision and move functions
*/
function block(x, y, width, height){
    //upper left corner coordinate
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;
    //lower right corner coordinate
    this.x2 = this.x + this.width;
    this.y2 = this.y + this.height;
    this.position = [this.x, this.y, this.x2, this.y2]; 
    //draws the block
    ctx.fillStytle = "rgb(0, 0, 0)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    //velocity horizontal and vertical(postive = down)
    this.vx = 0;
    this.vy = 0;

    //getter for horizontal velocity
    this.getVX = function(){
        return this.vx;
    };
    //getter for vertical velocity
    this.getVY = function(){
        return this.vy;
    };
    //reverses horizontal direciton
    this.bounceX = function(){
        this.vx = this.vx*-1;
    };
    //reveres vertical direction
    this.bounceY = function(){
        this.vy = this.vy*-1;
    };
    
    //returns array of corner coordinates [x1, y1, x2, y2]
    this.getCoor = function(){
        return this.position;
    };

    /*
    redraws block in its current direction to mimic movement
    */
    this.moveBlock = function(){
        //ctx.clearRect(this.x, this.y, this.width, this.height);
        //ctx.clearRect(0, 0, 600, 340);
        this.collision(); 
        this.x = this.x+(1*this.vx); //keeps block moving in current direction
        this.x2 = this.x2+(1*this.vx);
        this.y = this.y+(1*this.vy);
        this.y2 = this.y2+(1*this.vy);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(this.x, this.y, this.width,  this.height); //draws block
    };
    /*
    checks if corners are inbounds
    calls bounce method for corresponding directionif out of bounds
    */
    this.collision = function(){
        //check top/bottom
        if(this.y<=0 || this.y2>=340){
           this.bounceY();
        }
        //checks left/right
        if(this.x<=0 || this.x2>=600){
            this.reset();
        }
    };

    this.reset = function(){
        this.x = 300;
        this.y = 170;
        this.x2 =this.x+this.width;
        this.y2 = this.y+this.height;
    
    };

};

function paddle(x, y){
   this.x = x;
   this.y = y;
   
   this.width = 15;
   this.height = 70;

   this.x2 = this.x+this.width;
   this.y2 = this.y+this.height;
   
   ctx.fillStyle = "rgb(0, 0, 200)";
   ctx.fillRect(this.x, this.y, this.width, this.height); 
   this.draw = function(){
        ctx.fillStyle = "rgb(0, 0, 200)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
   };
   this.moveUp = function(){
       if(this.y>0){
            this.y = this.y-3;
            this.y2 = this.y2-3;
            this.draw();
       }
   };
   this.moveDown = function(){
        if(this.y2<340){
            this.y = this.y+3;
            this.y2 = this.y2+3;
            this.draw();
        }
   };
};
//block objects
var block1 = new block(canvasW/2, canvasH/2, 20, 20);
var paddle1 = new paddle(10, 140);
var paddle2 = new paddle(575, 140);
//var block2 = new block(canvasW/2-80, canvasH/2-80, 75, 75);
//event loop, runs every 0.025 seconds

setInterval(function(){
    //clears whole screen before blocks are redrawn
    ctx.clearRect(0, 0, 600, 340);
    block1.moveBlock();
    paddle1.draw();
    paddle2.draw();
    //block2.moveBlock();
}, 25);

window.addEventListener('keydown', function(event){
    switch (event.keyCode){
    case 38: //up key
        paddle2.moveUp();
        break;
    case 40:  //down key
        paddle2.moveDown();
        break;
    }
}, false);
