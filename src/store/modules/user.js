import Vue from 'vue'
import { login, logout, leaLogin } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'
import { ROLE_ID, ADM_ACCOUNT, ADM_PHONE, ADM_ID, COL_ID, COL_NAME, CLA_ID, CLA_NAME, ACCOUNT } from '../mutation-types'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      Vue.ls.set(ACCOUNT, userInfo.adm_account)
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          // Vue.ls.set(USER_NAME, result.username)
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(ROLE_ID, result.roleId)
          Vue.ls.set(COL_ID, result.college.col_id)
          Vue.ls.set(COL_NAME, result.college.col_name)
          Vue.ls.set(ADM_ACCOUNT, result.admin.adm_account)
          Vue.ls.set(ADM_ID, result.admin.adm_id)
          Vue.ls.set(ADM_PHONE, result.admin.adm_phone)
          console.log('test' + Vue.ls)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    LeaLogin ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        leaLogin(userInfo).then(response => {
          const result = response.result
          console.log('result')
          // Vue.ls.set(USER_NAME, result.username)
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(ROLE_ID, result.roleId)
          Vue.ls.set(COL_ID, result.college.col_id)
          Vue.ls.set(COL_NAME, result.college.col_name)
          Vue.ls.set(CLA_ID, result.class.cla_id)
          Vue.ls.set(CLA_NAME, result.class.cla_name)
          commit('SET_TOKEN', result.token)
          // console.log(Vue.ls)
          resolve()
          // reject(error)
          // console.log(response.result)
        }).catch(error => {
          reject(error)
        })
      })
    },
    yibanLogin ({ commit }, userInfo) { // 原参数没有userInfo，但下面有引用到，加上了
      return new Promise((resolve, reject) => {
        leaLogin(userInfo).then(response => {
          const result = response.result
          console.log('result')
          // Vue.ls.set(USER_NAME, result.username)
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(ROLE_ID, result.roleId)
          Vue.ls.set(COL_ID, result.college.col_id)
          Vue.ls.set(COL_NAME, result.college.col_name)
          Vue.ls.set(CLA_ID, result.class.cla_id)
          Vue.ls.set(CLA_NAME, result.class.cla_name)
          commit('SET_TOKEN', result.token)
          // console.log(Vue.ls)
          resolve()
          // reject(error)
          // console.log(response.result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 获取用户信息
    // GetInfo ({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo().then(response => {
    //       const result = response.result
    //       if (result.role && result.role.permissions.length > 0) {
    //         const role = result.role
    //         console.log('role')
    //         console.log(role)
    //         role.permissions = result.role.permissions
    //         console.log('role.permissions')
    //         console.log(role.permissions)
    //         role.permissions.map(per => {
    //           if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
    //             const action = per.actionEntitySet.map(action => { return action.action })
    //             per.actionList = action
    //           }
    //         })
    //         role.permissionList = role.permissions.map(permission => { return permission.permissionId })
    //         commit('SET_ROLES', result.role)
    //         commit('SET_INFO', result)
    //       } else {
    //         reject(new Error('getInfo: roles must be a non-null array !'))
    //       }
    //
    //       commit('SET_NAME', { name: result.name, welcome: welcome() })
    //       commit('SET_AVATAR', result.avatar)
    //
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        console.log('logout')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(ROLE_ID)
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }

  }
}

export default user
