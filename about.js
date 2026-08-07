const cards=document.querySelectorAll(".card,.person,.steps div,.stats div");
const observer=new IntersectionObserver(e=>{
e.forEach(i=>{
if(i.isIntersecting){
i.target.style.opacity="1";
i.target.style.transform="translateY(0)";
}
});
},{threshold:.15});

cards.forEach(c=>{
c.style.opacity="0";
c.style.transform="translateY(60px)";
c.style.transition=".7s";
observer.observe(c);
});

const nums=document.querySelectorAll(".stats h3,.card h3");
nums.forEach(n=>{
const txt=n.innerText.replace(/[^0-9]/g,"");
if(!txt)return;
const end=parseInt(txt);
let x=0;
const plus=Math.max(1,Math.ceil(end/80));
const t=setInterval(()=>{
x+=plus;
if(x>=end){
x=end;
clearInterval(t);
}
n.innerHTML=n.innerHTML.replace(/[0-9,]+/,x.toLocaleString());
},20);
});

window.addEventListener("scroll",()=>{
const h=document.querySelector("header");
if(window.scrollY>80){
h.style.background="#fff";
h.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";
}else{
h.style.background="rgba(255,255,255,.96)";
h.style.boxShadow="0 5px 20px rgba(0,0,0,.05)";
}
});

document.querySelectorAll("button").forEach(b=>{
b.onclick=()=>{
if(b.innerText.includes("Explore"))location.href="explore.html";
if(b.innerText.includes("Share"))location.href="share-meal.html";
if(b.innerText.includes("Rescue"))location.href="meal-rescue.html";
};
});

document.querySelectorAll(".gallery-grid img").forEach(img=>{
img.onclick=()=>{
const pop=document.createElement("div");
pop.style="position:fixed;inset:0;background:rgba(0,0,0,.8);display:grid;place-items:center;z-index:9999";
pop.innerHTML=`<img src="${img.src}" style="max-width:90%;max-height:90%;border-radius:25px">`;
document.body.appendChild(pop);
pop.onclick=()=>pop.remove();
};
});

document.querySelectorAll(".person").forEach(c=>{
c.onclick=()=>alert("Thank you for supporting the FoodyZen community ❤️");
});