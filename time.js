let Time = {
    getUnix: function () {
        let date = new Date();
        return date.getTime();
    },
    //获取今天0点0分0秒的时间戳
    getTodayUnix: function(){
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获取今年1月1日0点0分0秒的时间戳
    getYearUnix: function(){
        let date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获取标准的年月日
    getLastDate: function(time){
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() > 9 ? date.getMonth(): '0' + date.getMonth();
        let day = date.getDate() > 9 ? date.getDate(): '0' + date.getDate();
        return year + '-' + month + '-' + day;
    },
    //转换时间
    getFormatTime: function(timestamp){
        let now = this.getUnix(); //获取当前时间戳
        let today = this.getTodayUnix();//获取今天0点的时间戳
        let year = this.getYearUnix();//获取今年的时间戳
        let timer = (now - timestamp) / 1000;//转换为秒
        let tip = '';
        if(timer <= 0){
            tip = '刚刚';
        }else if(Math.floor(timer / 60) <= 0){
            tip = '刚刚';
        }else if(timer / 3600 < 1){
            tip = Math.floor(timer / 60) + '分钟前';
        }else if(timestamp >=  today){
            tip = Math.floor(timer / 3600) + '小时前';
        }else if(timer  / (3600 * 24) <= 31){
            tip = Math.ceil(timer / (3600 * 24)) + '天前';
        }else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }
};
Vue.directive("time", {
    bind: function(el, binding){
        el.innerHTML = Time.getFormatTime(binding.value);
        el._timeOut_ = setInterval(function(){
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 60000);
    },
    unbind: function (el){
        clearInterval(el._timeOut_);
        delete el._timeOut_;
    }
});