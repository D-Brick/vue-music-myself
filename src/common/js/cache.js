// import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function saveSearch(query) {
  // let searches = storage.get(SEARCH_KEY, [])
  let searches = []
  // if (localStorage[SEARCH_KEY]) {
  //   searches = localStorage[SEARCH_KEY]
  // } else {
  //   localStorage[SEARCH_KEY] = []
  //   searches = localStorage[SEARCH_KEY]
  // }
  insertArray(searches, query, (item) => {
    item = query
  }, SEARCH_MAX_LENGTH)
  localStorage[SEARCH_KEY] = searches
  return searches
}

export function loadSearch() {
  return localStorage[SEARCH_KEY]
}