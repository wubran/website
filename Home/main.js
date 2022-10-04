// topBar = document.getElementById('topBar');
const displayZone = document.querySelector(".displayZone");

window.onbeforeunload = function () {
    window.scrollTo(0,0);
};

document.addEventListener("wheel", scroll);
function scroll(event){
    // console.log(Math.round(document.documentElement.scrollTop));
    // let thresholds = [100,200,300];
    // for(each of thresholds){
    // }
}

var topBrian = document.getElementById('topBrian');
var topBrianLabel = document.getElementById('topBrianLabel');
var topBrianLabel = document.getElementById('topBrianLabel');
var splashBrian1 = document.getElementById('splashBrian1');
var splashBrian2 = document.getElementById('splashBrian2');
ease = 0;
function easeElements(timestamp){
    ease += (document.documentElement.scrollTop-ease)/4
    topBrian.style.height = Math.max(2.4,(5-ease/105)) + "vw";
    topBrian.style.paddingTop = Math.max(0.8,(1.5-ease/285)) + "vw";
    topBrianLabel.style.fontSize = Math.max(1.6,(2.6-ease/200)) + "vw";

    splashBrian1.style.top = (70-ease/10) + "vh";
    splashBrian2.style.top = (70-ease/20) + "vh";
}
var canvList = [];

function addDisplayRows(){
    // console.log(window.innerHeight+document.documentElement.scrollTop-document.body.scrollHeight);
    if(window.innerHeight+document.documentElement.scrollTop-document.body.scrollHeight > -window.innerWidth/2){ // if close to bottom, add a row
        const row = document.createElement("div");
        row.className = "displayRow"

        const box1 = document.createElement("div");
        box1.className = "displayBox"
        const box2 = document.createElement("div");
        box2.className = "displayBox"

        const canv1 = document.createElement("canvas");
        canv1.className = "displayCanvas"
        canv1.id = "boids";
        const canv2 = document.createElement("canvas");
        canv2.className = "displayCanvas"
        canv2.id = "planets";

        const cap1 = document.createElement("div");
        cap1.className = "displayCaption"
        const cap2 = document.createElement("div");
        cap2.className = "displayCaption"

        const captext1 = document.createElement("p");
        captext1.className = "displayCaptionText"
        const captext2 = document.createElement("p");
        captext2.className = "displayCaptionText"

        captext1.appendChild(document.createTextNode("test"));
        captext2.appendChild(document.createTextNode("test2"));

        cap1.appendChild(captext1);
        cap2.appendChild(captext2);
        box1.appendChild(canv1);
        box2.appendChild(canv2);
        box1.appendChild(cap1);
        box2.appendChild(cap2);
        row.appendChild(box1);
        row.appendChild(box2);
        displayZone.appendChild(row);
        canvList.push([canv1,canv1.getContext('2d')], [canv2,canv2.getContext('2d')]);
        console.log("new row added")
    }
}
function displays(timestamp){
    for(let i = 0; i<canvList.length; i++){ // for each display canvas
        // canvList[i][0]
    }
}

function animate(timestamp){
    easeElements(timestamp);
    addDisplayRows();
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate)



window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)} // simulate calling code 60 
 
window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function(requestID){clearTimeout(requestID)} //fall back