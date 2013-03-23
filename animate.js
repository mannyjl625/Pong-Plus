var canvasH = 340;
var canvasW = 600;
console.log("hello");
/*
setTimeout(function(){
    console.log("world");

}, 3000);

console.log("hello");
*/
// grabs canvas by ID from index.html
var canvas = document.getElementById('screen');

//getContext makes context object that is filled with functions for drawing
var ctx = canvas.getContext('2d');
/*
block class, includes coordinates, velocities, collision and move functions
*/
function block(x, y, width, height){
    //upper left corner coordinate
   // this.x = x;
   // this.y = y;

    this.width = width;
    this.height = height;
    this.radius = width/2;

    this.x = x;
    this.y = y;

    //lower right corner coordinate
    this.x2 = x + this.width;
    this.y2 = y + this.width;
    
    /*
    //draws the block
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle="black";
    ctx.beginPath();
    context.arc(this.x,this.x,this.radius,0,Math.PI*2,true);
    context.fill();
    */

    //velocity horizontal and vertical(postive = down)
    this.vx = -2;
    this.vy = 0;
    //cap at 14

    //getter for horizontal velocity
    this.draw = function(){
        //draws the block
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        /*
        ctx.fillStyle="black";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
        */
    };
    this.draw();     
    this.getVX = function(){
        return this.vx;
    };
    //getter for vertical velocity
    this.getVY = function(){
        return this.vy;
    };
    //reverses horizontal direciton
    this.bounceX = function(){
        this.vx = this.vx*-1.1;
        console.log(this.vx);
    };
    //reveres vertical direction
    this.bounceY = function(){
        this.vx = this.vx*1.1;
        this.vy = this.vy*-1.1;
    };

    /*
    redraws block in its current direction to mimic movement
    */
    this.moveBlock = function(){
        this.collision(); //checks for collision conditions
        this.x = this.x+(1*this.vx); //keeps block moving in current direction
        this.x2 = this.x2+(1*this.vx);
        this.y = this.y+(1*this.vy);
        this.y2 = this.y2+(1*this.vy);
        //ctx.fillStyle = "rgb(0, 0, 0)";
        //ctx.fillRect(this.x, this.y, this.width,  this.height);
        this.draw(); //draws block
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
        this.paddleBounce();
    };

    this.paddleBounce = function(){
        if(this.x <= paddle1.x2 && (this.y <= paddle1.y2 && this.y2 >= paddle1.y)){
            this.bounceX();
        }
        if(this.x2 >= paddle2.x && (this.y <= paddle2.y2 && this.y2 >= paddle2.y)){
            this.bounceX();
        }

    };
    /*
    resets ball to center screen when side walls are crossed
    velocities are reset
    */
    this.reset = function(){
        this.x = 280;
        this.y = 170;
        this.x2 =this.x+this.width;
        this.y2 = this.y+this.height;
        //resets velocities
        this.vx = -2;
        this.vy = 0; //1.7
    };
};

//initialize with starting x,y coordinates
function paddle(x, y){
   //upper left corner
   this.x = x;
   this.y = y;
   
   this.width = 15;
   this.height = 70;
   
   //lower right corner
   this.x2 = this.x+this.width;
   this.y2 = this.y+this.height;
   
   ctx.fillStyle = "rgb(0, 0, 200)";
   ctx.fillRect(this.x, this.y, this.width, this.height); 
   
   //updates paddles position according to key press
   this.update = function(){
        if(this.x > 300){  // for right paddle
            if(Key.isDown(Key.UP)) this.moveUp();
            if(Key.isDown(Key.DOWN)) this.moveDown();

        }else{   //for left paddle
            if(Key.isDown(Key.W)) this.moveUp();
            if(Key.isDown(Key.S)) this.moveDown();
        }
        this.draw();
   }
   //draws paddle
   this.draw = function(){
        ctx.fillStyle = "rgb(0, 0, 200)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
   };

   //called when up/w key is pressed, cannot go past borders
   this.moveUp = function(){
       if(this.y>0){
            this.y = this.y-3;
            this.y2 = this.y2-3;
       }
   };

   //called when down/s key is pressed, cannot go past borders
   this.moveDown = function(){
        if(this.y2<340){
            this.y = this.y+3;
            this.y2 = this.y2+3;
        }
   };
};
/*
Key helper class that keeps track of keys up and down
in _pressed array
*/

var Key = {
    //array that keeps track of key presses
    _pressed: {},

    //controls
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    
    //the status of the corresponding key(down/true or up/false)
    isDown: function(keyCode){
        return this._pressed[keyCode];
    },
    //sets array index to true when key is pressed
    onKeydown: function(event){
        this._pressed[event.keyCode] = true;
    },
    //unsets array index when key is released
    onKeyup: function(event){
        delete this._pressed[event.keyCode];
    }
};

var block1 = new block(canvasW/2, canvasH/2, 20, 20); //ping pong object
var paddle1 = new paddle(10, 140); // left paddle
var paddle2 = new paddle(575, 140); //right paddle
//event loop, runs every 0.025 seconds
setInterval(function(){
    //clears whole screen before objects are redrawn
    ctx.clearRect(0, 0, 600, 340);
    block1.moveBlock();
    paddle1.update();
    paddle2.update();
}, 25);

/*
Event listeners that check for keyboard input
*/
window.addEventListener('keyup', function(event) {Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) {Key.onKeydown(event); }, false);


/*
old choppy event listener setup, only one input at a time

window.addEventListener('keydown', function(event){
    switch (event.keyCode){
    case 38: //up key
        paddle2.moveUp();
        break;
    case 40:  //down key
        paddle2.moveDown();
        break;
    case 87:
        paddle1.moveUp();
        break;
    case 83:
        paddle1.moveDown();
        break;
    }
}, false);*/
