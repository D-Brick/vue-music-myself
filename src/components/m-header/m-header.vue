<template>
  <div class="header">
    <div class="icon"></div>
    <h1 class="title">
      Chicken Music
    </h1>
    <router-link tag="div" class="user" to="/user">
      <span class="user-icon">
        <i class="icon-mine"></i>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .header
    position: relative
    height: 2rem
    padding-top: .4rem
    padding-bottom: .4rem
    display: flex
    justify-content: center
    align-items: center
    font-size: $font-size-large
    .icon
      display: inline-block
      width: 2rem
      height: 2rem
      bg-image('logo')
      background-size: 2rem 2rem
    .title
      display: inline-block
      padding-left: .5rem
    .user
      extend-click()
      position: absolute
      right: 12px
      font-size: 20px
</style>