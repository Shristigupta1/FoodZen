document.getElementById("orderBar").style.width="82%";
document.getElementById("rescueBar").style.width="94%";
document.getElementById("revenueBar").style.width="76%";

document.getElementById("orderPercent").innerHTML="82";
document.getElementById("rescuePercent").innerHTML="94";
document.getElementById("todayRevenue").innerHTML="12450";

const notes=[
"🍱 New Meal Rescue Request",
"❤️ Volunteer Joined",
"🏪 Restaurant Approved",
"🚚 Order Delivered",
"⭐ New 5 Star Review"
];

setInterval(()=>{

const div=document.createElement("div");

div.className="notify";

div.innerHTML=notes[Math.floor(Math.random()*notes.length)]+"<span>Now</span>";

document.getElementById("notificationList").prepend(div);

if(document.getElementById("notificationList").children.length>6){

document.getElementById("notificationList").lastElementChild.remove();

}

},6000);

const tips=[

"Healthy Power Bowl is today's bestseller.",

"Add 5 more volunteers near Salt Lake.",

"Green Leaf Cafe donated the highest meals today.",

"Expected orders may increase by 20% tonight.",

"Meal Rescue success rate reached 94%."

];

let i=0;

document.getElementById("nextInsight").onclick=function(){

i=(i+1)%tips.length;

document.getElementById("aiText").innerHTML=tips[i];

};

document.getElementById("aiText").innerHTML=tips[0];
document.querySelectorAll(".accept").forEach(btn=>{

btn.onclick=function(){

const row=this.closest("tr");

row.children[4].innerHTML="Completed";

row.children[4].className="completed";

showAdminToast("✅ Order Accepted");

};

});

document.querySelectorAll(".reject").forEach(btn=>{

btn.onclick=function(){

const row=this.closest("tr");

row.children[4].innerHTML="Cancelled";

row.children[4].className="cancelled";

showAdminToast("❌ Order Cancelled");

};

});

function showAdminToast(msg){

const toast=document.createElement("div");

toast.innerHTML=msg;

toast.style.cssText="position:fixed;top:20px;right:20px;background:#A56A43;color:#fff;padding:15px 25px;border-radius:15px;font-weight:700;z-index:9999;";

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},2000);

}
const zen=document.getElementById("zenFloat");

if(zen){

zen.onclick=function(){

window.location.href="zen-ai.html";

};

}