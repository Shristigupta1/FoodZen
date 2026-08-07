const $$=e=>document.querySelectorAll(e),$=e=>document.querySelector(e);

let delivery=40,discount=0;

function update(){

let sub=0;

$$(".cart-card").forEach(c=>{

const p=parseInt(c.querySelector("h3").innerText.replace("₹",""));

const q=parseInt(c.querySelector(".count").innerText);

sub+=p*q;

});

$("#subTotal").innerHTML="₹"+sub;

$("#discount").innerHTML="-₹"+discount;

$("#total").innerHTML="₹"+(sub+delivery-discount);

$("#cartCount").innerHTML=$$(".cart-card").length;

localStorage.setItem("cartTotal",sub+delivery-discount);

}

$$(".plus").forEach(b=>b.onclick=()=>{

const c=b.previousElementSibling;

c.innerHTML=+c.innerHTML+1;

update();

});

$$(".minus").forEach(b=>b.onclick=()=>{

const c=b.nextElementSibling;

if(c.innerHTML>1)c.innerHTML--;

update();

});

$$(".remove").forEach(b=>b.onclick=()=>{

if(confirm("Remove this meal?")){

b.closest(".cart-card").remove();

update();

}

});

$$(".save").forEach(b=>b.onclick=()=>{

alert("❤️ Saved for Later");

});

$("#applyCoupon").onclick=()=>{

const code=$("#coupon").value.trim().toUpperCase();

if(code=="FOODY20"){

discount=20;

alert("🎉 Coupon Applied");

}

else if(code=="WELCOME50"){

discount=50;

alert("🎉 Coupon Applied");

}

else{

discount=0;

alert("❌ Invalid Coupon");

}

update();

};

$("#checkoutBtn").onclick=()=>{

if(!$$(".cart-card").length){

alert("🛒 Cart is Empty");

return;

}

localStorage.setItem("checkout","true");

location.href="checkout.html";

};

update();