Vue.directive('clickoutside',{
	//bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
	bind:function( el,binding,vnode ){ 
		function documentHandler(e){
			// 判断点击的区域是否在指令所载元素内部，是就跳出。el是指令所绑定的元素
			if( el.contains(e.target) ){ //contains方法用来判断A是否包含B，包含返回true
				return false;
			}
			if( binding.expression ){ //判断当前指令v-clickoutside有没有写表达式
				binding.value(e); //执行当前上下文methods中指定的函数handleClose
			}
		}
		//__vueClickOutside__ 是自己随便起的，el.__vueClickOutside__ 引用了documentHandler,这样就可以再后边移除监听事件
		el.__vueClickOutside__ = documentHandler; 
		document.addEventListener('click',documentHandler);	
	},
	unbind:function( el,binding ){
		document.removeEventListener('click',el.__vueClickOutside__)
		// 移除document的click事件监听。
		delete el.__vueClickOutside__;
	}

})