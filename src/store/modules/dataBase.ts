import { dataBaseType } from "@/type";
import { defineStore } from "pinia";
import { dataBaseState } from "../utils";
import { store } from "..";
import { mockData } from "@/mock/mock-1";
import { isEmpty } from "@/utils/tool";

export const useDataBase = defineStore('dataBase', {
    state: (): dataBaseState => ({
        missionData: [],

    }),
    actions: {
        changeMissionData(){
            this.sameDayArrayCollect(mockData)
        },
        // changeMissionData(data: dataBaseType[]) {
        //     console.log(data)
        //     if(!isEmpty(data)){
        //         this.missionData = data
        //     }
        // },
        //将同一天的数据统一
        sameDayArrayCollect(data?: dataBaseType[]) {
            if (!isEmpty(data)) {
                const clonedData = JSON.parse(JSON.stringify(data)) 
                const dataMap = new Map()
                clonedData?.forEach((e:any) => {
                    const {date} = e
                    if(dataMap.has(date)){
                        const exisMap = dataMap.get(date)
                        exisMap.mission.push(...e.mission)
                    }
                    else{
                        dataMap.set(date,{...e})
                    }
                })
                this.missionData = Array.from(dataMap.values())
            }
        }
    }
})
export function usedataBaseHook() {
    return useDataBase(store)
}