window.onload=function(){

const placeOrder=document.getElementById("placeOrder");

if(!placeOrder)return;

placeOrder.onclick=function(){

const name=document.getElementById("name").value.trim();

const phone=document.getElementById("phone").value.trim();

const email=document.getElementById("email").value.trim();

const address=document.getElementById("address").value.trim();

if(name==""){
alert("Enter Full Name");
return;
}

if(phone.length!=10){
alert("Enter Valid Phone Number");
return;
}

if(email==""){
alert("Enter Email");
return;
}

if(address==""){
alert("Enter Delivery Address");
return;
}

placeOrder.innerHTML="Placing Order...";
placeOrder.disabled=true;

setTimeout(function(){

window.location.href="order-success.html";

},1500);

};

}
const zen=document.getElementById("zenFloat");

if(zen){

zen.onclick=function(){

window.location.href="zen-ai.html";

};

}