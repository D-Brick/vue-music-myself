<template>
  <transition name="slide">
    <div class="user-center">
      <span class="back" @click="back">
        <i class="icon-back"></i>
      </span>
      <div class="switches-wrapper">
        <switches :switches="switches"
                  @switch="switchIndex">
        </switches>
      </div>
      <div class="list-wrapper">
        <div class="list-scroll">
          <scroll ref="favoriteList"
                  v-if="currentIndex === 0"
                  :data="favoriteList"
                  >
            <div class="favoriteList">
              <song-list :songs="favoriteList"
                         @select="selectSong">
              </song-list>
            </div>
          </scroll>
          <scroll ref="historyList"
                  v-if="currentIndex === 1"
                  :data="playHistory">
            <div class="historyList">
              <song-list :songs="playHistory"
                         @select="selectSong">
              </song-list>
            </div>
          </scroll>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import { mapGetters, mapActions } from 'vuex'
import { playerMixin } from 'common/js/mixin'
export default {
  mixins: [playerMixin],
  computed: {
    ...mapGetters([
      'playHistory'
    ])
  },
  data() {
    return {
      currentIndex: 0,
      switches: [
        {
          name: '我最喜欢'
        },
        {
          name: '最近播放'
        }
      ]
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    switchIndex(index) {
      this.currentIndex = index
    },
    selectSong(item, index) {
      this.insertSong(item)
      // let sequenceList = []
      // let playList = []
      // if (this.currentIndex === 0) {
      //   sequenceList = this.favoriteList
      //   playList = this.favoriteList
      // } else {
      //   sequenceList = this.historyList
      //   playList = this.historyList
      // }
      // if (this.mode === playMode.random) {
      //   playList = shuffle(sequenceList)
      //   index = playList.findIndex((song) => {
      //     return song.id === item.id
      //   })
      // }
      // this.setPlayList(playList)
      // this.setSequenceList(sequenceList)
      // this.setCurrentIndex(index)
      // this.setPlayingState(true)
    },
    ...mapActions([
      'insertSong'
    ])
  },
  components: {
    Switches,
    Scroll,
    SongList
  }
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
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translateX(100%)
    .back
        extend-click()
        position: absolute
        top: 10px
        left: 15px
        font-size: $font-size-large-x
    .switches-wrapper
      width: 100%
      margin: 10px 0
    .list-wrapper
      position: fixed
      top: 52px
      bottom: 0
      margin: 0 30px
      width: 100%
      overflow: hidden
</style>
