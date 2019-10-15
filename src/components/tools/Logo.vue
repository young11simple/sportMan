<template>
  <div class="logo">
    <LogoSvg alt="logo" />
    <h1 class="show">{{ title }}</h1>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '运动会管理系统',
      required: false
    }
  }
}
</script>
<style scoped>

</style>
