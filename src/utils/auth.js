import Cookies from 'js-cookie'

// TODO: vue_admin_template_token 修改为 vue_admin
const TokenKey = 'vue_admin'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
