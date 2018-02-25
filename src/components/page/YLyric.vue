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

许多危险 劳苦重担  
今日已经脱离
全靠主恩 大得平安
并领我回家去

将来禧年 圣徒欢聚
恩光爱谊千年
喜乐颂赞 在父座前
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
        let listSize=$('#dragList').find('a').size();
        if(listSize>4){alert('不能超过5首！');return;}
        let title = $('#titleInput').val();
        let lyric = $('#lyricTextarea').val();
        $('#dragList').append(`<a class="list-group-item" lyric="${lyric}">${title}</a>`);
        $(".weui-badge").html(++listSize);

      }
    }
  }
</script>
