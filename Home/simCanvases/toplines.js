var canvas = document.getElementById('topLines');
var ctx = canvas.getContext('2d');

items = []

var click = false
var mouseX = 0;
var mouseY = 0;
var mousemode = 0;
var movemode = 1;
var linelimit = canvas.width/3;
const pointnumber = 50;
var linewidth = 1;
var dotradius = 3
var lines = true;
var dots = true;

canvasResize();

class Item{
    constructor(x, y, angle){
        this.x = x;
        this.y = y;
        let speed = 0.2 + 0.4*Math.random();
        this.vx = speed*Math.cos(angle);
        this.vy = speed*Math.sin(angle);

        let seed = Math.random()*2*Math.PI;
        var red = 115*Math.sin(seed) + 140; // rgb(255,150,50)
        var blue = 133*Math.sin(seed+Math.PI) + 50; // (140,142,183)
        var green = Math.max(150*red/255, 142*blue/183);
        //this.color = "rgba("+(Math.random()*100+155)+","+(Math.random()*100+155)+","+(Math.random()*100+155)+","//0")";
        this.color = "rgba("+red+","+green+","+blue+","//0")";

    }
    calc(i){
        this.x += this.vx;
        this.y += this.vy;

        if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
            newdot();
            items.splice(i, 1);
        }
    }
    draw(){
        let a = (1.5*(1-this.y/canvas.height))**2
        for(let item of items){
            if(Math.abs(this.x-item.x)<linelimit && Math.abs(this.y-item.y)<linelimit){
                var dist = Math.hypot(this.x-item.x, this.y-item.y);
                var distnt = linelimit-dist;
                if(0<distnt){
                    var d1st = (distnt/linelimit);
                    if(lines){
                        //ctx.strokeStyle = "rgba(255,255,255,"+d1st*0.6+")";
                        ctx.lineWidth = linewidth;
                        ctx.lineJoin = "round";

                        ctx.beginPath();

                        var grad= ctx.createLinearGradient(this.x, this.y, item.x, item.y);
                        grad.addColorStop(0, this.color + (d1st*0.8  *  a)+")");
                        grad.addColorStop(1, this.color + "0)");
                        ctx.strokeStyle = grad;
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(item.x, item.y);

                        ctx.closePath();
                        ctx.stroke();
                    }
                }
            }
        }
        if(dots){
            ctx.fillStyle = this.color+a+")";
            ctx.beginPath();
            ctx.arc(this.x, this.y, dotradius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

function newdot(){
    var rando = Math.random();
    var y;
    var x;
    var angle = 2*Math.random()*Math.PI/3;
    if(Math.random()<0.5){
        x = rando*canvas.width;
        if(Math.random()<0.5){
            y = 0;
            angle += Math.PI/6;
        }else{
            y = canvas.height;
            angle += 7*Math.PI/6;
        }
    } else{
        y = rando*canvas.height;
        if(Math.random()<0.5){
            x = 0;
            angle += 5*Math.PI/3;
        }else{
            x = canvas.width;
            angle += 2*Math.PI/3;
        }
    }
    dot = new Item(x, y, angle);
    items.push(dot);
}

function fillscreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

for(var i = 0; i < pointnumber; i++){
    items.push(new Item(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2*Math.PI))
    // newdot();
}
setInterval(function(){

    // if(click){
    // 	switch(mousemode){
    // 		case 0:
    // 			break;
    // 		case 1:
    // 			break;
    // 		case 2:
    // 			break;
    // 	}
    // }

    fillscreen();
    for(var i = 0; i < items.length; i++){
        items[i].draw();
        items[i].calc(i);
    }
}, 10);

window.onresize = canvasResize;

function canvasResize() {
    canvas.width = window.innerWidth;
    canvas.height = 1*window.innerHeight;
    linelimit = canvas.width/10;
    dotradius  = linelimit/20;
}