/**
 * 时间日期相关操作
 */


/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成 2018/09/23
 * @param date 国际化日期格式
 */
export function format (date, aa) {
  aa = aa || '-'
  return formatWithSeperator(date, aa);
}

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成类似 2018/09/23 11:54:16
 * 可以指定日期和时间分隔符
 * @param date 国际化日期格式
 */
export function formatWithSeperator (date, dateSeprator) {
  if(isiOS && typeof(date) != 'number' && typeof(date) != 'object'){
    date = date.substr(0, 19)
  }
  if (date != null) {
    const dateMat = new Date(date);
    const year = dateMat.getFullYear();
    const month = dateMat.getMonth() + 1;
    const day = dateMat.getDate();
    let timeFormat;
    if(dateSeprator == 1){
      timeFormat = year + '年' + month + '月' + day + '日';
    }else{
      timeFormat = year + dateSeprator + month + dateSeprator + day;
    }
    return timeFormat;
  }
}
