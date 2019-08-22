export default {
  config: {
    ApiBaseUri: 'https://oil.hkyx365.com/station/'
  },
  cookie: {
    set(name, value, expireHours) {
      var cookieString = name + "=" + escape(value) + "; path=/";
      //判断是否设置过期时间
      if (expireHours > 0) {
        var date = new Date();
        date.setTime(date.getTime() + expireHours * 3600 * 1000);
        cookieString = cookieString + ";expires=" + date.toGMTString();
      }
      document.cookie = cookieString;
    },
    get(name) {
      var strcookie = document.cookie;
      var arrcookie = strcookie.split("; ");
      for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name) return unescape(arr[1]);
      }
      return null;
    },
    del(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.get(name);
      if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
    }
  },
  format: {
    price(price) {
      return '￥' + (price / 1).toFixed(2);
    },
    time(timeStamp) {
      var minute = 60;// 1分钟
      var hour = 60 * minute;// 1小时
      var day = 24 * hour;// 1天
      var month = 31 * day;// 月
      var year = 12 * month;// 年

      var nowTime = new Date().getTime().toString();
      var diff = nowTime.substr(0, 10) - timeStamp;
      var r = 0;
      if (diff > year) {
        r = Math.floor((diff / year));
        return r + "年前";
      }
      if (diff > month) {
        r = Math.floor((diff / month));
        return r + "个月前";
      }
      if (diff > day) {
        r = Math.floor((diff / day));
        return r + "天前";
      }
      if (diff > hour) {
        r = Math.floor((diff / hour));
        return r + "小时前";
      }
      if (diff > minute) {
        r = Math.floor((diff / minute));
        return r + "分钟前";
      }
      return "0分钟前";
    },
    stampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
};
