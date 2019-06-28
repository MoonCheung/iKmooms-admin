import { login, logout, getInfo, updateUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  id: '',
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, id) => {
    state.id = id
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      })
        .then(res => {
          // console.log(res) // 从服务器获取用户信息
          commit('SET_TOKEN', res.data.token)
          setToken(res.data.token)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log(state.token) //打印出admin
      getInfo(state.token)
        .then(res => {
          const { data } = res
          if (!data) {
            reject('验证失败，请再次登录')
          }

          const { id, roles, name, avatar } = data
          console.log(id, roles, name, avatar)

          // 角色必须是非空数组
          if (!roles || roles.length <= 0) {
            reject('角色必须是非null数组！')
          }

          commit('SET_ID', id)
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log(state.token) //打印出admin
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 更新用户信息
  updateUserInfo ({ commit }, param) {
    return new Promise((resolve, reject) => {
      updateUserInfo(param)
        .then(res => {
          const { data } = res

          const { name, avatar } = data.result
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
