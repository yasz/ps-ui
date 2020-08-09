<template>
  <div>
    <div id="bpm">
      <input type="range" v-model="beat.BPM" min="30" max="170" id="rangeValue" />
      {{ beat.BPM }}
    </div>
    <div id="grid" @touchmove.prevent>
      <div v-for="(ele, i) in sounds" :key="i">
        {{ ele.logo }}
        <template v-for="(jj, j) of BEATS">
          <button
            class="beat"
            :class="{ active: activeStatus[i][j], loop: loopStatus[i][j] }"
            :key="j"
            @click="onclick(i, j)"
          ></button>
        </template>
        <p></p>
      </div>
      <div id="control">
        <button id="btnPlay" v-show="!isPlay" @click="play">
          <svg
            style="width: 32px; height: 32px; vertical-align: middle;"
            viewBox="0 0 1024 1024"
            version="1.1"
          >
            <path d="M196.394461 103.235223 196.394461 920.764777 827.604516 535.079648Z" />
          </svg>
        </button>
        <button id="btnStop" v-show="isPlay" @click="stop">
          <svg
            style="width: 32px; height: 32px; vertical-align: middle;"
            viewBox="0 0 1024 1024"
            version="1.1"
          >
            <path d="M256 256l512 0 0 512-512 0z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      audioCtx: new (window.AudioContext || (<any>window).webkitAudioContext)(),
      isPlay: false,
      sounds: [
        {
          name: 'kick',
          logo: '🦶',
          soundPath: '/sounds/bass_drum.wav'
        },
        {
          name: 'snare',
          logo: '🥁',
          soundPath: '/sounds/snare_drum.wav'
        },
        {
          name: 'clap',
          logo: '👏',
          soundPath: '/sounds/hand_clap.wav'
        },
        {
          name: 'hat',
          logo: '🎩',
          soundPath: '/sounds/maracas.wav'
        }
      ] as any[],

      // soundBuffers: [],
      beat: {
        BPM: 60,
        set interval(val) {
          this.BPM = 60000 / (4 * val)
        },
        get interval() {
          return 60000 / (4 * this.BPM)
        }
      },
      BEATS: 8,
      activeStatus: new Array(),
      loopStatus: new Array(),

      currentBeat: 0
    }
  },
  props: {},
  methods: {
    onclick(i: any, j: any) {
      this.$set(this.activeStatus[i], j, !this.activeStatus[i][j])
    },
    play() {
      this.isPlay = true
      let component = this
      var start = Date.now()
      var expected = Date.now() + this.beat.interval
      let recur = () => {
        var dt = Date.now() - expected
        if (!this.isPlay) {
          return
        }
        if (this.currentBeat >= this.BEATS) {
          this.currentBeat -= this.BEATS
        }

        //将上一步的样式清空掉
        this.sounds.forEach((e, i) => {
          this.$set(
            this.loopStatus[i],
            this.currentBeat - 1 >= 0 ? this.currentBeat - 1 : this.BEATS - 1,
            false
          )
          this.$set(this.loopStatus[i], this.currentBeat, true)
          if (this.activeStatus[i][this.currentBeat]) {
            try {
              const source = this.audioCtx.createBufferSource()
              source.buffer = this.sounds[i].buffer
              source.connect(this.audioCtx.destination)
              source.start()
            } catch (e) {
              alert(e.message)
              // Fallback method
              new Audio(e.soundPath).play()
            }
          }
        })
        this.currentBeat++
        expected += this.beat.interval
        setTimeout(recur, Math.max(0, this.beat.interval - dt))
      }
      setTimeout(recur, this.beat.interval)
    },
    stop() {
      this.isPlay = false
      this.currentBeat = 0
      this.loopStatus = new Array(this.sounds.length)
        .fill(false)
        .map(() => new Array(this.BEATS).fill(false))
    }
  },
  async mounted() {
    //缓存声音文件

    await this.sounds.forEach(async (e, i) => {
      let res = await fetch(e.soundPath, { method: 'GET' })
      let ab = await res.arrayBuffer()
      await this.audioCtx.decodeAudioData(ab, buffer => {
        this.sounds[i].buffer = buffer
      })
    })
  },
  created() {
    // document.addEventListener(
    //   "touchmove",
    //   function (e) {
    //     e.preventDefault();
    //     // e.stopPropagation();
    //   },
    //   { passive: false }
    // );
    this.audioCtx = new (window.AudioContext ||
      (<any>window).webkitAudioContext)()

    this.activeStatus = new Array(this.sounds.length)
      .fill(false)
      .map(() => new Array(this.BEATS).fill(false))
    this.loopStatus = new Array(this.sounds.length)
      .fill(false)
      .map(() => new Array(this.BEATS).fill(false))
  }
})
</script>
<style scoped>
/* #bpm {
  position: absolute;
  top: 290px;
  left: 300px;
} */
#control button {
  border-radius: 3ch;
  background-color: white;
  margin: 10px;
}
#control button:active {
  background-color: rgb(180, 180, 180);
}

#grid {
  text-align: center;
  padding-top: 100px;
  height: 1000px;
  max-height: 100%;
  /* background: blue; */
}

.beat {
  border: 1px solid #ccc;
  width: 20px;
  height: 15px;
  border-radius: 1ch;
  background-color: rgba(193, 184, 247, 0.415);
  margin: 0.9px;
}
.active {
  background-color: rgb(149, 132, 247);
}
.beat:nth-child(8n + 1),
.beat:nth-child(8n + 2),
.beat:nth-child(8n + 3),
.beat:nth-child(8n + 4) {
  background-color: rgba(247, 199, 244, 0.415);
}
.beat:nth-child(8n + 1).active,
.beat:nth-child(8n + 2).active,
.beat:nth-child(8n + 3).active,
.beat:nth-child(8n + 4).active {
  background-color: rgb(240, 116, 231);
}

button.loop {
  background-color: black !important;
  border-color: black;
}
</style>
