<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <img src="~@/assets/logo3.png" class="logo" alt="logo">
          <span class="title">个人运动系统测试</span>
        </div>
      </div>`

      <route-view></route-view>

      <!-- <div class="footer">
        <div class="copyright">
          Copyright &copy; 2019 个人运动系统测试
        </div>
      </div> -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'
import GlobalFooter from '@/components/GlobalFooter'

export default {
  name: 'UserLayout',
  components: { RouteView, GlobalFooter },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .header{
          margin-top:-30px;
          margin-bottom: -20px;
        }
        .main {
          max-width: 368px;
          width: 100vw;
        }
      }
    }

    .container {
      width: 100vw;
      min-height: 100%;
      height: 100vh;
      background: #f0f2f5 url(~@/assets/background.svg) repeat-y ;
      background-size: 100%;
      padding: 10px 0 0 0;
      position: relative;
      filter: alpha(opacity=40);
      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;
          margin-top:20px;
          margin-bottom: -10px;
          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        width: 100%;
        bottom: 10;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;
        position: absolute;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          font-weight: 500;
          font-size: 14px;
          position: relative;
          bottom: 0px;
        }
      }
    }
  }
</style>
