interface Dates {
    year: number;
    month: number;
    date: number;
    day: string;
    hour: any;
    minute: any;
    second: any;
    all: string;
}

class FormatData {
    constructor() {}
    dateFormat(val: any = "") {
        let datestr: any = new Date();
        if ((val && val != "" ) || (val != "" && typeof val === "string")) {
            datestr = new Date(val);
        }
        const dates: Dates = {
            year: datestr.getFullYear(),
            month: datestr.getMonth() + 1,
            date: datestr.getDate(),
            day: new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[datestr.getDay()],
            hour: datestr.getHours() < 10 ? "0" + datestr.getHours() : datestr.getHours(),
            minute: datestr.getMinutes() < 10 ? "0" + datestr.getMinutes() : datestr.getMinutes(),
            second: datestr.getMinutes() < 10 ? "0" + datestr.getMinutes() : datestr.getMinutes(),
            all: ""
        };
        dates.all = dates.year + "-" + dates.month + "-" + dates.date + " " + dates.hour + ":" + dates.minute + ":" + dates.second;
        return dates;
    }
}

export default new FormatData();