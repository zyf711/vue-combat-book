import Vue from 'vue'; //导入vue框架
import VueRouter from 'vue-router';
import App from './app.vue'; //导入app.vue组件

Vue.use(VueRouter)

const Routers = [
		//resolve在请求页面时，才去加载这个页面的js。异步实现懒加载。 使用了异步路由后，编译出的每个页面的js都叫chunk(块)
		//如要一次性加载，可以： component:require('.views/index.vue')
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
	// 当访问的路径不存在，重新定向到首页
	{
		path:'*',
		redirect:'/index'
	}
];

const router = new VueRouter({
	//使用html的History路由模式
	mode:'history',
	routes: Routers
});


router.beforeEach((to,from,next)=>{
	//参数：即将要进入的目标的路由对象，当前导航即将要离开的路由对象，调用该方法后才能进入下一个钩子。
	window.document.title = to.meta.title;
	next(); //调用该方法才能进入下一个钩子
})

new Vue({
    el: '#app',
    router:router,
    render: h => {
        return h(App);
    }
});
