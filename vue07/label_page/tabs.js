Vue.component('tabs',{
	template:'<div class="tabs">\
	<div class="tabs-bar">\
	<div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)">{{item.label}}</div>\
	</div>\
	<div class="tabs-content">\
	<slot></slot>\
	</div>\
	</div>',  //上边的slot是嵌套的pane
	props:{
		// 这里value为了可以使用v-model
		value:{
			type:[String,Number]
		}
	},
	data:function(){
		return {			
			currentValue:this.value, // 因为不能修改value，所以复制一份自己维护
			navList:[] //用于渲染tabs的标题
		}
	},
	methods:{
		tabCls:function(item){
			return [
				'tabs-tab',
				{
					// 给当前选中的tab,也就是item.name === this.currentValue为true的加一个class
					// 运算优先级=== 高于 条件: 
					// 运算符优先级https://www.cnblogs.com/yy-hh/p/4624792.html
					'tabs-tab-active':item.name === this.currentValue
				}
			]
		},
		getTabs(){ // 通过遍历子组件，得到所有的pane组件	
			return this.$children.filter(function(item){
				return item.$options.name === 'pane'
			});
		},
		updateNav(){ //更新标题
			this.navList = [];
			var _this = this;
			// 把pane的label和name提取出来，构成一个object并添加到数组navList里，后面会在template里用到
			this.getTabs().forEach(function( pane,index ){ 
				_this.navList.push({
					label:pane.label,
					name:pane.name || index
				});
				// 如果没给pane设置name，(比如没给activeKey1设置初始选中哪个)默认设置它的索引
				if( !pane.name ) pane.name = index;
					// 设置当前选中的tab的索引，在此就是默认第一个显示
					if( index === 0 ){
						if( !_this.currentValue ){
							_this.currentValue = pane.name || index;
						}
					}
			});
			this.updateStatus()
		},
		updateStatus(){ // 显示当前选中的tab对应的pane组件，隐藏没选中的		
			var tabs = this.getTabs();
			var _this = this;
			tabs.forEach(function (tab){
				// 这里是对所有pane里边的sw判断是true还是false
				// 运算优先级=== 高于=  先判断tab.name === _this.currentValue 是true还是false，再赋值给tab.sw
				return tab.sw = tab.name === _this.currentValue; 
			})
		},
		handleChange:function(index){ //点击tab标题时触发
			var nav = this.navList[index];
			var name = nav.name;
			// 改变当前选中的tab，并触发下面的watch
			this.currentValue = name;
			// 更新value
			this.$emit('input',name);
			// 触发一个自定义事件，供父级使用
			this.$emit('on-click',name);
		}
		},
		watch:{
			value:function(val){
				this.currentValue = val;
			},
			currentValue:function(){
				// 在当前选中的tab发生变化时，更新pane的显示状态
				this.updateStatus()
			}
		}
})