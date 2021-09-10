const funnel = {
  title: {
    text: '浏览量（次）999',
    left: "center",
    top: 20,
    textStyle: {
      fontSize: 16,
      color: "rgba(255,255,255,1)"
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c}%"
  },
  grid:{
    left:'center'
  },
  series: [
    {
      name: '漏斗图',
      type: 'funnel',
      left: 'center',
      width: 200,
      label: {
        fontSize:14,
        color: 'rgba(255,255,255,1)',
        formatter: '{b} {c}'
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(57, 65, 77, 1)',
        }
      },
      data: [
        {
          value: 60,
          name: '访客人数',
          itemStyle: {
            color: 'rgba(11, 154, 251, 1)',
            borderWidth: 0
          }
        },
        {
          value: 40,
          name: '下单人数',
          itemStyle: {
            color: 'rgba(46, 198, 248, 1)',
            borderWidth: 0
          }
        },
        {
          value: 20,
          name: '支付人数',
          itemStyle: {
            color: 'rgba(0, 220, 221, 1)',
            borderWidth: 0
          }
        },
      ]
    }
  ]
}
export default funnel

