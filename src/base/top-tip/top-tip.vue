<template>
  <transition name="drop-fade">
    <div class="top-tip" v-show="showFlag">
      <span class="text">
        <i class="icon-ok"></i>
        {{text}}
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.showFlag = false
      }, 3000)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .top-tip
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 50px
    text-align: center
    background: $color-dialog-background
    &.drop-fade-enter-active, &.drop-fade-leave-active
      transition: all 0.3s
    &.drop-fade-enter, &.drop-fade-leave-to
      transform: translateY(-100%)
    .text
      line-height: 50px
      font-size: $font-size-medium
      color: $color-theme
</style>
