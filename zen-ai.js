const $=e=>document.querySelector(e),$$=e=>document.querySelectorAll(e);

const welcome=$(".welcome h1"),
sub=$(".welcome p"),
health=$(".health-score h2"),
bar=$("#waterBar"),
challenge=$("#completeMission"),
moodResult=$("#moodResult"),
recipeImg=$("#recipeImg"),
recipeTitle=$("#recipeTitle"),
recipeDesc=$("#recipeDesc"),
grow=$("#growPlant"),
fill=$("#gardenFill"),
gardenImg=$("#gardenImg"),
chat=$("#chatBody"),
input=$("#userMsg"),
send=$("#sendMsg"),
modal=$("#zenModal"),
modalTitle=$("#zenTitle"),
modalContent=$("#zenContent");

const memory=JSON.parse(localStorage.getItem("zenMemory"))||{
xp:120,
coins:80,
badge:"Starter",
mood:"",
recipe:"Healthy Bowl",
garden:65,
saved:[]
};

function save(){
localStorage.setItem("zenMemory",JSON.stringify(memory));
}

const hour=new Date().getHours();

welcome.innerHTML=hour<12?"☀ Good Morning, Shristi":hour<17?"🌤 Good Afternoon, Shristi":"🌙 Good Evening, Shristi";

health.innerHTML="93%";

fill.style.width=memory.garden+"%";

sub.innerHTML=`Last Recipe : <b>${memory.recipe}</b><br>Mood : <b>${memory.mood||"Not Selected"}</b><br>⭐ ${memory.xp} XP | 🪙 ${memory.coins}`;
function updateProfile(){

sub.innerHTML=`Last Recipe : <b>${memory.recipe}</b><br>Mood : <b>${memory.mood||"Not Selected"}</b><br>⭐ ${memory.xp} XP | 🪙 ${memory.coins} | 🏅 ${memory.badge}`;

save();

}

function rewardPopup(msg){

const box=document.createElement("div");

box.className="reward-popup";

box.innerHTML=`
<h3>${msg}</h3>
<p>⭐ ${memory.xp} XP</p>
<p>🪙 ${memory.coins} Coins</p>
<p>${memory.badge}</p>
`;

document.body.appendChild(box);

setTimeout(()=>box.classList.add("show"),50);

setTimeout(()=>box.remove(),3000);

}

function addReward(xp,coins,msg){

memory.xp+=xp;

memory.coins+=coins;

if(memory.xp>=1000)

memory.badge="👑 Zen Master";

else if(memory.xp>=700)

memory.badge="🥇 Healthy Hero";

else if(memory.xp>=400)

memory.badge="🥈 Food Friend";

else

memory.badge="🌱 Starter";

updateProfile();

rewardPopup(msg);

}

challenge.onclick=()=>{

bar.style.width="100%";

challenge.innerHTML="✅ Completed";

challenge.disabled=true;

addReward(30,10,"🎯 Challenge Completed");

};
const moodData={
happy:{
color:"#FFF8E8",
msg:"😊 You're in a great mood today! Keep smiling.",
emoji:"🎈",
xp:5
},
calm:{
color:"#F1FCF7",
msg:"😌 Calm minds make healthy choices.",
emoji:"🍃",
xp:5
},
stress:{
color:"#F7FFF5",
msg:"🌿 Take a short break and drink some water.",
emoji:"🌿",
xp:5
},
energy:{
color:"#FFF4EA",
msg:"🔥 Amazing energy! Today's a great day for protein meals.",
emoji:"⚡",
xp:8
}
};

