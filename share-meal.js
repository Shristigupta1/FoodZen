const $=e=>document.querySelector(e);

const form=$("#mealForm"),
img=$("#mealImage"),
preview=$("#preview"),
fresh=$("#freshness"),
xp=$("#xp"),
coins=$("#coins"),
popup=$("#successPopup"),
did=$("#donationId"),
close=$("#closePopup"),
history=$("#historyBtn"),
historyBox=$("#historyPopup"),
historyList=$("#historyList"),
closeHistory=$("#closeHistory");

let reward={xp:0,coin:0};

img.onchange=e=>{
const f=e.target.files[0];
if(f)preview.src=URL.createObjectURL(f);
};

$("#expiry").onchange=()=>{

let h=(new Date($("#expiry").value)-new Date())/36e5;

if(h>12){
fresh.innerHTML="🟢 Excellent Freshness (98%)";
reward={xp:30,coin:15};
}
else if(h>6){
fresh.innerHTML="🟡 Good Freshness (85%)";
reward={xp:20,coin:10};
}
else if(h>2){
fresh.innerHTML="🟠 Donate Soon (65%)";
reward={xp:10,coin:5};
}
else{
fresh.innerHTML="🔴 Not Recommended";
reward={xp:0,coin:0};
}

xp.innerHTML=reward.xp+" XP";
coins.innerHTML=reward.coin+" Coins";

};

form.onsubmit=e=>{

e.preventDefault();

if(
!$("#mealName").value||
!$("#quantity").value||
!$("#address").value||
!$("#phone").value
){
alert("Fill all details");
return;
}

const id="FZ-"+Date.now().toString().slice(-6);

const meal={

id,

name:$("#mealName").value,

cat:$("#category").value,

qty:$("#quantity").value,

exp:$("#expiry").value,

add:$("#address").value,

phone:$("#phone").value,

rec:$("#receiver").value,

del:$("#delivery").value,

desc:$("#description").value,

img:preview.src,

xp:reward.xp,

coin:reward.coin,

date:new Date().toLocaleString()

};

let list=JSON.parse(localStorage.getItem("donations"))||[];

list.unshift(meal);

localStorage.setItem("donations",JSON.stringify(list));

did.innerHTML="Donation ID : <b>"+id+"</b>";

popup.style.display="flex";

form.reset();

preview.src="meal-placeholder.png";

fresh.innerHTML="Waiting for food details...";

xp.innerHTML="0 XP";

coins.innerHTML="0 Coins";

reward={xp:0,coin:0};

loadHistory();

};

close.onclick=()=>popup.style.display="none";

window.onclick=e=>{
if(e.target==popup)popup.style.display="none";
if(e.target==historyBox)historyBox.style.display="none";
};
function loadHistory(){

let list=JSON.parse(localStorage.getItem("donations"))||[];

if(!list.length){

historyList.innerHTML="<p>No Donations Yet ❤️</p>";

return;

}

historyList.innerHTML="";

let totalMeal=0,totalXP=0,totalCoin=0;

list.forEach((m,i)=>{

totalMeal+=+m.qty;
totalXP+=m.xp;
totalCoin+=m.coin;

historyList.innerHTML+=`

<div class="history-item">

<div>

<h3>${m.name}</h3>

<p>🍽 ${m.cat}</p>

<p>📦 ${m.qty} Meals</p>

<p>📍 ${m.add}</p>

<p>🕒 ${m.date}</p>

<p>🆔 ${m.id}</p>

</div>

<div style="text-align:right">

<img src="${m.img}" style="width:80px;height:80px;object-fit:cover;border-radius:12px"><br><br>

<button onclick="removeDonation(${i})">Delete</button>

</div>

</div>

`;

});

historyList.innerHTML=`

<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-bottom:25px">

<div class="card"><h3>${totalMeal}</h3><p>Meals</p></div>

<div class="card"><h3>${totalXP}</h3><p>XP</p></div>

<div class="card"><h3>${totalCoin}</h3><p>Coins</p></div>

</div>

`+historyList.innerHTML;

}

function removeDonation(i){

let list=JSON.parse(localStorage.getItem("donations"))||[];

list.splice(i,1);

localStorage.setItem("donations",JSON.stringify(list));

loadHistory();

}

history.onclick=()=>{

loadHistory();

historyBox.style.display="flex";

};

closeHistory.onclick=()=>historyBox.style.display="none";

document.getElementById("startDonate").onclick=()=>{

window.scrollTo({

top:document.querySelector(".container").offsetTop-50,

behavior:"smooth"

});

};

document.getElementById("trackDonation").onclick=()=>{

alert("🚚 Driver Assigned!\n\nEstimated Pickup : 20 Minutes");

};

loadHistory();