export function sortAlphabetically(arr) {
  return [...arr].sort((a, b) => a.localeCompare(b))
}

export function capitalizeFirstLetterAndLowerCaseTheRest(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
