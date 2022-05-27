import { recipes } from "../data/recipes.js"

/**
 * Retrieves all recipes
 * @returns {Recipe[]}
 */
export const getRecipes = () =>
  recipes.map((recipe) => ({
    ...recipe,
    ingredientsLabelsList: recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase()),
    ingredientsAsString: recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase()).join(" "),
  }))

/**
 * @typedef Recipe
 * @property {number} id - recipe ID
 * @property {string} name - recipe name
 * @property {string} description
 * @property {number} servings
 * @property {number} time
 * @property {string} appliance
 * @property {string[]} ustensils
 * @property {Ingredient[]} ingredients
 * @property {string[]} ingredientsLabelsList
 * @property {string} ingredientsAsString
 * @property {string} utensilsAsString
 */

/**
 * @typedef Ingredient
 * @property {string} ingredient
 * @property {number} quantity
 * @property {string} unit
 */
