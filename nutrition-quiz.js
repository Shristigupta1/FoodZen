const q=document.getElementById("question"),
o=document.getElementById("options"),
score=document.getElementById("score"),
next=document.getElementById("next");

const quiz=[
{
q:"Which fruit is richest in Vitamin C?",
a:["Apple","Orange","Banana","Grapes"],
c:1
},
{
q:"How much water should an adult drink daily?",
a:["500ml","1L","2L","5L"],
c:2
},
{
q:"Which food is highest in protein?",
a:["Chicken","Rice","Potato","Sugar"],
c:0
},
{
q:"Healthy fat comes from?",
a:["Avocado","Candy","Cola","Cake"],
c:0
},
{
q:"Which is healthiest?",
a:["Burger","Pizza","Salad","Fries"],
c:2
}
];

let i=0,s=0;

load();

function load(){

q.innerHTML=quiz[i].q;

o.innerHTML="";

quiz[i].a.forEach((x,n)=>{

const d=document.createElement("div");

d.className="option";

d.innerHTML=x;

d.onclick=()=>{

if(n==quiz[i].c){

s+=10;

score.innerHTML=s;

d.style.background="#2FBF71";

}else{

d.style.background="#ff5c5c";

}

};

o.appendChild(d);

});

}

next.onclick=()=>{

i++;

if(i>=quiz.length){

const xp=s;
const coins=Math.floor(s/2);

localStorage.setItem("quizXP",xp);

alert(`🏆 Quiz Finished

⭐ Score : ${s}

✨ XP : ${xp}

🪙 Coins : ${coins}`);

location.reload();

return;

}

load();

};