$$(".mood-card").forEach(card=>{

card.onclick=()=>{

$$(".mood-card").forEach(x=>x.classList.remove("active"));

card.classList.add("active");

const mood=card.dataset.mood;

memory.mood=mood;

document.body.style.background=moodData[mood].color;

moodResult.innerHTML=moodData[mood].msg;

addReward(moodData[mood].xp,1,"Daily Mood Check");

updateProfile();

moodEffect(moodData[mood].emoji);

};

});
function moodEffect(icon){

for(let i=0;i<20;i++){

const s=document.createElement("span");

s.innerHTML=icon;

s.className="mood-effect";

s.style.left=Math.random()*100+"vw";

s.style.animationDelay=Math.random()*2+"s";

document.body.appendChild(s);

setTimeout(()=>s.remove(),4000);

}

}
const recipes=[
{name:"Healthy Bowl",img:"meal-card8.png",cal:"520",protein:"28g",time:"20 mins",level:"Easy",ing:["Quinoa","Chicken","Avocado","Spinach","Tomato"],steps:["Cook quinoa","Grill chicken","Cut vegetables","Mix everything","Serve"],benefit:"High Protein"},
{name:"Paneer Wrap",img:"meal-card11.png",cal:"430",protein:"22g",time:"15 mins",level:"Easy",ing:["Paneer","Wrap","Onion","Capsicum"],steps:["Cook paneer","Cook vegetables","Fill wrap","Roll","Serve"],benefit:"Protein Rich"},
{name:"Fruit Bowl",img:"meal-card6.png",cal:"210",protein:"5g",time:"5 mins",level:"Very Easy",ing:["Apple","Banana","Kiwi","Orange"],steps:["Wash","Cut","Mix","Serve"],benefit:"Vitamin C"},
{name:"Veg Pizza",img:"meal-card5.png",cal:"620",protein:"18g",time:"30 mins",level:"Medium",ing:["Base","Cheese","Corn","Capsicum"],steps:["Add sauce","Add toppings","Bake","Serve"],benefit:"Energy"},
{name:"Smoothie Bowl",img:"meal-card2.png",cal:"350",protein:"14g",time:"8 mins",level:"Easy",ing:["Banana","Yogurt","Berries"],steps:["Blend","Pour","Decorate"],benefit:"Healthy Breakfast"}
];

let currentRecipe=recipes[0];

function showRecipe(r){

currentRecipe=r;

recipeImg.src=r.img;

recipeTitle.innerHTML=r.name;

recipeDesc.innerHTML=`🔥 ${r.cal} Calories • 💪 ${r.protein}`;

memory.recipe=r.name;

updateProfile();

save();

}
function randomRecipe(){

const r=recipes[Math.floor(Math.random()*recipes.length)];

showRecipe(r);

addReward(2,1,"🍽 Recipe Generated");

}

document.getElementById("cookBtn").onclick=randomRecipe;

document.getElementById("newRecipe").onclick=randomRecipe;

showRecipe(currentRecipe);
function openRecipe(){

modal.style.display="flex";

modalTitle.innerHTML="🍽 Recipe AI";

modalContent.innerHTML=`

<input id="recipeSearch" placeholder="Search recipe..." style="width:100%;padding:14px;border:1px solid #ddd;border-radius:30px;margin-bottom:20px;">

<img src="${currentRecipe.img}" style="width:100%;height:220px;object-fit:cover;border-radius:20px;">

<h2>${currentRecipe.name}</h2>

<p>⭐ Easy | ⏱ ${currentRecipe.time}</p>

<p>🔥 ${currentRecipe.cal} Calories | 💪 ${currentRecipe.protein}</p>

<h3>🥗 Ingredients</h3>

<ul>${currentRecipe.ing.map(i=>`<li>${i}</li>`).join("")}</ul>

<h3>👨‍🍳 Steps</h3>

<ol>${currentRecipe.steps.map(i=>`<li>${i}</li>`).join("")}</ol>

<p><b>💚 ${currentRecipe.benefit}</b></p>

<div class="recipe-actions">

<button id="saveRecipe">❤️ Save</button>

<button id="shareRecipe">📤 Share</button>

<button id="nextRecipe">🎲 Random</button>

</div>

`;

recipeFunctions();

}
function recipeFunctions(){

document.getElementById("saveRecipe").onclick=()=>{

if(!memory.saved.includes(currentRecipe.name))

memory.saved.push(currentRecipe.name);

save();

alert("❤️ Recipe Saved");

};

document.getElementById("shareRecipe").onclick=()=>{

navigator.clipboard.writeText(currentRecipe.name);

alert("📤 Recipe Copied");

};

document.getElementById("nextRecipe").onclick=()=>{

randomRecipe();

openRecipe();

};

const search=document.getElementById("recipeSearch");

search.onkeyup=()=>{

const v=search.value.toLowerCase();

const r=recipes.find(x=>x.name.toLowerCase().includes(v));

if(r){

showRecipe(r);

openRecipe();

}

};

}

