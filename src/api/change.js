import { axios } from '@/utils/request'
// Vue.ls.get('COL_ID')
export function createSportmeet (parameter, that) {
  return axios({
    url: '/api/ad/sportmeet/createSportmeet.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function changeOpenSign (parameter, that) {
  return axios({
    url: '/api/ad/sportmeet/changeOpenSign.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function changeSportmeetInfo (parameter, that) {
  return axios({
    url: '/api/ad/sportmeet/changeSportmeetInfo.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function deleteSportmeet (parameter, that) {
  return axios({
    url: '/api/ad/sportmeet/deleteSportmeet.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function generateTrackAndGroup (parameter, that) {
  return axios({
    url: '/api/ad/sportmeet/generatePreTrackAndGroup.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function createRecord (parameter, that) {
  return axios({
    url: '/api/ad/record/putRecord.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function deleteRecord (parameter, that) {
  return axios({
    url: '/api/ad/record/deleteRecord.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function createClass (parameter, that) {
  return axios({
    url: '/api/ad/class/createClass.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function deleteClass (parameter, that) {
  return axios({
    url: '/api/ad/sportmeet/deleteClass.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function resetSportLeaderPassword (parameter, that) {
  return axios({
    url: '/api/ad/sportmeet/resetSportLeaderPassword.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function createAthlete (parameter, that) {
  return axios({
    url: '/api/sl/game/createClassAthlete.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function deleteAthlete (parameter, that) {
  return axios({
    url: '/api/sl/game/deleteClassAthlete.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function changeAthleteInfo (parameter, that) {
  return axios({
    url: '/api/sl/game/changeAthleteInfo.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function createGameAthlete (parameter, that) {
  return axios({
    url: '/api/sl/game/createGameAthlete.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function deleteGameAthlete (parameter, that) {
  return axios({
    url: '/api/sl/game/deleteGameAthlete.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function putGroupGrade (parameter, that) {
  return axios({
    url: '/api/ad/game/putGroupGrade.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function putFinish (parameter, that) {
  return axios({
    url: '/api/ad/game/putFinishSign.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function confirmScore (parameter, that) {
  return axios({
    url: '/api/ad/score/refreshPersonScore.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function generateClassScore (parameter, that) {
  return axios({
    url: '/api/ad/score/putClassScore.do',
    method: 'get',
    params: parameter
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function generateNextRound (parameter, that) {
  return axios({
    url: '/api/ad/game/generateNextRound.do',
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getMatchRank (parameter, that) {
  return axios({
    url: '/api/vi/score/getMatchRank.do',
    method: 'get',
    data: parameter,
    params: parameter
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
      throw new Error(res.message)
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
