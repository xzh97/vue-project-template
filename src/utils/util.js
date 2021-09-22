export const isPlainObject = obj => {
    return typeof obj === 'object' && obj !== null
}

/**
 * @summary 获取val类型
 * @param {any} val 
 */
export const getType = val => {
    return Object.prototype.toString.call(val).replace(/\[object (\w+)\]/g, (value, char) => char)
}

/**
 * @summary 日期格式转换
 * @param {date} date 日期字符串，
 * @param {string} formatStr 转换的格式 
 */
export const dateFormat = (date, formatStr = 'YYYY-MM-DD') => {
    if(!date){
        console.error('请传入正确的日期字符串')
    }
    let newDate = new Date(date)
    let y,mon,d,h,min,s;
    y = newDate.getFullYear()
    mon = addZero(newDate.getMonth + 1)
    d = addZero(newDate.getDate())
    h = addZero(newDate.getHours())
    min = addZero(newDate.getMinutes())
    s = addZero(newDate.getSeconds())
    return formatStr.replace('YYYY', y).
        replace('MM', mon).
        replace('DD', d).
        replace('hh', h).
        replace('mm', min).
        replace('ss', s)
    function addZero(val) {
        if(Number(val) < 10) {
            return '0' + val
        }
    }
}

export default {
    isPlainObject,
    getType,
    dateFormat,
}