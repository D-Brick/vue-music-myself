import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

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

function deleteArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveFavorite(song) {
  let favorites = storage.get(FAVORITE_KEY, [])
  insertArray(favorites, song, (item) => {
    if (item) {
      return item.id === song.id
    }
    return false
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, favorites)
  return favorites
}

export function deleteFavorite(song) {
  let favorites = storage.get(FAVORITE_KEY, [])
  deleteArray(favorites, (item) => {
    if (item) {
      return item.id === song.id
    }
    return false
  })
  storage.set(FAVORITE_KEY, favorites)
  return favorites
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

export function savePlay(song) {
  let playHistory = storage.get(PLAY_KEY, [])
  insertArray(playHistory, song, (item) => {
    if (item) {
      return item.id === song.id
    }
    return false
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, playHistory)
  return playHistory
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}