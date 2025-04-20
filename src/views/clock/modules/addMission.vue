<template>
    <div class="addmission">
        <div class="addmission_value">
            <span>{{ standValue }}</span>
        </div>
        <div class="addmission-ruler" ref="rulerEle">
            <div class="addmission-ruler_rulerbox" @mousedown="handleMouseDown" ref="dragEle">
                <div class="addmission-ruler_rulerboxitem" v-for="(item, index) in rulerList">
                    <div class="addmission-ruler_title">{{ item }}</div>
                    <div class="addmission-ruler_itembox">
                        <div class="column-box"></div>
                        <div class="short-box" v-for="items in 5" v-if="index !== rulerList.length - 1"></div>
                    </div>

                </div>
            </div>
            <div class="addmission-ruler_point">

            </div>
        </div>
        <div class="addmission_stand" @click="handleClickChangeTime">
            完成
        </div>
    </div>
</template>

<script setup lang="ts">
import { usedataBaseHook } from '@/store/modules/dataBase';
import { animate, createSpring, } from 'animejs';
import { computed, nextTick, onMounted, reactive, ref } from 'vue'



const isDraging = ref(false)
const startPosition = reactive({ x: 0 })
const startX = ref(0)
const position = reactive({ x: 0 })
const transX = ref(0)
const dragEle = ref(null)
const rulerEle = ref()
const getMultiple = function (a: number, b: number) {
    if (a > b) [a, b] = [b, a]
    const start = Math.ceil(a / 5) * 5
    const end = Math.floor(b / 5) * 5
    if (start > end) return []
    const array = Array.from(
        { length: (end - start) / 5 + 1 },
        (_, i) => start + i * 5)
    return array
}
const rulerList = reactive<number[]>(getMultiple(0, 180))
const rulerConfig = reactive({
    width: 95,
    gap: 10,
    fullWidth: rulerList.length * 95,
    maxXleft: 0,
    maxXright: 0,
})
const standValue = computed(() => {
    let realX = 0
    if (transX.value > 0) {
        realX = rulerConfig.maxXleft - transX.value
    }
    else {
        realX = rulerConfig.maxXleft + Math.abs(transX.value)
    }
    const value = Math.round(realX / rulerConfig.width) * 5
    return value
})
onMounted(async () => {
    const value =  window.ipcRenderer.invoke('search-setting','time').then(res=>{
        console.log(res)
    })
    console.log(value)
    await nextTick()
    if (rulerEle.value) {
        console.log(rulerEle.value.clientWidth)
        rulerConfig.maxXleft = (rulerEle.value.clientWidth / 2) - 5
        rulerConfig.maxXright = 0 - (rulerConfig.fullWidth - rulerConfig.maxXleft - 10 - rulerConfig.width)
    }
})
const handleMouseDown = (e: MouseEvent) => {
    isDraging.value = true
    startX.value = e.clientX
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', handleStopDrag)
}
const handleDrag = (e: MouseEvent) => {
    if (!isDraging.value) return
    if (!dragEle.value) return

    const moveX = e.clientX - startX.value
    position.x = moveX + startPosition.x
    if (position.x > rulerConfig.maxXright && position.x < rulerConfig.maxXleft) {
        console.log(`111`)
        updateAnimate(position.x)
        transX.value = position.x
    }
}
const handleStopDrag = () => {
    isDraging.value = false
    startPosition.x = position.x
    stopSliderAnimation(standValue.value)
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', handleStopDrag)
}
const updateAnimate = (x: number) => {
    if (!dragEle.value) return
    animate(dragEle.value, {
        translateX: x,
        ease: createSpring({ stiffness: 10, damping: 5 }),
    })
    // position.x = x + position.x
    // console.log(`now=${position.x}`)
}
const stopSliderAnimation = (x: number) => {
    const stopSliderTransX = x / 5 * rulerConfig.width
    let sliderRealX = 0
    if (stopSliderTransX < rulerConfig.maxXleft) {
        sliderRealX = rulerConfig.maxXleft - stopSliderTransX
    }
    else {
        sliderRealX = 0 - (stopSliderTransX - rulerConfig.maxXleft)
    }
    updateAnimate(sliderRealX)
}
const handleClickChangeTime = () => {
    usedataBaseHook().changeMissionTime(standValue.value)
}
</script>
<style scoped lang='less'>
.addmission {
    width: 100%;
    height: 100%;
    background: linear-gradient(#2c3e50, #34495e, #2c3e50);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &_value {
        font-weight: bold;
        font-size: 80px;
        color: #da6b5d;
    }

    &_stand {
        margin-top: 120px;
        width: 120px;
        height: 60px;
        background-color: #da6b5d;
        color: #ffffff;
        font-weight: bold;
        text-align: center;
        line-height: 60px;
        border-radius: 30px;
    }
}

.addmission-ruler {
    margin-top: 10px;
    height: 100px;
    width: 100%;
    position: relative;
    overflow: hidden;

    &_rulerbox {
        position: absolute;
        height: 100%;
        user-select: none;
    }

    &_rulerboxitem {
        width: 95px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
    }

    &_itembox {
        display: grid;
        grid-template-columns: 10px repeat(5, 5px);
        gap: 10px;
        justify-content: center;
        align-items: flex-start;
        height: 100%;
        width: 85px;
        margin-top: 20px;
        padding-right: 10px;

        .column-box {
            background-color: #3c3f48;
            width: 10px;
            border-radius: 4px;
            height: 40px;
        }

        .short-box {
            background-color: #3c3f48;
            width: 5px;
            height: 30px;
            border-radius: 3px;
            margin-right: 4px;
        }
    }

    &_title {
        position: absolute;
        font-weight: bold;
        color: #3c3f48;
        width: 40px;
        transform: translateX(-40%);
        text-align: center;
        display: flex;
        justify-content: center;
    }

    &_point {
        position: absolute;
        top: 0;
        height: 100px;
        width: 10px;
        border-radius: 20px;
        background-color: #da6b5d;
        left: 50%;
        transform: translateX(-50%);
    }
}

.addmission-ruler_rulerbox {
    display: flex;
}
</style>