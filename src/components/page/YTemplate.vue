<template>
  <div>
    <div id="radioDiv" >
      <label  class="radio-inline"  v-for="tmp in templatetList">
      <input type="radio" @click="ch1($event)" name="template" :value="tmp.pptName" v-model="picked">{{tmp
        .desc}}</label>
    </div>
    <div id="pickedTemplate" style="display:none">{{ picked }}</div>
    <br><br><br><br>
    <img id="templateIMG" width="100%">
  </div>

  <!--http://jqweui.com/extends-->
</template>

<script>
  import korea from '@/common/img/korea.png'
  import child from '@/common/img/child.png'
  import japan from '@/common/img/japan.png'
  export default {
    data() {
      return {
        picked:'',
        templatetList: [
          {pptName: "korea", desc: "韩国教会", url: korea},
          {pptName: "japan", desc: "日本教会", url: japan},
          {pptName: "child", desc: "主日学", url: child},
        ],
        tabs: [
          { text: '巴士' },
          { text: '快车' },
          { text: '专车' },
          { text: '顺风车' },
          { text: '出租车' },
          { text: '代驾' }
        ]
      }
    },
    name: 'ytemplate',
    mounted: function () {
      // $("#radioDiv input").eq(0).prop("checked",true)
      // $("#templateIMG").attr("src",korea)
      $("#radioDiv input").eq(0).trigger("click")
    },
    methods: {
      ch1: function (event) {
        let value = $(event.target).val()
        if (value == undefined) return;
        console.log(value)
        this.templatetList.forEach(function (item) {
          if(value==item.pptName){
            $("#templateIMG").attr("src", item.url)
          }
        })


      }
    }

  }
</script>
