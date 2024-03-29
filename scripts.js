/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"DYkQeMEYtmICVN7y","label":"MP*","bookmarks":[{"id":"dPbDCMNa1fNeFWyG","label":"Maths","url":"https://www.dropbox.com/sh/aw24akhj55ffgmm/AACyvX_JukRHd9sgw_wxlaXMa?dl=0&lst"},{"id":"wdMKMBqiCOkIUK9c","label":"Physique","url":"https://www.dropbox.com/h"},{"id":"Ec4ZeEwnegfOmqbX","label":"OPT","url":"https://informatique-lhp.fr/"}]},{"id":"R2OKYotSFL1Lh2x7","label":"Outils","bookmarks":[{"id":"EGOOALKUOJdJUerV","label":"Gmail","url":"https://accounts.google.com/b/0/AddMailService"},{"id":"iolqRQlCbVZSRA01","label":"MPSI-M","url":"https://drive.google.com/drive/u/0/folders/1wf1fuCh8prLpUxEus1bu34Y-PuFmnExw"},{"id":"LnE4lwo6Qvo2PNtC","label":"MPSI-PC","url":"https://mpsi.schleck.ovh/"}]},{"id":"zDyTuKQ19spMJU45","label":"Divers","bookmarks":[{"id":"rZqjxLp8njNHJIDo","label":"DocSolus","url":"https://www.doc-solus.fr/"},{"id":"sSo1rlSIStPtlmIH","label":"Timer","url":"https://pomofocus.io/app"},{"id":"ILdHLAErGxndz8p1","label":"Tasks","url":"https://emergency.nofap.com/redirect?religious=false&cat=em"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
