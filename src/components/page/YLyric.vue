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
              <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required/>
              <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
            </div>
            <label class="weui-search-bar__label" id="searchText">
              <i class="weui-icon-search"></i>
              <span>搜索</span>
            </label>
          </form>
          <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
        <div class="weui-cells searchbar-result" id="searchResult" style="display: none">
          <div class="weui-cell_access"><p>实时搜索文本</p></div>
          <!--<div class="weui-cell weui-cell_access">-->
          <!--<div class="weui-cell__bd weui-cell_primary">-->
          <!--<p>实时搜索文本</p>-->
          <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="col-md-1 col-xs-1">
        <button type="button" class="btn btn-primary ylyric-btn " @click="clickBtnAddToExport">add</button>
      </div>
      <div class="col-md-1 col-xs-2"></div>
    </div>
    <br>

    <div class="row">
      <label class="col-md-1 col-xs-1 ylyric-label">title</label>
      <div class="col-md-10 col-xs-10"><input id='titleInput' class="form-control" value="奇异恩典"/></div>
    </div>
    <br/>
    <div class="row">
      <label class="col-md-1 col-xs-1 ylyric-label">lyric</label>
      <div class="col-md-10 col-xs-10">
        <textarea class="form-control" id='lyricTextarea' placeholder="input the lyric" rows="17">
奇异恩典何等甘甜
我罪已得赦免
前我失丧今得寻回
瞎眼今得看见

如此恩典使我敬畏
使我心得安慰
初信之时我蒙恩惠
真是何等宝贵

许多危险劳苦重担
今日已经脱离
全靠主恩大得平安
并领我回家去

将来禧年圣徒欢聚
恩光爱谊千年
喜乐颂赞在父座前
深望那日快现</textarea>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'ylyric',
    methods: {
      clickBtnAddToExport: function () {
        let listSize = $('#dragList').find('a').size();
        if (listSize > 4) {
          alert('不能超过5首！');
          return;
        }
        let title = $('#titleInput').val();
        let lyric = $('#lyricTextarea').val();
        $('#dragList').append(`<a class="list-group-item" lyric="${lyric}">${title}</a>`);
        $(".weui-badge").html(++listSize);
      },

      searchInit: function () {
        /**
         * created by yang on 15:35 2018/1/24.
         * describtion:初始化搜索框
         */
        var $searchBar = $('#searchBar'),
          $searchResult = $('#searchResult'),
          $searchText = $('#searchText'),
          $searchInput = $('#searchInput'),
          $searchClear = $('#searchClear'),
          $searchCancel = $('#searchCancel');


        function searchTitle(kw) {
          //describtion:成员函数，用于发起json请求到赞美诗网
          let url = `/search/autosuggestp?k=${kw}`
          let resultjson = ''
          $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            success: function (data) {
//              console.log(data)
              resultjson = data
              if (resultjson != '') {
                let resultDom = ""
                resultjson.song.forEach(x =>
                  resultDom += `<div class="weui-cell_access" id="${x.id}" title="${x.name}"><p>${x.name} - ${x.artist}</p></div>`
                )
                $('#searchResult').empty()
                $('#searchResult').append(resultDom)
                $('.weui-cell_access').click(function (event) {
                  let id = $(event.currentTarget).attr("id")
                  let title = $(event.currentTarget).attr("title")
                  let lyricUrl = `/song/text?song_id=${id}`
//                  $.ajax({
//                    url: songUrl,
//                    type: 'GET',
//                    dataType: "jsonp",
//                    jsonpCallback: "success_jsonpCallback",
//                    success: function (data) {
//                      $("#titleInput").val(title)
//                      $("#lyricTextarea").val(data.lyric)
//                      $searchResult.hide();
//                    }
//                  })
                  $.ajax({
                    url: lyricUrl,
                    type: 'GET',
                    dataType: "json",
                    success: function (data) {
                      $("#titleInput").val(title)
                      $("#lyricTextarea").val(data.lyric)
                      $searchResult.hide();
                    }
                  })
                })
              }
            }
          });

        }


        function hideSearchResult() {
          $searchResult.hide();
          $searchInput.val('');
        }

        function cancelSearch() {
          hideSearchResult();
          $searchBar.removeClass('weui-search-bar_focusing');
          $searchText.show();
        }

        $searchText.on('click', function () {
          $searchBar.addClass('weui-search-bar_focusing');
          $searchInput.focus();
        });
        $searchInput
          .on('blur', function () {
            if (!this.value.length) cancelSearch();
          })
          .on('input', function () {
            if (this.value.length > 1) {
              //y+here to search
//              console.log("length:" + this.value.length)
              searchTitle(this.value)
              $searchResult.show();
            } else {
              $searchResult.hide();
            }
          })
        ;
        $searchClear.on('click', function () {
          hideSearchResult();
          $searchInput.focus();
        });
        $searchCancel.on('click', function () {
          cancelSearch();
          $searchInput.blur();
        });


      },
    },

    mounted: function () {
      this.searchInit()
    }
  }
</script>
