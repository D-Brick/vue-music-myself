<template>
 
  <div class="user-center">
    <div class="header">
      <span class="back">
        <i class="icon-back"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .user-center
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    overflow: hidden
    background: $color-background
    .header
      position: relative
      width: 100%
      height: 50px
      .back
        position: absolute
        left: 5px
        font-size: $font-size-large 
</style>
