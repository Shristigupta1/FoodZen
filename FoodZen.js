const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>30){

navbar.style.boxShadow="0 15px 35px rgba(0,0,0,.08)";

}else{

navbar.style.boxShadow="none";

}

});

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

const target=Number(counter.dataset.target);

let count=0;

const update=()=>{

const increment=Math.ceil(target/150);

count+=increment;

if(count<target){

counter.innerHTML=count;

requestAnimationFrame(update);

}else{

counter.innerHTML=target.toLocaleString()+"+";

}

};

update();

});

const chatBody=document.getElementById("chatBody");

const userInput=document.getElementById("userInput");

const sendBtn=document.getElementById("sendBtn");

const typing=document.getElementById("typing");

const voiceBtn=document.getElementById("voiceBtn");

const quickBtns=document.querySelectorAll(".quick-btn");

let memory={

name:"",

vegetarian:false,

vegan:false,

goal:""

};

function addMessage(text,type){

const div=document.createElement("div");

div.className=type==="user"?"user-message":"bot-message";

div.innerHTML=text;

chatBody.appendChild(div);

chatBody.scrollTop=chatBody.scrollHeight;

}

function showTyping(){

typing.style.display="flex";

}

function hideTyping(){

typing.style.display="none";

}
function sendMessage(){

const text=userInput.value.trim();

if(text==="") return;

addMessage(text,"user");

userInput.value="";

showTyping();

setTimeout(()=>{

hideTyping();

botReply(text);

},900);

}

sendBtn.addEventListener("click",sendMessage);

userInput.addEventListener("keypress",e=>{

if(e.key==="Enter"){

sendMessage();

}

});

function botReply(text){

let message=text.toLowerCase();

let reply="";

if(message.includes("my name is")){

memory.name=text.split("is")[1].trim();

reply=`😊 Nice to meet you <b>${memory.name}</b>.`;

}

else if(message.includes("hello")||message.includes("hi")){

reply=`👋 Hello ${memory.name||"Friend"}! How can I help you today?`;

}

else if(message.includes("vegetarian")){

memory.vegetarian=true;

reply="🌱 Great! I'll recommend only vegetarian meals.";

}

else if(message.includes("vegan")){

memory.vegan=true;

reply="🥬 Vegan mode activated.";

}

else if(message.includes("healthy")){

reply=`

<div class="meal-card">

<img src="meal-card2.png" alt="Protein Bowl">

<h3>Protein Bowl</h3>

<p>💪 42g Protein</p>

<p>₹249</p>

<p>⭐⭐⭐⭐⭐</p>

<button>Add to Cart</button>

</div>

`;
}

else if(message.includes("protein")){

if(memory.vegetarian){

reply="💪 Paneer Protein Bowl • Soy Rice Bowl • Quinoa Bowl ";


}else{

reply="🍗 Chicken Bowl • Fish Bowl • Paneer Bowl";

}

}

else if(message.includes("donate")){

reply="❤️ Thank you for helping. Every donation provides meals to families.";

}

else if(message.includes("rescue")){

reply="🚨 Meal Rescue is available 24×7. A nearby volunteer will assist you.";

}

else if(message.includes("track")){

reply="📦 Your order is being prepared. Estimated delivery: 18 minutes.";

}

else if(message.includes("volunteer")){

reply="🤝 You can register from the Volunteer page.";

}

else if(message.includes("who am i")){

reply=`

😊<br><br>

Name : ${memory.name||"Unknown"}<br>

Vegetarian : ${memory.vegetarian?"Yes":"No"}<br>

Vegan : ${memory.vegan?"Yes":"No"}

`;

}

else{

reply=`

🤖 I didn't understand that.<br><br>

Try asking:<br>

🥗 Healthy Meal<br>

💪 Protein Meal<br>

❤️ Donate<br>

🚨 Rescue<br>

📦 Track Order

`;

}

addMessage(reply,"bot");

}
if(voiceBtn){

const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;

if(SpeechRecognition){

const recognition=new SpeechRecognition();

recognition.lang="en-US";

recognition.interimResults=false;

recognition.continuous=false;

voiceBtn.addEventListener("click",()=>{

recognition.start();

voiceBtn.innerHTML="🎙️";

});

recognition.onresult=(event)=>{

const text=event.results[0][0].transcript;

userInput.value=text;

sendMessage();

};

recognition.onend=()=>{

voiceBtn.innerHTML="🎤";

};

}

}

