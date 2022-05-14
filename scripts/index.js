import { initGrid } from "./grid.js"
import { searchRecipesFromQuery } from "./search.js"

// DOM
const $searchBar = document.querySelector(".search__bar input")

function init() {
  initGrid()
  // Listener Search Bar
  $searchBar.addEventListener("input", (e) => {
    searchRecipesFromQuery(e.target.value)
  })
}
init()
