<template>
  <div class="week-column" >
    <div class="week-column_title">
      <span class="week-column_title--small">
        {{ basicDay.week }}
      </span>
      <span class="week-column_title--big">
        {{ basicDay.day }}
      </span>
    </div>
    <div class="week-column_content">
      <div class="week-column_content--item" v-for="item in timeSetting.itemStep"></div>
    </div>
    <div class="week-column_mask">
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
        top: timeDiffCalc( props.basicDay.date + 'T' + '8:00',e.start) * timeRatio 
      }
    })
    maskArray.value = array 
  }
}

const timeDiffCalc = (start: string, end: string) => {
  const startTime = dayjs(start, 'HH:mm');
  const endTime = dayjs(end, 'HH:mm');
  const diff = endTime.diff(startTime, 'minute')
  return diff
}

</script>
<style scoped lang='less'>
.week-column{
  flex: 1;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  &_title {
    min-height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f6f8fa;
    border-radius: 12px;
    margin: 0px 2px 4px 2px;

    &--small {
      font-size: 11px;
    }

    &--big {
      font-size: 16px;
      font-weight: bold;
    }
  }

  &_content {
    flex: 1;
    width: 100%;
    &--item {
      min-height: 60px;
      box-sizing: border-box;
      border-bottom: 1px dashed grey;
    }
  }
  &_mask{
    position: absolute;
    width: 100%;
    min-height: 100%;
    left: 0;
    top: 44px;
  }
}
</style>