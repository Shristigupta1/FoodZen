const memory={
mood:localStorage.getItem("mood")||"",
xp:localStorage.getItem("xp")||120,
coins:localStorage.getItem("coins")||80,
badge:localStorage.getItem("badge")||"Starter",
recipe:localStorage.getItem("recipe")||"Healthy Bowl",
visit:new Date().toLocaleDateString()
};

localStorage.setItem("visit",memory.visit);

function saveMemory(){

localStorage.setItem("mood",memory.mood);

localStorage.setItem("xp",memory.xp);

localStorage.setItem("coins",memory.coins);

localStorage.setItem("badge",memory.badge);

localStorage.setItem("recipe",memory.recipe);

}