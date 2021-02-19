<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <div class="list-group">
          <draggable
            dragClass="active"
            v-model="songs"
            @remove="remove"
            @end="end"
          >
            <li
              class="list-group-item"
              v-for="(ele, i) in songs"
              :key="i"
              :lyric="ele.lyric"
            >
              {{ ele.title }}
            </li>
          </draggable>
        </div>
      </div>
      <draggable
        v-model="trashZone"
        class="dropzone trashzone"
        :options="trashOptions"
      >
        <div slot="footer" class="footer">拖动到这里删除</div>
      </draggable>

      <div id="footDiv">
        <button type="button" class="btn btn-danger ylyric-btn" @click="clear">
          全部删除
        </button>
        <button
          type="button"
          class="btn btn-primary ylyric-btn"
          @click="clickBtnExport"
        >
          导出
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { mapState, mapMutations } from 'vuex'
export default {
  components: { draggable },
  computed: {
    ...mapState(['templateName']),
    songs: {
      get() {
        return this.$store.state.songs
      },
      set(value) {
        this.$store.commit('updateSongs', value)
      },
    },
  },
  data() {
    return {
      trashZone: [],
      trashOptions: {
        group: {
          name: 'trash',
          draggable: '.dropitem',
          put: () => true,
          pull: false,
        },
      },
    }
  },

  methods: {
    ...mapMutations(['clear', 'clearByTitle']),
    clickBtnExport: async function () {
      if (this.songs.length == 0) {
        alert('至少添加1首诗歌')
        return
      }
      let title = ''
      let lyric = ''
      this.songs.forEach((song) => {
        title += song.title + 'zzz'
        lyric += song.lyric + 'zzz'
      })
      // lyric = lyric.replace(/\r\n/g, '\n')
      let templateName = this.templateName + '2.pptx'
      fetch('http://localhost:8090/api/unit2', {
        title: title,
        lyric: lyric,
        template: templateName,
      })
    },
    remove(event) {
      this.clearByTitle(event.item.innerHTML)
    },

    end(event) {
      console.log('end', event)
    },
  },
}
</script>
<style scoped>
.trashzone .footer {
  border: 3px dotted red;
  min-height: 100px;
  width: 100%;
  display: block;
  position: absolute;
  align-content: center;
  bottom: 400px;
}

.trashzone .dropitem + .footer {
  background: red;
  color: white;
}
#footDiv {
  bottom: 300px;
  display: block;
  width: 100%;
  align-content: center;
  position: absolute;
}
</style>