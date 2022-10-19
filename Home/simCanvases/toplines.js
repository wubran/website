var lineCanvas = document.getElementById('topLines');
var lineCtx = lineCanvas.getContext('2d');

items = []

var click = false
var mouseX = 0;
var mouseY = 0;
var mousemode = 0;
var movemode = 1;
var linelimit = lineCanvas.width/3;
const pointnumber = 50;
var linewidth = 1;
var dotradius = 3
var lines = true;
var dots = true;

lineCanvasResize();

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

        if(this.x > lineCanvas.width + linelimit || this.x < 0 - linelimit || this.y > lineCanvas.height + linelimit || this.y < 0 - linelimit){
            newdot();
            items.splice(i, 1);
        }
    }
    draw(){
        let a = (1.5*(1-this.y/lineCanvas.height))**2
        for(let item of items){
            if(Math.abs(this.x-item.x)<linelimit && Math.abs(this.y-item.y)<linelimit){
                var dist = Math.hypot(this.x-item.x, this.y-item.y);
                var distnt = linelimit-dist;
                if(0<distnt){
                    var d1st = (distnt/linelimit);
                    if(lines){
                        //lineCtx.strokeStyle = "rgba(255,255,255,"+d1st*0.6+")";
                        lineCtx.lineWidth = linewidth;
                        lineCtx.lineJoin = "round";

                        lineCtx.beginPath();

                        var grad= lineCtx.createLinearGradient(this.x, this.y, item.x, item.y);
                        grad.addColorStop(0, this.color + (d1st*0.8  *  a)+")");
                        grad.addColorStop(1, this.color + "0)");
                        lineCtx.strokeStyle = grad;
                        lineCtx.beginPath();
                        lineCtx.moveTo(this.x, this.y);
                        lineCtx.lineTo(item.x, item.y);

                        lineCtx.closePath();
                        lineCtx.stroke();
                    }
                }
            }
        }
        if(dots){
            lineCtx.fillStyle = "rgb(24,26,41)";
            lineCtx.beginPath();
            lineCtx.arc(this.x, this.y, dotradius, 0, 2 * Math.PI);
            lineCtx.fill();

            lineCtx.fillStyle = this.color+a+")";
            lineCtx.beginPath();
            lineCtx.arc(this.x, this.y, dotradius, 0, 2 * Math.PI);
            lineCtx.fill();
        }
    }
}

function newdot(){
    var rando = Math.random();
    var y;
    var x;
    var angle = 2*Math.random()*Math.PI/3;
    if(Math.random()<0.5){
        x = rando*lineCanvas.width;
        if(Math.random()<0.5){
            y = 0;
            angle += Math.PI/6;
        }else{
            y = lineCanvas.height;
            angle += 7*Math.PI/6;
        }
    } else{
        y = rando*lineCanvas.height;
        if(Math.random()<0.5){
            x = 0;
            angle += 5*Math.PI/3;
        }else{
            x = lineCanvas.width;
            angle += 2*Math.PI/3;
        }
    }
    dot = new Item(x, y, angle);
    items.push(dot);
}

function fillscreen(){
    lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
}

for(var i = 0; i < pointnumber; i++){
    items.push(new Item(Math.random()*lineCanvas.width, Math.random()*lineCanvas.height, Math.random()*2*Math.PI))
    // newdot();
}
setInterval(function(){
    fillscreen();
    for(var i = 0; i < items.length; i++){
        items[i].draw();
        items[i].calc(i);
    }
}, 10);

window.onresize = lineCanvasResize;

function lineCanvasResize() {
    lineCanvas.width = window.innerWidth;
    lineCanvas.height = 1*window.innerHeight;
    linelimit = lineCanvas.width/10;
    dotradius  = linelimit/20;
}