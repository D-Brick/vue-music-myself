<template>
  <div>
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </div>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getSongList} from 'api/recommend'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
            this.songs = songs
          })
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
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

<style>

</style>
