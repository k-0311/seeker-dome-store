<template>
  <div class="auto-play-pie" :style="{width: pieStyle.width || '250px', height: pieStyle.height || '300px' }">
    <v-chart ref="pie" :style="pieStyle" :options="pieOption" @mousemove="mousemove" @mouseout="mouseout">
    </v-chart>
    <div class="auto-play-pie__content">
      <div class="auto-play-pie__content--wrap" v-if="showContentAll">
        <p class="auto-play-pie__content-title" :style="contentTopStyle" v-if="showContentTop">
          {{pieConentTop}}
        </p>
        <count-to :start-val="num.startVal" :end-val="num.endVal" :duration="num.duration" :decimals="num.decimals" :separator="num.separator" :autoplay="num.autoplay" :suffix="num.suffix" :prefix="num.prefix" class="auto-play-pie__content-num" :style="contentMidStyle" v-if="showContentMid" />
        <count-to :start-val="percent.startVal" :end-val="percent.endVal" :duration="percent.duration" :decimals="percent.decimals" :separator="percent.separator" :autoplay="percent.autoplay" :suffix="percent.suffix" :prefix="percent.prefix" class="auto-play-pie__content-percent" :style="contentBottomStyle" v-if="showContentBottom" />
      </div>
    </div>
  </div>
</template>

