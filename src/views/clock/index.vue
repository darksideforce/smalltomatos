<template>
  <div class="clock">
    <div class="clock_font">
      <span class="clock_font--time" @click="handleClickChangeTime">{{ formatTime }}</span>
      <div class="clock_font--detail">阅读</div>
      <div class="clock_font--button" @click="handleClickStart">开始专注</div>
    </div>
    <div class="clock_animate" ref="animate">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import useAnimateHooks from './hooks/useAnimate';
import useMyDialog from './hooks/useNewDialog';
import useTimeHooks from './hooks/useTime';
import { usedataBaseHook, useDataBase } from '@/store/modules/dataBase';

const animate = ref<HTMLElement | null>(null)
const { missionTimeSetting, loadSetting } = usedataBaseHook()
const { registerContainer, renderImg } = useAnimateHooks()
const timeStopFunc = () => {
  console.log(`外部监听到了结束`)
}
const { formatTime, propTime, startTimer, reset } = useTimeHooks(usedataBaseHook().missionTimeSetting, timeStopFunc)
const { openDialog } = useMyDialog()
const showDialog = () => {
  openDialog({
  });
};
const handleClickStart = () => {
  reset()
  startTimer()
}
const handleClickChangeTime = () => {
  showDialog()
}
watch(() => usedataBaseHook().missionTimeSetting, (newV, oldV) => {
  propTime.value = newV
})
const timeCountdown = computed(() => {

})

onMounted(async () => {
  await nextTick()
  usedataBaseHook().loadSetting()
})
const renderFunc = () => {
  if (!animate.value) return
  registerContainer(animate.value)
  renderImg(10)
}

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