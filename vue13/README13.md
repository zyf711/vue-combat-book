# 实战：知乎日报项目开发   

日报项目以单页面呈现，基本覆盖了vue和webpack的核心功能，包括：   
+ vue的单文件组件用法   
+ vue的基本指令，自定义指令   
+ 数据的获取，整理，可视化   
+ prop，事件，子组件索引   
+ es6模块   

*注意：写vue的时候a标签里不要再有href了，不然会出现意想不到的问题。*   

跨域问题：   
使用基于nodejs的request库来做代理  
`npm install request --save-dev`    

request 是一个用来简化 HTTP 请求操作的模块   
daily目录下新建proxy.js内容：   
```
const http = require('http');
const request = require('request');

const hostname = '192.168.10.122';
const port = 8010;
const imgPort = 8011;

// 创建一个API 代理服务器
const apiServer = http.createServer((req, res) => {
    const url = 'http://news-at.zhihu.com/api/4' + req.url;
    const options = {
        url: url
    };

    function callback (error, response, body) {
        if (!error && response.statusCode === 200) {
            // 设置编码类型，否则中文会显示为乱码
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            // 设置所有域允许跨域
            res.setHeader('Access-Control-Allow-Origin', '*');
            // 返回代理后的内容
            res.end(body);
        }
    }
  request.get(options, callback);
});

// 监听8010端口
apiServer.listen(port, hostname, () => {
    console.log(`接口代理运行在 http://${hostname}:${port}/`);
});

// 创建一个图片代理服务
const imgServer = http.createServer((req, res) => {
    const url = req.url.split('/img/')[1];
    const options = {
        url: url,
        encoding: null
    };

    function callback (error, response, body) {
        if (!error && response.statusCode === 200) {
            const contentType = response.headers['content-type'];
            res.setHeader('Content-Type', contentType);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(body);
        }
    }
    request.get(options, callback);
});

// 监听8011端口
imgServer.listen(imgPort,hostname,()=>{
  console.log(`图片代理运行在http://${hostname}:${imgPort}/`);
})
```   
Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。   
`npm install axios --save`   

daily\src\libs下新建util.js内容：   
```
import axios from 'axios';
// 基本配置
const Util = {
  imgPath:'http://192.168.10.122:8011/img/';
  apiPath:'http://192.168.10.122:8010/'
}

// ajax通用配置
Util.ajax = axios.create({ //自定义配置新建一个 axios 实例
  baseURL:Util.apiPath
})

// 添加响应拦截器 在响应被 then 或 catch 处理前拦截它们。
Util.ajax.interceptors.response.use(res=>{
  return res.data;
});

export default Util;   
```  
比如在daily\src\app.vue中使用：   
```
import $ from './libs/util';

methods:{
getThemes(){
    //axios发起get请求
    $.ajax.get('themes').then(res =>{
        this.themes = res.others;
    })
}
}
```

使用concurrent 模块实现同时监听执行两条命令   
`npm install concurrently --save-dev`   

然后在package.json里面的 "script" 里面的 "start"写入同时执行语句   
```
"scripts": {
    "dev": "webpack-dev-server --mode development --open --config webpack.config.js",
    "build": "webpack --progress --mode production --hide-modules --config webpack.prod.config.js",
    "start": "concurrently \"npm run dev\" \"node proxy.js\""
  },
  ```   


