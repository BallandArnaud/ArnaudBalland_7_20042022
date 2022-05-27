import { userSearch } from "./userSearch.js"

const $tagContainer = document.querySelector(".search__tags")

export function createATag(item, dropdownListItemSelected) {
  const tag = document.createElement("div")
  tag.classList.add("tag", `tag--${dropdownListItemSelected}`)
  tag.innerHTML = `
    ${item}
    <button class="tag__btn">
      <img src="assets/icon_close.svg" alt="close tag">
    </button>
  `
  $tagContainer.appendChild(tag)
  const tagBtn = tag.firstElementChild
  tagBtn.addEventListener("click", () => {
    deleteATag(tag, item, dropdownListItemSelected)
  })

  switch (dropdownListItemSelected) {
    case "ingredients":
      userSearch.ingredients.push(item.toLowerCase())
      break
    case "appliances":
      userSearch.appliances.push(item.toLowerCase())
      break
    case "utensils":
      userSearch.ustensils.push(item.toLowerCase())
      break
    default:
      console.log("Erreur ajout du tag")
  }
  return $tagContainer
}

function deleteATag(domElement, item, dropdownListItemSelected) {
  $tagContainer.removeChild(domElement)
  let index
  switch (dropdownListItemSelected) {
    case "ingredients":
      index = userSearch.ingredients.indexOf(item.toLowerCase())
      userSearch.ingredients.splice(index, 1)
      break
    case "appliances":
      index = userSearch.appliances.indexOf(item.toLowerCase())
      userSearch.appliances.splice(index, 1)
      break
    case "utensils":
      index = userSearch.ustensils.indexOf(item.toLowerCase())
      userSearch.ustensils.splice(index, 1)
      break
    default:
      console.log("Erreur suppression du tag")
  }
}
