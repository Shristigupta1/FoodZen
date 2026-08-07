const cards=document.querySelectorAll(".card");
const logout=document.getElementById("logoutBtn");
const welcome=document.querySelector(".welcome");
const latestOrder=JSON.parse(localStorage.getItem("latestOrder"));

cards.forEach(card=>{
card.addEventListener("mouseenter",()=>{
card.style.transform="translateY(-8px)";
card.style.transition=".3s";
});
card.addEventListener("mouseleave",()=>{
card.style.transform="translateY(0)";
});
});

welcome.style.opacity="0";
welcome.style.transform="translateY(30px)";

setTimeout(()=>{
welcome.style.transition=".7s";
welcome.style.opacity="1";
welcome.style.transform="translateY(0)";
},200);

const numbers=document.querySelectorAll(".card h2");

numbers.forEach(num=>{
let target=parseInt(num.innerHTML);
let count=0;
let speed=Math.ceil(target/40);
const counter=setInterval(()=>{
count+=speed;
if(count>=target){
count=target;
clearInterval(counter);
}
num.innerHTML=count;
},30);
});

if(latestOrder){
const orders=document.querySelector(".orders");
const order=document.createElement("div");
order.className="order";
order.innerHTML=`
<img src="${latestOrder.meal.image}">
<div>
<h3>${latestOrder.meal.name}</h3>
<p>Just Ordered • ₹${latestOrder.meal.price}</p>
</div>
<span class="status pending">🕒</span>
`;
orders.insertBefore(order,orders.children[1]);
}

logout.onclick=function(e){
e.preventDefault();
if(confirm("Are you sure you want to logout?")){
localStorage.clear();
window.location.href="login.html";
}
};
const zen=document.getElementById("zenFloat");

if(zen){

zen.onclick=function(){

window.location.href="zen-ai.html";

};

}