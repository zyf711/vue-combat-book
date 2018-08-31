# 相关开源项目介绍   

### 服务端渲染与Nuxt.js
Vue.js2支持服务端渲染。   
服务端渲染（SSR）：指的是渲染内容。打开页面，查看源代码。文字都在源代码里面，就是SSR。或chrome的network面板查看有没有相关异步请求来调取内容来判断。  

很多网站之所以用SSR，主要目的是做SEO。另一个目的是客户端的网络可能不稳定，通过SSR减少请求量和客户端渲染。可以相对快速看到内容。  

Nuxt.js:基于Vue.js的通用应用框架。为Node.js做Vue的服务端渲染提供了各种配置。快速搭建一套SSR框架。
Nuxt.js构建的代码，UI在服务端渲染。查看代码所有模板内容直接渲染在其中。   
[Vue.js服务端渲染](https://ssr.vuejs.org/)   
[Nuxt.js文档](https://nuxtjs.org/)  

### HTTP库axios
[项目地址](https://github.com/mzabriskie/axios)  
axios是一个基于Promise，同时支持浏览器端和Node.js的HTTP库。常用语Ajax请求。  

### 多语言插件 vue-i18n  
[项目地址](https://gitbub.com/kazupon/vue-i18n)  
vue-i18n是一个vue.js插件。提供了都语言解决方案。如果你的项目有多国语言的需求，可以使用它很快地实现。
