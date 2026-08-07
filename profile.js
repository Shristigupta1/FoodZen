const userName=document.querySelector(".profile-left h1");
const member=document.querySelector(".member");
const progressBar=document.getElementById("progressBar");
const points=document.getElementById("points");
const orders=document.getElementById("orders");
const shared=document.getElementById("shared");
const saved=document.getElementById("saved");
const score=document.getElementById("score");
const level=document.getElementById("level");
const healthMsg=document.getElementById("healthMsg");
const editBtn=document.getElementById("editProfileBtn");
const logoutBtn=document.getElementById("logoutBtn");

const data={
name:"Shristi Gupta",
points:120,
orders:8,
shared:3,
saved:12,
score:92
};

userName.innerHTML=greeting()+" "+data.name;

function greeting(){
const h=new Date().getHours();
if(h<12)return"☀ Good Morning,";
if(h<17)return"🌤 Good Afternoon,";
return"🌙 Good Evening,";
}

let p=0,o=0,s=0,c=0;

function counter(){
const timer=setInterval(()=>{

if(p<data.points){
p+=2;
points.innerHTML=p;
}

if(o<data.orders){
o++;
orders.innerHTML=o;
}

if(s<data.shared){
s++;
shared.innerHTML=s;
}

if(c<data.score){
c++;
score.innerHTML=c+"%";
}

saved.innerHTML=data.saved+"kg";

if(p>=data.points&&o>=data.orders&&s>=data.shared&&c>=data.score){
clearInterval(timer);
}

},20);
}

counter();

if(data.points<300){
member.innerHTML="🌱 Starter Member";
level.innerHTML="🌱 Starter";
progressBar.style.width="40%";
healthMsg.innerHTML="Great start! Complete more healthy orders to unlock Food Friend.";
}

else if(data.points<700){
member.innerHTML="🥉 Food Friend";
level.innerHTML="🥉 Food Friend";
progressBar.style.width="70%";
healthMsg.innerHTML="Amazing! You're eating healthier every week.";
}

else if(data.points<1500){
member.innerHTML="🥈 Healthy Hero";
level.innerHTML="🥈 Healthy Hero";
progressBar.style.width="90%";
healthMsg.innerHTML="Fantastic! Zen AI recommends maintaining this routine.";
}

else{
member.innerHTML="💎 FoodyZen Elite";
level.innerHTML="💎 Elite";
progressBar.style.width="100%";
healthMsg.innerHTML="Outstanding! You're among FoodyZen's healthiest members.";
}

editBtn.onclick=function(){

const name=prompt("Enter your name",data.name);

if(name&&name.trim()!=""){
userName.innerHTML=greeting()+" "+name;
localStorage.setItem("profileName",name);
}

};

const savedName=localStorage.getItem("profileName");

if(savedName){
userName.innerHTML=greeting()+" "+savedName;
}

logoutBtn.onclick=function(){

if(confirm("Are you sure you want to logout?")){

localStorage.removeItem("profileName");

window.location.href="index.html";

}

};

document.querySelectorAll(".badge-card").forEach((card,index)=>{

card.onclick=function(){

document.querySelectorAll(".badge-card").forEach(c=>c.classList.remove("active"));

this.classList.add("active");

};

});

document.querySelectorAll(".order-card").forEach(card=>{

card.onclick=function(){

window.location.href="order-history.html";

};

});

document.querySelectorAll(".action-card a").forEach(link=>{

link.addEventListener("mouseenter",()=>{

link.style.transform="translateX(8px)";

});

link.addEventListener("mouseleave",()=>{

link.style.transform="translateX(0)";

});

});

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

},{threshold:.15});

document.querySelectorAll(".profile-card,.stat-card,.membership,.health-card,.badge-card,.order-card,.info-card,.action-card").forEach(item=>{

item.style.opacity="0";
item.style.transform="translateY(40px)";
item.style.transition=".7s";

observer.observe(item);

});
const zen=document.getElementById("zenFloat");

if(zen){

zen.onclick=function(){

window.location.href="zen-ai.html";

};

}