document.getElementById("recipeBtn").onclick=openRecipe;

document.getElementById("closeZen").onclick=()=>modal.style.display="none";

window.onclick=e=>{

if(e.target==modal)

modal.style.display="none";

};
const gameBtn=$("#gameBtn"),
gardenBtn=$("#gardenBtn"),
chatBtn=$("#chatBtn"),
reportBtn=$("#reportBtn"),
challengeBtn=$("#challengeBtn");

const open=(t,h)=>{
modalTitle.innerHTML=t;
modalContent.innerHTML=h;
modal.style.display="flex";
};

gameBtn.onclick=()=>open("🎮 Wellness Games",`
<div class="game-menu">
<button onclick="location.href='healthy-catch.html'">🍎 Healthy Catch</button>
<button onclick="location.href='memory-game.html'">🧠 Memory Match</button>
<button onclick="location.href='nutrition-quiz.html'">🥗 Nutrition Quiz</button>
<button onclick="location.href='water-challenge.html'">💧 Water Challenge</button>
</div>`);

gardenBtn.onclick=()=>open("🌱 Zen Garden",`
<h2>Garden Level 3</h2>
<p>Growth : ${memory.garden}%</p>
<button onclick="document.getElementById('growPlant').click()">🌿 Grow Garden</button>`);

chatBtn.onclick=()=>{
document.querySelector(".chat-section").scrollIntoView({behavior:"smooth"});
input.focus();
};

reportBtn.onclick=()=>open("📊 Weekly Report",`
<p>⭐ XP : ${memory.xp}</p>
<p>🪙 Coins : ${memory.coins}</p>
<p>🏅 Badge : ${memory.badge}</p>
<p>❤️ Health Score : 93%</p>`);

challengeBtn.onclick=()=>open("🎯 Today's Challenge",`
<h3>Drink 2L Water</h3>
<p>Reward : ⭐30 XP + 🪙10 Coins</p>
<button onclick="document.getElementById('completeMission').click()">Complete Challenge</button>`);
reportBtn.onclick=()=>open("📊 Weekly Report",`
<div class="report-popup">
<div><h2>16</h2><span>Healthy Meals</span></div>
<div><h2>94%</h2><span>Health Score</span></div>
<div><h2>${memory.xp}</h2><span>XP</span></div>
<div><h2>${memory.coins}</h2><span>Coins</span></div>
</div>`);
const quickBtns=document.querySelectorAll(".quick-chat button");

quickBtns.forEach(btn=>{

btn.onclick=()=>{

const text=btn.innerText.toLowerCase();

if(text.includes("healthy"))
input.value="Suggest me a healthy meal";

else if(text.includes("protein"))
input.value="High protein meal";

else if(text.includes("calories"))
input.value="How many calories should I eat today?";

else if(text.includes("donate"))
input.value="How can I donate a meal?";

else if(text.includes("rescue"))
input.value="I want to rescue food";

else if(text.includes("challenge"))
input.value="Give me today's challenge";

sendMessage();

};

});
function botReply(msg){

msg=msg.toLowerCase();

if(msg.includes("healthy")) return "🥗 Today's recommendation is <b>Healthy Bowl</b>. It contains <b>520 Calories</b> and <b>28g Protein</b>.";

if(msg.includes("protein")) return "💪 Best high-protein meals:<br>• Healthy Bowl<br>• Paneer Wrap<br>• Grilled Chicken Salad";

if(msg.includes("calories")) return "🔥 Based on your profile, your target is around <b>2000 Calories/day</b>.";

if(msg.includes("donate")) return "❤️ You can donate food from the <b>Share Meal</b> page. Every donation earns Zen Coins.";

if(msg.includes("rescue")) return "🚨 Go to the <b>Meal Rescue</b> page to collect surplus food from nearby restaurants.";

if(msg.includes("challenge")) return "🎯 Today's Challenge:<br>Drink 2L Water<br>Reward: ⭐30 XP + 🪙10 Coins";

if(msg.includes("recipe")) return "🍽 Click <b>Recipe AI</b> to generate healthy recipes.";

if(msg.includes("game")) return "🎮 Play Healthy Catch, Memory Match or Nutrition Quiz to earn XP.";

if(msg.includes("hello")||msg.includes("hi")) return "👋 Hello Shristi! How can I help you today?";

return "🤖 I can help with recipes, nutrition, meal rescue, donations, games and healthy lifestyle tips.";
}
function sendMessage(){

const msg=input.value.trim();

if(msg==="") return;

chat.innerHTML+=`<div class="user-msg">${msg}</div>`;

chat.innerHTML+=`<div class="bot-msg">${botReply(msg)}</div>`;

chat.scrollTop=chat.scrollHeight;

input.value="";

}

