const claimBtns=document.querySelectorAll(".claim");
const heroStats=document.querySelectorAll(".hero-stats h2");
const impactStats=document.querySelectorAll(".impact-grid h1");

const toast=document.createElement("div");
toast.className="toast";
toast.style.cssText="position:fixed;top:20px;right:20px;background:#2FBF71;color:#fff;padding:18px 28px;border-radius:15px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,.2);opacity:0;transition:.4s;z-index:9999;";
document.body.appendChild(toast);

function showToast(msg){
toast.innerHTML=msg;
toast.style.opacity="1";
setTimeout(()=>{
toast.style.opacity="0";
},2200);
}

let claimedMeals=JSON.parse(localStorage.getItem("claimedMeals"))||[];

claimBtns.forEach(btn=>{

btn.onclick=function(){

const card=btn.closest(".meal-card");

const meal={
name:card.querySelector("h3").innerText,
restaurant:card.querySelectorAll("p")[0].innerText,
location:card.querySelectorAll("p")[1].innerText,
time:card.querySelectorAll("p")[3].innerText
};

claimedMeals.push(meal);

localStorage.setItem("claimedMeals",JSON.stringify(claimedMeals));

btn.innerHTML="✓ Claimed";
btn.disabled=true;
btn.style.background="#2FBF71";

showToast("🍱 Meal Claimed Successfully");

};

});

function animate(el){

const target=parseInt(el.innerText);

let count=0;

const speed=Math.ceil(target/60);

const timer=setInterval(()=>{

count+=speed;

if(count>=target){

count=target;

clearInterval(timer);

}

el.innerHTML=el.innerText.includes("+")?count+"+":count;

},25);

}

heroStats.forEach(animate);

impactStats.forEach(animate);

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

},{threshold:.2});

document.querySelectorAll("section,.meal-card,.story-card,.box").forEach(item=>{

item.style.opacity="0";
item.style.transform="translateY(40px)";
item.style.transition=".7s";

observer.observe(item);

});
const requestBtn=document.getElementById("requestFood");
const volunteerBtn=document.getElementById("joinVolunteer");
const donationForm=document.getElementById("donationForm");

if(requestBtn){

requestBtn.onclick=function(){

const name=document.getElementById("requestName").value.trim();
const phone=document.getElementById("requestPhone").value.trim();
const meals=document.getElementById("requestMeals").value.trim();
const location=document.getElementById("requestLocation").value.trim();

if(name==""||phone==""||meals==""||location==""){
alert("Please fill all fields");
return;
}

const request={
id:"REQ"+Math.floor(Math.random()*90000+10000),
name:name,
phone:phone,
meals:meals,
location:location,
time:new Date().toLocaleString()
};

let requests=JSON.parse(localStorage.getItem("foodRequests"))||[];

requests.push(request);

localStorage.setItem("foodRequests",JSON.stringify(requests));

showToast("🚨 Emergency Request Sent");

requestBtn.innerHTML="✓ Request Sent";

requestBtn.disabled=true;

setTimeout(()=>{
requestBtn.innerHTML="Request Emergency Food";
requestBtn.disabled=false;
document.getElementById("requestName").value="";
document.getElementById("requestPhone").value="";
document.getElementById("requestMeals").value="";
document.getElementById("requestLocation").value="";
},2500);

};

}

if(volunteerBtn){

volunteerBtn.onclick=function(){

const name=document.getElementById("volunteerName").value.trim();
const phone=document.getElementById("volunteerPhone").value.trim();
const city=document.getElementById("volunteerCity").value.trim();

if(name==""||phone==""||city==""){
alert("Please fill volunteer details");
return;
}

const volunteer={
id:"VOL"+Math.floor(Math.random()*90000+10000),
name:name,
phone:phone,
city:city
};

let volunteers=JSON.parse(localStorage.getItem("volunteers"))||[];

volunteers.push(volunteer);

localStorage.setItem("volunteers",JSON.stringify(volunteers));

showToast("❤️ Welcome "+name);

volunteerBtn.innerHTML="✓ Joined";

volunteerBtn.disabled=true;

setTimeout(()=>{
volunteerBtn.innerHTML="Join Volunteer Team";
volunteerBtn.disabled=false;
document.getElementById("volunteerName").value="";
document.getElementById("volunteerPhone").value="";
document.getElementById("volunteerCity").value="";
},2500);

};

}

if(donationForm){

donationForm.onsubmit=function(e){

e.preventDefault();

const restaurant=document.getElementById("restaurant").value.trim();
const food=document.getElementById("foodName").value.trim();
const quantity=document.getElementById("quantity").value.trim();
const location=document.getElementById("location").value.trim();
const description=document.getElementById("description").value.trim();

if(restaurant==""||food==""||quantity==""||location==""||description==""){
alert("Please fill all fields");
return;
}

const donation={
id:"DON"+Math.floor(Math.random()*90000+10000),
restaurant:restaurant,
food:food,
quantity:quantity,
location:location,
description:description,
time:new Date().toLocaleString()
};

let donations=JSON.parse(localStorage.getItem("donations"))||[];

donations.push(donation);

localStorage.setItem("donations",JSON.stringify(donations));

document.getElementById("donationMsg").innerHTML="✅ Donation Submitted Successfully";

showToast("🎉 Thank You For Donating Food");

donationForm.reset();

};

}
const askZen=document.getElementById("askZen");
const rescueInput=document.getElementById("rescueInput");
const zenReply=document.getElementById("zenReply");
const quickBtns=document.querySelectorAll(".quick");
const openMap=document.getElementById("openMap");
const feed=document.querySelector(".feed");

