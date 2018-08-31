# 第十一章 插件  
## vue-router   
路由：通俗讲就是网址。   
再专业点就是：每次get或者post等请求在服务端有一个专门的正则配置列表，然后匹配到的具体的一条路径后，分发到不同的controller，进行各种操作，最终将html或数据返回给前端，这就完成了一次IO   
大多数的网站都是后端路由，也就是多页面的，这样好处很多，比如页面可以在服务端渲染好直接返回给浏览器，不用等待前端加载任何js和css就可以直接显示网页内容，再比如对seo的友好等。缺点也很明显，就是模板是由后端来维护或改写的。前端需要安装整套后端服务，必要时还要学非前端语言来改写html结构，所以html和数据逻辑混为一谈，维护起来臃肿麻烦。然后就有了前后端分离的开发模式。后端只提供api来返回数据，前端通过ajax获取数据后，在用一定方式渲染到页面里。nodejs出现后，html模板可以完全由前端来控制，同步或异步渲染完全由前端决定。   

SPA：前后端分离的基础上，加一层前端路由。   

前端路由，即由前端来维护一个路由规则。实现有两种，一种是利用url的hash，就是常说的锚点，js通过hashChange事件来监听url的改变，ie7及以下需要用轮询。另一种就是html5的History模式，他使url看起来像普通的网站那样，以右斜杠分隔，没有#，但页面并没有跳转。这种模式需要服务器支持，服务器在接收到所有请求后，都指向同一个html文件，不然会出现404。因此，SPA只有一个html，整个网站所有内容都在一个html里。通过js处理。   

如果要独立开发一个前端路由，需要考虑到页面的可插拔，页面的生命周期，内存管理等问题。   

路由不同页面事实上就是动态加载不同的组件。vue-router  
`npm install --save vue-router`   

在main.js（已经改成src里的index.js)里使用Vue.use()加载插件：   
```
import VueRouter from 'vue-router';
Vue.use(VueRouter);
```   

index.js里完成路由的配置，新建数组来制定路由匹配列表，每个路由映射一个组件，如：  
```
const Routers = [
	{
		path:'/index',
		meta:{
			title:'首页'
		},
		//resolve在请求页面时，才去加载这个页面的js。异步实现懒加载。 使用了异步路由后，编译出的每个页面的js都叫chunk(块)
		//如要一次性加载，可以： component:require('.views/index.vue')
		component:(resolve) => require(['./views/index.vue'],resolve) 		
	},
	{
		path:'/about',
		meta:{
			title:'关于'
		},
		component:(resolve) => require(['./views/about.vue'],resolve)
	},
	{
		path:'/user/:id',
		meta:{
			title:'个人主页'
		},
		component:(resolve) => require(['./views/user.vue'],resolve)
	},
	// 当访问的路径不存在，重新定向到首页
	{
		path:'*',
		redirect:'/index'
	}

]  

new Vue({
    el: '#app',
    router:router,
    render: h => {
        return h(App);
    }
})
```   

>小知识：es6中，const用于声明常量，也就是声明后不能再修改。   

每个页面对应一个组件，也就是对应一个.vue文件。index.js里继续配置：   
```
const RouterConfig = {
	mode:'history', //使用html5的History模式
	routes:Routers
};

const router = new VueRouter(RouterConfig);   
```
使用html5的History模式时，在生产环境服务端必须进行配置，将所有路由都指向同一html，或设置404页面为该html，否则刷新时页面会出404
webpack-dev-server也要配置下来支持history路由，在package.json中修改dev命令。增加--history-api-fallback 所有路由都会指向index.html：  
`"dev": "webpack-dev-server --host 192.168.10.122 --mode development --history-api-fallback --open --config webpack.config.js"`   

之后要在根实例里添加router-view来挂载所有组件。   
router-view会根据当前路由动态渲染不同的页面组件，公共组件比如顶部导航，底部版权信息等，可以直接和router-view同级   
这个例子就是在app.vue里添加：   
```
<template>
	<div>
		<div>导航</div>
		<router-view></router-view>
		<div>底部</div>
	</div>
</template>
```   
跳转：vue-router有两种跳转页面方法，第一种使用内置的router-link组件，他会被渲染成一个a标签。在html5的history模式下会拦截点击，避免浏览器重新加载页面。另一种使用router实例方法。this.$router.push('/user/123')  

```
router.beforeEach((to,from,next) => { //参数：即将要进入的目标的路由对象，当前导航即将要离开的路由对象，调用该方法后才能进入下一个钩子。
	window.document.title = to.meta.title;
	next();  //调用该方法后，才能进入下一个钩子。
});
```   
*注意:因mini-css-extract-plugin将多个css chunk合并成一个css文件出问题，webpack.config.js中用回了extract-text-webpack-plugin*   

## Vuex   

Vuex所解决问题与bus类似，作为vue的一个插件来使用。可以更好的管理和维护整个项目的组件状态。   

一个组件可以分为数据和视图。数据更新时，视图也自动更新，在视图中又可以绑定一些事件，他们触发methods里指定的方法，从而可以改变数据，更新视图，这是一个组件基本运行模式。    
数据方法只有在组件里可以访问和使用，其他组件无法读取和修改。想跨组件共享数据，因此vuex的设计就是用来统一管理组件状态的。它定义了一系列规范来使用和操作数据，使组件应用更高效。   

