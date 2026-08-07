const game=document.querySelector(".game"),
basket=document.getElementById("basket"),
score=document.getElementById("score"),
start=document.getElementById("startBtn"),
left=document.getElementById("leftBtn"),
right=document.getElementById("rightBtn");

let x=window.innerWidth/2,s=0,play=false;

basket.style.left=x+"px";

left.onclick=()=>{x=Math.max(40,x-40);basket.style.left=x+"px";}
right.onclick=()=>{x=Math.min(window.innerWidth-80,x+40);basket.style.left=x+"px";}

document.onkeydown=e=>{
if(e.key=="ArrowLeft")left.click();
if(e.key=="ArrowRight")right.click();
};

const good=["🍎","🥕","🍌","🥦","🍇"],
bad=["🍔","🍕","🍟","🥤"];

start.onclick=()=>{

if(play)return;

play=true;

setInterval(drop,900);

};

function drop(){

const food=document.createElement("div");

food.className="food";

food.innerHTML=Math.random()>.3?
good[Math.floor(Math.random()*good.length)]:
bad[Math.floor(Math.random()*bad.length)];

food.style.left=Math.random()*(window.innerWidth-60)+"px";

food.style.animationDuration="4s";

game.appendChild(food);

let y=-60;

const fall=setInterval(()=>{

y+=5;

food.style.top=y+"px";

const fx=food.offsetLeft,
bx=basket.offsetLeft;

if(y>game.offsetHeight-120&&Math.abs(fx-bx)<55){

food.innerHTML.match(/[🍎🥕🍌🥦🍇]/)?s+=10:s-=5;

score.innerHTML=s;

food.remove();

clearInterval(fall);

}

if(y>game.offsetHeight){

food.remove();

clearInterval(fall);

}

},30);

}
