import { axios } from '@/utils/request'
export function getSpoList (parameter, that) {
  return axios({
    url: '/api/vi/score/getSportmeetList.do ',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getColList (parameter, that) {
  return axios({
    url: '/api/vi/score/getColList.do',
    method: 'get',
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
export function getItemList (parameter, that) {
  return axios({
    url: '/api/vi/score/getItemByKind.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getRecordList (parameter, that) {
  return axios({
    url: '/api/ad/record/getRecord.do',
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
export function getClassList (parameter, that) {
  return axios({
    url: '/api/ad/class/queryClass.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getAthleteList (parameter, that) {
  return axios({
    url: '/api/sl/game/getClassAthlete.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getGameAthleteList (parameter, that) {
  return axios({
    url: '/api/sl/game/getClassGameAthlete.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getGameRound (parameter, that) {
  return axios({
    url: '/api/vi/score/getGameRound.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function searchInfoServlet (parameter, that) {
  return axios({
    url: '/api/ad/game/getGameInfo.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getGameGroup (parameter, that) {
  return axios({
    url: '/api/vi/score/getGameGroup.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getPreMatchScore (parameter, that) {
  return axios({
    url: '/api/ad/score/getPreMatchScore.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getClassScoreRank (parameter, that) {
  return axios({
    url: '/api/vi/score/getClassScoreRank.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getOrderData (parameter, that) {
  return axios({
    url: '/api/ad/getOrderData.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function getGroupGrade (parameter, that) {
  return axios({
    url: '/api/vi/score/getGroupGrade.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function preNextRound (parameter, that) {
  return axios({
    url: '/api/ad/game/preNextRound.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
export function ExportExcel (parameter, that) {
  return axios({
    url: '/api/sl/game/exportSportMeetAthleteExcel.do',
    method: 'get',
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

export function getFinish (parameter, that) {
  return axios({
    url: '/api/ad/game/getFinishSign.do',
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
      throw new Error('错误')
    }
  }).catch((err) => {
    return Promise.reject(err)
  })
}
