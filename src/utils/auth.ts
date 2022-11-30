
const TokenKey = 'token'

export function getSessionStorageToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function setSessionStorageToken(token: string) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function removeSessionStorageToken() {
  return window.sessionStorage.removeItem(TokenKey)
}

export function getLocalStorageToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setLocalStorageToken(token: string) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeLocalStorageToken() {
  return window.localStorage.removeItem(TokenKey)
}