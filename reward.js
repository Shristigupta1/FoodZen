let xp=Number(localStorage.getItem("xp"))||120;
let coins=Number(localStorage.getItem("coins"))||80;
let badge=localStorage.getItem("badge")||"Starter";
let streak=Number(localStorage.getItem("streak"))||3;

function saveReward(){
localStorage.setItem("xp",xp);
localStorage.setItem("coins",coins);
localStorage.setItem("badge",badge);
localStorage.setItem("streak",streak);
}

function addReward(addXp,addCoins,msg){

xp+=addXp;
coins+=addCoins;

if(xp>=1000) badge="Zen Master";
else if(xp>=700) badge="Healthy Hero";
else if(xp>=400) badge="Food Friend";
else badge="Starter";

saveReward();

showReward(msg);

}

function showReward(msg){

const box=document.createElement("div");

box.className="reward-popup";

box.innerHTML=`
<h3>🎉 ${msg}</h3>
<p>+XP : ${xp}</p>
<p>🪙 Coins : ${coins}</p>
<p>🏅 ${badge}</p>
`;

document.body.appendChild(box);

setTimeout(()=>{

box.classList.add("show");

},100);

setTimeout(()=>{

box.remove();

},3200);

}