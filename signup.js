const form=document.getElementById("signupForm");

const fullName=document.getElementById("name");

const email=document.getElementById("email");

const phone=document.getElementById("phone");

const password=document.getElementById("password");

const confirmPassword=document.getElementById("confirmPassword");

const togglePassword=document.getElementById("togglePassword");

const signupBtn=document.querySelector(".signup-btn");

const strengthBar=document.querySelector(".strength-bar");

const strengthText=document.getElementById("strengthText");

const terms=document.getElementById("terms");
togglePassword.addEventListener("click",()=>{

if(password.type==="password"){

password.type="text";

confirmPassword.type="text";

togglePassword.classList.remove("fa-eye");

togglePassword.classList.add("fa-eye-slash");

}

else{

password.type="password";

confirmPassword.type="password";

togglePassword.classList.remove("fa-eye-slash");

togglePassword.classList.add("fa-eye");

}

});
password.addEventListener("input",()=>{

const value=password.value;

let strength=0;

if(value.length>=8){

strength++;

}

if(/[A-Z]/.test(value)){

strength++;

}

if(/[0-9]/.test(value)){

strength++;

}

if(/[!@#$%^&*]/.test(value)){

strength++;

}

if(strength===1){

strengthBar.style.width="25%";

strengthBar.style.background="#ff4d4d";

strengthText.innerHTML="Weak Password";

}

else if(strength===2){

strengthBar.style.width="50%";

strengthBar.style.background="#ff9800";

strengthText.innerHTML="Medium Password";

}

else if(strength===3){

strengthBar.style.width="75%";

strengthBar.style.background="#4CAF50";

strengthText.innerHTML="Strong Password";

}

else if(strength===4){

strengthBar.style.width="100%";

strengthBar.style.background="#2E7D32";

strengthText.innerHTML="Very Strong Password";

}

else{

strengthBar.style.width="0%";

strengthText.innerHTML="Password Strength";

}

});
form.addEventListener("submit",(e)=>{

e.preventDefault();

const nameValue=fullName.value.trim();

const emailValue=email.value.trim();

const phoneValue=phone.value.trim();

const passwordValue=password.value.trim();

const confirmValue=confirmPassword.value.trim();

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phonePattern=/^[6-9]\d{9}$/;

if(nameValue===""){

alert("Please enter your full name.");

fullName.focus();

return;

}

if(!emailPattern.test(emailValue)){

alert("Please enter a valid email address.");

email.focus();

return;

}

if(!phonePattern.test(phoneValue)){

alert("Please enter a valid 10-digit phone number.");

phone.focus();

return;

}

if(passwordValue.length<8){

alert("Password must be at least 8 characters.");

password.focus();

return;

}

if(passwordValue!==confirmValue){

alert("Passwords do not match.");

confirmPassword.focus();

return;

}

if(!terms.checked){

alert("Please accept the Terms & Conditions.");

return;

}

signupBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

signupBtn.disabled=true;

setTimeout(createAccount,1500);

});
function createAccount(){

localStorage.setItem("foodyzenName",fullName.value);

localStorage.setItem("foodyzenEmail",email.value);

localStorage.setItem("foodyzenPhone",phone.value);

const success=document.createElement("div");

success.innerHTML="🎉 Account Created Successfully";

success.style.position="fixed";

success.style.top="20px";

success.style.right="20px";

success.style.background="#2FBF71";

success.style.color="#fff";

success.style.padding="18px 28px";

success.style.borderRadius="15px";

success.style.fontWeight="700";

success.style.boxShadow="0 10px 30px rgba(0,0,0,.2)";

success.style.zIndex="99999";

document.body.appendChild(success);

setTimeout(()=>{

window.location.href="login.html";

},1800);

}
confirmPassword.addEventListener("input",()=>{

if(confirmPassword.value==="") return;

if(password.value===confirmPassword.value){

confirmPassword.style.borderColor="#2FBF71";

}

else{

confirmPassword.style.borderColor="#ff4d4d";

}

});

[fullName,email,phone,password,confirmPassword].forEach(input=>{

input.addEventListener("focus",()=>{

input.style.boxShadow="0 0 0 4px rgba(165,106,67,.15)";

});

input.addEventListener("blur",()=>{

input.style.boxShadow="none";

});

});

window.addEventListener("load",()=>{

const savedEmail=localStorage.getItem("foodyzenEmail");

if(savedEmail){

email.value=savedEmail;

}

});

phone.addEventListener("input",()=>{

phone.value=phone.value.replace(/\D/g,"").slice(0,10);

});

fullName.addEventListener("input",()=>{

fullName.value=fullName.value.replace(/[^a-zA-Z\s]/g,"");

});

const inputs=document.querySelectorAll(".input-box input");

inputs.forEach(input=>{

input.addEventListener("keyup",(e)=>{

if(e.key==="Enter"){

const formInputs=[...inputs];

const index=formInputs.indexOf(input);

if(index<formInputs.length-1){

formInputs[index+1].focus();

}else{

signupBtn.click();

}

}

});

});