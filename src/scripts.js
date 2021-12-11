// IMPORTS
import './styles.css';
import apiCalls from './apiCalls';
import ingredientsData from '../src/data/ingredients';
import recipeData from '../src/data/recipes';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';

// GLOBAL VARIABLES
const recipeList = recipeData.map(recipe => {
  return new Recipe(recipe);
});

const recipeRepository = new RecipeRepository(recipeList)
let recipeCards = []

// QUERY SELECTORS
const recipeSection = document.querySelector('.recipes-section-js');
const selectedRecipeView = document.querySelector('.individual-recipe-container-js');
const filterBar = document.querySelector('.filter-section-js');
const mainView = document.querySelector('.main-view-container-js');

// EVENT LISTENERS
window.addEventListener('load', displayAllRecipes);

recipeCards.forEach((card) => {
  card.addEventListener('click', function(e) {
    displaySelectedRecipe(e)
  });
});

// FUNCTIONS
function displayRecipes() {
  recipeSection.innerHTML = '';  recipeRepository.recipesToShow.forEach(recipe => {
    recipeSection.innerHTML += `
      <section class='recipe-card recipe-card-js' id='id${recipe.id}'>
         <img class='recipe-card-image' src=${recipe.image} alt='recipe image' class='recipe-photo'>
         <button class='favorite-button favorite-button-js'>FAVORITE</button>
         <p class='recipe-card-name'>${recipe.name}</p>
       </section>
     `;
  });
  recipeCards = document.querySelectorAll('.recipe-card-js');
  recipeCards.forEach((card) => {
    card.addEventListener('click', displaySelectedRecipe)
  });
}

function displayAllRecipes() {
  recipeRepository.addAllRecipesToRecipesToShow();
  displayRecipes();
}

function displaySelectedRecipe(e) {
  if(e.target.classList.value !== 'favorite-button-js') {
    const image = document.querySelector('.selected-recipe-photo-js');
    const name = document.querySelector('.selected-recipe-name-js');
    const costSection = document.querySelector('.cost-section-js');
    const instructionsSection = document.querySelector('.instructions-section-js');
    const ingredientListSection = document.querySelector('.ingredient-list-section-js')

    show([selectedRecipeView]);
    hide([mainView]);


    const recipeID = Number(e.target.parentNode.id.slice(2));
    const selectedRecipe = recipeRepository.recipeData.find((currentRecipe) => {
      return currentRecipe.id === recipeID;
    });
    const ingredientListElement = getIngredientListElement(e, selectedRecipe);

    const instructionsElement = getInstructionsElement(e, selectedRecipe);

    ingredientListSection.innerHTML += ingredientListElement;
    instructionsSection.innerHTML += instructionsElement
    image.src = selectedRecipe.image;
    name.innerText = selectedRecipe.name;

    // const ingredientElement = document.createElement('P');
    // const ingredientText = document.createTextNode(ingredientList);
    // ingredientElement.appendChild(ingredientText);
    // ingredientListSection.appendChild(ingredientElement);


    //we have ingredientNames in an array
    //we have ingredient objects in an array (the quanity and unit)
    //for each ingredient, we want to add a line to the innerText that says "ingredient name: quantity unit "

    // ingredientList.forEach(())
    // cost.innerText =
    // instructions.innerText =

    // const ingredientList = document.querySelector('.selected-recipe-ingredient-list-js');

    // selectedRecipe.ingredients.forEach((ingredient, index) => {
    //   ingredientListSection.innerText += `${ingredientNames[index]} ${ingredient.quanity.amount}${ingredient.quantity.unit}`
    // })
  }
}

function getIngredientListElement(e, selectedRecipe) {
  const ingredientListSection = document.querySelector('.ingredient-list-section-js')

  //reset ingredient list to empty
  ingredientListSection.innerHTML = '<h3>Ingredients</h3>';

  const ingredientNames = selectedRecipe.determineRecipeIngredients(ingredientsData);

  const ingredientListText = selectedRecipe.ingredients.reduce((acc, ingredient, index) => {
    acc += `${ingredientNames[index]}: ${ingredient.quantity.amount}${ingredient.quantity.unit}<br>`;
    return acc;
  }, '');

  return '<p class="selected-recipe-ingredients-list">' + ingredientListText + '</p>';
};

function getInstructionsElement(e, selectedRecipe) {
  const instructionsSection = document.querySelector('.instructions-section-js');

  instructionsSection.innerHTML = '<h3>Instructions</h3>'

  const instructionsStrings = selectedRecipe.returnInstructions();

  const instructionsText = instructionsStrings.reduce((acc, instruction) => {
    acc += `${instruction}<br><br>`;
    return acc;
  }, '');

  return '<p class="selected-recipe-instructions">' + instructionsText + '</p>'
};

function show(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('hidden');
  };
};

function hide(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('hidden');
  };
};


//need a funtion that will display ONLY the recipe that's clicked on
//1. click a recipe CARD
//2. hide the filter section (class="filter-section") and hide main recipe section (class="recipes-section")
//3. remove hidden from class="individual-recipe-container hidden"
//4. change the inner text of all the properties:
// - the src of the recipe image
// - the recipe title
// - the ingredients List
// - the total Cost
// - the instructions (<p></p>)
// call our method we wrote



// boilerplate html for each recipe card:
// <section class='recipe-card'>
//   <img src='' alt='' class='recipe-photo'>
//   <img src='' alt='favorite-button' class='favorite-button'>
//   <p>Recipe Name</p>
// </section>
