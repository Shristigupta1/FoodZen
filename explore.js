const meals=document.querySelectorAll(".meal-card");
const search=document.getElementById("searchMeal");
const filters=document.querySelectorAll(".filter");
const cartBtns=document.querySelectorAll(".cart");
const favBtns=document.querySelectorAll(".fav");
const cartCount=document.getElementById("cartCount");
let cart=0;
search.addEventListener("keyup",()=>{
const value=search.value.toLowerCase();
meals.forEach(meal=>{
const name=meal.querySelector("h3").innerText.toLowerCase();
meal.style.display=name.includes(value)?"block":"none";
});
});

favBtns.forEach(btn=>{
btn.addEventListener("click",()=>{
btn.classList.toggle("fa-regular");
btn.classList.toggle("fa-solid");
btn.style.color=btn.classList.contains("fa-solid")?"#ff4d4d":"#888";
});
});

cartBtns.forEach(btn=>{
btn.addEventListener("click",()=>{
cart++;
cartCount.innerText=cart;
btn.innerHTML="✓ Added";
btn.style.background="#2FBF71";
setTimeout(()=>{
btn.innerHTML="Add to Cart";
btn.style.background="#A56A43";
},1200);
});
});
const mealData=[
{name:"Healthy Power Bowl",price:"249",rating:"4.9",image:"meal-card8.png",desc:"Fresh vegetables and quinoa bowl."},
{name:"Protein Bowl",price:"299",rating:"4.8",image:"meal-card9.png",desc:"Chicken and brown rice."},
{name:"Vegan Salad",price:"199",rating:"4.7",image:"meal-card10.png",desc:"Fresh organic vegetables."},
{name:"Paneer Wrap",price:"179",rating:"4.8",image:"meal-card11.png",desc:"High protein paneer wrap."},
{name:"Italian Pasta",price:"269",rating:"4.9",image:"assets/images/meal-card5.png",desc:"Creamy white sauce pasta."},
{name:"Veg Pizza",price:"329",rating:"4.8",image:"assets/images/meal-card6.png",desc:"Loaded vegetable pizza."},
{name:"Fruit Bowl",price:"149",rating:"4.9",image:"meal-card6.png",desc:"Seasonal fresh fruits."},
{name:"Chicken Burger",price:"229",rating:"4.8",image:"meal-card7.png",desc:"Grilled chicken burger."},
{name:"Grilled Fish",price:"399",rating:"4.9",image:"meal-card3.png",desc:"Fresh grilled fish."},
{name:"South Indian Combo",price:"189",rating:"4.7",image:"meal-card4.png",desc:"Idli & Dosa Combo."},
{name:"Chocolate Cake",price:"159",rating:"4.9",image:"meal-card1.png",desc:"Premium chocolate cake."},
{name:"Smoothie Bowl",price:"219",rating:"5.0",image:"meal-card2.png",desc:"Healthy smoothie bowl."}
];

meals.forEach((meal,index)=>{
meal.addEventListener("click",function(e){
if(e.target.closest(".cart")||e.target.closest(".fav")) return;
localStorage.setItem("selectedMeal",JSON.stringify(mealData[index]));
window.location.href="meal-details.html";
});
});
const zen=document.getElementById("zenFloat");

if(zen){

zen.onclick=function(){

window.location.href="zen-ai.html";

};

}