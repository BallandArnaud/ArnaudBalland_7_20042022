export class RecipeCard {
  /**
   * @param {Recipe} recipe
   */
  constructor(recipe) {
    this.name = recipe.name
    this.time = recipe.time
    this.description = recipe.description
    this.ingredients = recipe.ingredients
  }

  shortenUnit() {
    const newUnits = this.ingredients.map((ingredient) => {
      switch (ingredient.unit) {
        case "grammes":
          return "g"
        case "cuillères à soupe":
          return "cuillères"
        default:
          return ingredient.unit
      }
    })
    console.log(newUnits)
    return newUnits
  }

  createIngredientsList() {
    const ingredientDomElements = this.ingredients.map((ingredient) => {
      if (ingredient.quantity === undefined && ingredient.unit === undefined) {
        return `<li>${ingredient.ingredient}</li>`
      }
      if (ingredient.unit === undefined) {
        return `<li>${ingredient.ingredient}: 
        <span class="card__quantity">${ingredient.quantity}</span></li>`
      }
      return `<li>${ingredient.ingredient}: 
      <span class="card__quantity">${ingredient.quantity} ${ingredient.unit}</span></li>`
    })
    return ingredientDomElements.join("")
  }

  createCard() {
    return `
    <div class="card">
        <div class="card__image"></div>
        <div class="card__body">
            <div class="card__header">
                <h2 class="card__title">${this.name}</h2>
                <div class="card__timer">
                    <img src="assets/icon_timer.svg" alt="">
                    ${this.time} min
                </div>
            </div>
            <div class="card__main">
                <ul class="card__ingredients">
                    ${this.createIngredientsList()}
                </ul>
                <p class="card__description">${this.description}</p>
            </div>
        </div>
    </div>
    `
  }
}
