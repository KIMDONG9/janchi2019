function returndate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1
    var day = date.getDate();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (minute < 10){
        minute = "0" + minute;
    }
    if (seconds <10){
        seconds= "0"+seconds;
    }
    var today = year + "" + month + "" + day+""+minute+""+seconds;
    return today;
}

