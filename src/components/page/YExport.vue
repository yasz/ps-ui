<template>
  <div class="container-fluid">
    <div class="row">

      <div class="col-md-12 col-xs-12">

        <div class="list-group">
          <draggable id="dragList">

          </draggable>
        </div>

      </div>

      <br/><br/>
      <button type="button" class="btn btn-danger ylyric-btn" @click="clickBtnDelete">删除</button>
      <br/><br/>
      <button type="button" class="btn btn-danger ylyric-btn" @click="clickBtnDeleteAll">全部删除</button>
      <br/><br/><div>*拖动排序</div>
      <br/><br/>
      <!--<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>-->
      <button type="button" class="btn btn-primary ylyric-btn" @click="clickBtnExport">导出</button>
      <!--<div class="col-md-2 col-xs-2"></div>-->
      <!--<button>↑    </button>-->
      <!--<button>↓    </button>-->
    </div>

  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  export default {
    components: {draggable},
    methods: {
      clickBtnExport: function () {
        let title = "";
        let lyric = "";
        $("#dragList").find("a").each(function () {
          title += $(this).html()+"zzz";
          lyric += $(this).attr('lyric')+"zzz";
        });
        lyric=lyric.replace(/\r\n/g,"\n");
        let templateName = $("#pickedTemplate").html()+"2.pptx";
        console.log(templateName)
        post('/api/unit2',{title: title, lyric: lyric,template:templateName});
        function post(URL, PARAMS) {
          var temp = document.createElement("form");
          temp.action = URL;
          temp.method = "post";
          temp.style.display = "none";
          for (var x in PARAMS) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = PARAMS[x];
            // alert(opt.name)
            temp.appendChild(opt);
          }
          document.body.appendChild(temp);
          temp.submit();
          return temp;
        }
//        $.fileDownload("/api/unit2", {
//            httpMethod: 'POST',
//            data: {title: title, lyric: lyric}
//          }
//        )
        ;
      },
      clickBtnDelete: function () {

      },
      clickBtnDeleteAll: function () {
        $("#dragList").empty();
        $(".weui-badge").html(0);
      }
    }
  }
</script>
