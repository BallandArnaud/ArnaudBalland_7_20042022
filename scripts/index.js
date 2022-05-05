import { recipes } from "../data/recipes.js"
import { RecipeCard } from "./templates/RecipeCard.js"

// console.log(recipes)
const MINIMUM_INPUT_NUMBER = 3

// DOM
const $recipeGrid = document.querySelector(".recipes .grid")
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
let listAllIngredients = []
let listAllUstensils = []

function openDropdown() {
  $dropdownIngredientsBtn.style.display = "none"
  $dropdownIngredientsContent.style.display = "flex"
  $dropdownIngredientsInput.focus()
}

function closeDropdown() {
  $dropdownIngredientsBtn.style.display = "flex"
  $dropdownIngredientsContent.style.display = "none"
}

function sortAlphabetically(arr) {
  return [...arr].sort((a, b) => a.localeCompare(b))
}

function capitalizeFirstLetterAndLowerCaseTheRest(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

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

function createDropdownListItem(item, htmlContainer) {
  const itemList = document.createElement("li")
  itemList.classList.add("dropdown__list__item")
  itemList.innerHTML = `${item} `
  htmlContainer.appendChild(itemList)
  return htmlContainer
}

function showResult(result) {
  const resultDomElement = result.map((recipe) => {
    const recipeCard = new RecipeCard(recipe)
    return recipeCard.createCard()
  })
  $recipeGrid.innerHTML = resultDomElement.join("")
}

function createDropdownList(result) {
  result.forEach((recipe) => {
    const { ingredients } = recipe
    const { ustensils } = recipe

    ingredients.forEach((ingredient) => {
      // console.log(ingredient.ingredient)
      const ingredientWithcapitalizeAndLowerCase =
        capitalizeFirstLetterAndLowerCaseTheRest(ingredient.ingredient)
      listAllIngredients.push(ingredientWithcapitalizeAndLowerCase)
    })

    ustensils.forEach((ustensil) => {
      // console.log(ustensil)
      const ustensilWithcapitalizeAndLowerCase =
        capitalizeFirstLetterAndLowerCaseTheRest(ustensil)
      listAllUstensils.push(ustensilWithcapitalizeAndLowerCase)
    })
  })
}
createDropdownList(recipes)

function refreshDropdownList(results) {
  // console.log("Résultat :", results)
  listAllIngredients = []
  listAllUstensils = []
  $dropdownListIngredients.innerHTML = ""
  // $dropdownListUstensils.innerHTML = ""
  createDropdownList(results)
  const listAllIngredientsByAlphabeticalOrder =
    sortAlphabetically(listAllIngredients)
  listAllIngredientsByAlphabeticalOrder.forEach((ingredient) => {
    // console.log(ingredient)
    createDropdownListItem(ingredient, $dropdownListIngredients)
  })
}

// Add all recipes
const recipesDomElements = recipes.map((recipe) => {
  const recipeCard = new RecipeCard(recipe)
  return recipeCard.createCard()
})
$recipeGrid.innerHTML = recipesDomElements.join("")

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

// remove duplicates in array
const newListAllIngredients = [...new Set(listAllIngredients)]
const newListAllUstensils = [...new Set(listAllUstensils)]

const listAllIngredientsByAlphabeticalOrder = sortAlphabetically(
  newListAllIngredients
)
// console.log(listAllIngredientsByAlphabeticalOrder)
listAllIngredientsByAlphabeticalOrder.forEach((ingredient) => {
  createDropdownListItem(ingredient, $dropdownListIngredients)
})

const listAllUstensilsByAlphabeticalOrder =
  sortAlphabetically(newListAllUstensils)
console.log(listAllUstensilsByAlphabeticalOrder)

// listAllUstensilsByAlphabeticalOrder.forEach((ustensil) => {
//   createDropdownListItem(ustensil, $dropdownListUstensils)
// })

console.log(listAllIngredients)
console.log(newListAllIngredients)
console.log(listAllUstensils)
console.log(newListAllUstensils)

// Listener Search Bar
$searchBar.addEventListener("input", (e) => {
  const inputValue = e.target.value.toLowerCase()
  const messageNoResultat =
    "<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>"
  if (inputValue.length >= MINIMUM_INPUT_NUMBER) {
    $recipeGrid.innerHTML = ""
    const result = filterGlobal(recipes, inputValue)
    if (result.length === 0) {
      $recipeGrid.innerHTML = messageNoResultat
      $dropdownListIngredients.innerHTML = ""
    } else {
      showResult(result)
      refreshDropdownList(result)
    }
  } else {
    $recipeGrid.innerHTML = recipesDomElements.join("")
    listAllIngredientsByAlphabeticalOrder.forEach((ingredient) => {
      // console.log(ingredient)
      createDropdownListItem(ingredient, $dropdownListIngredients)
    })
  }
})
