import { recipes } from "../data/recipes.js"
import { RecipeCard } from "./templates/RecipeCard.js"

console.log(recipes)

// DOM
const $recipeGrid = document.querySelector(".grid")

const listAllIngredients = []
const listAllUstensils = []

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function lowerCaseExceptFirstLetter(string) {
  return string.charAt(0) + string.slice(1).toLowerCase()
}

// Add all recipes
const recipesDomElements = recipes.map((recipe) => {
  const recipeCard = new RecipeCard(recipe)
  return recipeCard.createCard()
})
$recipeGrid.innerHTML = recipesDomElements.join("")

recipes.forEach((recipe) => {
  const { ingredients } = recipe
  const { ustensils } = recipe
  // console.log(ingredients)
  // console.log(ustensils)

  ingredients.forEach((ingredient) => {
    // console.log(ingredient.ingredient)
    const ingredientWithcapitalizeFirstLetter = capitalizeFirstLetter(
      ingredient.ingredient
    )
    const ingredientWithcapitalizeAndLowerCase = lowerCaseExceptFirstLetter(
      ingredientWithcapitalizeFirstLetter
    )
    listAllIngredients.push(ingredientWithcapitalizeAndLowerCase)
  })

  ustensils.forEach((ustensil) => {
    // console.log(ustensil)
    const ustensilWithcapitalizeFirstLetter = capitalizeFirstLetter(ustensil)
    const ustensilWithcapitalizeAndLowerCase = lowerCaseExceptFirstLetter(
      ustensilWithcapitalizeFirstLetter
    )
    listAllUstensils.push(ustensilWithcapitalizeAndLowerCase)
  })
})

// console.log(listAllIngredients)
// console.log(listAllUstensils)

// remove duplicates in array
const newListAllIngredients = [...new Set(listAllIngredients)]
// console.log(newListAllIngredients)

const newListAllUstensils = [...new Set(listAllUstensils)]
// console.log(newListAllUstensils)

// Sort by Alphabetical Order
const listAllIngredientsByAlphabeticalOrder = [...newListAllIngredients].sort(
  (a, b) => a.localeCompare(b)
)
console.log(listAllIngredientsByAlphabeticalOrder)

const listAllUstensilsByAlphabeticalOrder = [...newListAllUstensils].sort(
  (a, b) => a.localeCompare(b)
)
console.log(listAllUstensilsByAlphabeticalOrder)
