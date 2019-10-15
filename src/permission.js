import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { ROLE_ID } from './store/mutation-types'
import { asyncRouterMap, adminRouterMap, leaRouterMap } from '@/config/router.config'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult', 'recoverResult', 'test', 'audience', 'login2',
  'register2', 'registerResult2', 'audiencelayout', 'audiencelist', 'recover', 'orderlist'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // Vue.ls.set(ACCESS_TOKEN, null)
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  // if (Vue.ls.get(ROLE_ID)) {
  console.log('Vue.ls.get(ACCESS_TOKEN)', Vue.ls.get(ACCESS_TOKEN))
  if (Vue.ls.get(ACCESS_TOKEN) && Vue.ls.get(ROLE_ID)) {
    // Vue.ls.get(ROLE_ID)
    /* has token */
    if (to.path === '/user/login') {
      // next({ path: '/dashboard/workplace' }) // 强制去到主页
      next({ name: 'index' }) // 强制去到主页
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.commit('SET_ROLES', { length: 10 }) // 只能加载一次
        if (Vue.ls.get(ROLE_ID) === 'admin') { // 权限
          // router.addRoutes(asyncRouterMap)
          router.addRoutes(adminRouterMap)
          console.log('permission管理员上线')
        } else if (Vue.ls.get(ROLE_ID) === 'sportleader') {
          // router.concat(asyncRouterMap)
          router.addRoutes(leaRouterMap)
          console.log('permission体委上线')
        }
        // 修改：重定向问题
        // console.log(router)
        // console.log(router.Route)
        // const redirect = decodeURIComponent(from.query.redirect || to.path)
        const redirect = decodeURIComponent(to.path)
        console.log('redirect重定向')
        console.log(redirect)
        if (to.path === redirect) {
          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          // next({ name: 'index' }) // 强制去到主页
          console.log('to.path === redirect', redirect)
          next({ ...to, replace: true })
        } else {
          // 跳转到目的路由
          // next({ name: 'index' }) // 强制去到主页
          next({ path: redirect })
        }
      } else {
        next()
      }

      // if (store.getters.roles.length === 0) {
      //   // console.log('store.getters.roles.length')
      //   // console.log(store.getters.roles.length)
      //   store
      //     .dispatch('GetInfo')
      //     .then(res => {
      //       const roles = res.result && res.result.role
      //       console.log('roles')
      //       console.log(roles)
      //       store.dispatch('GenerateRoutes', { roles }).then(() => {
      //         // 根据roles权限生成可访问的路由表
      //         // 动态添加可访问路由表
      //         router.addRoutes(store.getters.addRouters)
      //         console.log('store.getters.addRouters')
      //         console.log(store.getters.addRouters)
      //         const redirect = decodeURIComponent(from.query.redirect || to.path)
      //         if (to.path === redirect) {
      //           // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      //           next({ ...to, replace: true })
      //         } else {
      //           // 跳转到目的路由
      //           next({ path: redirect })
      //         }
      //       })
      //     })
      //     .catch(() => {
      //       notification.error({
      //         message: '错误',
      //         description: '请求用户信息失败，请重试'
      //       })
      //       store.dispatch('Logout').then(() => {
      //         next({ path: '/user/login', query: { redirect: to.fullPath } })
      //       })
      //     })
      // } else {
      //   next()
      // }
    }
  } else {
    console.log('whiteList.includes(to.name)')
    console.log(whiteList.includes(to.name))
    console.log(to.name)
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      // console.log(whiteList.includes(to.name))
      console.log('进入includes')
      next()
    } else {
      console.log('进入includes的else')
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */
const action = Vue.directive('action', {
  bind: function (el, binding, vnode) {
    const actionName = binding.arg
    const roles = store.getters.roles
    const elVal = vnode.context.$route.meta.permission
    const permissionId = elVal instanceof String && [elVal] || elVal
    roles.permissions.forEach(p => {
      if (!permissionId.includes(p.permissionId)) {
        return
      }
      if (p.actionList && !p.actionList.includes(actionName)) {
        el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
      }
    })
  }
})

export {
  action
}
