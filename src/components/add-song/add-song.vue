<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox"
                    @query="onQueryChange">
        </search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches"
                  @switch="showList">
        </switches>
        <div class="list-wrapper">
          <scroll ref="playList"
                  class="list-scroll"
                  :data="playHistory"
                  v-show="currentIndex === 0">
            <div class="list-inner">
              <song-list :songs="playHistory"
                         @select="insertSong">
              </song-list>
            </div>
          </scroll>
          <scroll ref="searchList"
                  class="list-scroll"
                  :data="searchHistory"
                  v-show="currentIndex === 1"
                  :refreshDelay="refreshDelay">
            <div class="list-inner">
              <search-list :searches="searchHistory"
                           @selectSearch="selectSearch"
                           @deleteSearch="deleteSearchHistory">
              </search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query" ref="searchResult">
        <suggest :query="query"
                ref="suggest"
                @listScroll="blurInput"
                @select="saveSelect">
        </suggest>
      </div>
      <top-tip ref="topTip" text="1首歌曲已经添加到播放列表"></top-tip>
    </div>
  </transition>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Switches from 'base/switches/switches'
import SearchList from 'base/search-list/search-list'
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import Suggest from 'components/suggest/suggest'
import TopTip from 'base/top-tip/top-tip'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'searchHistory',
      'playHistory'
    ])
  },
  data() {
    return {
      showFlag: false,
      query: '',
      refreshDelay: 120,
      currentIndex: 0,
      switches: [
        {
          name: '最近播放'
        },
        {
          name: '搜索历史'
        }
      ]
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.refreshList()
    },
    hide() {
      this.showFlag = false
    },
    showList(index) {
      this.currentIndex = index
      this.refreshList()
    },
    refreshList() {
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.playList.refresh()
        } else {
          this.$refs.searchList.refresh()
        }
      }, 20)
    },
    onQueryChange(query) {
      this.query = query.trim()
    },
    selectSearch(query) {
      this.$refs.searchBox.setQuery(query)
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSelect() {
      this.saveSearchHistory(this.query)
      this.$refs.topTip.show()
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'insertSong'
    ])
  },
  components: {
    SearchBox,
    Switches,
    SearchList,
    Scroll,
    Suggest,
    TopTip,
    SongList
  },
  watch: {
    query() {
      this.refreshList()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    overflow: hidden
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translateX(100%)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        padding: 12px
        .icon-close
          font-size: 20px
          color: $color-theme
    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 156px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      width: 100%
      bottom: 0
</style>
