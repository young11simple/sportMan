import Mock from 'mockjs2'
import { myBuilder } from '../util'
const createSportmeet = Mock.mock({
  'spo_id|+1': 1000
})
const getCreateSportmeet = () => {
  return myBuilder(createSportmeet, '[测试接口] 提交成功', 1)
}
const createRecord = Mock.mock({
  'rec_id|+1': 1000
})
const getCreateRecord = () => {
  return myBuilder(createRecord, '[测试接口] 提交成功', 1)
}
const createClass = Mock.mock({
  'cla_id|+1': 1000,
  'lea_account|+1': 100000
})
const getCreateClass = () => {
  return myBuilder(createClass, '[测试接口] 提交成功', 1)
}
const createAthlete = Mock.mock({
  'ath_id|+1': 1000
})
const getCreateAthlete = () => {
  return myBuilder(createAthlete, '[测试接口] 提交成功', 1)
}

const createGameAthlete = Mock.mock({
  'signup_id|+1': 1000
})
const getCreateGameAthlete = () => {
  return myBuilder(createGameAthlete, '[测试接口] 提交成功', 1)
}

const changeOK = () => {
  return myBuilder({}, '[测试接口] 提交成功', 1)
}
Mock.mock(/\/api\/ad\/sportmeet\/createSportmeet/, 'post', getCreateSportmeet)
Mock.mock(/\/api\/ad\/sportmeet\/changeSportmeetInfo/, 'post', changeOK)
Mock.mock(/\/api\/ad\/sportmeet\/deleteSportmeet/, 'post', changeOK)
Mock.mock(/\/api\/ad\/sportmeet\/changeOpenSign/, 'post', changeOK)
Mock.mock(/\/api\/ad\/sportmeet\/generatePreTrackAndGroup/, 'post', changeOK)
Mock.mock(/\/api\/ad\/record\/putRecord/, 'post', getCreateRecord)
Mock.mock(/\/api\/ad\/record\/deleteRecord/, 'post', changeOK)
Mock.mock(/\/api\/ad\/class\/createClass/, 'post', getCreateClass)
Mock.mock(/\/api\/ad\/sportmeet\/deleteClass/, 'post', changeOK)
Mock.mock(/\/api\/ad\/sportmeet\/resetSportLeaderPassword/, 'post', changeOK)
Mock.mock(/\/api\/sl\/game\/createClassAthlete/, 'post', getCreateAthlete)
Mock.mock(/\/api\/sl\/game\/deleteClassAthlete/, 'post', changeOK)
Mock.mock(/\/api\/sl\/game\/changeAthleteInfo/, 'post', changeOK)
Mock.mock(/\/api\/sl\/game\/createGameAthlete/, 'post', getCreateGameAthlete)
Mock.mock(/\/api\/sl\/game\/deleteGameAthlete/, 'post', changeOK)

Mock.mock(/\/api\/ad\/game\/putGroupGrade/, 'post', changeOK)
Mock.mock(/\/api\/ad\/game\/putFinish/, 'post', changeOK)
Mock.mock(/\/api\/ad\/game\/confirmScore/, 'post', changeOK)
Mock.mock(/\/api\/ad\/score\/putClassScore/, 'get', changeOK)
Mock.mock(/\/api\/ad\/game\/generateNextRound/, 'post', changeOK)
