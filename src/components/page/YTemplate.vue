<template>
  <div>
    <div id="radioDiv">
      <label class="radio-inline" v-for="(value,key) in list">
        <input type="radio" @click="changeTemplate($event)" :value="key" v-model="pickedTemplate" />
        {{value.desc}}
      </label>
    </div>
    <!-- <div id="pickedTemplate" style="display:none">{{ template }}</div> -->
    <br />
    <br />
    <br />
    <br />
    <img :src="this.list[pickedTemplate].url" width="100%" />
  </div>

  <!--http://jqweui.com/extends-->
</template>

<script>
import korea from '@/common/img/korea.png'
import child from '@/common/img/child.png'
import japan from '@/common/img/japan.png'
import zanmeishi from '@/common/img/zanmeishi.png'
import marry from '@/common/img/marry.png'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ytemplate',
  computed: {
    ...mapState(['templateName'])
  },
  data() {
    return {
      pickedTemplate: '',
      list: {
        korea: { desc: '韩国教会', url: korea },
        japan: { desc: '日本教会', url: japan },
        child: { desc: '主日学', url: child },
        zanmeishi: { desc: 'zms', url: zanmeishi },
        marry: { desc: '婚礼', url: marry }
      }
    }
  },

  created: function() {
    this.pickedTemplate = this.templateName
  },
  methods: {
    ...mapMutations(['setTemplateName']),
    changeTemplate: function(event) {
      this.setTemplateName(event.target.value)
    }
  }
}
</script>
