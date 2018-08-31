Vue.component('pane',{
	name:'pane', //为getTabs()遍历所有name为pane的子组件做准备，所以这里起个name
	template:'<div class="pane" v-show="sw">\
	<slot></slot>\
	</div>',//上边的slot是为了能显示<pane></pane>标签里边的内容。
	data:function(){ 
		return { sw:true }
	},
	props:{
		name:{ //pane的标识
			type:String
		},
		label:{ //标签页标题
			type:String,
			default:'as'
		}
	},
	methods:{
		updateNav(){
			this.$parent.updateNav();
		}
	},
	watch:{
		label(){
			this.updateNav();
		}
	},
	mounted(){
		this.updateNav();
	}
})