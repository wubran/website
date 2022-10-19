// topBar = document.getElementById('topBar');
const displayZone = document.querySelector(".displayZone");
const topBar = document.querySelector(".topBar");

var focusCanvas = []

window.onbeforeunload = function () {
    window.scrollTo(0,0);
};

var topBrian = document.getElementById('topBrian');
var topBrianLabel = document.getElementById('topBrianLabel');
var topBrianLabel = document.getElementById('topBrianLabel');
var splashBrian1 = document.getElementById('splashBrian1');
var splashBrian2 = document.getElementById('splashBrian2');
ease = 0;
function easeElements(timestamp){
    ease += (document.documentElement.scrollTop-ease)/4

    // topBrian.style.height = Math.max(2.4,(5-ease/77)) + "vw";
    // topBrian.style.paddingTop = Math.max(0.8,(1.5-ease/285)) + "vw";
    // topBrianLabel.style.fontSize = Math.max(1.6,(2.6-ease/200)) + "vw";
    // topBrianLabel.style.letterSpacing = Math.min(0.8,(0.2+ease/333)) + "vw";

    // topBrian.style.height = Math.max(2.4,(5-document.documentElement.scrollTop/153)) + "vw";
    // topBrian.style.paddingTop = Math.max(0.8,(1.5-document.documentElement.scrollTop/570)) + "vw";
    // topBrianLabel.style.fontSize = Math.max(1.6,(2.6-document.documentElement.scrollTop/400)) + "vw";
    // topBrianLabel.style.letterSpacing = Math.min(0.8,(0.2+document.documentElement.scrollTop/666)) + "vw";

    let topBrianChange = Math.min(1,Math.max(0,ease/500-0.3));
    // console.log(topBrianChange)
    topBrian.style.height = (1.5+4.5-2.5*(topBrianChange)) + "vw";
    topBrian.style.width = (15-5*topBrianChange) + "%";
    topBrian.style.paddingTop = (3-1.7*topBrianChange) + "%";
    topBrianLabel.style.fontSize = (2.4-0.8*topBrianChange) + "vw";
    // topBrian.style.scale = (100-30*topBrianChange) + "%";
    // topBrianLabel.style.scale = (100-30*topBrianChange) + "%";


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

function display(timestamp){ // one loop, any display
    // focusCanvas
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