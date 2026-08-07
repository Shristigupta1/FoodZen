const form=document.getElementById("contactForm"),
chat=document.getElementById("chatZen"),
sub=document.getElementById("subscribeBtn");

form.onsubmit=e=>{
e.preventDefault();
alert("✅ Thank you! Your message has been sent.");
form.reset();
};

chat.onclick=()=>location.href="zen-ai.html";

sub.onclick=()=>{
const mail=document.getElementById("newsEmail");
if(mail.value==""){
alert("Enter your email.");
return;
}
alert("🎉 Successfully Subscribed!");
mail.value="";
};

window.addEventListener("scroll",()=>{
const h=document.querySelector("header");
if(scrollY>60){
h.style.background="#fff";
h.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";
}else{
h.style.background="rgba(255,255,255,.96)";
h.style.boxShadow="0 5px 20px rgba(0,0,0,.05)";
}
});

const observer=new IntersectionObserver(e=>{
e.forEach(i=>{
if(i.isIntersecting){
i.target.style.opacity=1;
i.target.style.transform="translateY(0)";
}
});
},{threshold:.15});

document.querySelectorAll(".card,.faq details,.zen-card,.newsletter,footer").forEach(i=>{
i.style.opacity=0;
i.style.transform="translateY(50px)";
i.style.transition=".7s";
observer.observe(i);
});