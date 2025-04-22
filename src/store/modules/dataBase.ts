import { dataBaseType } from "@/type";
import { defineStore } from "pinia";
import { dataBaseState } from "../utils";
import { store } from "..";
import { mockData } from "@/mock/mock-1";
import { isEmpty } from "@/utils/tool";


export const useDataBase = defineStore('dataBase', {
    state: (): dataBaseState => ({
        missionData: [],
        missionTimeSetting:20,
    }),
    actions: {
        changeMissionData(){
            this.sameDayArrayCollect(mockData)
        },
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
        },
        loadSetting(){
            window.ipcRenderer.invoke('search-setting','time').then(res=>{
                
                this.missionTimeSetting = res
                console.log(`res=${this.missionTimeSetting}`)
                // standValue.value = res
                // SliderAnimation(res)
            })
        },
        changeMissionTime(time:number){
            window.ipcRenderer.invoke('set-setting', 'time',time)
            this.missionTimeSetting = time
            console.log(this.missionTimeSetting)
        },

    }
})
export function usedataBaseHook() {
    return useDataBase(store)
}