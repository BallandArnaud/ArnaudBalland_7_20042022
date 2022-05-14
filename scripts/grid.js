import { recipes } from "../data/recipes.js"
import { RecipeCard } from "./templates/RecipeCard.js"

export const $recipeGrid = document.querySelector(".recipes .grid")

export const recipesDomElements = recipes.map((recipe) => {
  const recipeCard = new RecipeCard(recipe)
  return recipeCard.createCard()
})

export function initGrid() {
  $recipeGrid.innerHTML = recipesDomElements.join("")
}
