<template>
  <div class="container" ref="container">
    <div class="slider-track" ref="track" @mousedown="handleMouseDown" @mousemove="handleMouseMove"
      @mouseout="handleMouseUp" @mouseup="handleMouseUp" @mouseleave="handleMouseUp" :style="wrapperStyle">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName">
          <keep-alive>
            <component :is="Component" class="slide-page" />
          </keep-alive>
        </transition>
      </router-view>
      <div class="left hiddenBox" v-show="allowMove.left">
        <component :is="leftPage" class="slide-page" />
      </div>
      <div class="top hiddenBox" v-show="allowMove.top">
        <component :is="topPage" class="slide-page" />
      </div>
      <div class="right hiddenBox" v-show="allowMove.right">
        <component :is="rightPage" class="slide-page" />
      </div>
      <div class="bottom hiddenBox" v-show="allowMove.bottom">
        <component :is="bottomPage" class="slide-page" />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { Axis,  DragEventFunc, easySpringProps, Orientation,  } from './type';
import { ref, onMounted, computed, reactive, Ref } from 'vue';
import useJumpRoute from './useJumpRoute'
const DRAGSPEED = 0.8
defineOptions({
  name: 'easySpring'
})

const props = defineProps<easySpringProps>()
const container: Ref<HTMLElement | null> = ref(null);
const track: Ref<HTMLElement | null> = ref(null);
const isMove = ref(false);
const startPos = ref({ x: 0, y: 0 });
const currentPos = ref({ x: 0, y: 0 });
const sideWidth = reactive({ x: 0, y: 0 });
const transitionName = ref('');
const directionLock = ref<string | null>(null);
//是否允许进行后续的检查行为
const {allowMove,topPage,bottomPage,leftPage,rightPage,checkRoute,routerJump} = useJumpRoute(props)
const wrapperStyle = computed(() => {
  return {
    transform: `translate(${currentPos.value.x}px, ${currentPos.value.y}px)`,
    transition: isMove.value ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }
})


const initContainerSize = () => {
  if (!container.value) return
  sideWidth.x = container.value.offsetWidth
  sideWidth.y = container.value.offsetHeight
}
const handleMouseDown: DragEventFunc<MouseEvent> = (e) => {
  DragStart(e.clientX, e.clientY)
}
const handleMouseUp: DragEventFunc<MouseEvent> = (e) => {
  DragEnd()
}
const handleMouseMove: DragEventFunc<MouseEvent> = (e) => {
  DragUpdate(e.clientX, e.clientY)
}
const DragStart = (clientX: number, clientY: number) => {
  isMove.value = true
  startPos.value = { x: clientX, y: clientY }
  currentPos.value = { x: 0, y: 0 }
  directionLock.value = null
}
//监测是否可以左划右划

const DragUpdate = (clientX: number, clientY: number) => {
  //计算出移动距离并判断是Z轴还是Y轴移动
  if (!isMove.value) return
  const diffX = clientX - startPos.value.x
  const diffY = clientY - startPos.value.y
  //增加一个判断以免移动过低时导致xy轴移动判断不准确从而出现乱窜
  if (Math.abs(diffX) < Math.abs(diffY) && directionLock.value !== 'horizontal') {
    //禁止向没有的方向拖拽
    if ((diffY > 0 && !allowMove.value.top) || (diffY < 0 && !allowMove.value.bottom)) return
    currentPos.value.y = diffY * DRAGSPEED
    directionLock.value = 'vertical'
    applyBoundry('y', diffY)
  }
  else if (Math.abs(diffX) > Math.abs(diffY) && directionLock.value !== 'vertical') {
    //禁止向没有的方向拖拽
    if ((diffX < 0 && !allowMove.value.right) || (diffX > 0 && !allowMove.value.left)) return
    currentPos.value.x = diffX * DRAGSPEED
    directionLock.value = 'horizontal'
    applyBoundry('x', diffX)
  }

}
const DragEnd = () => {
  if (!isMove.value) return 
  currentPos.value = { x: 0, y: 0,}
  isMove.value = false
  directionLock.value = null

}
//切换到一定程度时候进行判断是否超出，并显示下一节
const applyBoundry = (axis: Axis, pos: number) => {
  const boundry = axis === 'x' ? sideWidth.x : sideWidth.y
  if (Math.abs(pos) > boundry / 2) {
    let position = directionLock.value === 'vertical' ? pos > 0 ? 'top' : 'bottom' : pos > 0 ? 'left' : 'right'
    slidePage(position as Orientation)
  }
}
const slidePage = (pos:Orientation)=>{
  transitionName.value = directionLock.value === 'horizontal'
    ? (currentPos.value.x > 0 ? 'slide-right' : 'slide-left')
    : (currentPos.value.y > 0 ? 'slide-down' : 'slide-up');
  DragEnd()
  routerJump(pos)
}
onMounted(() => {
  checkRoute()
  initContainerSize()
})
</script>

<style lang="less">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: absolute;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(-100%);
}

.slide-down-enter-from {
  transform: translateY(-100%);
}

.slide-down-leave-to {
  transform: translateY(100%);
}

.container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  .slider-track {
    // width: 400px;;
    // height: 400px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: relative;

    align-items: center;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hiddenBox {
    width: 100%; //400px;
    height: 100%; //400px;
    position: absolute;
  }

  .left {
    right: 100%;
  }

  .right {
    left: 100%;
  }

  .top {
    bottom: 100%;
  }

  .bottom {
    top: 100%
  }



}
</style>