<template>
  <div>
    <div class="charts-header" style="padding: 0 30px;">
      <!-- <km-row> -->
      <!-- <km-col :span='6'>
          <div class="km-logo">
            <img src="../../../assets/images/whitelogo.png">
          </div>
        </km-col> -->
      <!-- <km-col :span='12'> -->
      <div style="position: relative">
        <h3 class="common-title">
          大数据智慧经营驾驶舱
        </h3>
        <div data-v-383af224="" class="dv-decoration-5" style="width: 100%; height: 40px; position: absolute; top: 40px; left: 0px;"><svg width="930" height="40">
            <polyline fill="transparent" stroke-width="3" points="0,8 167.4,8 186,16 232.5,16 251.10000000000002,24 669.6,24 697.5,16 744,16 762.5999999999999,8 930,8" stroke="#3f96a5">
              <animate attributeName="stroke-dasharray" attributeType="XML" from="0, 468.0333535483558, 0, 468.0333535483558" to="0, 0, 936.0667070967116, 0" dur="1.2s" begin="0s" calcMode="spline" keyTimes="0;1" keySplines="0.4,1,0.49,0.98" repeatCount="indefinite"></animate>
            </polyline>
            <polyline fill="transparent" stroke-width="2" points="279,32 651,32" stroke="#3f96a5">
              <animate attributeName="stroke-dasharray" attributeType="XML" from="0, 186, 0, 186" to="0, 0, 372, 0" dur="1.2s" begin="0s" calcMode="spline" keyTimes="0;1" keySplines=".4,1,.49,.98" repeatCount="indefinite"></animate>
            </polyline>
          </svg></div>
      </div>
      <!-- </km-col> -->
      <!-- <km-col :span='6'>
          <div class="content-box">
            <div class="fullScreen" @click="fullScreen">
              <img src="../../../assets/images/quanping.png">
            </div>
            <div class="clock">
              <span class="clock-icon">
                <img src="../../../assets/images/clock.png">
              </span>
              <div class="times">{{timeGo}}</div>
            </div>
          </div>
        </km-col> -->
      <!-- </km-row> -->
    </div>
    <div class="big-panel-container" id="big-panel-container" :style="{width:'1920px', height:'1080px', transformOrigin:'left top', transform:`scale(${scaleWidth})`}">
      <div class="left-area">
        <panel-block class="member-block" :width="530" :height="160">
          <div class="main-data">
            <div class="title">今日新增会员（人）</div>
            <count-to :start-val="0" :end-val="memberIncreaseData.todayTotalCount" :duration="1000" :decimals="0" :separator="','" autoplay class="value" />
            <div class="percentage-box">
              <div class="percentage">
                <div>比较昨日▲</div>
                <count-to :start-val="0" :end-val="memberIncreaseData.yesterdayRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
              <div class="percentage">
                <div>周环比▲</div>
                <count-to :start-val="0" :end-val="memberIncreaseData.weekRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
            </div>
          </div>
          <div class="sec-data member-sec">
            <div class="title">会员总数（人）</div>
            <count-to :start-val="0" :end-val="memberIncreaseData.totalCount" :duration="1000" :separator="','" autoplay class="value" />
          </div>
        </panel-block>
        <panel-block class="recharge-block" :width="530" :height="360">
          <div class="main-data">
            <div class="title">今日充值总额（元）<span class="sub-title">不含购物卡</span></div>
            <count-to :start-val="0" :end-val="rechargeData.todayRechargeAmount" :duration="1000" :decimals="2" :separator="','" autoplay class="value" />
            <div class="percentage-box">
              <div class="percentage">
                <div>比较昨日▲</div>
                <count-to :start-val="0" :end-val="rechargeData.yesterdayRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
              <div class="percentage">
                <div>周环比▲</div>
                <count-to :start-val="0" :end-val="rechargeData.weekRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
            </div>
          </div>
          <div class="recharge-pie">
            <div>
              <div class="sec-data">
                <div class="title">今日充值次数</div>
                <count-to class="value" :start-val="0" :end-val="rechargeData.todayRechargeCount" :duration="1000" :decimals="0" :separator="','" autoplay />
              </div>
              <div class="sec-data">
                <div class="title">储值余额（元）</div>
                <count-to class="value" :start-val="0" :end-val="rechargeData.totalBalance" :duration="1000" :decimals="2" :separator="','" autoplay />
              </div>
            </div>
            <div class="pie-box" v-if="rechargeData.pie">
              <v-chart :options="rechargeData.pie" style="width:340px;height:220px" />
              <div class="pie-text">
                <div>会员支付占比</div>
                <count-to :start-val="0" :end-val="rechargeData.memberPayRatio" :duration="1000" :separator="''" :suffix="'%'" autoplay class="ratio" />
              </div>
            </div>
          </div>
        </panel-block>
        <panel-block class="top10-block" :width="530" :height="390">
          <div class="top10-title">
            <div :class="['title-tab',{'on': switchTop10 == 'store'}]" @click="switchTop10 = 'store'">今日门店营业额 TOP10</div>
            <div :class="['title-tab',{'on': switchTop10 == 'goods'}]" @click="switchTop10 = 'goods'">今日商品销量TOP10</div>
          </div>
          <div class="top-list">
            <div class="money-unit">元</div>
            <div class="top-item" v-for="(item,index) in topList" :key="index">
              <div class="rank">NO.{{index + 1}}</div>
              <div class="store-name">{{item.name}}</div>
              <capsule-bar :progress='item.rate' :speed="1000" />
              <count-to :start-val="0" :end-val="item.value" :duration="1000" :decimals="2" :separator="','" autoplay class="money" />
            </div>
          </div>
        </panel-block>
      </div>
      <div class="mid-area">
        <panel-block class="turnover-block" :width="760" :height="220">
          <div class="main-data">
            <div class="turnover-title">今日营业额（元）</div>
            <count-to :start-val="0" :end-val="turnoverData.todayTotalAmount" :duration="1000" :decimals="2" :separator="','" autoplay class="turnover-value" />
            <div class="percentage-box">
              <div class="percentage">
                <div>比较昨日▲</div>
                <count-to :start-val="0" :end-val="turnoverData.yesterdayRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
              <div class="percentage">
                <div>周环比▲</div>
                <count-to :start-val="0" :end-val="turnoverData.weekRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
            </div>
          </div>
          <div class="turnover-sec">
            <div class="sec-data">
              <div class="title">今日客单价（元）</div>
              <count-to :start-val="0" :end-val="turnoverData.unitPrice" :duration="1000" :decimals="2" :separator="','" autoplay class="value" />
            </div>
            <div class="sec-data">
              <div class="title">今日订单量（笔）</div>
              <count-to :start-val="0" :end-val="turnoverData.todayTotalCount" :duration="1000" :separator="','" autoplay class="value" />
            </div>
          </div>
        </panel-block>
        <panel-block class="bar-block" :width="760" :height="360">
          <div class="block-title">时段走势图</div>
          <v-chart :options="orderTrendData.bar" style="width:760px;height:302px" v-if="orderTrendData.bar" />
        </panel-block>
        <div class="mid-bottom">
          <panel-block class="flow-block" :width="440" :height="330">
            <div class="block-title" style="height:50px">今日商城流量转化</div>
            <div class="funnel-box">
              <v-chart :options="todayFlowData.funnel" style="width:440px;height:280px;z-index:10" />
              <div class="conversion-box">
                <div class="line">
                  <div class="cv-rate">
                    <div>访问-下单</div>
                    <count-to :start-val="0" :end-val="todayFlowData.uoRatio" :duration="1000" :separator="','" :prefix="'转化率'" :suffix="'%'" autoplay />
                  </div>
                </div>
                <div class="line">
                  <div class="cv-rate">
                    <div>下单-支付</div>
                    <count-to :start-val="0" :end-val="todayFlowData.opRatio" :duration="1000" :separator="','" :prefix="'转化率'" :suffix="'%'" autoplay />
                  </div>
                </div>
              </div>
            </div>
          </panel-block>
          <panel-block class="bar-block" :width="300" :height="330">
            <div class="block-title" style="height:50px">今日渠道营业额占比</div>
            <div class="auto-pie-box">
              <autoPlayPie :pieOption.sync="pieOption" :midNumConfig="midNumConfig" :pieStyle="pieStyle" :autoPlayPieDuration="4000" />
            </div>
          </panel-block>
        </div>
      </div>
      <div class="right-area">
        <panel-block class="coupon-block" :width="530" :height="390">
          <div class="main-data">
            <div class="title">今日优惠券带动交易额（元）</div>
            <count-to :start-val="0" :end-val="couponPanelData.todayTotalAmount" :duration="1000" :decimals="2" :separator="','" autoplay class="value" />
            <div class="percentage-box">
              <div class="percentage">
                <div>比较昨日▲</div>
                <count-to :start-val="0" :end-val="couponPanelData.weekRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
              <div class="percentage">
                <div>周环比▲</div>
                <count-to :start-val="0" :end-val="couponPanelData.yesterdayRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
            </div>
          </div>
          <div class="coupon-sec">
            <div class="sec-data">
              <div class="title">券费效比（ROI）</div>
              <count-to :start-val="0" :end-val="couponPanelData.couponRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay class="value" />
            </div>
            <div class="sec-data">
              <div class="title">用券客单价（元）</div>
              <count-to :start-val="0" :end-val="couponPanelData.unitPrice" :duration="1000" :decimals="2" :separator="','" autoplay class="value" />
            </div>
          </div>
          <div class="seven-box">
            <div class="block-title coupon-title">近七日券转化率</div>
            <div class="seven-day" v-if="couponPanelData.couponConversionVO">
              <v-chart :options="couponPanelData.bar" style="width:315px;height:140px" v-if="couponPanelData.bar" />
              <div class="coupon-num">
                <count-to :start-val="0" :end-val="couponPanelData.couponConversionVO.sendQuantity" :duration="1000" :decimals="0" :separator="''" autoplay class="num" />
                <count-to :start-val="0" :end-val="couponPanelData.couponConversionVO.receiveQuantity" :duration="1000" :decimals="0" :separator="''" autoplay class="num" />
                <count-to :start-val="0" :end-val="couponPanelData.couponConversionVO.verifyQuantity" :duration="1000" :decimals="0" :separator="''" autoplay class="num" />
              </div>
              <div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
              <div>
                <div class="get-ratio">
                  <div>领取率</div>
                  <count-to :start-val="0" :end-val="couponPanelData.couponConversionVO.receiveRatio" :duration="1000" :decimals="1" :separator="''" :suffix="'%'" autoplay />
                </div>
                <div class="get-ratio">
                  <div>核销率</div>
                  <count-to :start-val="0" :end-val="couponPanelData.couponConversionVO.verifyRatio" :duration="1000" :decimals="1" :separator="''" :suffix="'%'" autoplay />
                </div>
              </div>
            </div>
          </div>
        </panel-block>
        <panel-block class="income-block" :width="530" :height="360">
          <div class="main-data">
            <div class="title">今日活动营业总额（元）<span class="sub-title">秒杀、拼团、预售</span></div>
            <count-to :start-val="0" :end-val="incomePanelData.todayTotalAmount" :duration="1000" :decimals="2" :separator="','" autoplay class="value" />
            <div class="percentage-box">
              <div class="percentage">
                <div>比较昨日▲</div>
                <count-to :start-val="0" :end-val="incomePanelData.yesterdayRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
              <div class="percentage">
                <div>周环比▲</div>
                <count-to :start-val="0" :end-val="incomePanelData.weekRatio" :duration="1000" :decimals="2" :separator="','" :suffix="'%'" autoplay />
              </div>
            </div>
          </div>
          <div class="income-sec">
            <div class="sec-data">
              <div class="title">今日活动客单价（元）</div>
              <count-to :start-val="0" :end-val="incomePanelData.unitPrice" :duration="1000" :decimals="2" :separator="','" autoplay class="value" />
            </div>
            <div class="sec-data">
              <div class="title">今日活动订单量（笔）</div>
              <count-to :start-val="0" :end-val="incomePanelData.todayTotalCount" :duration="1000" :separator="','" autoplay class="value" />
            </div>
          </div>
          <div class="pie-box" v-if="incomePanelData.pie">
            <v-chart :options="incomePanelData.pie" style="width:200px;height:200px" />
            <div class="pie-text">
              <div>营销活动占比</div>
              <div>
                <count-to :start-val="0" :end-val="incomePanelData.activeRatio" :duration="1000" :separator="''" :suffix="'%'" autoplay class="ratio" />
              </div>
            </div>
          </div>
        </panel-block>
        <panel-block class="overview-block" :width="530" :height="160">
          <div class="overview-title block-title">今日履约概览</div>
          <div class="overview-box">
            <div class="overview-item">
              <div>待拣货订单(笔)</div>
              <count-to :start-val="0" :end-val="deliveryPanelData.waitForPicking" :duration="1000" :separator="''" autoplay class="count" />
            </div>
            <div class="overview-item">
              <div>待配送订单(笔)</div>
              <count-to :start-val="0" :end-val="deliveryPanelData.waitForDelivery" :duration="1000" :separator="''" autoplay class="count" />
            </div>
            <div class="overview-item">
              <div>待自提订单(笔)</div>
              <count-to :start-val="0" :end-val="deliveryPanelData.waitForSelfPickup" :duration="1000" :separator="''" autoplay class="count" />
            </div>
          </div>
        </panel-block>
      </div>
    </div>
  </div>

