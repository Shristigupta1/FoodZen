const board=document.getElementById("board");
const moves=document.getElementById("moves");
const restart=document.getElementById("restart");

let emojis=["🍎","🍎","🥕","🥕","🍇","🍇","🍌","🍌","🥦","🥦","🍉","🍉","🥝","🥝","🍓","🍓"];

emojis.sort(()=>Math.random()-0.5);

let first=null,second=null,lock=false,count=0,matched=0;

emojis.forEach(e=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=e;

board.appendChild(card);

card.onclick=()=>{

if(lock||card.classList.contains("open"))return;

card.classList.add("open");

if(!first){

first=card;

return;

}

second=card;

count++;

moves.innerHTML=count;

if(first.innerHTML==second.innerHTML){

matched++;

first=null;

second=null;

if(matched==8){

const xp=50;
const coins=20;

localStorage.setItem("memoryXP",xp);

alert(`🏆 You Won!

⭐ XP : ${xp}

🪙 Coins : ${coins}`);

}

}else{

lock=true;

setTimeout(()=>{

first.classList.remove("open");

second.classList.remove("open");

first=null;

second=null;

lock=false;

},700);

}

};

});

restart.onclick=()=>location.reload();