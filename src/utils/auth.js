import Cookies from 'js-cookie';

// TODO: vue_admin_template_token 修改为 admin_token
const TokenKey = 'blogs_token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