</template>

<script>
import autoPlayPie from '@/components/autoPlayPie';
import panelBlock from '@/components/panelBlock';
import capsuleBar from '@/components/capsule-bar';

// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/funnel'

import { bar, bar1 } from './charts/bar.js';
import { pie, pie1 } from './charts/pie.js';
import funnel from './charts/funnel.js';
import countTo from 'vue-count-to'



export default {
  components: {
    autoPlayPie,
    panelBlock,
    capsuleBar,
    countTo
  },
  data () {
    return {
      midNumConfig: {
        startVal: 0,
        endVal: 0,
        duration: 1000,
        decimals: 2,
        separator: ',',
        autoplay: true,
        suffix: '人'
      },
      pieOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
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
            emphasis: {},
            labelLine: {
              show: false
            },
            data: [
              {
                value: 335,
                name: '直接访问',
                itemStyle: {
                  color: '#1B5EF7'
                }
              },
              {
                value: 310,
                name: '邮件营销',
                itemStyle: {
                  color: '#1B3AF7'
                }
              },
              {
                value: 234,
                name: '联盟广告',
                itemStyle: {
                  color: '#00DCDD'
                }
              },
              {
                value: 135,
                name: '视频广告',
                itemStyle: {
                  color: '#2EC6F8'
                }
              },
              {
                value: 1548,
                name: '搜索引擎',
                itemStyle: {
                  color: '#0B9AFB'
                }
              }
            ]
          }
        ]
      },
      pieStyle: {
        width: '300px',
        height: '300px'
      },
      //==============
      scaleWidth: 1,
      //=====left======
      memberIncreaseData: {},
      rechargeData: {},
      switchTop10: 'store',
      top10Data: {},
      //=====mid======
      turnoverData: {},
      orderTrendData: {},
      todayFlowData: {},
      distributeData: {},
      //=====right========
      couponPanelData: {},
      incomePanelData: {},
      deliveryPanelData: {}
    }
  },
  created () {
    this.initPanelData()
  },
  mounted () {
    this.updatePageSize()
    window.onresize = () => {
      this.updatePageSize()
    }
  },
  computed: {
    topList () {
      return (this.switchTop10 == 'store' ? this.top10Data.storeList : this.top10Data.goodsList) || []
    }
  },
  methods: {
    mockData () {
      return {
        memberPanelVO: {
          memberDataVO: {
            lastWeekTotalCount: 80,
            todayTotalCount: 100,
            totalCount: 9999,
            yesterdayTotalCount: 50
          },
          memberRechargeVO: {
            lastWeekRechargeAmount: 15000,
            todayRechargeAmount: 21000,
            todayRechargeCount: 456,
            totalBalance: 13241654,
            yesterdayRechargeAmount: 17000
          }
        },
        storeTurnoverRankingPanelVO: {
          storeTurnoverList: Array.from({ length: 10 }, (_, i) => ({ name: `门店${i + 1}`, value: 1000 * (10 - i) }))
        },
        goodsSalesRankingPanelVO: {
          goodsSalesList: Array.from({ length: 10 }, (_, i) => ({ name: `商品${i + 1}`, value: 2000 * (40 - i * 2) }))
        },
        pageViewConversionPanelVO: {
          orderNum: 450,
          paymentNum: 300,
          pv: 15416,
          uv: 999
        },
        couponPanelVO: {
          couponAmount: 10,
          couponConversionVO: {
            receiveQuantity: 5000,
            sendQuantity: 10000,
            verifyQuantity: 3000
          },
          todayTotalAmount: 165465.56,
          lastWeekTotalAmount: 79419.45,
          todayTotalCount: 1000,
          yesterdayTotalAmount: 9865.89
        },
        marketingActivityPanelVO: {
          lastWeekTotalAmount: 16465,
          todayTotalCount: 100,
          todayTotalAmount: 18000.66,
          totalAmount: 19616,
          yesterdayTotalAmount: 16616
        },
        orderPanelVO: {
          amountDistributionDataList: [
            {
              platformType: 0,
              platformTypeName: '',
              totalAmount: 0,
              totalCount: 0
            }
          ],

          orderPaymentAmountPanelVO: {
            memberPaymentAmount: 200000,
            otherPaymentAmount: 800000
          },
          lastWeekTotalAmount: 123456,
          todayTotalCount: 123,
          todayTotalAmount: 456789,
          yesterdayTotalAmount: 345678
        },
        orderTrendPanelVO: {
          amountData: [],
          orderTrendList: Array.from({ length: 10 }, (_, i) => {
            return {
              hour: i + 2,
              totalAmount: i * 10,
              totalCount: i * 3
            }
          }),
          orderVolumeData: []
        },
        deliveryPanelVO: {
          waitForDelivery: 150,
          waitForPicking: 90,
          waitForSelfPickup: 20
        }
      }
    },
    isFullScreen () {
      if (document.fullScreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
        return true
      } else {
        return false
      }
    },
    updatePageSize () {
      if (this.isFullScreen()) {
        this.scaleWidth = document.body.clientWidth / 1920
      } else {
        // if (this.sliderBarStatus) {
        // this.scaleWidth = document.body.clientWidth / 1920
        // } else {
        this.scaleWidth = (document.body.clientWidth - 240 - 17) / 1920
        // }
      }
      // if (this.cliHeight < 1200) {
      //   this.showHeight = true
      // } else {
      //   this.showHeight = false
      // }
      // document.getElementById('bigConteiner').style.height = document.getElementById('big-panel-container').offsetHeight * this.scaleWidth + 'px'
    },

    async initPanelData () {
      try {
        // await fetchPanelData()

        const data = {
          memberPanelVO: {
            memberDataVO: {
              lastWeekTotalCount: 80,
              todayTotalCount: 100,
              totalCount: 9999,
              yesterdayTotalCount: 50
            },
            memberRechargeVO: {
              lastWeekRechargeAmount: 15000,
              todayRechargeAmount: 21000,
              todayRechargeCount: 456,
              totalBalance: 13241654,
              yesterdayRechargeAmount: 17000
            }
          },
          storeTurnoverRankingPanelVO: {
            storeTurnoverList: Array.from({ length: 10 }, (_, i) => ({ name: `门店${i + 1}`, value: 1000 * (10 - i) }))
          },
          goodsSalesRankingPanelVO: {
            goodsSalesList: Array.from({ length: 10 }, (_, i) => ({ name: `商品${i + 1}`, value: 2000 * (40 - i * 2) }))
          },
          pageViewConversionPanelVO: {
            orderNum: 450,
            paymentNum: 300,
            pv: 15416,
            uv: 999
          },
          couponPanelVO: {
            couponAmount: 10,
            couponConversionVO: {
              receiveQuantity: 5000,
              sendQuantity: 10000,
              verifyQuantity: 3000
            },
            todayTotalAmount: 165465.56,
            lastWeekTotalAmount: 79419.45,
            todayTotalCount: 1000,
            yesterdayTotalAmount: 9865.89
          },
          marketingActivityPanelVO: {
            lastWeekTotalAmount: 16465,
            todayTotalCount: 100,
            todayTotalAmount: 18000.66,
            totalAmount: 19616,
            yesterdayTotalAmount: 16616
          },
          orderPanelVO: {
            amountDistributionDataList: [
              {
                platformType: 0,
                platformTypeName: "",
                totalAmount: 0,
                totalCount: 0
              }
            ],

            orderPaymentAmountPanelVO: {
              memberPaymentAmount: 200000,
              otherPaymentAmount: 800000
            },
            lastWeekTotalAmount: 123456,
            todayTotalCount: 123,
            todayTotalAmount: 456789,
            yesterdayTotalAmount: 345678
          },
          orderTrendPanelVO: {
            amountData: [],
            orderTrendList: Array.from({ length: 10 }, (_, i) => {
              return {
                hour: i + 2,
                totalAmount: i * 10,
                totalCount: i * 3
              }
            }),
            orderVolumeData: []
          },
          deliveryPanelVO: {
            waitForDelivery: 150,
            waitForPicking: 90,
            waitForSelfPickup: 20
          }
        }

        const { memberPanelVO, storeTurnoverRankingPanelVO, goodsSalesRankingPanelVO, pageViewConversionPanelVO, deliveryPanelVO, couponPanelVO, marketingActivityPanelVO, orderPanelVO, orderTrendPanelVO } = data


        const { orderPaymentAmountPanelVO, amountDistributionDataList, ...turnoverData } = orderPanelVO

        this.distributeData = {

        }

        this.deliveryPanelData = deliveryPanelVO

        this.memberPanelHandle(memberPanelVO, orderPaymentAmountPanelVO)

        this.top10PanelHandle(storeTurnoverRankingPanelVO.storeTurnoverList, goodsSalesRankingPanelVO.goodsSalesList)
        this.couponPanelHandle(couponPanelVO)
        this.incomePanelHandle(marketingActivityPanelVO)
        this.turnoverPanelHandle(turnoverData)
        this.orderTrendPanelHandle(orderTrendPanelVO)
        this.flowPanelHandle(pageViewConversionPanelVO)
      } catch (error) {
        console.log(error)
      }
    },
    memberPanelHandle (memberPanelVO, orderPaymentAmountPanelVO) {
      const { memberDataVO, memberRechargeVO } = memberPanelVO
      const { memberPaymentAmount, otherPaymentAmount } = orderPaymentAmountPanelVO
      this.memberIncreaseData = {
        ...memberDataVO,
        weekRatio: (memberDataVO.todayTotalCount - memberDataVO.lastWeekTotalCount) / memberDataVO.lastWeekTotalCount * 100,
        yesterdayRatio: (memberDataVO.todayTotalCount - memberDataVO.yesterdayTotalCount) / memberDataVO.yesterdayTotalCount * 100,
      }

      const _pie = JSON.parse(JSON.stringify(pie))
      _pie.series[0].data[0].value = otherPaymentAmount
      _pie.series[0].data[1].value = memberPaymentAmount
      this.rechargeData = {
        ...memberRechargeVO,
        ...orderPaymentAmountPanelVO,
        pie: _pie,
        memberPayRatio: memberPaymentAmount / (memberPaymentAmount + otherPaymentAmount) * 100,
        otherPayRatio: otherPaymentAmount / (memberPaymentAmount + otherPaymentAmount) * 100,
        weekRatio: (memberRechargeVO.todayRechargeAmount - memberRechargeVO.lastWeekRechargeAmount) / memberRechargeVO.lastWeekRechargeAmount * 100,
        yesterdayRatio: (memberRechargeVO.todayRechargeAmount - memberRechargeVO.yesterdayRechargeAmount) / memberRechargeVO.yesterdayRechargeAmount * 100,
      }
    },
    top10PanelHandle (storeTurnoverList, goodsSalesList) {
      const { storeList, goodsList } = storeTurnoverList.reduce((obj, item, index) => {
        const gitem = goodsSalesList[index]
        if (index == 0) {
          obj.storeList.push({ ...item, rate: 100 })
          obj.goodsList.push({ ...gitem, rate: 100 })
        } else {
          obj.storeList.push({ ...item, rate: (item.value / storeTurnoverList[0].value) * 100 })
          obj.goodsList.push({ ...gitem, rate: (gitem.value / goodsSalesList[0].value) * 100 })
        }
        return obj
      }, { storeList: [], goodsList: [] })

      this.top10Data = {
        storeList,
        goodsList
      }
    },
    couponPanelHandle (couponPanelVO) {

      const { couponConversionVO } = couponPanelVO
      const bar = JSON.parse(JSON.stringify(bar1))
      bar.series[0].data = [couponConversionVO.verifyQuantity, couponConversionVO.receiveQuantity, couponConversionVO.sendQuantity]
      this.couponPanelData = {
        bar,
        couponConversionVO: {
          ...couponConversionVO,
          receiveRatio: couponConversionVO.receiveQuantity / couponConversionVO.sendQuantity,
          verifyRatio: couponConversionVO.verifyQuantity / couponConversionVO.sendQuantity
        },
        ...couponPanelVO,
        weekRatio: (couponPanelVO.todayTotalAmount - couponPanelVO.lastWeekTotalAmount) / couponPanelVO.lastWeekTotalAmount * 100,
        yesterdayRatio: (couponPanelVO.todayTotalAmount - couponPanelVO.yesterdayTotalAmount) / couponPanelVO.yesterdayTotalAmount * 100,
        couponRatio: couponPanelVO.couponAmount / couponPanelVO.todayTotalCount,
        unitPrice: couponPanelVO.todayTotalAmount / couponPanelVO.todayTotalCount,
      }
    },
    incomePanelHandle (marketingActivityPanelVO) {

      const activeRatio = marketingActivityPanelVO.todayTotalAmount / marketingActivityPanelVO.totalAmount * 100
      const pie = JSON.parse(JSON.stringify(pie1))
      pie.series[0].data[0].value = activeRatio
      pie.series[0].data[1].value = 100 - activeRatio

      this.incomePanelData = {
        ...marketingActivityPanelVO,
        pie,
        activeRatio,
        weekRatio: (marketingActivityPanelVO.todayTotalAmount - marketingActivityPanelVO.lastWeekTotalAmount) / marketingActivityPanelVO.lastWeekTotalAmount * 100,
        yesterdayRatio: (marketingActivityPanelVO.todayTotalAmount - marketingActivityPanelVO.yesterdayTotalAmount) / marketingActivityPanelVO.yesterdayTotalAmount * 100,
        unitPrice: marketingActivityPanelVO.todayTotalAmount / marketingActivityPanelVO.todayTotalCount
      }
    },
    turnoverPanelHandle (turnoverData) {
      this.turnoverData = {
        ...turnoverData,
        weekRatio: (turnoverData.todayTotalAmount - turnoverData.lastWeekTotalAmount) / turnoverData.lastWeekTotalAmount * 100,
        yesterdayRatio: (turnoverData.todayTotalAmount - turnoverData.yesterdayTotalAmount) / turnoverData.yesterdayTotalAmount * 100,
        unitPrice: turnoverData.todayTotalAmount / turnoverData.todayTotalCount
      }
    },
    orderTrendPanelHandle (orderTrendPanelVO) {
      const { orderTrendList } = orderTrendPanelVO
      const { amount, count } = orderTrendList.reduce((obj, item) => {
        obj.amount.push(item.totalAmount)
        obj.amount.push({
          value: item.totalCount,
          symbol: "circle",
          symbolSize: 2
        })
        return obj

      }, { amount: [], count: [] })


      const _bar = JSON.parse(JSON.stringify(bar))
      _bar.series[0].data = amount
      _bar.series[1].data = count
      this.orderTrendData = {
        bar: _bar
      }
    },
    flowPanelHandle (pageViewConversionPanelVO) {
      const funnelMap = {
        0: 'uv',
        1: 'orderNum',
        2: 'paymentNum'
      }
      const _funnel = JSON.parse(JSON.stringify(funnel))
      _funnel.title.text = `浏览量（次）${pageViewConversionPanelVO.pv}`
      _funnel.series[0].data.map((item, index) => {
        const key = funnelMap[index]
        item.value = pageViewConversionPanelVO[key]
      })

      this.todayFlowData = {
        ...pageViewConversionPanelVO,
        uoRatio: pageViewConversionPanelVO.orderNum / pageViewConversionPanelVO.uv * 100,
        opRatio: pageViewConversionPanelVO.paymentNum / pageViewConversionPanelVO.orderNum * 100,
        funnel: _funnel
      }
    },
  }
}

