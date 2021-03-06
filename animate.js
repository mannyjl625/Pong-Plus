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
var keys = {};
$(document).ready(function(e){
	$(window).keydown(function(event){
		keys[event.which] = true;
		console.log(event.which);
	}).keyup(function(event){
		delete keys[event.which];
	});
});

function block(x, y, width, height){

    this.width = width;
    this.height = height;
    this.radius = width/2;
    //upper left coordinates
    this.x = x
    this.y = y
    //lower right corner coordinate
    this.x2 = x + this.width;
    this.y2 = y + this.height;
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
        
        //ctx.fillStyle = "rgb(200, 0, 0)";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle="green";
        ctx.beginPath();
        ctx.arc(this.x + 10,this.y + 10,this.radius,0,Math.PI*2,true); // added +10 to center ball 
        ctx.fill();
        
    };
    this.draw();     
    //reverses horizontal direciton
    this.bounceX = function(){
        //caps speed at 12
        if(Math.abs(this.vx*-1.1)<=12){
            this.vx = this.vx*-1.1;
        }else{
            this.vx = this.vx*-1;
        }
        //console.log(this.vx);
    };
    //reveres vertical direction
    this.bounceY = function(){
        //caps speed at 12
        if(Math.abs(this.vx*1.1)<12){
            this.vx = this.vx*1.1;
        }else{
            this.vx - this.vx*1;
        }
        //caps speed at 12
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
    //detects collision with paddle
    this.paddleBounce = function(){
        if(this.x <= paddle1.x2 && (this.y <= paddle1.y2 && this.y2 >= paddle1.y)){
            this.bounceX();
            console.log(this.vx);
        }
        if(this.x2 >= paddle2.x && (this.y <= paddle2.y2 && this.y2 >= paddle2.y)){
            this.bounceX();
            console.log(this.vx);
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
        
        //checks for win conditions, pauses and restarts game
        if(score.checkScore() ===1){
            alert("Player 1 Wins");
            score.resetScore();
            this.pause();
        }
        if(score.checkScore() ===2){
            alert("Player 2 Wins");
            score.resetScore();
            this.pause();
        }
        //cycles starting directions after reset based on score
        var totalscore = score.score1 +score.score2 + 4;
        if(totalscore%4==1){
            this.vx = this.vx*-1;
            //console.log("1");
        }else if(totalscore%4==2){
            this.vy = this.vy*-1;
            //console.log("2");
        }else if(totalscore%4==3){
            this.vx = this.vx*-1;
            this.vy = this.vy*-1;
            //console.log("3");
        }   
    };

    //pauses the game with P
    this.pause = function(){
        this.vxSpare = this.vx;
        this.vySpare = this.vy;
        this.vx = 0;
        this.vy = 0;
        this.canPause = false; //cancels ability to unpause until new press occurs
    };
    //unpauses the game  with P
    this.unpause = function(){
        this.vx = this.vxSpare;
        this.vy = this.vySpare;
        this.vxSpare = 0;
        this.vySpare = 0;
        this.canPause = false; //allows for another (un)pause until new press occurs
    }
    /*handles pausing/unpausing of the game*/
    this.checkPause = function(){
        
		if((keys[32]) && this.vx !== 0 && this.canPause){
            this.pause();
            //console.log('pause');  
        }else if((keys[32]) && this.vx == 0 && this.canPause){
            this.unpause();
            //console.log('unpause');
        }else if(!keys[32]){  //allows for another (un)pause when button is released
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
			if(keys[38]) this.moveUp();
			if(keys[40]) this.moveDown();

		}else{   //for left paddle
			if(keys[87]) this.moveUp();
			if(keys[83]) this.moveDown();
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
    this.score1 = 0;    //player 1 score
    this.score2 = 0;    //player 2 score
    this.maxScore = maxScore;  //score that wins the game
    this.scoreList = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10");

    //draws court, score, unpause prompt at start of game
    this.drawScore = function(){
       //draws middle line
       ctx.lineWidth=5;
       ctx.strokeStyle="white";
       ctx.beginPath();
       ctx.moveTo(300, 0);
       ctx.lineTo(300, 340);
       ctx.stroke();
       //prints "Press P to start game" at start of every game
       if(block1.x == 290 && block1.y == 160 && block1.vx==0){
            ctx.font = "bold 24pt Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Press", 200, 130);
            ctx.fillText("Space", 310, 130);
            ctx.fillText("start", 215, 170);
            ctx.fillText("game", 310, 170);
       }
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
    this.resetScore = function(){
        this.score1 = 0;
        this.score2 = 0;
    }
};
//***game start***
var block1 = new block(290, 160, 20, 20); //ping pong object
var paddle1 = new paddle(10, 140); // left paddle
var paddle2 = new paddle(575, 140); //right paddle
var score = new scoreboard(7); //scoreboard with middle line 
//start game from a paused state
block1.pause();
//event loop, runs every 0.025 seconds
setInterval(function(){
    //clears whole screen before objects are redrawn
    ctx.clearRect(0, 0, canvasW, canvasH);
    //event methods for each game object
    score.drawScore();
    block1.moveBlock();
    paddle1.update();
    paddle2.update();
}, 25);

