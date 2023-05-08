<template>
  <div class="carousel" v-keyboard="handleKeyboard">
    <img :src="images[index]" alt="image" />
    <div class="controls">
      <button @click="prev">Prev</button>
      <button @click="next">Next</button>
      <button @click="toggle">{{ paused ? 'Play' : 'Pause' }}</button>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";



export default {
  name: "Carousel",
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [
        'https://images.unsplash.com/photo-1426901523280-39daa6101bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MzUxNzAxMg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
        'https://images.unsplash.com/photo-1426986877401-1b61ae18fb0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MzUxNzA2NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
        'https://images.unsplash.com/photo-1426901428072-737be6c018f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MzUxNzA4MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
        'https://images.unsplash.com/photo-1423347834838-5162bb452ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MzUxNzMwNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
        'https://images.unsplash.com/photo-1429497627149-e7839eef4fdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MzUxNzMzMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
      ]
    },
    interval: {
      type: Number,
      default: 3000,
    },
  },
  setup (props) {
    // 定义一个状态变量，表示当前显示的图片索引
    const index = ref(0);
    // 定义一个状态变量，表示是否暂停播放
    const paused = ref(false);
    // 定义一个定时器变量
    let timer = null;

    // 定义一个函数，切换到上一张图片
    function prev () {
      index.value = index.value === 0 ? props.images.length - 1 : index.value - 1;
    }

    // 定义一个函数，切换到下一张图片
    function next () {
      index.value = index.value === props.images.length - 1 ? 0 : index.value + 1;
    }

    // 定义一个函数，开始播放
    function play () {
      paused.value = false;
      timer = setInterval(next, props.interval);
    }

    // 定义一个函数，暂停播放
    function pause () {
      paused.value = true;
      clearInterval(timer);
      timer = null;
    }

    // 定义一个函数，切换播放状态
    function toggle () {
      if (paused.value) {
        play();
      } else {
        pause();
      }
    }

    // 定义一个函数，处理键盘事件
    function handleKeyboard (event) {
      switch (event.key) {
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
        case " ":
          toggle();
          break;
        default:
          break;
      }
    }

    // 在组件挂载时开始播放
    onMounted(() => {
      play();
    });

    // 在组件卸载时暂停播放
    onUnmounted(() => {
      pause();
    });

    // 返回需要在模板中使用的数据和方法
    return { index, paused, prev, next, toggle, handleKeyboard };
  },
};
</script>