</script>

<style lang="scss">
.charts-header {
  height: 80px;
  display: block;
  box-sizing: content-box;
  .common-title {
    font-size: 26px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    padding: 0;
    margin: 0;
    color: #ffffff;
    font-weight: normal;
  }
  .content-box {
    overflow: hidden;
  }
  .clock {
    float: right;
    margin-right: 20px;
    line-height: 80px;
    .clock-icon {
      display: block;
      width: 18px;
      height: 18px;
      float: left;
      margin-top: 31px;
      margin-right: 5px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .times {
      font-size: 16px;
      color: #ffffff;
      float: left;
    }
  }
  .fullScreen {
    float: right;
    height: 40px;
    width: 40px;
    margin-top: 20px;
    cursor: pointer;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .km-logo {
    width: 190px;
    height: 52px;
    padding-top: 14px;
    box-sizing: content-box;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

.big-panel-container {
  display: flex;
  justify-content: space-between;
  color: #fff;
  background-color: #080826;
}

.member-block {
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  .member-sec {
    position: absolute;
    right: 20px;
    top: 66px;
  }
}

.recharge-block {
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  .recharge-pie {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 57px;
    .pie-box {
      position: absolute;
      right: 20px;
      bottom: 0;
      .pie-text {
        position: absolute;
        left: 50%;
        top: 50%;
        line-height: 1.2;
        text-align: center;
        transform: translate(-50%, -50%);
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        .ratio {
          font-size: 24px;
          font-family: DIN Alternate Bold;
          font-weight: bold;
          color: #ffffff;
        }
      }
    }
  }
}

.top10-block {
  .top10-title {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    box-sizing: border-box;
    .title-tab {
      margin-right: 59px;
      height: 42px;
      line-height: 42px;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.4;
      &.on {
        border-bottom: 2px solid #ffffff;
        opacity: 1;
      }
    }
  }
  .top-list {
    position: relative;
    padding: 9px 20px;
    box-sizing: border-box;
    .money-unit {
      position: absolute;
      top: -7px;
      right: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
    .top-item {
      display: flex;
      align-items: center;
      height: 32px;
      .rank {
        margin-right: 10px;
        width: 39px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #00dcdd;
        line-height: 14px;
      }
      .store-name {
        margin-right: 20px;
        width: 140px;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .money {
        flex: 1;
        height: 14px;
        font-size: 14px;
        text-align: right;
        font-family: DIN Alternate Bold;
        font-weight: bold;
        color: #ffffff;
        line-height: 14px;
      }
    }
  }
}

.turnover-block {
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  .turnover-title {
    margin-bottom: 30px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 18px;
  }
  .turnover-value {
    font-size: 80px;
    font-family: DIN Alternate Bold;
    font-weight: bold;
    color: #0b9afb;
    line-height: 80px;
  }
  .turnover-sec {
    position: absolute;
    left: 600px;
    top: 58px;
  }
  .percentage-box {
    margin-top: 28px !important;
  }
}

.mid-bottom {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 760px;
  .funnel-box {
    position: relative;
    .conversion-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-100%, -50%);
      .line {
        position: relative;
        width: 112px;
        height: 80px;
        border: 1px solid #39414d;
        border-right: 0px;
        &:last-of-type {
          border-top: 0px;
        }
        .cv-rate {
          position: absolute;
          right: 122px;
          top: 50%;
          transform: translateY(-50%);
          line-height: 1.5;
          width: 85px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
        }
      }
    }
  }
}

.coupon-block {
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  .coupon-sec {
    position: absolute;
    left: 390px;
    top: 20px;
  }
  .seven-box {
    margin-top: 38px;
    .coupon-title {
      height: 40px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
    .seven-day {
      display: flex;
      align-items: center;
      padding: 10px 0;
      height: 160px;
      border: 1px solid rgba(52, 58, 99, 0.5);
      border-top: 0px;
      box-sizing: border-box;
      .coupon-num {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px 0;
        padding-left: 10px;
        height: 100%;
        box-sizing: border-box;
        .num {
          font-size: 14px;
          font-family: DIN Alternate Bold;
          font-weight: bold;
          color: #ffffff;
        }
      }
      .line {
        margin: 0 10px;
        width: 20px;
        height: 47px;
        border: 1px solid #39414d;
        border-left: 0px;
        &:last-of-type {
          border-top: 0px;
        }
      }
      .get-ratio {
        display: flex;
        align-items: center;
        height: 47px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
}

.income-block {
  padding: 20px;
  box-sizing: border-box;
  .income-sec {
    margin-top: 52px;
  }
  .pie-box {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 200px;
    height: 200px;
    border: 1px solid rgba(52, 58, 99, 0.5);
    .pie-text {
      position: absolute;
      left: 50%;
      top: 50%;
      line-height: 1.5;
      text-align: center;
      transform: translate(-50%, -50%);
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      .ratio {
        font-size: 26px;
        font-family: DIN Alternate Bold;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}

.overview-block {
  margin-top: 20px;
  .overview-title {
    height: 40px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .overview-box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    .overview-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 82px;
      line-height: 1.5;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      background-color: rgb(11, 154, 251, 0.05);
      .count {
        font-size: 24px;
        font-family: DIN Alternate Bold;
        font-weight: bold;
        color: #0b9afb;
      }
    }
  }
}

.main-data {
  .title {
    margin-bottom: 24px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 18px;
    .sub-title {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 12px;
    }
  }
  .value {
    font-size: 40px;
    font-family: DIN Alternate Bold;
    font-weight: bold;
    color: #0b9afb;
    line-height: 40px;
  }
  .percentage-box {
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 14px;
    .percentage {
      display: flex;
      margin-right: 50px;
    }
  }
}

.sec-data {
  margin-bottom: 20px;
  .title {
    margin-bottom: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 14px;
  }
  .value {
    font-size: 24px;
    font-family: DIN Alternate Bold;
    font-weight: bold;
    color: #00dcdd;
    line-height: 24px;
  }
}

.block-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 58px;
  color: #fff;
  background-color: #080a24;
  background-image: url('data:image/png;base64,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');
  background-size: contain;
  background-position: center top;
  background-repeat: no-repeat;
}
</style>