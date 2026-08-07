const xp=document.getElementById("xp");
const coins=document.getElementById("coins");
const badge=document.getElementById("badge");
const list=document.getElementById("list");

let totalXP=
(+localStorage.getItem("healthyScore")||0)+
(+localStorage.getItem("memoryXP")||0)+
(+localStorage.getItem("quizXP")||0)+
(+localStorage.getItem("waterXP")||0);

let totalCoins=Math.floor(totalXP/2);

xp.innerHTML=totalXP;
coins.innerHTML=totalCoins;

badge.innerHTML=
totalXP>=500?"👑":
totalXP>=300?"🥇":
totalXP>=150?"🥈":"🥉";

const achievements=[
"🍎 Healthy Catch Champion",
"🧠 Memory Master",
"🥗 Nutrition Expert",
"💧 Water Hero",
"🎡 Lucky Spinner"
];

achievements.forEach(a=>{
list.innerHTML+=`
<div class="item">
<span>${a}</span>
<span>✅</span>
</div>`;
});