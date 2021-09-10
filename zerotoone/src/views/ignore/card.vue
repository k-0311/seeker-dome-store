<template>
  <div class="card-box">
    <van-button type="primary">主要按钮</van-button>
    <div :class="['mb',`base-coupons-${cardStyle}`]" :style="{'--bg-color':selColor, width:cardSize + 'px'}">
      <div class="card-mode-1" v-if="showStyle == 0">
        <div class="main-info">
          <div class="money">兑换券</div>
          <div class="info">
            <div class="name">优惠券名称</div>
            <div class="decs">无门槛,全场通用</div>
          </div>
        </div>
        <div class="get-in-now">
          <div class="get-text">立即领取</div>
        </div>
      </div>

      <div class="card-mode-2" v-if="showStyle > 0">
        <div class="main-info">
          <div class="money">兑换券</div>
          <div class="decs clamp1">无门槛,全场通用</div>
        </div>
        <div class="get-in-now">
          <div class="get-text">立即领取</div>
        </div>
      </div>
    </div>

    <div class="base-coupons-0" :style="{'--bg-color':'#FDAB11', width:cardSize + 'px'}"></div>
    <div class="base-coupons-1" :style="{'--bg-color':'#FDAB11', width:cardSize + 'px'}"></div>
    <div class="base-coupons-2" :style="{'--bg-color':'#FDAB11', width:cardSize + 'px'}"></div>
    <div class="base-coupons-3" :style="{'--bg-color':'#FDAB11', width:cardSize + 'px'}"></div>
    <div class="base-coupons-4" :style="{'--bg-color':'#FDAB11', width:cardSize + 'px'}"></div>
    <div class="base-coupons-5" :style="{'--bg-color':'#FDAB11', width:cardSize + 'px'}"></div>

  </div>
</template>
<style lang="scss">
</style>
<script>
export default {
  data () {

    return {
      selColor: '',
      cardSize: '',
      //===================
      showStyle: 0,
      cardStyle: 1,
      cardColor: 0
      //=====================
    }
  },
  mounted () {
    const COLORS = ['#FD5B4F', '#FDAB11', '#81C5B9', '#FFFFFF', '#FBD1E0', '#DCEAFF']
    const SIZES = [355, 172.5, 113, 144]
    this.cardSize = SIZES[this.showStyle]
    this.selColor = COLORS[this.cardColor]

  }
}
</script>

