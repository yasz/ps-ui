<template>

  <div>

    <YLyric ref="ref1" v-show="showLyric"></YLyric>
    <YTemplate ref="ref2" v-show="showTemplate"></YTemplate>
    <YExport ref="ref3" v-show="showExport"></YExport>
    <YAboutme ref="ref4" v-show="showAboutme"></YAboutme>
    <div class="weui-tabbar">
      <span class="weui-badge" style="position: absolute;top: -.4em;right: 30%;">0</span>
      <BottomTab @click.native="clickBtnLyric" :text="'歌词'"></BottomTab>
      <BottomTab @click.native="clickBtnTemplate" :text="'模板'"></BottomTab>
      <BottomTab @click.native="clickBtnExport" :text="'导出'"></BottomTab>
      <BottomTab @click.native="clickBtnAboutme" :text="'我'"></BottomTab>
    </div>
  </div>
</template>
<script>
  import BottomTab from '@/components/basic/BottomTab.vue';
  import YExport from '@/components/page/YExport.vue';
  import YLyric from '@/components/page/YLyric.vue';
  import YTemplate from '@/components/page/YTemplate.vue';
  import YAboutme from '@/components/page/YAboutme.vue';

  export default {
    name: 'hello',
    components: {
      BottomTab, YExport, YLyric, YTemplate,YAboutme
    },
    beforeRouteUpdate (to, from, next) {
        next();
        this.routeUpdate();
    },
    methods: {
      clickBtnLyric:function () {
        this.$router.push('/page/lyric')
        },
      clickBtnTemplate:function(){
        this.$router.push('/page/template')
      },
      clickBtnExport:function(){
        this.$router.push('/page/export')
      },
      clickBtnAboutme:function(){
        this.$router.push('/page/aboutme')
      },

      routeUpdate: function () {
        /**
         * created by yang on 15:35 2018/1/24.
         * describtion:url修改后的刷新事件
         */

        this.showLyric = false;
        this.showTemplate = false;
        this.showExport = false;
        this.showAboutme = false;

        $(".weui-tabbar__item").find("*").removeClass("ybutton-icon-active")
        switch (this.$route.params.pagename) {
          case 'lyric':
            this.showLyric = true;$(".weui-tabbar__item").eq(0).find("*").addClass("ybutton-icon-active");break;
          case 'template':
            this.showTemplate = true;$(".weui-tabbar__item").eq(1).find("*").addClass("ybutton-icon-active");break;
          case 'export':
            this.showExport = true;$(".weui-tabbar__item").eq(2).find("*").addClass("ybutton-icon-active");break;
          case 'aboutme':
            this.showAboutme = true;$(".weui-tabbar__item").eq(3).find("*").addClass("ybutton-icon-active");break;
        }
      },

      iconInit: function () {
        /**
         * created by yang on 15:35 2018/1/24.
         * describtion:初始化按钮
         */
        var iconName = ['file', 'bars', 'file-powerpoint-o', 'heart-o'];
        $('.weui-tabbar__icon').each(function (i) {
          $(this).addClass('fa fa-fw fa-' + iconName[i]);

        })
      }
    },
    mounted: function () {
      this.iconInit();
      this.routeUpdate();
    },
    data () {
      return {
        isActive: true,
        showLyric: false,
        showTemplate: false,
        showExport: false,
        showAboutme:false,
      }
    }
  }
</script>
