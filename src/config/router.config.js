// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, PageView } from '@/layouts'
export const adminRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/admin/sportmeetlist',
    children: [
      // list
      {
        path: '/admin',
        name: 'admin',
        component: PageView,
        redirect: '/admin/sportmeetlist',
        meta: { title: '管理员', icon: 'table' },
        children: [
          {
            path: '/admin/sportmeetlist',
            name: 'sportmeetlist',
            // hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/SportmeetList'),
            meta: { title: '创建运动会', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/admin/adminsignup',
            name: 'adminsignuplist',
            component: () => import('@/views/list/AdminSignupList'),
            meta: { title: '查看报名信息', keepAlive: true }
          },
          {
            path: '/admin/class',
            name: 'classist',
            component: () => import('@/views/list/ClassList'),
            meta: { title: '填写班级信息', keepAlive: true }
          },
          {
            path: '/admin/record',
            name: 'recordlist',
            component: () => import('@/views/list/RecordList'),
            meta: { title: '创建记录信息', keepAlive: true }
          },
          {
            path: '/admin/inputresult',
            name: 'inputresultlist',
            component: () => import('@/views/list/InputResultList'),
            meta: { title: '输入成绩信息', keepAlive: true }
          },
          {
            path: '/admin/classscore',
            name: 'adminclassscore',
            component: () => import('@/views/list/AdminClassScoreList'),
            meta: { title: '总分列表', keepAlive: true }
          },
          {
            path: '/admin/schoolrecord',
            name: 'schoolrecordlist',
            component: () => import('@/views/list/SchoolRecordList'),
            meta: { title: '查看校记录', keepAlive: true }
          },
          {
            path: '/admin/audiencelist',
            name: 'audiencelist',
            component: () => import('@/views/list/AchieveList'),
            meta: { title: '查看成绩单', keepAlive: true }
          },
          {
            path: '/admin/leaderorderlist',
            name: 'adminorderlist',
            component: () => import('@/views/list/OrderList'),
            meta: { title: '秩序册列表', keepAlive: true }
          },

          {
            path: '/admin/nextround',
            name: 'nextroundlist',
            component: () => import('@/views/list/NextRoundList'),
            hidden: true,
            meta: { title: '管理员选取下一轮列表', keepAlive: false }
          },
          {
            path: '/admin/generatescore',
            name: 'generatescore',
            component: () => import('@/views/list/GenerateScore'),
            hidden: true,
            meta: { title: '管理员生成积分', keepAlive: false }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '修改密码', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '修改邀请码', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      }
    ]
  }
]
export const leaRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/leader',
    children: [
      // 体委
      {
        path: '/leader',
        name: 'leader',
        component: PageView,
        redirect: '/leader/athlete',
        meta: { title: '体育委员', icon: 'table' },
        children: [
          {
            path: '/leader/athlete',
            name: 'athletelist',
            component: () => import('@/views/list/AthleteList'),
            meta: { title: '填写运动员列表', keepAlive: true }
          },
          {
            path: '/leader/signup',
            name: 'signuplist',
            component: () => import('@/views/list/SignupList'),
            meta: { title: '填写报名列表', keepAlive: true }
          },
          {
            path: '/leader/leaderorderlist',
            name: 'lea_orderlist',
            component: () => import('@/views/list/OrderList'),
            meta: { title: '查看分配信息', keepAlive: true }
          }
        ]
      },
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/LeaIndex'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/security',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '修改密码', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      }
    ]
  }
]
export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]
/*
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Recover')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'yibanLogin',
        name: 'yibanLogin',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover-result',
        name: 'recoverResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RecoverResult')
      }
    ]
  }

]
