import api from './index'
import { axios } from '@/utils/request'
// import Vue from 'vue'
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
// Promise处理

export function login (parameter) {
  return axios({
    url: '/api/vi/AdminLogin.do',
    method: 'post',
    data: parameter
  }).then((res) => {
    if (res.code > 0) {
      // if (res.message !== null) {
      //   that.$message.success(res.message)
      // }
      return res
    } else {
      // if (res.message !== null) {
      //   that.$message.error(res.message)
      // }
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function leaLogin (parameter, that) {
  return axios({
    url: '/api/vi/sportLeaderLogin.do',
    method: 'post',
    data: parameter
  }).then((res) => {
    if (res.code > 0) {
    //   if (res.message !== null) {
    //     that.$message.success(res.message)
    //   }
      return res
    } else {
    //   if (res.message !== null) {
    //     that.$message.error(res.message)
    //   }
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function yibanLogin (parameter, that) {
  return axios({
    url: 'https://openapi.yiban.cn/oauth/authorize?client_id=9432b9abe1e68817&redirect_uri=https://localhost:8080/auidence&state=STATE',
    method: 'get',
    data: parameter
  }).then((res) => {
    if (res.code > 0) {
      //   if (res.message !== null) {
      //     that.$message.success(res.message)
      //   }
      return res
    } else {
      //   if (res.message !== null) {
      //     that.$message.error(res.message)
      //   }
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function logout () {
  return axios({
    url: '/api/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function adminRegister (parameter, that) {
  return axios({
    url: '/api/vi/AdminRegister.do',
    method: 'post',
    data: parameter
  }).then((res) => {
    if (res.code > 0) {
      if (res.message !== null) {
        that.$message.success(res.message)
      }
      return res
    } else {
      if (res.message !== null) {
        that.$message.error(res.message)
      }
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function resetAdminPassword (parameter, that) {
  return axios({
    url: '/api/vi/ResetAdminPassword.do',
    method: 'post',
    data: parameter
  }).then((res) => {
    if (res.code > 0) {
      if (res.message !== null) {
        that.$message.success(res.message)
      }
      return res
    } else {
      if (res.message !== null) {
        that.$message.error(res.message)
      }
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function changePassword (parameter, that) {
  return axios({
    url: '/api/ad/account/changePassword.do',
    method: 'post',
    data: parameter
  }).then((res) => {
    if (res.code > 0) {
      if (res.message !== null) {
        that.$message.success(res.message)
      }
      return res
    } else {
      if (res.message !== null) {
        that.$message.error(res.message)
      }
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function leaChangePassword (parameter, that) {
  return axios({
    url: '/api/sl/account/changePassword.do',
    method: 'post',
    data: parameter
  }).then((res) => {
    if (res.code > 0) {
      if (res.message !== null) {
        that.$message.success(res.message)
      }
      return res
    } else {
      if (res.message !== null) {
        that.$message.error(res.message)
      }
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function changeInvitecode (parameter, that) {
  return axios({
    url: '/api/ad/account/changeInviteCode.do',
    method: 'post',
    data: parameter
  }).then((res) => {
    if (res.code > 0) {
      if (res.message !== null) {
        that.$message.success(res.message)
      }
      return res
    } else {
      if (res.message !== null) {
        that.$message.error(res.message)
      }
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function changePhone (parameter, that) {
  return axios({
    url: '/api/ad/account/changePhone.do',
    method: 'post',
    data: parameter
  }).then((res) => {
    if (res.code > 0) {
      if (res.message !== null) {
        that.$message.success(res.message)
      }
      return res
    } else {
      if (res.message !== null) {
        that.$message.error(res.message)
      }
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
// /**
//  * get user 2step code open?
//  * @param parameter {*}
//  */
// export function get2step (parameter) {
//   return axios({
//     url: api.twoStepCode,
//     method: 'post',
//     data: parameter
//   })
// }
