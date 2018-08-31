var app = new Vue({
	el:'#app',
	data:{
		show:false
	},
	methods:{
		handleClose:function(){
			this.show = false
		}
	}
})