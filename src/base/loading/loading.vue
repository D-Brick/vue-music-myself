<template>
  <div class="loading">
    <div class="loading-img">
      <img class="loading-img-content" src="./loading.gif">
      <p class="loading-text">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .loading
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    .loading-img
      text-align: center
      .loading-img-content
        width: 20%
      .loading-text
        font-size: $font-size-small
        color: $color-text-l
</style>