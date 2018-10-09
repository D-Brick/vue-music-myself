<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" >
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="recommend-title">热门歌曲推荐</h1>
        <ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  data() {
    return {
      recommends: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .recommend
    position: fixed
    width: 100%
    top: 6.33rem
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-bottom: 40%
        overflow: hidden
      .recommend-list
        .recommend-title
          height: 4rem
          line-height: 4rem
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
</style>