import { defineStore } from "pinia";
import { store } from "..";
interface calendarDataState {
    calendarPixel:number,
    timeStep:number
}

//储存日程表的相关信息
export const useCalendarData = defineStore('calendarData',{
    state: ():calendarDataState => ({
            calendarPixel: 0,
            timeStep:16
        }),
    actions:{

    }
})

export function useCalendarHooks(){
    return useCalendarData(store)
}