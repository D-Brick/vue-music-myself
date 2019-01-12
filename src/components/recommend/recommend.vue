<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :dataList="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends"
                 :key="item.id"
            >
              <a :href="item.linkUrl">
                <img :src="item.picUrl" >
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="recommend-title">热门歌曲推荐</h1>
          <ul>
            <li class="item"
                @click="selectDisc(item)"
                v-for="item in discList"
                :key="item.dissid"
            >
              <div class="item-img">
                <img class="item-img-content"
                     v-lazy="item.imgurl"
                     @load="_loadImage"
                >
              </div>
              <div class="item-text">
                <div class="item-title" v-html="item.creator.name"></div>
                <div class="item-desc" v-html="item.dissname"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="!discList.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
export default {
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    // setTimeout(() => {
    //   this._getDiscList()
    // }, 1000)
    this._getDiscList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectDisc(item) {
      this.$router.push({
        path: `recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    }),
    _loadImage() {
      if (this.isFirstLoad) {
        this.$refs.scroll.refresh()
        this.isFirstLoad = false
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
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
        position:relative
        .recommend-title
          height: 3.5rem
          line-height: 3.5rem
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          height: 5rem
          padding: .5rem 1.2rem
          .item-img
            width: 4rem
            .item-img-content
              width: 100%
          .item-text
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            font-size: $font-size-medium
            padding: 0 1rem
            .item-title
              flex: 1
              color: $color-text
            .item-desc
              flex: 1
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>