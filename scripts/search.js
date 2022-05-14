import { recipes } from "../data/recipes.js"
import { RecipeCard } from "./templates/RecipeCard.js"
import { $recipeGrid, recipesDomElements } from "./grid.js"
import { updateDropdownList, $dropdownListIngredients, $dropdownListAppliances, $dropdownListUtensils, updateListAllIngredients, updateListAllAppliances, updateListAllUtensils } from "./dropdown.js"

/**
 * Recherche de recettes à partir d'une chaine de caractères
 * @param {string} query - Requête de l'utilisateur
 * @returns {void}
 */
export function searchRecipesFromQuery(query) {
  const MINIMUM_INPUT_NUMBER = 3
  const inputValue = query.toLowerCase()
  const inputIsValid = inputValue.length >= MINIMUM_INPUT_NUMBER

  if (!inputIsValid) {
    displayAllRecipes()
    return
  }

  const matchingRecipes = retrieveMatchingRecipes(recipes, inputValue)
  if (matchingRecipes.length === 0) {
    showNoResultMessage()
    return
  }

  showResult(matchingRecipes)
  updateDropdownList(matchingRecipes)
}

function displayAllRecipes() {
  $recipeGrid.innerHTML = recipesDomElements.join("")
  updateListAllIngredients()
  updateListAllAppliances()
  updateListAllUtensils()
}

/**
 * Récupère les recettes correspondant à la requête
 * @param {Array} arr - Requête de l'utilisateur
 * @param {string} query - Requête de l'utilisateur
 * @returns {Array} - Retourne un tableau des résultats liés à la requête
 */
function retrieveMatchingRecipes(arr, query) {
  return arr.filter((recipe) => {
    const ingredientsAsString = recipe.ingredients.map((ing) => ing.ingredient.toLowerCase()).join(" ")
    return recipe.name.toLowerCase().includes(query) || recipe.description.toLowerCase().includes(query) || ingredientsAsString.includes(query)
  })
}

function showNoResultMessage() {
  const messageNoResultat = `<p>Aucune recette ne correspond à votre critère… 
  vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`
  $recipeGrid.innerHTML = messageNoResultat
  $dropdownListIngredients.innerHTML = ""
  $dropdownListAppliances.innerHTML = ""
  $dropdownListUtensils.innerHTML = ""
}

/**
 * Affiche les cartes des recettes dans le container
 * @param {Array} result - Tableau de recettes
 */
function showResult(result) {
  $recipeGrid.innerHTML = ""
  const resultDomElement = result.map((recipe) => {
    const recipeCard = new RecipeCard(recipe)
    return recipeCard.createCard()
  })
  $recipeGrid.innerHTML = resultDomElement.join("")
}
