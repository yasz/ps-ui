<template>
  <div class="container-fluid">
    <!--用于测试awesome字体是否正常显示-->
    <!--<div class="fa fa-fw fa-file"></div>-->
    <div class="row">
      <div class="col-md-1 col-xs-1"></div>
      <div class="col-md-9 col-xs-8">
        <div class="weui-search-bar" id="searchBar">
          <form class="weui-search-bar__form">
            <div class="weui-search-bar__box">
              <i class="weui-icon-search"></i>
              <input
                type="search"
                class="weui-search-bar__input"
                id="searchInput"
                placeholder="搜索"
                required
              />
              <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
            </div>
            <label class="weui-search-bar__label" id="searchText">
              <i class="weui-icon-search"></i>
              <span>搜索</span>
            </label>
          </form>
          <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
        <div class="weui-cells searchbar-result" id="searchResult" @click="chooseSong( $event)"></div>
      </div>
      <div class="col-md-1 col-xs-1">
        <button type="button" class="btn btn-primary ylyric-btn" @click="clickBtnAddToExport">add</button>
      </div>
      <div class="col-md-1 col-xs-2"></div>
    </div>
    <br />

    <div class="row">
      <label class="col-md-1 col-xs-1 ylyric-label">title</label>
      <div class="col-md-10 col-xs-10">
        <input id="titleInput" class="form-control" v-model="title" />
      </div>
    </div>
    <br />
    <div class="row">
      <label class="col-md-1 col-xs-1 ylyric-label">lyric</label>
      <div class="col-md-10 col-xs-10">
        <textarea
          class="form-control"
          id="lyricTextarea"
          placeholder="input the lyric"
          rows="17"
          v-model="lyric"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ylyric',
  data() {
    return {
      title: 'Amazing grace',
      lyric: `Amazing Grace, how sweet the sound
That saved a wretch like me.
I once was lost but now I'm found,
Was blind but now I see.

It was grace that taught my heart to fear
And grace my fear relieved
How precious did that grace appear,
The hour I first believed.`
    }
  },
  computed: {
    ...mapState(['songs'])
  },
  methods: {
    ...mapMutations(['push', 'clear']),
    clickBtnAddToExport: function() {
      if (this.songs.length > 4) {
        alert('不能超过5首！')
        return
      }
      this.push({ title: this.title, lyric: this.lyric }) // this.$store.commit('push', { title: this.title, lyric: this.lyric })
    },
    chooseSong: async function(event) {
      //desc:点击搜索歌词

      let id = $(event.target).attr('id')
      let title = $(event.target).attr('title')
      let res = await fetch(`/song/text?song_id=${id}`)
      let rs = await res.json()
      this.title = title
      this.lyric = this.lyricProcessor(rs.lyric)
      $('#searchResult').hide()
    },

    searchInit: function() {
      /**
       * created by yang on 15:35 2018/1/24.
       * describtion:初始化搜索框
       */
      var $searchBar = $('#searchBar'),
        $searchResult = $('#searchResult'),
        $searchText = $('#searchText'),
        $searchInput = $('#searchInput'),
        $searchClear = $('#searchClear'),
        $searchCancel = $('#searchCancel')

      async function searchTitle(kw) {
        //describtion:成员函数，用于发起json请求到赞美诗网
        const res = await fetch(`/search/autosuggest/?k=${kw}`)
        const rs = await res.json()
        let resultDom = ''
        rs.song.forEach(
          x =>
            (resultDom += `<div class="weui-cell_access" id="${x.id}" title="${x.name}">${x.name} - ${x.artist}</div>`)
        )

        // debugger
        $('#searchResult').empty()
        $('#searchResult').append(resultDom)
      }
      function hideSearchResult() {
        $searchResult.hide()
        $searchInput.val('')
      }

      function cancelSearch() {
        hideSearchResult()
        $searchBar.removeClass('weui-search-bar_focusing')
        $searchText.show()
      }

      $searchText.on('click', function() {
        $searchBar.addClass('weui-search-bar_focusing')
        $searchInput.focus()
      })
      $searchInput
        .on('blur', function() {
          if (!this.value.length) cancelSearch()
        })
        .on('input', function() {
          if (this.value.length > 1) {
            //y+here to search
            //              console.log("length:" + this.value.length)
            searchTitle(this.value)
            $searchResult.show()
          } else {
            $searchResult.hide()
          }
        })
      $searchClear.on('click', function() {
        hideSearchResult()
        $searchInput.focus()
      })
      $searchCancel.on('click', function() {
        cancelSearch()
        $searchInput.blur()
      })
    },
    lyricProcessor: function(lyric) {
      //嘿嘿，要开始处理不规则的歌词
      let f1 = lyric.split('\n').filter((x, i) => !x.match(/[:|：]/g)) //过滤带:或：行
      let f2 = [] //处理超长一行特别长的
      f1.forEach(x => {
        if (x.length > 18) {
          f2 = f2.concat(x.split(/,|。|，|、|\./))
        } else {
          f2.push(x)
        }
      })
      //处理超过连续8行
      f2 = f2.map(x => x.replace(/[\d|\.|\*|；]+/g, '').replace(/\s+$/g, '')) //处理每行带*
      return f2
        .join('\n')
        .replace(/(^\s*)|(\s*$)/g, '')
        .replace(/\n\n+/g, '\n\n') //处理头、尾空行
    }
  },

  mounted: function() {
    this.searchInit()
  }
}
</script>
