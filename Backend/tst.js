import moment from "moment-timezone";


const nowIst = moment().tz('Asia/kolkata')

console.log(nowIst.format('DD-MM-YYYY'))