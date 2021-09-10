import { graphic } from 'echarts/lib/export'
export const pie = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}:({d}%)'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '64%'],
      hoverAnimation: false,
      avoidLabelOverlap: false,
      label: {
        lineHeight: 14,
        formatter: '{c}\n{b}'
      },
      labelLine: {
        length: 11,
        length2:11
      },
      data: [
        {
          value: 700,
          name: '其他支付金额',
          itemStyle: {
            color: '#0B9AFB'
          }
        },
        { value: 300, name: '会员支付金额', itemStyle: { color: '#00DCDD' } }
      ]
    }
  ]
}

export const pie1 = {
  grid: {
    top: 'center',
    left: 'center',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['60%', '80%'],
      hoverAnimation: false,
      avoidLabelOverlap: false,
      label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: [
        {
          value: 80,
          itemStyle: {
            color: new graphic.LinearGradient(1, 0, 0, 1, [ //[右,下,左,上]  0, 0, 0, 1 渐变由上至下
              {
                offset: 0,//起始位置
                color: '#0B9AFB', //第一颜色
              },
              {
                offset: 1,//结束位置
                color: '#00DCDD', //渐变颜色
              },
            ])
          }
        },
        {
          value: 20,
          itemStyle: {
            color: '#101330'
          }
        }
      ]
    }
  ]
};