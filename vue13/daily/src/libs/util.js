import axios from 'axios';
// 基本配置
const Util = {
	imgPath:'http://127.0.0.1:8011/img/',
	apiPath:'http://127.0.0.1:8010/'
}

// ajax通用配置
Util.ajax = axios.create({ //自定义配置新建一个 axios 实例
	baseURL:Util.apiPath
})

// 添加响应拦截器 在响应被 then 或 catch 处理前拦截它们。
Util.ajax.interceptors.response.use(res=>{
	return res.data;
});

// 获取今天的时间戳
Util.getTodayTime = function () {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
};

//获取今天日期 。但在推荐列表api里日期要比真实日期多一天。所以获取今天就要加86400000
Util.prevDay = function (timestamp = (new Date()).getTime()) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10
        ? '0' + date.getDate()
        : date.getDate();
    return year + '' + month + '' + day;
};

export default Util;