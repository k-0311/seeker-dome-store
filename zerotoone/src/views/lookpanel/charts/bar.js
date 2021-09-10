import { graphic } from 'echarts/lib/export'
export const bar = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      crossStyle: {
        color: '#999'
      }
    }
  },
  // toolbox: {
  //   feature: {
  //     dataView: { show: true, readOnly: false },
  //     magicType: { show: true, type: ['line', 'bar'] },
  //     restore: { show: true },
  //     saveAsImage: { show: true }
  //   }
  // },
  grid: {
    height: 189
  },
  legend: {
    bottom: 5,
    textStyle: {
      color: '#ffffff'
    }
  },
  xAxis: [
    {
      type: 'category',
      data: ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        color: '#ffffff'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '元',
      min: 0,
      max: 200,
      interval: 40,
      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: '#ffffff'
      },
      axisLabel: {
        formatter: '{value}',
        color: '#ffffff'
      }
    },
    {
      type: 'value',
      name: '笔',
      min: 0,
      max: 20,
      interval: 4,
      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: '#ffffff'
      },
      axisLabel: {
        formatter: '{value}',
        color: '#ffffff'
      }
    }
  ],
  series: [
    {
      name: '营业额',
      type: 'bar',
      data: [],
      itemStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [ //[右,下,左,上]  0, 0, 0, 1 渐变由上至下
          {
            offset: 0,//起始位置
            color: '#0B9AFB', //第一颜色
          },
          {
            offset: 1,//结束位置
            color: '#1B5EF7', //渐变颜色
          },
        ])
      },
      barWidth: 24
    },
    {
      name: '订单量',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      data: [],
      itemStyle: {
        color: "rgba(0, 220, 221, 1)"
      }
    }
  ]
}
export const bar1 = {
  grid: {
    top:'center',
    right:'0%',
    height: '100%',
    width: '78%'
  },
  xAxis: {
    show: false,
    max: 10000
  },
  yAxis: {
    type: 'category',
    barGap: '10%',
    data: ['核销数量', '领取数量', '发放数量'],
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      color: '#ffffff'
    },
    axisLine:{
      lineStyle:{
          color:'#39414D'
      }
  } 
  },
  series: [
    {
      type: 'bar',
      data: [6000, 8000, 10000],
      barWidth: 24,
      itemStyle: {
        color: new graphic.LinearGradient(1, 0, 0, 0, [ //[右,下,左,上]  0, 0, 0, 1 渐变由上至下
          {
            offset: 0,//起始位置
            color: '#0B9AFB', //第一颜色
          },
          {
            offset: 1,//结束位置
            color: '#1B5EF7', //渐变颜色
          },
        ])
      },
    }
  ]
};