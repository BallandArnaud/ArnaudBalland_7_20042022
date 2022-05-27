import { sortAlphabetically, capitalizeFirstLetterAndLowerCaseTheRest } from "./utils/utils.js"
import { createATag } from "./tag.js"
import { getRecipes } from "./recipesDataBuilder.js"

const recipes = getRecipes()

// Dropdown Ingredient
// const $dropdownIngredients = document.getElementById("dropdown-ingredients")
const $dropdownIngredientsBtn = document.getElementById("dropdown-ingredients-button")
const $dropdownIngredientsContent = document.getElementById("dropdown-ingredients-content")
const $dropdownIngredientsInput = document.getElementById("dropdown-input-ingredients")
export const $dropdownListIngredients = document.getElementById("list-ingredients")

// Dropdown Appliances
// const $dropdownAppliances = document.getElementById("dropdown-appliances")
const $dropdownAppliancesBtn = document.getElementById("dropdown-appliances-button")
const $dropdownAppliancesContent = document.getElementById("dropdown-appliances-content")
const $dropdownAppliancesInput = document.getElementById("dropdown-input-appliances")
export const $dropdownListAppliances = document.getElementById("list-appliances")

// Dropdown Utensils
// const $dropdownUtensils = document.getElementById("dropdown-utensils")
const $dropdownUtensilsBtn = document.getElementById("dropdown-utensils-button")
const $dropdownUtensilsContent = document.getElementById("dropdown-utensils-content")
const $dropdownUtensilsInput = document.getElementById("dropdown-input-utensils")
export const $dropdownListUtensils = document.getElementById("list-utensils")

// Array
let listAllIngredients = []
let listAllAppliances = []
let listAllUtensils = []

/**
 * Création des listes des dropdowns avec mise en forme des textes
 * @param {Array} result - Tableau de recettes
 * @returns {void}
 */
export function createDropdownList(result) {
  result.forEach((recipe) => {
    const { ingredients } = recipe
    const { appliance } = recipe
    const { ustensils } = recipe

    ingredients.forEach((ingredient) => {
      const ingredientWithcapitalizeAndLowerCase = capitalizeFirstLetterAndLowerCaseTheRest(ingredient.ingredient)
      listAllIngredients.push(ingredientWithcapitalizeAndLowerCase)
    })

    const applianceWithcapitalizeAndLowerCase = capitalizeFirstLetterAndLowerCaseTheRest(appliance)
    listAllAppliances.push(applianceWithcapitalizeAndLowerCase)

    ustensils.forEach((utensil) => {
      const utensilWithcapitalizeAndLowerCase = capitalizeFirstLetterAndLowerCaseTheRest(utensil)
      listAllUtensils.push(utensilWithcapitalizeAndLowerCase)
    })
  })
}
createDropdownList(recipes)

// Crée une copie des tableaux en retirant les éléments doublons
let newListAllIngredients = [...new Set(listAllIngredients)]
let newListAllAppliances = [...new Set(listAllAppliances)]
let newListAllUtensils = [...new Set(listAllUtensils)]

/**
 * Ajout des élements des dropdowns
 * @param {string} item - nom de l'item à ajouter
 * @param {HTMLDivElement} htmlContainer - Dans quel élément du DOM l'item doit être ajouté
 * @returns {HTMLDivElement} - l'élément du dom avec les items ajoutés
 */
export function createDropdownItem(item, htmlContainer) {
  const itemList = document.createElement("li")
  itemList.classList.add("dropdown__list__item")
  itemList.innerHTML = `${item} `
  htmlContainer.appendChild(itemList)
  itemList.addEventListener("click", (e) => {
    const dropdownListItem = e.target.parentElement.id.split("-")[1]
    createATag(item, dropdownListItem)
  })
  return htmlContainer
}

export function updateListAllIngredients() {
  $dropdownListIngredients.innerHTML = ""
  const listAllIngredientsByAlphabeticalOrder = sortAlphabetically(newListAllIngredients)
  listAllIngredientsByAlphabeticalOrder.forEach((ingredient) => {
    createDropdownItem(ingredient, $dropdownListIngredients)
  })
}
updateListAllIngredients()

export function updateListAllAppliances() {
  $dropdownListAppliances.innerHTML = ""
  const listAllAppliancesByAlphabeticalOrder = sortAlphabetically(newListAllAppliances)
  listAllAppliancesByAlphabeticalOrder.forEach((appliance) => {
    createDropdownItem(appliance, $dropdownListAppliances)
  })
}
updateListAllAppliances()

export function updateListAllUtensils() {
  $dropdownListUtensils.innerHTML = ""
  const listAllUtensilsByAlphabeticalOrder = sortAlphabetically(newListAllUtensils)
  listAllUtensilsByAlphabeticalOrder.forEach((utensil) => {
    createDropdownItem(utensil, $dropdownListUtensils)
  })
}
updateListAllUtensils()

/**
 * Système pour ouvrir les dropdowns
 * @param {string} elt - Nom de la dropdown à ouvrir
 */
function openDropdown(elt) {
  if (elt === "ingredients") {
    $dropdownIngredientsBtn.style.display = "none"
    $dropdownIngredientsContent.classList.add("dropdown-visible")
    $dropdownIngredientsInput.focus()
  } else if (elt === "appliances") {
    $dropdownAppliancesBtn.style.display = "none"
    $dropdownAppliancesContent.classList.add("dropdown-visible")
    $dropdownAppliancesInput.focus()
  } else if (elt === "utensils") {
    $dropdownUtensilsBtn.style.display = "none"
    $dropdownUtensilsContent.classList.add("dropdown-visible")
    $dropdownUtensilsInput.focus()
  }
}

