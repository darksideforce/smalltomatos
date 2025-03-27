<template>
  <div class="calendar-wrapper">
    <div class="calendar-time-column">
      <div class="calendar-time-column-item" v-for="item in timeInterval">
        {{ item }}
      </div>
    </div>
    <div class="calendar-week-column">
      <weekColumn v-for="item in calendarDateArray" 
        :time-setting="calendarBaseSetting"
        :basicDay="item" 
        :basic-data="dataDelivery(item.date)"></weekColumn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import useTimeSetting from './hooks/timeSetting';
import weekColumn from './modules/weekColumn.vue';
import { usedataBaseHook } from '@/store/modules/dataBase';
import { dataBaseType } from '@/type';

const { timeInterval, calendarDateArray, calendarBaseSetting } = useTimeSetting()
usedataBaseHook().changeMissionData()
//按时间把数据处理好
const dataDelivery = (date: string, data?: dataBaseType[]): dataBaseType | undefined => {
  return usedataBaseHook().missionData.find(e => {
    return e.date === date
  })
}

</script>
<style scoped lang='less'>
.calendar-wrapper {
  min-width: 100%;
  height: 100%;
  display: flex;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  /* Safari 和 Chrome */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE/Edge */
  overflow-y: scroll;
}

.calendar-time-column {
  height: 100%;
  width: 50px;
  display: flex;
  flex-direction: column;
  margin-top: 74px;
  margin-right: 4px;

  &-item {
    min-height: 60.5px;
    width: 100%;
    display: flex;
    justify-content: flex-center;
    padding: 0px 10px;
    align-items: center;
    font-size: 12px;
  }
}

.calendar-week-column {
  flex: 1;
  height: 100%;
  flex-direction: row;
  display: flex;
  justify-content: space-between;

}
</style>