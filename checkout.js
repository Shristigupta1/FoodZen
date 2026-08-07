const orderCard=document.getElementById("orderCard");
const subtotal=document.getElementById("subtotal");
const total=document.getElementById("total");
const placeOrder=document.getElementById("placeOrder");

const meal=JSON.parse(localStorage.getItem("selectedMeal"));

if(meal){
const price=parseInt(meal.price);
const grand=price+40+20;
orderCard.innerHTML=`<div class="order-item"><img src="${meal.image}"><div><h3>${meal.name}</h3><p>⭐ ${meal.rating}</p><h4>₹${meal.price}</h4></div></div>`;
subtotal.innerHTML="₹"+price;
total.innerHTML="₹"+grand;
}

placeOrder.onclick=function(){

const name=document.getElementById("name").value.trim();
const phone=document.getElementById("phone").value.trim();
const email=document.getElementById("email").value.trim();
const address=document.getElementById("address").value.trim();

if(name==""){alert("Enter Full Name");return;}
if(phone.length!=10){alert("Enter Valid Phone Number");return;}
if(email==""){alert("Enter Email");return;}
if(address==""){alert("Enter Delivery Address");return;}

localStorage.setItem("latestOrder",JSON.stringify({
id:"FZ"+Math.floor(Math.random()*900000+100000),
name:name,
meal:meal
}));

placeOrder.innerHTML="Placing Order...";
placeOrder.disabled=true;

setTimeout(function(){
window.location.href="order-success.html";
},1500);

};
const zen=document.getElementById("zenFloat");

if(zen){

zen.onclick=function(){

window.location.href="zen-ai.html";

};

}