import Mock from 'mockjs2'
import { myBuilder } from '../util'
const spoDatasource = Mock.mock({
  'dataSource|15': [{
    'spo_id|+10': 5,
    'spo_name': '@cname',
    'spo_time|1556704132344-1656704132344': 1556704132344,
    'spo_location': '@city',
    'isopen|1': true,
    'update_time': '2019-10-11T08:31:53.460Z'
  }]
})
const spoData = () => {
  return myBuilder(spoDatasource, null, 1)
}
// const spoData = spoDatasource.dataSource
const itemDatasource = {
  dataSource: [
    {
      item_id: 1,
      itemInfo: '男子100米',
      item_kind: '径赛',
      grade_unit: 0,
      isteam: 0
    },
    {
      item_id: 2,
      itemInfo: '男子200米',
      item_kind: '径赛',
      grade_unit: 0,
      isteam: 0
    },
    {
      item_id: 3,
      itemInfo: '女子100米',
      item_kind: '径赛',
      grade_unit: 0,
      isteam: 0
    },
    {
      item_id: 5,
      itemInfo: '男子跳远',
      item_kind: '田赛',
      grade_unit: 1,
      isteam: 0
    },
    {
      item_id: 4,
      itemInfo: '男子4x100米',
      item_kind: '径赛',
      grade_unit: 0,
      isteam: 1
    }
  ]
}
const itemData = () => {
  return myBuilder(itemDatasource, null, 1)
}

const recordDatasource = Mock.mock({
  'dataSource|15': [{
    'rec_id|+10': 5,
    'rec_class': '@cname',
    'rec_grade|10000-30000': 10000,
    'rec_person': '@cname',
    'rec_spo_time|1556704132344-1656704132344': 1556704132344,
    'itemInfo': '@cname',
    'grade_unit|0-2': 1
  }]
})
const recordData = () => {
  return myBuilder(recordDatasource, null, 1)
}

const classDatasource = Mock.mock({
  'dataSource|15': [{
    'cla_id|+10': 5,
    'cla_name': '@cname',
    'lea_account': '@cname'
  }]
})
const classData = () => {
  return myBuilder(classDatasource, null, 1)
}

const athleteDatasource = Mock.mock({
  'dataSource|25': [{
    'ath_gender': '@cname',
    'ath_id|+11': 5,
    'ath_name': '@cname',
    'ath_number': '@cname',
    'ath_phone': '@cname'
  }]
})
const athleteData = () => {
  return myBuilder(athleteDatasource, null, 1)
}

const gameAthleteDatasource = Mock.mock({
  'dataSource|25': [{
    'signup_id|+1': 500,
    'ath_id|+11': 5,
    'athleteInfo': '@cname',
    'itemInfo': '@cname',
    'item_id|+10': 7,
    'ath_name': '@cname',
    'spo_name': '@cname'
  }]
})
const gameAthleteData = () => {
  return myBuilder(gameAthleteDatasource, null, 1)
}
const inputScoreDataSource = Mock.mock({
  'dataSource|8': [{
    'game_id|1000-2000': 2000,
    // 'ath_number|20000000000-29999999999': 10000000000,
    'track_no|1-8': 1,
    'athleteInfo': '@cname',
    'cla_name': '@cname',
    'grade|100000-200000': 100000
  }],
  grade_unit: 0
})

const inputScoreData = () => {
  return myBuilder(inputScoreDataSource, null, 1)
}
const maxRound = Mock.mock({
  'game_round|1-4': 1
})
const maxRoundData = () => {
  return myBuilder(maxRound, null, 1)
}
const maxGroup = Mock.mock({
  'group_no|4-15': 4
})
const maxGroupData = () => {
  return myBuilder(maxGroup, null, 1)
}
const premada = Mock.mock({
  'dataSource|8': [{
    'athleteInfo': '@cname',
    'game_id|1000-2000': 2000,
    'grade|100000-200000': 100000,
    'rank|+1': 1,
    'score|+1': 20
  }],
  spo_name: '数信第十届院运会',
  itemInfo: '男子100米'
})
const preMatchScoreData = () => {
  return myBuilder(premada, null, 1)
}
const classScoreRankDataSource = Mock.mock({
  'dataSource|8': [{
    'cla_score|0-30': 0,
    'classInfo': '@cname',
    'rank|+1': 1
  }]
})
const classScoreRankData = () => {
  return myBuilder(classScoreRankDataSource, null, 1)
}
const orderData = Mock.mock({
  'dataSource|25': [{
    'key|+1': 1,
    'group|+1': 1,
    'track_no|+1': 1,
    'cla_name': '班级',
    'athleteInfo': '@cname'
  }]
})
const getOrderData = () => {
  return myBuilder(orderData, null, 1)
}
const matchRank = Mock.mock({
  'dataSource|25': [{
    'rank|+1': 1,
    'athleteInfo': '@cname',
    'grade|100000-200000': 100000,
    'itemInfo': '班级',
    'score|+1': 0
  }]
})
const getMatchRank = () => {
  return myBuilder(matchRank, null, 1)
}
const preNextRound = Mock.mock({
  'dataSource|10': [{
    'ath_id|+1': 1,
    'athleteInfo': '@cname',
    'grade|100000-200000': 100000
  }],
  spo_name: '数信第十届运动会',
  itemInfo: '男子100米'
})
const getPreNextRound = () => {
  return myBuilder(preNextRound, null, 1)
}

Mock.mock(/\/api\/vi\/score\/getSportmeetList/, 'get', spoData)
Mock.mock(/\/api\/ad\/record\/getRecord/, 'post', recordData)
Mock.mock(/\/api\/vi\/score\/getItemByKind/, 'get', itemData)
Mock.mock(/\/api\/ad\/class\/queryClass/, 'get', classData)
Mock.mock(/\/api\/sl\/game\/getClassAthlete/, 'get', athleteData)
Mock.mock(/\/api\/vi\/score\/getGameRound/, 'get', maxRoundData)
Mock.mock(/\/api\/ad\/account\/downloadSportLeaderAccount/, 'post', preMatchScoreData)
Mock.mock(/\/api\/vi\/score\/getGroupGrade/, 'get', inputScoreData)
Mock.mock(/\/api\/vi\/score\/getGameGroup/, 'get', maxGroupData)
Mock.mock(/\/api\/sl\/game\/getClassGameAthlete/, 'get', gameAthleteData)
Mock.mock(/\/api\/vi\/score\/getMatchRank/, 'get', getMatchRank)

Mock.mock(/\/sl\/QueryGameAthlete.do/, 'post', gameAthleteData)
Mock.mock(/\/api\/vi\/score\/getClassScoreRank/, 'get', classScoreRankData)
Mock.mock(/\/ad\/getOrderData.do/, 'post', getOrderData)

Mock.mock(/\/ad\/PreNextRound.do/, 'post', getPreNextRound)
Mock.mock(/\/ad\/GetPreMatchScore.do/, 'post', preMatchScoreData)
Mock.mock(/\/ad\/ExportExcel.do/, 'post', preMatchScoreData)
