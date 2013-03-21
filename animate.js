var canvasH = 340;
var canvasW = 600;

setTimeout(function(){
    console.log("world");

}, 3000);

console.log("hello");

// grabs canvas by ID from index.php
var canvas = document.getElementById('screen');

/* getContext makes context object that is filled with functions for drawing*/
var ctx = canvas.getContext('2d');

 //creates red object
ctx.fillStyle = "rgb(200, 0, 0)";

//sets object to coordinates 20,20 75px wide 50px hieght
ctx.fillRect(20, 20, 75, 50);  

//sets color with fourth argument for opacity
ctx.fillStyle = "rgba(0, 0, 200, 0.5)" 

ctx.fillRect(40, 40, 50, 50);

setTimeout(function(){
    ctx.clearRect(0, 0, canvasW, canvasH);
    console.log("clear");
}, 5000);