function closeDropdownIngredients() {
  $dropdownIngredientsBtn.style.display = "flex"
  $dropdownIngredientsContent.classList.remove("dropdown-visible")
}

function closeDropdownAppliances() {
  $dropdownAppliancesBtn.style.display = "flex"
  $dropdownAppliancesContent.classList.remove("dropdown-visible")
}

function closeDropdownUtensils() {
  $dropdownUtensilsBtn.style.display = "flex"
  $dropdownUtensilsContent.classList.remove("dropdown-visible")
}

// Empeche la propagation du click en dehors du dropdown pour le garder ouvert
$dropdownIngredientsContent.addEventListener("click", (e) => {
  e.stopPropagation()
})

$dropdownAppliancesContent.addEventListener("click", (e) => {
  e.stopPropagation()
})

$dropdownUtensilsContent.addEventListener("click", (e) => {
  e.stopPropagation()
})

// Close dropdown
window.addEventListener("click", (e) => {
  if (e.target.matches("#dropdown-ingredients-button")) {
    openDropdown("ingredients")
    closeDropdownAppliances()
    closeDropdownUtensils()
  } else if (e.target.matches("#dropdown-appliances-button")) {
    openDropdown("appliances")
    closeDropdownIngredients()
    closeDropdownUtensils()
  } else if (e.target.matches("#dropdown-utensils-button")) {
    openDropdown("utensils")
    closeDropdownIngredients()
    closeDropdownAppliances()
  } else {
    closeDropdownIngredients()
    closeDropdownAppliances()
    closeDropdownUtensils()
  }
})

let FinalDropdownListIngredients = []
let FinalDropdownListAppliances = []
let FinalDropdownListUtensils = []

/**
 * Met à jour la liste des dropdowns après la recherche dans la search bar
 * @param {Array} results - Tableaux des recettes après tri
 * @returns {void}
 */
export function updateDropdownList(results) {
  listAllIngredients = []
  listAllAppliances = []
  listAllUtensils = []
  $dropdownListIngredients.innerHTML = ""
  $dropdownListAppliances.innerHTML = ""
  $dropdownListUtensils.innerHTML = ""
  createDropdownList(results)
  const FinalListAllIngredientsByAlphabeticalOrder = sortAlphabetically([...new Set(listAllIngredients)])
  const FinalListAllAppliancesByAlphabeticalOrder = sortAlphabetically([...new Set(listAllAppliances)])
  const FinalListAllUtensilsByAlphabeticalOrder = sortAlphabetically([...new Set(listAllUtensils)])
  FinalListAllIngredientsByAlphabeticalOrder.forEach((ingredient) => {
    createDropdownItem(ingredient, $dropdownListIngredients)
  })
  FinalListAllAppliancesByAlphabeticalOrder.forEach((appliance) => {
    createDropdownItem(appliance, $dropdownListAppliances)
  })
  FinalListAllUtensilsByAlphabeticalOrder.forEach((utensil) => {
    createDropdownItem(utensil, $dropdownListUtensils)
  })
}

$dropdownIngredientsInput.addEventListener("input", (e) => {
  filterDropdownIngredientsList(e)
})

$dropdownAppliancesInput.addEventListener("input", (e) => {
  filterDropdownAppliancesList(e)
})

$dropdownUtensilsInput.addEventListener("input", (e) => {
  filterDropdownUtensilsList(e)
})

function filterDropdownIngredientsList(e) {
  const inputValue = e.target.value.toLocaleLowerCase()
  newListAllIngredients = [...new Set(listAllIngredients)]
  const dropdownListIngredientFiltered = newListAllIngredients.filter((recipe) => recipe.toLocaleLowerCase().includes(inputValue))
  if (dropdownListIngredientFiltered.length > 0) {
    FinalDropdownListIngredients = sortAlphabetically([...dropdownListIngredientFiltered])
    $dropdownListIngredients.innerHTML = ""
    FinalDropdownListIngredients.forEach((element) => {
      createDropdownItem(element, $dropdownListIngredients)
    })
  } else {
    $dropdownListIngredients.innerHTML = ""
  }
}

function filterDropdownAppliancesList(e) {
  const inputValue = e.target.value.toLocaleLowerCase()
  newListAllAppliances = [...new Set(listAllAppliances)]
  const dropdownListAppliancesFiltered = newListAllAppliances.filter((recipe) => recipe.toLocaleLowerCase().includes(inputValue))
  if (dropdownListAppliancesFiltered.length > 0) {
    FinalDropdownListAppliances = sortAlphabetically([...dropdownListAppliancesFiltered])
    $dropdownListAppliances.innerHTML = ""
    FinalDropdownListAppliances.forEach((element) => {
      createDropdownItem(element, $dropdownListAppliances)
    })
  } else {
    $dropdownListAppliances.innerHTML = ""
  }
}

function filterDropdownUtensilsList(e) {
  const inputValue = e.target.value.toLocaleLowerCase()
  newListAllUtensils = [...new Set(listAllUtensils)]
  const dropdownListUtensilsFiltered = newListAllUtensils.filter((recipe) => recipe.toLocaleLowerCase().includes(inputValue))
  if (dropdownListUtensilsFiltered.length > 0) {
    FinalDropdownListUtensils = sortAlphabetically([...dropdownListUtensilsFiltered])
    $dropdownListUtensils.innerHTML = ""
    FinalDropdownListUtensils.forEach((element) => {
      createDropdownItem(element, $dropdownListUtensils)
    })
  } else {
    $dropdownListUtensils.innerHTML = ""
  }
}