vuex主要使用场景是大型单页面应用，更适合多人协同开发。如果项目部复杂，或者希望短期见效，也许用bus方法就能很简单解决问题。   
bus已经可以很好解决跨组件通信，但他在数据管理，维护，架构设计上海只是一个简单组件。而vuex却能更优雅和高效的完成状态管理。   

`npm install --save vuex`   

index.js里完成路由的配置:  

```
import Vuex from 'vuex';
Vue.use(Vuex);

new Vue({
    el: '#app',
    router:router,
    store:store,
    render: h => {
        return h(App);
    }
})
```   
仓库store包含了应用的数据和操作过程。vuex里的数据都是响应式的。任何组件使用同一store的数据时，只要store的数据变化，对应组件会立即更新。   
new Vuex.Store有五个参数：state mutations actions getters modules  
完整vuex代码：   
```
import Vue from 'vue'; 
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';
import moduleA from './moduleA' //vuex中modules分割出的模块

Vue.use(VueRouter)
Vue.use(Vuex)

const Routers = [
	{
		path:'/index',
		meta:{
			title:'首页'
		},
		component:(resolve) => require(['./views/index.vue'],resolve)
	},
	{
		path:'/about',
		meta:{
			title:'关于'
		},
		component:(resolve) => require(['./views/about.vue'],resolve)
	},
	{
		path:'/user/:id',
		meta:{
			title:'个人主页'
		},
		component:(resolve) => require(['./views/user.vue'],resolve)
	},
	{
		path:'*',
		redirect:'/index'
	}
];

const router = new VueRouter({
	mode:'history',
	routes: Routers
});


router.beforeEach((to,from,next)=>{
	window.document.title = to.meta.title;
	next();
})

const store = new Vuex.Store({
	modules:{ moduleA:moduleA }, // 项目足够大，store内容过多时，modules把store里内容写到不同文件中
	state:{ //数据保存在state字段内
		count:0, //任何组件通过this.$store.state.count读取
		list:[1,5,8,10,30,50]
	},
	mutations:{ //mutations改变state字段数据唯一途径
		increment(state){
			state.count ++ ; //任何组件通过this.$store.commit('increment')提交事件名
		},
		decrease(state,n=10){// mutations可以接受第二个参数，数字，字符串或对象等类型
			state.count -= n;
		},
		custom(state,params){
			state.count += params.count;
		}
	},
	actions:{ //actions提交的是mutations
		//涉及改变数据的就用mutations，存在业务逻辑的就用actions,actions可以异步操作业务逻辑。
		asyncIncrement(context){  //任何组件this.$store.dispatch('asyncIncrement')触发
			return new Promise((resolve,reject) => { //Promise在2秒后提交mutations
				setTimeout(()=>{
					const random = Math.random();
					if( random >.5 ){
						context.commit('increment');
						console.log(random)
						resolve();
					}else{
						reject(random)
					}
				},2000)
			});
		}
	},
	getters:{
		filteredList:state => {
			return state.list.filter(item => item < 10); //任何组件通过this.$store.getters.filteredList提交事件名
		},
		listCount:(state,getters) => {
			return getters.filteredList.length;
		}
	}
})

new Vue({
    el: '#app',
    router:router,
    store:store,
    render: h => {
        return h(App);
    }
});
```   
moduleA.js内容：   
```
const state = {
  useName: "sam", // 模块内部的state是局部的，所以任何组件通过this.$store.state.moduleA.useName读取
  count:10
};
const getters ={ //模块内部getter、mutation和action，仍然注册在全局命名空间内
	sumCount(state,getters,rootState){
		return state.count + rootState.count
	}
}
export default {
	state,
	getters
}
```   

## vue-bus   
封装一个bus插件，可以在所有组件间随意使用，而不需要每个组件都导入bus:   
```
const install = function(Vue){
	const Bus = new Vue({
		methods:{
			emit(event,...args){ //...args。因为不知道组件会传递多少个参数进来，使用...args可以把从当前参数到最后的参数都获取
				this.$emit(event,...args);
			},
			on(event,callback){
				this.$on(event,callback);
			},
			off(event,callback){
				this.$off(event,callback);
			}
		}
	});
	Vue.prototype.$bus = Bus;
};

export default install;
```  
在indxe.js中使用插件：   
```
import VueBus from './vue-bus';
Vue.use(VueBus);
```   
之后比如在index.vue中使用组件并监听来自Counter.vue的自定义事件，部分代码：  
Counter.vue里 `this.$bus.emit('add',num);`   

index.vue里因为是监听counter，所以要引入：   
```
import Counter from './Counter.vue'  

methods:{
	handleAddRandom(num){
		this.number += num;
	}
}

created(){
	this.$bus.on('add',this.handleAddRandom);
},
beforeDestroy(){
	this.$bus.off('add',this.handleAddRandom);
}
```  
使用vue-bus两点需要注意：   
$bus.on应该在created钩子内使用，如果在mounted使用，他可能接收不到其他组件来自created钩子内发出的事件。   
使用了$bus.on，在beforeDestroy钩子里应该再使用$bus.off解除。因为组件销毁后，就没必要把监听的句柄存在vue-bus里了。