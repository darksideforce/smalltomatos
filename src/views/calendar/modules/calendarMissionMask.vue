<template>
  <div class="mask-wrapper" :style="changeStyle">

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
    name:'calendarMissionMask'
})
interface maskProps {
    height:number,
    top:number
}
const props=defineProps<maskProps>()
const changeStyle = computed(()=>{
  return {
    height:props.height+'px',
    top:props.top +'px'
  }
})
</script>
<style scoped lang='less'>
.mask-wrapper{
  width: 100%;
  background-color: pink;
  position: absolute;
  border-radius: 10px;
}
</style>