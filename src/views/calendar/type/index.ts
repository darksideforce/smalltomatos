

export type weekBasicType = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

export type monthBasicType = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'

export type missionMaskType = {
    height:number,
    top:number
}
export interface calendarBasicType {
    week: weekBasicType |string,
    day: number,
    month: monthBasicType | string,
    date:any,
    mission:any
}
export interface timeSettingType {
    itemHeight:number,
    itemStep:number
}