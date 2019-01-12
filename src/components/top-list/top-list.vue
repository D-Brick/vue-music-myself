<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="true"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
import { ERR_OK } from 'api/config'
export default {
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters([
      'topList'
    ])
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.songlist)).then((songs) => {
            this.songs = songs
          })
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all .3s ease
  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