send.onclick=sendMessage;

input.addEventListener("keydown",e=>{

if(e.key==="Enter") sendMessage();

});
document.querySelectorAll(".sidebar li").forEach((item,index)=>{

item.style.cursor="pointer";

item.addEventListener("click",()=>{

switch(index){

case 0: location.href="dashboard.html"; break;

case 1: document.querySelector(".mood").scrollIntoView({behavior:"smooth"}); break;

case 2: document.querySelector(".recipe-card").scrollIntoView({behavior:"smooth"}); break;

case 3: location.href="games.html"; break;

case 4: document.querySelector(".garden").scrollIntoView({behavior:"smooth"}); break;

case 5: document.querySelector(".challenge").scrollIntoView({behavior:"smooth"}); break;

case 6: document.querySelector(".weekly-report").scrollIntoView({behavior:"smooth"}); break;

case 7: location.href="rewards.html"; break;

case 8: location.href="settings.html"; break;

case 9: location.href="dashboard.html"; break;

}

});

});
const playBtns=document.querySelectorAll(".game-card button");

playBtns[0].onclick=()=>location.href="healthy-catch.html";

playBtns[1].onclick=()=>location.href="memory-game.html";

playBtns[2].onclick=()=>location.href="nutrition-quiz.html";

playBtns[3].onclick=()=>location.href="water-challenge.html";
const cards=document.querySelectorAll(".game-card");

cards[0].onclick=()=>location.href="healthy-catch.html";

cards[1].onclick=()=>location.href="memory-game.html";

cards[2].onclick=()=>location.href="nutrition-quiz.html";

cards[3].onclick=()=>location.href="water-challenge.html";
document.querySelector(".title-row a").onclick=e=>{

e.preventDefault();

location.href="games.html";

};
document.getElementById("luckySpin").onclick=()=>location.href="lucky-spin.html";

document.querySelectorAll(".game-card button")[4].onclick=e=>{
e.stopPropagation();
location.href="lucky-spin.html";
};
document.querySelectorAll(".sidebar li")[7].onclick=()=>location.href="rewards.html";
window.addEventListener("load",()=>{

const grow=document.getElementById("growPlant");
const fill=document.getElementById("gardenFill");
const level=document.querySelector(".garden-top span");
const text=document.querySelector(".garden-progress p");

if(!grow||!fill)return;

let points=Number(localStorage.getItem("gardenPoints"))||65;
let lvl=Number(localStorage.getItem("gardenLevel"))||3;

function update(){
fill.style.width=points+"%";
text.innerHTML=points+" / 100 Growth Points";
level.innerHTML="Level "+lvl;
}

update();

grow.onclick=function(){

points+=5;

if(points>=100){

points=0;
lvl++;

alert("🎉 Garden Level Up!");

}

localStorage.setItem("gardenPoints",points);
localStorage.setItem("gardenLevel",lvl);

update();

};

});
window.onload=function(){

const btn=document.querySelector(".top-right button");

if(!btn) return;

if(localStorage.getItem("theme")=="dark"){
document.body.classList.add("dark");
btn.innerHTML='<i class="fa-solid fa-sun"></i>';
}

btn.onclick=function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");
btn.innerHTML='<i class="fa-solid fa-sun"></i>';

}else{

localStorage.setItem("theme","light");
btn.innerHTML='<i class="fa-solid fa-moon"></i>';

}

};

};