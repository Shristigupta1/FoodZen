const img=document.getElementById("mainMeal"),
thumb=document.querySelectorAll(".thumb"),
qty=document.getElementById("qty"),
plus=document.getElementById("plus"),
minus=document.getElementById("minus"),
cart=document.getElementById("cartBtn"),
buy=document.getElementById("buyBtn"),
cartIcon=document.querySelector(".nav-btns button"),
zen=document.getElementById("zenFloat");

thumb.forEach(t=>t.onclick=()=>{
img.src=t.src;
thumb.forEach(i=>i.classList.remove("active"));
t.classList.add("active");
});

plus.onclick=()=>qty.value++;

minus.onclick=()=>{
if(qty.value>1)qty.value--;
};

cart.onclick=()=>{

let cartItems=JSON.parse(localStorage.getItem("cart"))||[];

cartItems.push({

name:"Healthy Power Bowl",

price:249,

qty:+qty.value,

img:img.src

});

localStorage.setItem("cart",JSON.stringify(cartItems));

alert("✅ Added To Cart");

};

buy.onclick=()=>{

localStorage.setItem("buyNowOrder",JSON.stringify({

name:"Healthy Power Bowl",

price:249,

qty:+qty.value,

img:img.src

}));

location.href="checkout.html";

};

cartIcon.onclick=()=>location.href="cart.html";

if(zen){

zen.onclick=()=>location.href="zen-ai.html";

}