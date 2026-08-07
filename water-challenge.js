const water=document.getElementById("water"),
btn=document.getElementById("drinkBtn"),
per=document.getElementById("percent"),
status=document.getElementById("status");

let level=0;

btn.onclick=()=>{

if(level>=100)return;

level+=10;

water.style.height=level+"%";

per.innerHTML=level+"%";

if(level==100){

const xp=50;

const coins=25;

localStorage.setItem("waterXP",xp);

status.innerHTML="🏆 Goal Completed!";

alert(`🎉 Congratulations!

⭐ XP : ${xp}

🪙 Coins : ${coins}

💧 Daily Goal Completed`);

}

};