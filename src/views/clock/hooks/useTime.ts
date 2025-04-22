import { computed, ref, toRef, watch, watchEffect } from "vue"

const useTimeHooks = function (startTime: number, onPause?: () => void) {
    const propTime = toRef(startTime)
    const time = ref(propTime.value * 60)
    const isRuning = ref(false)
    let timer: any = null
    watch(propTime, (newV) => {
        time.value = newV
    })
    const formatTime = computed(() => {
        const minute = Math.floor(time.value / 60)
        const seconds = time.value % 60
        return `${String(minute).padStart(3, '0')}:${String(seconds).padStart(2, '0')}`
    })
    const startTimer = () => {
        if (!isRuning.value && time.value > 0) {
            timer = setInterval(() => {
                --time.value
                if (time.value < 1) {
                    console.log(`stop timer`)
                    pause()
                }
            }, 10)
        }
    }
    const pause = () => {
        isRuning.value = false
        if (timer) {
            clearInterval(timer)
        }
        time.value = propTime.value * 60
        timer = null
        onPause?.()
    }
    const reset = ()=>{
        time.value  = propTime.value  * 60
    }
    return {
        propTime,
        formatTime,
        startTimer,
        reset
    }
}
export default useTimeHooks