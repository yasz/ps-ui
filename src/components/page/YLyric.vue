<template>
  <div>
    <van-search
      ref="searchRef"
      class="searchStyle"
      v-model="kw"
      show-action
      placeholder="首拼(如qyed~奇异恩典)"
      @input="onSearch()"
      @confirm="onConfirm"
    >
      <template #action>
        <van-button type="primary" @click="addToExport">添加</van-button>
      </template>
    </van-search>

    <van-popup
      v-model="showPop"
      position="top"
      default-index="2"
      style="height: 60%"
    >
      <van-picker
        show-toolbar
        :title="kw"
        :columns="columns"
        @confirm="onConfirm"
        @change="onChange"
        @cancel="onCancel"
      />
    </van-popup>
    <div>
      <van-field v-model="title" label="标题" label-width="3.1em"> </van-field>
      <van-field
        v-model="lyric"
        type="textarea"
        label-width="3.1em"
        label="歌词"
        rows="5"
      >
      </van-field>
    </div>

    <div class="list-group">
      <van-field
        label="导出列表(拖拽可调整顺序)"
        label-width="20em"
        readonly
      ></van-field>
      <van-cell-group>
        <draggable
          dragClass="active"
          :list="songs"
          :options="{
            scroll: true,
            animation: 150,
          }"
        >
          <van-cell v-for="(ele, i) in songs" :key="i" :lyric="ele.lyric">
            {{ ele.title }}
          </van-cell>
        </draggable>
      </van-cell-group>
    </div>
    <div class="recycle">
      <draggable v-model="trashZone" class="trash" :options="trashOptions">
        <van-icon name="delete" size="40" />
      </draggable>
      <van-button
        type="primary"
        style="margin: 0 20px 0 110px"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="clear"
      >
        清空列表
      </van-button>
      <van-button type="primary" @click="exportPPT"> 导出PPT </van-button>
    </div>
  </div>
</template>
<script lang="ts">
//@ts-nocheck
import { mapState, mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import { saveAs } from 'file-saver'
import { Toast } from 'vant'
export default {
  name: 'ylyric',
  components: { draggable },
  data() {
    return {
      kw: '',
      showPop: false,
      title: 'Amazing grace',
      columns: [],
      lyric: `Amazing Grace, how sweet the sound
That saved a wretch like me.
I once was lost but now I'm found,
Was blind but now I see.

It was grace that taught my heart to fear
And grace my fear relieved
How precious did that grace appear,
The hour I first believed.`,
      trashZone: [],
      trashOptions: {
        group: {
          draggable: '.dropitem',
          put: () => true,
          pull: false,
        },
      },
    }
  },
  computed: {
    ...mapState(['songs', 'templateName']),
  },

  methods: {
    ...mapMutations(['push', 'clear', 'clearByTitle']),

    onConfirm: function (value) {
      this.addToExport()
    },
    onChange: async function (picker, value) {
      let id = value.slice(value.indexOf('|') + 1)
      let title = value.slice(0, value.indexOf('--'))

      const res = await fetch(`/song/${id}.html`)
      let text = await res.text()
      const parser = new DOMParser()
      const htmlDocument = parser.parseFromString(text, 'text/html')
      let lyric = 'no lyric'
      try {
        lyric = htmlDocument.documentElement.querySelector('#lyric_editor')
          .innerText
      } catch (err: any) {
        Toast(lyric)
      }
      Toast(`~~${title}~~\n${this.lyricProcessor(lyric)}`)
      this.lyric = lyric
      this.title = title
    },
    onCancel: function () {
      this.showPop = false
    },
    onSearch: async function () {
      const res = await fetch(`/search/autosuggest/?k=${this.kw}`)
      const rs = await res.json()
      if (!rs.song) return
      this.columns = []
      this.showPop = true
      rs.song.forEach((x) =>
        this.columns.push(`${x.name}--${x.artist}|${x.id}`)
      )
      this.onChange(null, this.columns[0])
    },
    exportPPT: async function () {
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

      let fd = new FormData()
      fd.append('', title)
      fd.append('', lyric)

      let response = await fetch('http://ruianva.cn:8090/api/unit2', {
        method: 'POST',
        body: getFormData({
          title: title,
          lyric: lyric,
          template: templateName,
        }),
      })
      let blob = await response.blob()
      let filename = response.headers
        .get('content-disposition')
        .split(/"(.*)"/gi)[1]
      // let file = new File([blob], filename, {
      //   type:
      //     'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      // })

      saveAs(blob, filename)
      // let exportUrl = URL.createObjectURL(file)
      // let a = document.createElement('a')
      // a.href = exportUrl
      // a.download = filename
      // a.click()

      function getFormData(object) {
        const formData = new FormData()
        Object.keys(object).forEach((key) => formData.append(key, object[key]))
        return formData
      }
    },

    addToExport: function () {
      if (this.songs.length > 4) {
        alert('不能超过5首！')
        return
      }
      this.push({ title: this.title, lyric: this.lyric })
      // this.$store.commit('push', { title: this.title, lyric: this.lyric })
    },

    lyricProcessor: function (lyric: string) {
      //处理不规则的歌词
      let f1 = lyric.split('\n').filter((x, i) => !x.match(/[:|：]/g)) //过滤带:或：行
      let f2: any = [] //处理超长行
      f1.forEach((x) => {
        if (x.length > 18) {
          f2 = f2.concat(x.split(/,|。|，|、|\./))
        } else {
          f2.push(x)
        }
      })
      //处理超过连续8行
      f2 = f2.map((x: string) =>
        x.replace(/[\d|\.|\*|；]+/g, '').replace(/\s+$/g, '')
      ) //处理每行带*
      return f2
        .join('\n')
        .replace(/(^\s*)|(\s*$)/g, '')
        .replace(/\n\n+/g, '\n\n') //处理头、尾空行
    },
  },

  mounted: function () {
    // let s = this.$refs.searchRef
    // s.querySelector('input').focus()
  },
}
</script>
<style>
.searchStyle {
  width: 80%;
  margin: 0 auto;
}
.trash {
  left: 15%;
  position: absolute;
}
.recycle {
  position: fixed;
  width: 100%;
  bottom: 15%;
}
</style>