function speak(text){

if(!("speechSynthesis" in window)) return;

speechSynthesis.cancel();

const speech=new SpeechSynthesisUtterance();

speech.text=text.replace(/<[^>]*>/g,"");

speech.lang="en-US";

speech.rate=1;

speech.pitch=1;

speech.volume=1;

speechSynthesis.speak(speech);

}

const oldBotReply=botReply;

botReply=function(text){

oldBotReply(text);

setTimeout(()=>{

const bots=document.querySelectorAll(".bot-message");

const last=bots[bots.length-1];

if(last){

speak(last.innerText);

}

},200);

};

quickBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

userInput.value=btn.innerText;

sendMessage();

});

});

window.addEventListener("load",()=>{

setTimeout(()=>{

addMessage("👋 Welcome to <b>FoodyZen</b>.<br><br>I'm Zen. Ask me about meals, nutrition, donations or meal rescue.","bot");

},700);

});
const mealReplies={

healthy:`
<div class="meal-card">
<img src="meal-card1.png">
<h3>Healthy Bowl</h3>
<p>🥗 520 Calories</p>
<p>💪 28g Protein</p>
<p>⭐ 4.9 Rating</p>
<button class="order-btn">Order Now</button>
</div>
`,

protein:`
<div class="meal-card">
<img src="meal-card2.png">
<h3>Protein Power Bowl</h3>
<p>💪 42g Protein</p>
<p>🔥 610 Calories</p>
<p>₹249</p>
<button class="order-btn">Add to Cart</button>
</div>
`,

donate:`
<div class="donation-card">
<h3>❤️ Share A Meal</h3>
<p>₹500 provides 8 meals.</p>
<button class="donate-btn">Donate Now</button>
</div>
`,

track:`
<div class="track-card">
<h3>📦 Order Status</h3>
<div class="progress">
<div class="progress-fill"></div>
</div>
<p>Cooking...18 mins left.</p>
</div>
`,

rescue:`
<div class="rescue-card">
<h3>🚨 Emergency Meal Rescue</h3>
<p>Nearest volunteer available.</p>
<button class="rescue-btn">Request Help</button>
</div>
`

};

document.addEventListener("click",function(e){

if(e.target.classList.contains("quick-btn")){

const text=e.target.innerText.toLowerCase();

setTimeout(()=>{

const bots=document.querySelectorAll(".bot-message");

const last=bots[bots.length-1];

if(!last) return;

if(text.includes("healthy")){

last.innerHTML=mealReplies.healthy;

}

else if(text.includes("donate")){

last.innerHTML=mealReplies.donate;

}

else if(text.includes("track")){

last.innerHTML=mealReplies.track;

}

else if(text.includes("rescue")){

last.innerHTML=mealReplies.rescue;

}

},1200);

}

});

document.addEventListener("click",function(e){

if(e.target.classList.contains("order-btn")){

alert("Meal added to cart.");

}

if(e.target.classList.contains("donate-btn")){

alert("Thank you ❤️");

}

if(e.target.classList.contains("rescue-btn")){

alert("Volunteer has been notified.");

}

});
const aiKnowledge={

breakfast:"🍳 Try Oats Bowl, Veg Sandwich and Fresh Juice.",

lunch:"🍛 Paneer Rice Bowl, Dal Rice and Mixed Salad are great choices.",

dinner:"🥗 Light dinner: Soup, Quinoa Bowl and Grilled Vegetables.",

calories:"🔥 A balanced meal usually contains 450–650 calories.",

bmi:"⚖️ BMI = Weight (kg) / Height² (m).",

water:"💧 Drink around 2–3 litres of water daily.",

weight:"🏃 Weight loss requires a calorie deficit and regular exercise.",

muscle:"💪 Muscle gain needs protein-rich meals and strength training.",

diabetes:"🍽️ Choose high-fibre foods, avoid sugary drinks and control portions.",

heart:"❤️ Eat more fruits, vegetables and whole grains.",

protein:"💪 Good protein sources are Paneer, Chicken, Eggs, Soybean and Lentils.",

vegan:"🥬 Vegan meals available: Tofu Bowl, Veg Salad and Quinoa Bowl.",

vegetarian:"🌱 Vegetarian meals available: Paneer Bowl, Veg Biryani and Dal Rice.",

donation:"❤️ Every ₹100 can help provide a nutritious meal to someone in need.",

rescue:"🚨 Meal Rescue connects volunteers with people who need food urgently.",

volunteer:"🤝 Volunteers help deliver meals and support rescue requests."

};

