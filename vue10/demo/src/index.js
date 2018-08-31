// import './style.css'
// document.getElementById('app').innerHTML = 'hello webpack'

import Vue from 'vue'; //导入vue框架
import App from './app.vue'; //导入app.vue组件

new Vue({
    el: '#app',
    render: h => {
        return h(App);
    }

    // 以上还能写为：
    // render:function(h){
    // 	return h(App)
    // }

    // render:h => h(App)
});
