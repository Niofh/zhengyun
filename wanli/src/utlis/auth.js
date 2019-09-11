import Cookies from 'js-cookie'

const TokenKey = 'peizi-mobile-token'


// 有效期默认2天，即连续两天无任何操作自动失效
var expires = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, {
    expires: expires
  })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

