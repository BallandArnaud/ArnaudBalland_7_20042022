export function createATag(item, dropdownListItemSelected) {
  const $tagContainer = document.querySelector(".search__tags")
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
    $tagContainer.removeChild(tag)
  })
  return $tagContainer
}
