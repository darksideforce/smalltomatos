<template>
  <div class="clock">
    <div class="clock_font">
      <span class="clock_font--time">60:00</span>
      <div class="clock_font--detail">阅读</div>
      <div class="clock_font--button" @click="handleclick">开始专注</div>
    </div>
    <div class="clock_animate" ref="animate">
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import useAnimateHooks from './hooks/useAnimate';

const animate = ref<HTMLElement | null>(null)
const {registerContainer,renderImg} = useAnimateHooks()
const handleclick = ()=>{
  registerContainer(animate.value)
}
onMounted(async ()=>{
  await nextTick()
  setTimeout(() => {
    
    // renderImg()
  },1000);
})
</script>
<style scoped lang='less'>
.clock,
.clock_font {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &--time {
    font-size: 100px;
    font-weight: bold;
    letter-spacing: 8px;
  }

  &--detail {
    margin-top: 20px;
  }

  &--button {
    width: 140px;
    background-color: rgba(40, 40, 40, 0.9);
    height: 60px;
    margin-top: 100px;
    text-align: center;
    line-height: 60px;
    border-radius: 30px;
    transition: transform 0.2s ease;
  }

  &--button:active {
    transform: scale(0.9);
  }
}

.clock {
  background-color: rgba(18, 18, 18, 0.98);
  color: rgba(245, 245, 245, 0.87);

  &_font {
    z-index: 10;
  }

  &_animate {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: 1;
  }
}
</style>