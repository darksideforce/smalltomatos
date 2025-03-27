import { reactive, ref } from "vue"
import { calendarBasicType, timeSettingType } from "../type"
import dayjs from "dayjs"

interface daysKey {
    [key:string]:string
}

const dayMap:daysKey = {
    'Sun':'日',
    'Mon':'一',
    'Tue':'二',
    'Wed':'三',
    'Thu':'四',
    'Fri':'五',
    'Sat':'六'
}
//返回根据时间处理好的数据
function generateWeekArray(baseDate: Date = new Date()):calendarBasicType[] {
    let startWeek = dayjs(baseDate).startOf('week')
    return Array.from({ length: 7 }).map((_, index) => {
        const date = startWeek.add(index, 'day')
        return {
            week: dayMap[date.format('ddd')],
            day: date.date(),
            month: date.format('MMM'),
            date: date.format("YYYY-MM-DD"),
            mission: ''
        }
    })

}
const useTimeSetting = function () {
    const timeInterval = reactive([
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00'
    ])

    const calendarBaseSetting = reactive<timeSettingType>({
        itemHeight:60,
        itemStep:16,
    })
    const calendarType = ref('week')
    //基本日期数据
    const calendarDateArray = reactive<calendarBasicType[]>(generateWeekArray())
    //预留修改时间设置
    const changeTimeSetting = function () {

    }
    return {
        timeInterval,
        calendarDateArray,

        calendarBaseSetting
    }
}
export default useTimeSetting