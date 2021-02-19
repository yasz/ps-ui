<template>
  <div>
    <br/></br>
    <div id="radioDiv" style="text-align: center">
      <label class="radio-inline" v-for="(value, key) in list" :key="key">
        <input
          type="radio"
          @click="changeTemplate($event)"
          :value="key"
          v-model="pickedTemplate"
        />
        {{ value.desc }}
      </label>
    </div>
    <!-- <div id="pickedTemplate" style="display:none">{{ template }}</div> -->
    <br />
    <br />
    <br />
    <br />
    <img :src="this.list[pickedTemplate].url" width="100%" />
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ytemplate',
  computed: {
    ...mapState(['templateName']),
  },
  data() {
    return {
      pickedTemplate: '',
      list: {
        korea: { desc: '韩国教会', url: '/img/korea.png' },
        japan: { desc: '日本教会', url: '/img/japan.png' },
        child: { desc: '主日学', url: '/img/child.png' },
        zanmeishi: { desc: 'zms', url: '/img/zanmeishi.png' },
        marry: { desc: '婚礼', url: '/img/marry.png' },
      },
    }
  },

  created: function () {
    this.pickedTemplate = this.templateName
  },
  methods: {
    ...mapMutations(['setTemplateName']),
    changeTemplate: function (event: any) {
      this.setTemplateName(event.target.value)
    },
  },
}
</script>
