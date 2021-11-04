import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

export function getNowDate () {
  return dayjs().format('YYYY-MM-DD')
}
export function getNowTime () {
  return dayjs().format('HH:mm:ss')
}
export function getNowFullDate () {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export function getTimeStamp () {
  return dayjs().valueOf()
}

export default dayjs
