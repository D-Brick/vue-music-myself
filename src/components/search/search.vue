<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box></search-box>
    </div>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
export default {
  data() {
    return {
      hotKey: []
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          
        }
      })
    }
  },
  components: {
    SearchBox
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .search
    .search-box-wrapper
      margin: 20px
</style>
