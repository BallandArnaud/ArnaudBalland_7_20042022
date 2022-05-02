import { recipes } from "../data/recipes.js"
import { RecipeCard } from "./templates/RecipeCard.js"

// console.log(recipes)
const MINIMUM_INPUT_NUMBER = 3
// DOM
const $recipeGrid = document.querySelector(".recipes .grid")
// Main Search bar
const $searchBar = document.querySelector(".search__bar input")
// Dropdown Ingredient
const $dropdownIngredients = document.getElementById("dropdown-ingredients")
const $dropdownIngredientsBtn = document.getElementById(
  "dropdown-ingredients-button"
)
const $dropdownIngredientsContent = document.getElementById(
  "dropwdown-ingredients-content"
)
const $dropdownIngredientsInput = document.getElementById(
  "dropdown-input-ingredients"
)
const $dropdownListIngredients = document.getElementById("list-ingredients")
// Dropdown Ustensils
// const $dropdownUstensils = document.getElementById("dropdown-ustensils")
// const $dropdownUstensilsBtn = document.getElementById(
//   "dropdown-ustensils-button"
// )
// const $dropdownUstensilsContent = document.getElementById(
//   "dropwdown-ustensils-content"
// )
// const $dropdownUstensilsInput = document.getElementById(
//   "dropdown-input-ustensils"
// )
// const $dropdownListUstensils = document.getElementById("list-ustensils")

// Array
const listAllIngredients = []
const listAllUstensils = []

function filterGlobal(arr, requete) {
  return arr.filter((recipe) => {
    const ingredientsAsString = recipe.ingredients
      .map((ing) => ing.ingredient.toLowerCase())
      .join(" ")
    return (
      recipe.name.toLowerCase().includes(requete) ||
      recipe.description.toLowerCase().includes(requete) ||
      ingredientsAsString.includes(requete)
    )
  })
}

// Add all recipes
const recipesDomElements = recipes.map((recipe) => {
  const recipeCard = new RecipeCard(recipe)
  return recipeCard.createCard()
})
$recipeGrid.innerHTML = recipesDomElements.join("")

// Listener Search Bar
$searchBar.addEventListener("input", (e) => {
  const inputValue = e.target.value.toLowerCase()
  const messageNoResultat =
    "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
  if (inputValue.length >= MINIMUM_INPUT_NUMBER) {
    $recipeGrid.innerHTML = ""
    const result = filterGlobal(recipes, inputValue)
    if (result.length === 0) {
      $recipeGrid.innerHTML = messageNoResultat
    } else {
      const resultDomElement = result.map((recipe) => {
        const recipeCard = new RecipeCard(recipe)
        return recipeCard.createCard()
      })
      $recipeGrid.innerHTML = resultDomElement.join("")
    }
  } else {
    $recipeGrid.innerHTML = recipesDomElements.join("")
  }
})

function openDropdown() {
  $dropdownIngredientsBtn.style.display = "none"
  $dropdownIngredientsContent.style.display = "flex"
  $dropdownIngredientsInput.focus()
}

function closeDropdown() {
  $dropdownIngredientsBtn.style.display = "flex"
  $dropdownIngredientsContent.style.display = "none"
}

// Listener Ingredients dropdown
$dropdownIngredients.addEventListener("click", (e) => {
  e.stopPropagation()
  openDropdown()
})

// Close dropdown
window.addEventListener("click", (e) => {
  if (e.target.id !== "#dropdown-ingredients") {
    closeDropdown()
  }
})

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function lowerCaseExceptFirstLetter(string) {
  return string.charAt(0) + string.slice(1).toLowerCase()
}

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
// console.log(listAllIngredientsByAlphabeticalOrder)

const listAllUstensilsByAlphabeticalOrder = [...newListAllUstensils].sort(
  (a, b) => a.localeCompare(b)
)
console.log(listAllUstensilsByAlphabeticalOrder)

function createListItem(item, htmlContainer) {
  const itemList = document.createElement("li")
  itemList.classList.add("dropdown__list__item")
  itemList.innerHTML = `${item} `
  htmlContainer.appendChild(itemList)
  return htmlContainer
}

listAllIngredientsByAlphabeticalOrder.forEach((ingredient) => {
  // console.log(ingredient)
  createListItem(ingredient, $dropdownListIngredients)
})

// listAllUstensilsByAlphabeticalOrder.forEach((ustensil) => {
//   createListItem(ustensil, $dropdownListUstensils)
// })
