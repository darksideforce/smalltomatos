import { calendarBasicType } from "@/views/calendar/type";

export interface basicMissionAtom {
    start:string,
    end:string,
    describe:string,
    type:any,
    color:string,
}
export interface dataBaseType extends calendarBasicType{
    mission:basicMissionAtom[]
}