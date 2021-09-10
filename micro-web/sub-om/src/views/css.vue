<template>
  <div class="wrap">
    <div class="light" v-show="lightBtn">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      Neon Button
    </div>
    <div class="gird-box" v-show="grid">
      <div class="outer" v-for="item in 9" :key="item">
        <div class="inner"></div>
        <div class="other"></div>
      </div>
    </div>
    <div class="text-decoration" v-show=tede>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <a>Mollitia nostrum placeat consequatur deserunt velit ducimus possimus commodi temporibus debitis quam</a>, molestiae laboriosam sit repellendus sed sapiente quidem quod accusantium vero.</p>
    </div>
    <div class="screen" v-show="screen"></div>
    <div class="hover-box" v-show="hoverBox">
      <button class="hover-btn">Hover me !</button>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    return {
      lightBtn: false,
      grid: false,
      tede: false,
      screen: false,
      hoverBox: false
    }
  }
}
</script>

<style lang="scss" scoped>
$wrap-bgc: #050901;
$light-color: #03e9f4;
$a1: #c1ebff;
.wrap {
  padding-top: 50px;
  height: calc(100vh - 128px);
  background: $wrap-bgc;
}
//========================================
.hover-box {
  @include flex-xy();
  margin: 0 auto;
  height: 100px;
  width: 300px;
  background-color: #fff;
}
.hover-btn {
  height: 60px;
  padding: 0 2em;
  background-color: #1aab8a;
  color: #fff;
  border: none;
  outline: none;
  font-size: 1.6em;
  cursor: pointer;
  position: relative;
  transition: all ease 800ms;
  &:hover {
    background-color: #fff;
    color: #1aab8a;
    &:after,
    &:before {
      width: 100%;
      transition: all ease 800ms;
    }
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 2px;
    background-color: #1aab8a;
    transition: all ease 400ms;
  }
  &:after {
    top: inherit;
    right: inherit;
    left: 0;
    bottom: 0;
  }
}
//============= experimental api =============
//https://mp.weixin.qq.com/s/a3U4pTGcF9Ntd_DLeGAwLw
@property --color1 {
  syntax: '<color>';
  inherits: false;
  initial-value: yellowgreen;
}
@property --color2 {
  syntax: '<color>';
  inherits: false;
  initial-value: deeppink;
}
@property --perA {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 75%;
}
@property --perB {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 99%;
}
@property --perC {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 15%;
}
@property --perD {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 16%;
}
@property --perE {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 86%;
}
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.screen {
  margin-left: 50px;
  width: 300px;
  height: 200px;
  background-image: radial-gradient(
      circle at var(--perE) 7%,
      rgba(40, 40, 40, 0.04) 0%,
      rgba(40, 40, 40, 0.04) 50%,
      rgba(200, 200, 200, 0.04) 50%,
      rgba(200, 200, 200, 0.04) 100%
    ),
    radial-gradient(
      circle at var(--perC) var(--perD),
      rgba(99, 99, 99, 0.04) 0%,
      rgba(99, 99, 99, 0.04) 50%,
      rgba(45, 45, 45, 0.04) 50%,
      rgba(45, 45, 45, 0.04) 100%
    ),
    radial-gradient(
      circle at var(--perA) var(--perB),
      rgba(243, 243, 243, 0.04) 0%,
      rgba(243, 243, 243, 0.04) 50%,
      rgba(37, 37, 37, 0.04) 50%,
      rgba(37, 37, 37, 0.04) 100%
    ),
    linear-gradient(var(--angle), var(--color1), var(--color2));
  animation: move 7s infinite alternate linear, change 10s infinite linear;
}
@keyframes move {
  100% {
    --perA: 85%;
    --perB: 49%;
    --perC: 45%;
    --perD: 39%;
    --perE: 70%;
    --angle: 360deg;
  }
}
@keyframes change {
  20% {
    --color1: aqua;
    --color2: rgb(255, 102, 0);
  }
  40% {
    --color1: rgb(26, 194, 138);
    --color2: rgb(13, 22, 7);
  }
  60% {
    --color1: rgb(56, 206, 42);
    --color2: rgb(44, 211, 189);
  }
  80% {
    --color1: rgb(68, 0, 255);
    --color2: rgb(216, 73, 96);
  }
}
//===============================
.text-decoration {
  margin: 0 auto;
  width: 500px;
  color: #fff;
  text-align: justify;
  line-height: 1.5;
  a {
    background: linear-gradient(90deg, #0cc, #0cc),
      linear-gradient(90deg, #ff3c41, #fc0, #8500d8);
    background-size: 100% 3px, 0 3px;
    background-repeat: no-repeat;
    background-position: 100% 100%, 0 100%;
    transition: 1s all;
    color: #0cc;
    &:hover {
      background-size: 0 3px, 100% 3px;
      color: pink;
    }
  }
}
//===============================
.gird-box {
  width: 470px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  background-color: pink;
  .outer {
    .inner {
      position: relative;
      width: 100%;
      padding-bottom: 100%; //值为百分比时参照父元素宽度
      background: orange;
    }
    .other {
      height: 50px;
      background-color: yellowgreen;
    }
  }
}
//===============================
.light {
  position: relative;
  margin: 0 auto;
  padding: 25px 30px;
  width: fit-content;
  color: $light-color;
  font-size: 24px;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    background-color: $light-color;
    color: $wrap-bgc;
    box-shadow: 0 0 5px $light-color, 0 0 25px $light-color,
      0 0 50px $light-color, 0 0 200px $light-color; //多重阴影叠加，可以形成一个类似霓虹灯光的效果
  }
  filter: hue-rotate(
    200deg
  ); //给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。值为0deg，则图像无变化。若值未设置，默认值是0deg。该值虽然没有最大值，超过360deg的值相当于又绕一圈
  .line {
    position: absolute;
    &:nth-child(1) {
      width: 100%;
      height: 2px;
      top: 0;
      left: -100%;
      background: linear-gradient(to right, transparent, $light-color);
      animation: animate1 1s linear infinite;
    }
    &:nth-child(2) {
      width: 2px;
      height: 100%;
      top: -100%;
      right: 0;
      background: linear-gradient(to bottom, transparent, $light-color);
      animation: animate2 1s linear infinite;
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      width: 100%;
      height: 2px;
      bottom: 0;
      right: -100%;
      background: linear-gradient(to left, transparent, $light-color);
      animation: animate3 1s linear infinite;
      animation-delay: 0.5s;
    }
    &:nth-child(4) {
      width: 2px;
      height: 100%;
      bottom: -100%;
      left: 0;
      background: linear-gradient(to top, transparent, $light-color);
      animation: animate4 1s linear infinite;
      animation-delay: 0.75s;
    }
  }
}
@keyframes animate1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
@keyframes animate2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
@keyframes animate3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}
@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>