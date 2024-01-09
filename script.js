const searchBox = document.querySelector('.searchBox');
const  searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Function to get recipies...(arrow function)
const fetchRecipies = async (queary) => {  //function me hm () mai parameter pass kr rahe hai aur parameter name hm kuch bhi de sakte hai jaise isme query diya... await() is always used with async function...
    recipeContainer.innerHTML = "<h2>Featching Recipes...</h2>";
    try {    //Try is used when recipie is prsent in API...
        const data =  await fetch(https://www.themealdb.com/api/json/v1/1/search.php?s=${queary}) //fetch() method starts the process of fetching a data... //await => it will wait until we get all data...after collecting all data at one time it will give us all data... write https:// in front of link 
        const response = await data.json(); //all the data come from fetch function(i.e. stored in data) that data we will convert to .json 

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => { //meals => the array present in api and foreach loop extract element one by one by array (meal)
            const recipeDiv = document.createElement('div');//createElement() => helps us to create HTML element in JS(here we create div)
            recipeDiv.classList.add('recipe'); //classList.add => add class element(i.e. recipe) for HTML element(div)
            recipeDiv.innerHTML =        //in div add other HTML elements by using innerHTML
            `             
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belogs to <span>${meal.strCategory}</span> Category</p>
            `                              // all this names like strMealThumb, strMeal, etc are  already defined in API
            const button = document.createElement('button'); //create button
            button.textContent = "View Recipe"; //create btn name
            recipeDiv.appendChild(button);

            // Adding EventListener to recipe button
            button.addEventListener('click', ()=>{
                openRecipePopup(meal);
            });

            recipeContainer.appendChild(recipeDiv); //it add element at last of recipeContainer
        });  
    } catch (error) {  //catch is used when recipie is prsent in API and show us a error...
        recipeContainer.innerHTML = "<h2>Error in Featching Recipes...</h2>";
    }
}

// Function to fetch ingredients and measurements
const fetchIngredents = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<=20; i++) {
        const ingredient = meal[strIngredient${i}]; //strIngredient1,strIngredient2... are name of ingredient stored in API
        if(ingredient) {
            const measure = meal[strMeasure${i}];
            ingredientsList += <li>${measure} ${ingredient}</li>
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="ingredientList">${fetchIngredents(meal)}</ul>
        <div>
            <h3>Instrctions:</h3>
            <p class="recipeInstructions">${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = "block"; // recipeDetailsContent ka parentElement hai recipe-details so isko hm block kr rahe hai...
    
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none"; //after clicking on (x) btn ingredient tap will close becz disply block is converted to display none property
});

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();// without e.preventDefault() after clicking serach btn o/p will come and go back in fraction of second(i.e. referesh done in fraction of second) but now by using this o/p will remain on screen(i.e. auto refresh not done)...
    const searchInput = searchBox.value.trim() //trim() means it will remove all extra spaces from search box..

    if(!searchInput) {            //without giving input if we search then this condition will apply...
        recipeContainer.innerHTML = <h2>Type the meal in the search box</h2>;
        return;
    }
    fetchRecipies(searchInput);
    // console.log("button click"); 
}
)