const aiReplies={
food:"🍱 There are 45 rescue meals available near your location.",
ngo:"🤝 Nearby NGOs: Hope Foundation, Smile Trust and CareBridge.",
volunteer:"❤️ Volunteers collect meals and deliver them safely.",
restaurant:"🏪 Restaurants can donate surplus meals using the form below.",
location:"📍 Click 'Open Rescue Map' to view nearby rescue centers.",
map:"🗺️ Opening nearby rescue locations.",
donate:"🍛 Restaurants can donate food in less than 2 minutes.",
help:"🚨 Fill the Emergency Food Request form to receive assistance.",
hello:"👋 Hello! I'm Zen Rescue AI. How can I help you today?"
};

if(askZen){

askZen.onclick=function(){

const text=rescueInput.value.toLowerCase().trim();

zenReply.style.display="block";

if(text.includes("food"))
zenReply.innerHTML=aiReplies.food;

else if(text.includes("ngo"))
zenReply.innerHTML=aiReplies.ngo;

else if(text.includes("volunteer"))
zenReply.innerHTML=aiReplies.volunteer;

else if(text.includes("restaurant"))
zenReply.innerHTML=aiReplies.restaurant;

else if(text.includes("location"))
zenReply.innerHTML=aiReplies.location;

else if(text.includes("map"))
zenReply.innerHTML=aiReplies.map;

else if(text.includes("donate"))
zenReply.innerHTML=aiReplies.donate;

else if(text.includes("help"))
zenReply.innerHTML=aiReplies.help;

else if(text.includes("hello")||text.includes("hi"))
zenReply.innerHTML=aiReplies.hello;

else
zenReply.innerHTML="🤖 Sorry, I couldn't understand. Try asking about food, NGO, volunteer, map or donation.";

};

}

quickBtns.forEach(btn=>{

btn.onclick=function(){

rescueInput.value=this.innerText;

askZen.click();

};

});

if(openMap){

openMap.onclick=function(){

showToast("📍 Opening Google Maps");

setTimeout(()=>{

window.open("https://maps.google.com","_blank");

},700);

};

}

if(feed){

const updates=[

"🍱 Green Leaf Cafe donated 15 meals",

"🚚 Volunteer Rahul picked up meals",

"❤️ Hope Foundation received dinner",

"🥗 Fresh Bites donated healthy salads",

"🍛 Urban Kitchen donated lunch",

"🏠 Meals delivered successfully",

"🤝 New restaurant joined FoodyZen",

"📦 Food rescue completed"

];

setInterval(()=>{

const item=document.createElement("div");

item.className="feed-item";

item.innerHTML=updates[Math.floor(Math.random()*updates.length)]+" <span>Just Now</span>";

feed.appendChild(item);

if(feed.children.length>6){

feed.removeChild(feed.children[1]);

}

},8000);

}
window.addEventListener("load",()=>{

showToast("👋 Welcome to FoodyZen Meal Rescue");

const claimed=JSON.parse(localStorage.getItem("claimedMeals"))||[];

claimBtns.forEach(btn=>{

const card=btn.closest(".meal-card");

const mealName=card.querySelector("h3").innerText;

claimed.forEach(item=>{

if(item.name===mealName){

btn.innerHTML="✓ Claimed";

btn.disabled=true;

btn.style.background="#2FBF71";

}

});

});

});

const badge=document.createElement("div");

badge.style.position="fixed";
badge.style.bottom="25px";
badge.style.left="25px";
badge.style.background="#A56A43";
badge.style.color="#fff";
badge.style.padding="15px 25px";
badge.style.borderRadius="50px";
badge.style.fontWeight="700";
badge.style.boxShadow="0 10px 30px rgba(0,0,0,.2)";
badge.style.zIndex="9999";
badge.innerHTML="🏆 Food Hero";
document.body.appendChild(badge);

setTimeout(()=>{

badge.style.opacity="0";

},5000);

let achievements=0;

claimBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

achievements++;

if(achievements==3){

showToast("🏅 Achievement Unlocked : Food Hero");

}

if(achievements==5){

showToast("🥇 Achievement Unlocked : Rescue Champion");

}

});

});

const topBtn=document.createElement("button");

topBtn.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

topBtn.style.position="fixed";
topBtn.style.bottom="30px";
topBtn.style.right="30px";
topBtn.style.width="55px";
topBtn.style.height="55px";
topBtn.style.border="none";
topBtn.style.borderRadius="50%";
topBtn.style.background="#A56A43";
topBtn.style.color="#fff";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.fontSize="20px";
topBtn.style.zIndex="9999";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}
else{

topBtn.style.display="none";

}

});

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};

setInterval(()=>{

const meal=document.getElementById("mealCount");

const family=document.getElementById("familyCount");

const volunteer=document.getElementById("volunteerCount");

const restaurant=document.getElementById("restaurantCount");

meal.innerHTML=parseInt(meal.innerHTML)+1;

family.innerHTML=parseInt(family.innerHTML)+1;

volunteer.innerHTML=parseInt(volunteer.innerHTML)+1;

restaurant.innerHTML=parseInt(restaurant.innerHTML)+1;

},30000);

console.log("FoodyZen Meal Rescue Loaded Successfully");
const zen=document.getElementById("zenFloat");

if(zen){

zen.onclick=function(){

window.location.href="zen-ai.html";

};

}