<style lang="scss" scoped>
.card-box {
  padding: 50px;
  background-color: #0f99604d;
}
.mb {
  margin-bottom: 50px;
  color: #fff;
}
.base-coupons-0 {
  margin-top: 20px;
  height: 74px;
  position: relative;
  background-color: var(--bg-color);
}
.base-coupons-1 {
  margin-top: 20px;
  height: 74px;
  position: relative;
  background: radial-gradient(
        circle at left center,
        transparent 3.5px,
        var(--bg-color) 0
      )
      0% 0% / 50% 20% no-repeat,
    radial-gradient(circle at left center, transparent 3.5px, var(--bg-color) 0)
      0% 20% / 50% 20% no-repeat,
    radial-gradient(circle at left center, transparent 3.5px, var(--bg-color) 0)
      0% 40% / 50% 20% no-repeat,
    radial-gradient(circle at left center, transparent 3.5px, var(--bg-color) 0)
      0% 60% / 50% 20% no-repeat,
    radial-gradient(circle at left center, transparent 3.5px, var(--bg-color) 0)
      0% 80% / 50% 20% no-repeat,
    radial-gradient(circle at left center, transparent 3.5px, var(--bg-color) 0)
      0% 100% / 50% 20% no-repeat,
    radial-gradient(circle at right center, transparent 3.5px, var(--bg-color) 0)
      100% 0% / 50% 20% no-repeat,
    radial-gradient(circle at right center, transparent 3.5px, var(--bg-color) 0)
      100% 20% / 50% 20% no-repeat,
    radial-gradient(circle at right center, transparent 3.5px, var(--bg-color) 0)
      100% 40% / 50% 20% no-repeat,
    radial-gradient(circle at right center, transparent 3.5px, var(--bg-color) 0)
      100% 60% / 50% 20% no-repeat,
    radial-gradient(circle at right center, transparent 3.5px, var(--bg-color) 0)
      100% 80% / 50% 20% no-repeat,
    radial-gradient(circle at right center, transparent 3.5px, var(--bg-color) 0)
      100% 100% / 50% 20% no-repeat;
}
.base-coupons-2 {
  margin-top: 20px;
  height: 74px;
  position: relative;
  background: radial-gradient(
        circle at left center,
        transparent 7.5px,
        var(--bg-color) 0
      )
      bottom left / 50% 100% no-repeat,
    radial-gradient(
        circle at right center,
        transparent 7.5px,
        var(--bg-color) 0
      )
      bottom right / 50% 100% no-repeat;
  border-radius: 5px;
}
.base-coupons-3 {
  margin-top: 20px;
  height: 74px;
  position: relative;
  background: radial-gradient(
        circle at right top,
        transparent 5px,
        var(--bg-color) 0
      )
      top left / 72% 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 5px, var(--bg-color) 0)
      bottom left / 72% 51% no-repeat,
    radial-gradient(circle at left top, transparent 5px, var(--bg-color) 0) top
      right / 28% 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 5px, var(--bg-color) 0)
      bottom right / 28% 51% no-repeat;
  border-radius: 5px;
}
.base-coupons-4 {
  margin-top: 20px;
  height: 74px;
  position: relative;
  background: radial-gradient(
        circle at left top,
        transparent 5px,
        var(--bg-color) 0
      )
      top left / 72% 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 5px, var(--bg-color) 0)
      bottom left / 72% 51% no-repeat,
    radial-gradient(circle at right top, transparent 5px, var(--bg-color) 0) top
      right / 28% 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 5px, var(--bg-color) 0)
      bottom right / 28% 51% no-repeat;
}
.base-coupons-5 {
  margin-top: 20px;
  height: 74px;
  position: relative;
  background-color: var(--bg-color);
  &::before {
    content: '';
    position: absolute;
    left: 2.5px;
    top: 2.5px;
    width: calc(100% - 5px);
    height: calc(100% - 5px);
    border: 1px solid #fff;
    box-sizing: border-box;
  }
}
.card-mode-1 {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .main-info {
    display: flex;
    align-items: center;
    width: 72%;
    line-height: 1.5;
    .money {
      width: 110px;
      font-size: 20px;
      text-align: center;
    }
    .info {
      flex: 1;
      .name {
        font-size: 17px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
      }
      .decs {
        font-size: 12px;
      }
    }
  }
  .get-in-now {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28%;
    height: 54px;
    background-image: linear-gradient(
      to bottom,
      #ffffff 0%,
      #ffffff 50%,
      transparent 50%
    );
    background-size: 1px 4px;
    background-repeat: repeat-y;
    .get-text {
      width: 40px;
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 2px;
    }
  }
}
.card-mode-2 {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .main-info {
    width: 72%;
    line-height: 1.5;
    text-align: center;
    .money {
      font-size: 20px;
    }
    .decs {
      font-size: 12px;
      display: -webkit-box;
      word-break: break-all;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  .get-in-now {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28%;
    height: 54px;
    background-image: linear-gradient(
      to bottom,
      #ffffff 0%,
      #ffffff 50%,
      transparent 50%
    );
    background-size: 1px 4px;
    background-repeat: repeat-y;
    .get-text {
      width: 12px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
  }
}

.base-coupons-2 {
  .card-mode-2 {
    background-image: url('../assets/card/card2-2.png');
    background-size: calc(100% - 5px);
    background-position: 2.5px 2.5px;
    background-repeat: no-repeat;
  }
}
.base-coupons-0 {
  .card-mode-2 {
    background-image: url('../assets/card/card1-2.png');
    background-size: auto calc(100% - 5px);
    background-position: 4px 2.5px;
    background-repeat: no-repeat;
  }
}

.base-coupons-5 {
  .card-mode-1 {
    .get-in-now {
      height: 60px;
      background-image: none;
      .get-text {
        display: flex;
        align-items: center;
        padding: 0 5px;
        width: 60px;
        height: 60px;
        text-align: center;
        color: var(--bg-color);
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 50%;
      }
    }
  }
}
</style>