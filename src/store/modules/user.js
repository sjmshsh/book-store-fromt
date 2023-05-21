import { getUserInfo, login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const DEFAULT_AVATAR = 'https://pic2.zhimg.com/v2-31647f793060ae4c4bf94f90a332a5d1_b.webp'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: DEFAULT_AVATAR,
    address: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ADDRESS: (state, address) => {
    state.address = address
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { phone, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ phone: phone.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_NAME', data.name)
        commit('SET_ADDRESS', data.address)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        console.log(response)
        const { data } = response
        if (!data) {
          return reject('token过期')
        }
        console.log(response)
        // const { name, avatar } = data
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

