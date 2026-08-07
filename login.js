const form=document.getElementById("loginForm");

const email=document.getElementById("email");

const password=document.getElementById("password");

const toggle=document.getElementById("togglePassword");

const loginBtn=document.querySelector(".login-btn");

toggle.addEventListener("click",()=>{

if(password.type==="password"){

password.type="text";

toggle.classList.remove("fa-eye");

toggle.classList.add("fa-eye-slash");

}else{

password.type="password";

toggle.classList.remove("fa-eye-slash");

toggle.classList.add("fa-eye");

}

});

form.addEventListener("submit",function(e){

e.preventDefault();

const emailValue=email.value.trim();

const passwordValue=password.value.trim();

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(emailValue===""){

alert("Please enter your email.");

email.focus();

return;

}

if(!emailPattern.test(emailValue)){

alert("Please enter a valid email address.");

email.focus();

return;

}

if(passwordValue===""){

alert("Please enter your password.");

password.focus();

return;

}

if(passwordValue.length<6){

alert("Password must be at least 6 characters.");

password.focus();

return;

}

loginBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

loginBtn.disabled=true;

setTimeout(()=>{

localStorage.setItem("foodyzenUser",emailValue);

alert("🎉 Login Successful!");

window.location.href="index.html";

},1800);

});
const loginLink=document.querySelector(".login-btn");

const currentUser=localStorage.getItem("foodyzenUser");

if(loginLink && currentUser){

loginLink.innerHTML=`<i class="fa-solid fa-user"></i> ${currentUser.split("@")[0]}`;

}
const food=document.querySelector(".food-image");

if(food){

food.addEventListener("mousemove",(e)=>{

const x=e.offsetX/food.clientWidth-0.5;

const y=e.offsetY/food.clientHeight-0.5;

food.style.transform=`rotateY(${x*18}deg) rotateX(${-y*18}deg) scale(1.05)`;

});

food.addEventListener("mouseleave",()=>{

food.style.transform="rotateY(0) rotateX(0) scale(1)";

});

}
loginBtn.addEventListener("click",function(e){

const circle=document.createElement("span");

const size=Math.max(this.clientWidth,this.clientHeight);

circle.style.width=size+"px";

circle.style.height=size+"px";

circle.style.left=e.offsetX-size/2+"px";

circle.style.top=e.offsetY-size/2+"px";

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});
form.addEventListener("submit",(e)=>{

e.preventDefault();

/* validation */

loginBtn.innerHTML="Logging in...";

setTimeout(()=>{

const success=document.createElement("div");

success.innerHTML="✅ Login Successful";

success.style.position="fixed";
success.style.top="20px";
success.style.right="20px";
success.style.maxWidth="320px";
success.style.background="#2FBF71";
success.style.color="#fff";
success.style.padding="18px 28px";
success.style.borderRadius="15px";
success.style.fontWeight="700";
success.style.boxShadow="0 10px 30px rgba(0,0,0,.15)";
success.style.zIndex="99999";

document.body.appendChild(success);

setTimeout(()=>{

window.location.href="index.html";

},1500);

},1000);

});