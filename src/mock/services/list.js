import Mock from 'mockjs2'
import { builder } from '../util'
const data = Mock.mock({
  'dataSource|8': [{
    'key|+1': 1,
    'rank|+1': 1,
    'cla_name': '班级',
    'ath_name': '@cname',
    'grade|100000-200000': 100000
  }]
})
const orderData = Mock.mock({
  'dataSource|25': [{
    'key|+1': 1,
    // 'group|+1': 1,
    'track_no|+1': 1,
    'cla_name': '班级',
    'athleteInfo': '@cname',
  }]
})

const spoSubmitSuccessData = Mock.mock({
  'dataSource|1': [{
    'key|1000-2000': 2000,
    'spo_name': '@cname',
    'spo_time': '@date',
    // 'spo_location': '@city' + '@city',
    'spo_location': '@city',
  }]
})


const signUpData = Mock.mock({
  'dataSource|25': [{
    'key|1000-2000': 2000,
    // 'ath_number|20000000000-29999999999': 10000000000,
    'ath_name': '@name',
    'item_name|1': '@cname',
  }]
})

const inputScoreData = Mock.mock({
  'dataSource|8': [{
    'game_id|1000-2000': 2000,
    // 'ath_number|20000000000-29999999999': 10000000000,
    'track_no|1-8': 1,
    'athleteInfo': '@cname',
    'cla_name': '@cname',
    'grade|100000-200000': 100000,
  }],
  grade_unit: 0
})

const athId = Mock.mock({
  'ath_id|500-2000': 500
})