const oldReply=botReply;

botReply=function(text){

const msg=text.toLowerCase();

oldReply(text);

setTimeout(()=>{

const bots=document.querySelectorAll(".bot-message");

const last=bots[bots.length-1];

if(!last) return;

Object.keys(aiKnowledge).forEach(key=>{

if(msg.includes(key)){

last.innerHTML=aiKnowledge[key];

}

});

},1300);

};
const cart=[];

document.addEventListener("click",function(e){

if(e.target.classList.contains("order-btn")){

cart.push({

name:"Healthy Meal"

});

alert("✅ Meal added to cart.\n\nItems : "+cart.length);

}

if(e.target.classList.contains("donate-btn")){

let amount=prompt("Enter donation amount (₹)");

if(amount){

alert("❤️ Thank you!\n\n₹"+amount+" donation successful.");

}

}

if(e.target.classList.contains("rescue-btn")){

let name=prompt("Your Name");

let phone=prompt("Phone Number");

let location=prompt("Your Location");

if(name && phone && location){

alert(

"🚨 Rescue Request Submitted\n\n"+

"Name : "+name+

"\nPhone : "+phone+

"\nLocation : "+location+

"\n\nNearest volunteer has been notified."

);

}

}

});
let orderStatus=[

"Order Received",

"Preparing",

"Cooking",

"Out for Delivery",

"Delivered"

];

function startTracking(){

let i=0;

const interval=setInterval(()=>{

if(i>=orderStatus.length){

clearInterval(interval);

return;

}

const bots=document.querySelectorAll(".bot-message");

const last=bots[bots.length-1];

if(last){

last.innerHTML=`

<div class="track-card">

<h3>📦 ${orderStatus[i]}</h3>

<div class="progress">

<div class="progress-fill"

style="width:${(i+1)*20}%">

</div>

</div>

</div>

`;

}

i++;

},2000);

}

document.addEventListener("click",function(e){

if(e.target.classList.contains("quick-btn")){

if(e.target.innerText.includes("Track")){

setTimeout(startTracking,1200);

}

}

});
const newsletterBtn=document.querySelector(".newsletter-form button");
const newsletterInput=document.querySelector(".newsletter-form input");

if(newsletterBtn){

newsletterBtn.addEventListener("click",()=>{

const email=newsletterInput.value.trim();

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email===""){

alert("Please enter your email.");

return;

}

if(!emailPattern.test(email)){

alert("Please enter a valid email address.");

return;

}

alert("🎉 Thank you for subscribing to FoodyZen!");

newsletterInput.value="";

});

}

document.querySelectorAll(".store-btn").forEach(button=>{

button.addEventListener("click",(e)=>{

e.preventDefault();

alert("📱 Mobile App Coming Soon!");

});

});

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.right="25px";
topBtn.style.bottom="25px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.border="none";
topBtn.style.borderRadius="50%";
topBtn.style.background="#A56A43";
topBtn.style.color="#fff";
topBtn.style.fontSize="22px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.zIndex="999";
topBtn.style.boxShadow="0 10px 25px rgba(0,0,0,.2)";

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

document.querySelectorAll('a[href="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

});

});

const reveal=document.querySelectorAll(".feature-card,.impact-card,.floating-card,.download-box,.newsletter,.zen-left,.chat-box");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.2
});

reveal.forEach(item=>{

item.style.opacity="0";
item.style.transform="translateY(50px)";
item.style.transition=".8s";

observer.observe(item);

});
const zen=document.getElementById("zenFloat");

if(zen){

zen.onclick=function(){

window.location.href="zen-ai.html";

};

}