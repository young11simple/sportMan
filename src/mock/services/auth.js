import Mock from 'mockjs2'
import { builder, getBody, myBuilder } from '../util'

const username = ['admin', 'user', 'super']
const password = ['21232f297a57a5a743894a0e4a801fc3', '8914de686ab28dc22f30d3d8e107ff6c'] // admin, ant.design
// const password = ['admin']
const login = (options) => {
  console.log('进入登录')
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.adm_account) || !password.includes(body.adm_password)) {
    console.log('账户或密码错误')
    // return builder({}, '账户或密码错误', 401)
    return myBuilder({}, '登录失败', -1)
  }
  return myBuilder({
    college: {
      'col_id': 566,
      'col_name': '数学与信息学院',
      'col_invitecode': 123
    },
    admin: {
      'adm_account': 'addd',
      'adm_id': 1,
      'adm_phone': '15802033567'
    },
    'token': '4291d7da9005377ec9aec4a71ea837f',
    'roleId': 'admin',
    'nickname': '管理员'
  }, '登录成功', 1)
}
const leaLogin = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.lea_account) || !password.includes(body.lea_password)) {
    console.log('username.includes(body.lea_account)', username.includes(body.lea_account))
    console.log('password.includes(body.lea_password', password.includes(body.lea_password))
    // return builder({}, '账户或密码错误', 401)
    return myBuilder({}, '登录失败', -1)
  }
  return myBuilder({
    college: {
      'col_id': 566,
      'col_name': '数学与信息学院'
    },
    class: {
      'cla_name': '信科2班',
      'cla_id': 24
    },
    'roleId': 'sportleader',
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '登录成功', 1)
}

const logout = () => {
  return myBuilder({}, '[测试接口] 注销成功', 1)
}
const changeOK = () => {
  return myBuilder({}, '[测试接口] 提交成功', 1)
}
Mock.mock(/\/api\/vi\/adminLogin/, 'post', login)
Mock.mock(/\/api\/vi\/sportLeaderLogin/, 'post', leaLogin)
Mock.mock(/\/api\/auth\/logout/, 'post', logout)
Mock.mock(/\/api\/vi\/AdminRegister/, 'post', changeOK)
Mock.mock(/\/api\/vi\/ResetAdminPassword/, 'post', changeOK)
Mock.mock(/\/api\/ad\/acount\/changePassword/, 'post', myBuilder({}, '[测试接口] 提交成功', 1))
Mock.mock(/\/api\/sl\/account\/changePassword/, 'post', myBuilder({}, '[测试接口] 提交成功', 1))
Mock.mock(/\/api\/ad\/account\/changeInviteCode/, 'post', changeOK)
Mock.mock(/\/api\/ad\/account\/changePhone/, 'post', changeOK)
