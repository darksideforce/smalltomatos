<template>
  <div class="week-column-wrapper" @click="handleclick">
    <div class="week-column-wrapper-title">
      <span class="week-column-wrapper-title-small">
        {{ basicDay.week }}
      </span>
      <span class="week-column-wrapper-title-big">
        {{ basicDay.day }}
      </span>
    </div>
    <div class="week-column-wrapper-content">
      <div class="week-column-wrapper-content-item" v-for="item in timeSetting.itemStep"></div>
    </div>
    <div class="week-column-wrapper-mask">
      <CalendarMissionMask v-for="item in maskArray" :height="item.height" :top="item.top" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { basicMissionAtom, dataBaseType } from '@/type';
import { calendarBasicType, missionMaskType, timeSettingType } from '../type';
import dayjs from 'dayjs';
import { onMounted, reactive, ref, watch } from 'vue';
import CalendarMissionMask from './calendarMissionMask.vue';
import { isEmpty } from '@/utils/tool';

interface WeekProps {
  basicDay: calendarBasicType,
  timeSetting: timeSettingType,
  basicData: dataBaseType | any
}
const props = defineProps<WeekProps>()
const maskArray = ref<missionMaskType[]>([])
const handleclick = () => {
  console.log(maskArray)
}

watch(() => props.basicData, (newvalue, oldvalue) => {
  arrayOperat(newvalue)
})
onMounted(()=>{
  arrayOperat(props.basicData)
})
const arrayOperat = (newvalue:dataBaseType)=>{
  if (!isEmpty(newvalue?.mission)) {
    const timeRatio = 60 /props.timeSetting.itemHeight 
    const array = props.basicData.mission.map((e: basicMissionAtom) => {
      return {
        height: (timeDiffCalc(e.start, e.end) * timeRatio) ,
        top: startTimeDiff(e.start) * timeRatio 
      }
    })
    maskArray.value = array 
    console.log(maskArray)
  }
}
const startTimeDiff = (end: string) => {
  const start = props.basicDay.date + 'T' + '8:00'
  const diff = timeDiffCalc(start, end)
  return diff
}
const timeDiffCalc = (start: string, end: string) => {
  const startTime = dayjs(start, 'HH:mm');
  const endTime = dayjs(end, 'HH:mm');
  const diff = endTime.diff(startTime, 'minute')
  return diff
}
const borderPx = (start:string,end:string)=>{
  const  startTime= dayjs(start).hour();
  const endTime = dayjs(end).hour();
  return (endTime-startTime)
}
const topBorderPx = (end:string)=>{
  const start = props.basicDay.date + 'T' + '8:00'
  return  dayjs(end).hour() - dayjs(start).hour() 
}

</script>
<style scoped lang='less'>
.week-column-wrapper {
  flex: 1;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  &-title {
    min-height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f6f8fa;
    border-radius: 12px;
    margin: 0px 2px 4px 2px;

    &-small {
      font-size: 11px;
    }

    &-big {
      font-size: 16px;
      font-weight: bold;
    }
  }

  &-content {
    flex: 1;
    width: 100%;
    &-item {
      min-height: 60px;
      box-sizing: border-box;
      border-bottom: 1px dashed grey;
    }
  }
  &-mask{
    position: absolute;
    width: 100%;
    min-height: 100%;
    left: 0;
    top: 44px;
  }
}
</style>