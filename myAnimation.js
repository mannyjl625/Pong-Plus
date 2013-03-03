var canvas = = document.getElementById('screen');
var ctx = canvas.getContexts('2d');

var i = 0;
setInterval(function(){
	ctx.clearRect(0, 0, 240, 160); // vim delete line, undo, node
	ctxfillRect(20+i, 20+i, 50, 50);
	i++
}, 1000);
