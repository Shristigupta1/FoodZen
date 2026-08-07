const goal=document.getElementById("goal");
const btn=document.getElementById("generatePlan");
const result=document.getElementById("result");

const plans={
"Weight Loss":{
img:"meal-card10.png",
name:"Vegan Salad",
desc:"Low calorie salad with fresh vegetables and healthy fats.",
cal:"1600",
protein:"90g",
carbs:"150g",
water:"3L",
breakfast:"Oats with Fruits",
lunch:"Vegan Salad",
snacks:"Mixed Nuts",
dinner:"Grilled Vegetables"
},
"Muscle Gain":{
img:"meal-card9.png",
name:"Protein Bowl",
desc:"Chicken, brown rice and vegetables packed with protein.",
cal:"2800",
protein:"180g",
carbs:"300g",
water:"4L",
breakfast:"Eggs & Toast",
lunch:"Protein Bowl",
snacks:"Protein Shake",
dinner:"Chicken Breast & Rice"
},
"Healthy Lifestyle":{
img:"meal-card8.png",
name:"Healthy Power Bowl",
desc:"Balanced nutrition with quinoa and fresh vegetables.",
cal:"2200",
protein:"120g",
carbs:"220g",
water:"3.5L",
breakfast:"Fruit Smoothie",
lunch:"Healthy Power Bowl",
snacks:"Greek Yogurt",
dinner:"Grilled Fish"
},
"High Protein":{
img:"meal-card11.png",
name:"Paneer Wrap",
desc:"High protein paneer wrap with fresh vegetables.",
cal:"2500",
protein:"170g",
carbs:"180g",
water:"3.5L",
breakfast:"Paneer Sandwich",
lunch:"Paneer Wrap",
snacks:"Boiled Eggs",
dinner:"Grilled Chicken"
},
"Low Carb":{
img:"meal-card3.png",
name:"Grilled Fish",
desc:"Fresh grilled fish with steamed vegetables.",
cal:"1800",
protein:"140g",
carbs:"80g",
water:"3L",
breakfast:"Omelette",
lunch:"Grilled Fish",
snacks:"Almonds",
dinner:"Chicken Salad"
}
};

btn.onclick=function(){

if(goal.value===""){
alert("Please select your goal.");
return;
}

const meal=plans[goal.value];

result.innerHTML=`
<div class="plan-card">
<img src="${meal.img}">
<h2>${meal.name}</h2>
<p>${meal.desc}</p>
<span>${meal.cal} kcal</span>
</div>
`;

document.getElementById("calories").innerHTML=meal.cal+" kcal";
document.getElementById("protein").innerHTML=meal.protein;
document.getElementById("carbs").innerHTML=meal.carbs;
document.getElementById("water").innerHTML=meal.water;
document.getElementById("breakfast").innerHTML=meal.breakfast;
document.getElementById("lunch").innerHTML=meal.lunch;
document.getElementById("snacks").innerHTML=meal.snacks;
document.getElementById("dinner").innerHTML=meal.dinner;

result.scrollIntoView({behavior:"smooth"});

};
const zen=document.getElementById("zenFloat");

if(zen){

zen.onclick=function(){

window.location.href="zen-ai.html";

};

}