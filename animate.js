var canvasH = 340;
var canvasW = 600;
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

    this.width = width;
    this.height = height;
    this.radius = width/2;
    //upper left coordinates
    this.x = x;
    this.y = y;

    //lower right corner coordinate
    this.x2 = x + this.width;
    this.y2 = y + this.width;
    //velocity horizontal and vertical(postive = down)
    //cap at 12
    this.vx = -2;
    this.vy = -1.7;
    this.vxSpare = 0;
    this.vySpare = 0;
    //helps pause button work
    this.canPause =false;

    this.draw = function(){
        //draws the block
        ctx.fillStyle = "rgb(0, 200, 0)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        /*
        ctx.fillStyle="black";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
        */
    };
    this.draw();     
    //reverses horizontal direciton
    this.bounceX = function(){
        if(Math.abs(this.vx*-1.1)<=12){
            this.vx = this.vx*-1.1;
        }else{
            this.vx = this.vx*-1;
        }
        //console.log(this.vx);
    };
    //reveres vertical direction
    this.bounceY = function(){
        if(Math.abs(this.vx*1.1)<12){
            this.vx = this.vx*1.1;
        }else{
            this.vx - this.vx*1;
        }

        if(Math.abs(this.vy*-1.1)<12){
            this.vy = this.vy*-1.13;
        }else{
            this.vy = this.vy*-1.13;
        }
    };

    /*
    redraws block in its current direction to mimic movement
    */
    this.moveBlock = function(){
        this.checkPause();
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
        if(this.x<=0){
            score.score2++;
            this.reset();
        }
        if(this.x2>=600){
            score.score1++;
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

    }
    /*
    resets ball to center screen when side walls are crossed
    velocities are reset
    */
    this.reset = function(){
        this.x = 290;
        this.y = 160;
        this.x2 =this.x+this.width;
        this.y2 = this.y+this.height;
        //resets velocities
        this.vx = -2;
        this.vy = -1.7; //-1.7
        if(score.checkScore() ===1){
            alert("Player 1 Wins");
            score.reset();
            this.pause();
        }
        if(score.checkScore() ===2){
            alert("Player 2 Wins");
            score.reset();
            this.pause();
        }
    };
    this.pause = function(){
        this.vxSpare = this.vx;
        this.vySpare = this.vy;
        this.vx = 0;
        this.vy = 0;
        this.canPause = false; //cancels ability to unpause until new press occurs
    };
    this.unpause = function(){
        this.vx = this.vxSpare;
        this.vy = this.vySpare;
        this.vxSpare = 0;
        this.vySpare = 0;
        this.canPause = false; //allows for another (un)pause until new press occurs
    }
    /*handles pausing/unpausing of the game*/
    this.checkPause = function(){
        if(Key.isPressed(Key.P) && this.vx !== 0 && this.canPause){
            this.pause();
            //console.log('pause');  
        }else if(Key.isPressed(Key.P) && this.vx == 0 && this.canPause){
            this.unpause();
            //console.log('unpause');
        }else if(!Key.isPressed(Key.P)){  //allows for another (un)pause when button is released
            this.canPause = true;
        }
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
   
   //updates paddles position according to key press
   this.update = function(){
        if(this.x > 300){  // for right paddle
            if(Key.isDown(Key.UP)){
                this.moveUp();
                //console.log("pressing player 2 up");
            }if(Key.isDown(Key.DOWN)){
                this.moveDown();
                //console.log("pressing player 2 down");
            }
        }else{   //for left paddle
            if(Key.isDown(Key.W)) this.moveUp();
            if(Key.isDown(Key.S)) this.moveDown();
        }
        this.draw();
   }
   //draws paddle
   this.draw = function(){
        ctx.fillStyle = "rgb(0, 150, 0)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
   };
   this.draw();

   //called when up/w key is pressed, cannot go past borders
   this.moveUp = function(){
       if(this.y>0){
            this.y = this.y-4;
            this.y2 = this.y2-4;
       }
   };

   //called when down/s key is pressed, cannot go past borders
   this.moveDown = function(){
        if(this.y2<340){
            this.y = this.y+4;
            this.y2 = this.y2+4;
        }
   };
};
/*
scoreboard object with court design
takes in max score
*/
function scoreboard(maxScore){
    this.score1 = 0;
    this.score2 = 0;
    this.maxScore = maxScore;
    this.scoreList = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10");
    this.drawScore = function(){
       
       //draws middle line
       ctx.lineWidth=5;
       ctx.strokeStyle="white";
       ctx.beginPath();
       ctx.moveTo(300, 0);
       ctx.lineTo(300, 340);
       ctx.stroke();

       //draws score numbers with * for gamepoint
       ctx.font = "bold 24pt Arial";
       ctx.fillStyle = "white";
       if(this.score1 ===this.maxScore-1){
           ctx.fillText(this.scoreList[this.score1]+"*", 260, 40);
       }else{
           ctx.fillText(this.scoreList[this.score1], 260, 40);
       }
       if(this.score2 === this.maxScore-1){
           ctx.fillText(this.scoreList[this.score2]+"*", 320, 40);
       }else{
           ctx.fillText(this.scoreList[this.score2], 320, 40);   
       }
    }
    //checks if either player has won, retures corresponding number
    this.checkScore = function(){
        if(this.score1===this.maxScore){
            return 1;
        }
        if(this.score2 ===this.maxScore){
            return 2;
        }
    }
    //resets scores when player wins
    this.reset = function(){
        this.score1 = 0;
        this.score2 = 0;
    }
};
/*
Key helper class that keeps track of keys up and down
in _pressed array
*/
var Key = {
    //array that keeps track of key presses
    _pressed: {},

    //controls
    W: 87,      //player1 up
    S: 83,      //player1 down
    UP: 38,     //player2 up
    DOWN: 40,   //player2 down
    P: 80,      //pause/unpause ball
    
    //returns if key is down/true or up/false)
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
    },
    //sets array index when button is presses, unsets if unpressed
    onKeypress: function(event){
        if(!this._pressed[event.which]){
            delete this._pressed[event.which];  //use event.which for firefox keyPress
        }else{                                  //event.keyCode for IE onKeyPress
            this._pressed[event.which] = true;
        }
    },
    //returs if key is pressed down
    isPressed: function(keyCode){
        return this._pressed[keyCode];
    }
};

//***game start***
var block1 = new block(290, 160, 20, 20); //ping pong object
var paddle1 = new paddle(10, 140); // left paddle
var paddle2 = new paddle(575, 140); //right paddle
var score = new scoreboard(7); //scoreboard with middle line 
//event loop, runs every 0.025 seconds
setInterval(function(){
    //clears whole screen before objects are redrawn
    ctx.clearRect(0, 0, 600, 340);
    //event methods for each game object
    score.drawScore();
    block1.moveBlock();
    paddle1.update();
    paddle2.update();
}, 25);
//Event listeners that check for keyboard input
window.addEventListener('keypress', function(event) {Key.onKeypress(event); }, false); 
window.addEventListener('keyup', function(event) {Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) {Key.onKeydown(event); }, false);
