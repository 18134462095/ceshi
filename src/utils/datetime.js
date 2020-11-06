/**
 * 时间日期相关操作
 */


/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成 2018/09/23 11:54:16
 * @param datetime 国际化日期格式
 */
export function format (datetime) {
  return formatWithSeperator(datetime, "/", ":");
}

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成类似 2018/09/23 11:54:16
 * 可以指定日期和时间分隔符
 * @param datetime 国际化日期格式
 */
export function formatWithSeperator (datetime, dateSeprator, timeSeprator, zi) {
  if(isiOS && typeof(datetime) != 'number' && typeof(datetime) != 'object'){
    datetime = datetime.substr(0, 19)
  }
  if (datetime != null) {
    let dateMat = new Date(datetime);
    let year = dateMat.getFullYear();
    let month = dateMat.getMonth() + 1;
    month = month < 10 ? '0' + month : month
    let day = dateMat.getDate();
    day = day < 10 ? '0' + day : day
    let hh = dateMat.getHours();
    hh = hh < 10 ? '0' + hh : hh
    let mm = dateMat.getMinutes();
    mm = mm < 10 ? '0' + mm : mm
    let ss = dateMat.getSeconds();
    ss = ss < 10 ? '0' + ss : ss
    let timeFormat
    if(zi){
      timeFormat = year + '年' + month + '月' + day + "日" + " " + hh + timeSeprator + mm + timeSeprator + ss;
    }else{
      timeFormat = year + dateSeprator + month + dateSeprator + day + " " + hh + timeSeprator + mm + timeSeprator + ss;
    }
    return timeFormat;
  }
}
