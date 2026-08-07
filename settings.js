const dark=document.getElementById("darkMode");
const notify=document.getElementById("notify");
const sound=document.getElementById("sound");
const lang=document.getElementById("language");
const clear=document.getElementById("clearData");
const logout=document.getElementById("logout");

if(localStorage.getItem("theme")=="dark"){
document.body.classList.add("dark");
dark.checked=true;
}

notify.checked=localStorage.getItem("notify")!="off";
sound.checked=localStorage.getItem("sound")!="off";

lang.value=localStorage.getItem("language")||"English";

dark.onchange=()=>{

document.body.classList.toggle("dark");

localStorage.setItem("theme",
dark.checked?"dark":"light");

};

notify.onchange=()=>{

localStorage.setItem("notify",
notify.checked?"on":"off");

alert(notify.checked?
"🔔 Notifications Enabled":
"🔕 Notifications Disabled");

};

sound.onchange=()=>{

localStorage.setItem("sound",
sound.checked?"on":"off");

alert(sound.checked?
"🔊 Sound Enabled":
"🔇 Sound Disabled");

};

lang.onchange=()=>{

localStorage.setItem("language",lang.value);

alert("🌍 Language changed to "+lang.value);

};

clear.onclick=()=>{

if(confirm("Clear all FoodyZen data?")){

localStorage.clear();

alert("✅ Data Cleared");

location.reload();

}

};

logout.onclick=()=>{

if(confirm("Logout from FoodyZen?")){

localStorage.removeItem("user");

location.href="login.html";

}

};
const theme=document.getElementById("themeBtn");

if(localStorage.getItem("theme")=="dark"){
document.body.classList.add("dark");
theme.innerHTML='<i class="fa-solid fa-sun"></i>';
}

theme.onclick=()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");
theme.innerHTML='<i class="fa-solid fa-sun"></i>';

}else{

localStorage.setItem("theme","light");
theme.innerHTML='<i class="fa-solid fa-moon"></i>';

}

};