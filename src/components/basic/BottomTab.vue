<template>
    <a href="javascript:;" v-on:click="buttonClick($event)" v-bind:id="url" class="ybutton-icon weui-tabbar__item weui-bar__item--on">
    <div class="weui-tabbar__icon"></div>
    <p  class="ybutton-label weui-tabbar__label">{{text}}</p>
    </a>
</template>

<script>
  export default {
    name: 'BottomTab',
    props:['text','url'],
    mounted:function () {
    },
    methods: {
      buttonClick: function (e) {
          /**
           * created by yang on 17:59 2018/1/26.
           * describtion:点击按钮触发
           */
          this.$emit('message', this.url )

//        return this.url
//          $(".weui-tabbar__item").find("*").removeClass("ybutton-icon-active")
//          $(e.currentTarget).find("*").addClass("ybutton-icon-active")
//          console.log(e.currentTarget.tagName);
      }
    }
  }

</script>