<script>
// import ECharts from 'vue-echarts'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie'
import countTo from 'vue-count-to'
// import 'echarts/lib/component/legend'
export default {
  props: {
    // 环形图数据
    pieOption: {
      type: Object,
      default: () => {
        return {
          series: [
            {
              data: []
            }
          ]
        }
      }
    },
    // 环形图样式，宽度width: 250px(默认)， 高度：height: 300px(默认)
    pieStyle: {
      type: Object,
      default: () => {
        return {
          width: '250px',
          height: '300px'
        }
      }
    },
    // 内容上层样式
    contentTopStyle: {
      type: Object,
      default: () => { }
    },
    // 内容中层样式
    contentMidStyle: {
      type: Object,
      default: () => { }
    },
    // 内容下层样式
    contentBottomStyle: {
      type: Object,
      default: () => { }
    },
    // 上层内容显示隐藏
    showContentTop: {
      type: Boolean,
      default: true
    },
    // 中层内容显示隐藏
    showContentMid: {
      type: Boolean,
      default: true
    },
    // 上层内容显示隐藏
    showContentBottom: {
      type: Boolean,
      default: true
    },
    // 在环形图中间显示所有文本内容
    showContentAll: {
      type: Boolean,
      default: true
    },
    // 环形图自动轮播时间间隔，默认是2000毫秒
    autoPlayPieDuration: {
      type: Number,
      default: 2000
    },
    // 是否需要自动播放
    autoPlayStatus: {
      type: Boolean,
      default: true
    },
    // 自定义midNumConfig
    midNumConfig: {
      type: Object,
      default: () => { }
    },
    // 自定义bottomNumConfig
    bottomNumConfig: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    pieOption: {
      handler (val) {
        // 如果用户设置了环形图的label属性，那么自动取消动画数字
        if (val && (val.series[0]?.emphasis?.label?.show || val.series[0]?.label?.show)) {
          this.$emit('update:showContentAll', false)
        } else {
          this.$emit('update:showContentAll', true)
        }

        this.stopTouch(this.curIndex, this.autoPlayTimer)
        this.init(this.curIndex)
      },
      deep: true
    }
  },
  computed: {
    num () {
      return Object.assign({}, this.defNum, this.midNumConfig)
    },
    percent () {
      return Object.assign({}, this.defPercent, this.bottomNumConfig)
    }
  },
  data () {
    return {
      autoPlayTimer: null, // 自动播放定时器
      curIndex: 0, // 当前自动播放索引
      pieConentTop: '标题',
      defPercent: {
        startVal: 0,
        endVal: 0,
        duration: 1000,
        decimals: 2,
        separator: ',',
        autoplay: true,
        suffix: '%',
        prefix: ''
      },
      defNum: {
        startVal: 0,
        endVal: 0,
        duration: 1000,
        decimals: 2,
        separator: ',',
        autoplay: true,
        suffix: '',
        prefix: ''
      },
      pie2: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 20,
        //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '新增数据']
        // },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              // label: {
              //   show: true,
              //   fontSize: '30',
              //   fontWeight: 'bold',
              //   formatter: ' {B|{b}}\n{C|{c}}\n{D|{d}%}',
              //   textStyle: {
              //     color: 'red',
              //     rich: {
              //       B: {
              //         fontSize: 40,
              //         lineHeight: 50,
              //         color: 'blue'
              //       },
              //       C: {
              //         fontSize: 20
              //       },
              //       D: {
              //         fontSize: 20,
              //         fontWeight: 'bolder',
              //         lineHeight: 50
              //       }
              //     }
              //   }
              // }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' },
              { value: 450, name: '新增数据' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    // 停止触发
    stopTouch (curIndex, autoPlayTimer) {
      let pie = this.$refs.pie
      clearInterval(autoPlayTimer)
      pie.dispatchAction({
        type: 'downplay',
        dataIndex: curIndex
      })
    },
    // 初始化pie数据， 参数表示开始索引环形图位置
    init (curIndex) {
      // 初始化需要清除定时器
      clearInterval(this.autoPlayTimer)
      const self = this
      let pie = self.$refs.pie
      this.curIndex = curIndex || 0
      let data = this.pieOption.series[0].data
      let dataLen = data.length
      let percentage = []
      let total = data.reduce((total, item) => {
        return total + item.value
      }, 0)
      this.chartAction(pie, 'highlight', this.curIndex || 0)
      data.forEach(item => {
        percentage.push(item.value / total * 100)
      })
      self.percent.startVal = 0
      self.percent.endVal = percentage[0]
      self.num.startVal = 0
      self.num.endVal = data[0].value
      self.pieConentTop = data[0].name
      // 定时轮播环形图
      this.autoPlayTimer = setInterval(() => {
        // 数据改变
        this.chartAction(pie, 'downplay', this.curIndex)

        this.curIndex = (this.curIndex + 1) % dataLen
        this.chartAction(pie, 'highlight', this.curIndex)

        if (this.curIndex === 0) {
          self.percent.startVal = percentage[dataLen - 1]
          self.percent.endVal = percentage[this.curIndex]
          self.num.startVal = data[dataLen - 1].value
          self.num.endVal = data[this.curIndex].value
        } else {
          self.percent.startVal = percentage[this.curIndex - 1]
          self.percent.endVal = percentage[this.curIndex]
          self.num.startVal = data[this.curIndex - 1].value
          self.num.endVal = data[this.curIndex].value
        }
        self.pieConentTop = data[this.curIndex].name
      }, this.autoPlayPieDuration)
    },
    // 图形dispatchAction事件
    chartAction (instance, type, index) {
      instance.dispatchAction({
        type: type,
        dataIndex: index
      })
    },
    mousemove (e) {
      // 自动播放的时候才触发事件
      if (this.autoPlayStatus) {
        let pie = this.$refs.pie
        let highlight = e.data.highlight
        this.stopTouch(this.curIndex, this.autoPlayTimer)
        if (!highlight) {
          this.chartAction(pie, 'highlight', e.dataIndex)
        }
      }
    },
    mouseout (e) {
      // 自动播放的时候才触发事件
      if (this.autoPlayStatus) {
        let pie = this.$refs.pie
        let highlight = e.data.highlight
        if (!highlight) {
          this.chartAction(pie, 'downplay', e.dataIndex)
        }
        this.$nextTick(() => {
          this.init(this.curIndex)
        })
      }
    }
  },
  mounted () {
    if (this.autoPlayStatus) {
      this.init()
      setTimeout(() => {
        this.$emit('update:pieOption', JSON.parse(JSON.stringify(this.pie2)))
      }, 8000)
    }
  },
  destroyed () {
    clearInterval()
  },
  components: {
    countTo
  }
}
</script>
<style lang="scss" scoped>
.auto-play-pie {
  position: relative;
  .auto-play-pie__content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .auto-play-pie__content--wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
    }
    .auto-play-pie__content-title {
      font-size: 14px;
      line-height: 1em;
    }
    .auto-play-pie__content-num {
      font-size: 18px;
      line-height: 1.5em;
    }
    .auto-play-pie__content-percent {
      font-size: 14px;
    }
  }
}
</style>
