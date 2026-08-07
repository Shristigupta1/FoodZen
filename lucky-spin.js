const wheel=document.getElementById("wheel");
const spin=document.getElementById("spinBtn");
const result=document.getElementById("result");

const rewards=[
"⭐ 100 XP",
"🪙 50 Coins",
"🌱 Garden +20",
"🍽 Free Healthy Meal",
"❤️ Donation Hero",
"🎁 20% Discount"
];

spin.onclick=()=>{

spin.disabled=true;

const deg=3600+Math.random()*360;

wheel.style.transform=`rotate(${deg}deg)`;

setTimeout(()=>{

const prize=rewards[Math.floor(Math.random()*rewards.length)];

result.innerHTML=`🎉 You Won <br><b>${prize}</b>`;

localStorage.setItem("spinReward",prize);

spin.disabled=false;

},4000);

};