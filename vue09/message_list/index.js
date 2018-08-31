var app = new Vue({
	el:'#app',
	data:{
		username:'',
		message:'',
		list:[]
	},
	methods:{
		// 给list添加一条留言数据
		handleSend:function(){
			if( this.username === '' ){ window.alert('请输入昵称'); return }
			if( this.message === '' ){ window.alert('请输入留言内容'); return }
			this.list.push({
				name:this.username,
				message:this.message
			});
			this.message = '';
		},
		handleReply:function(index){
			var name = this.list[index].name;
			this.message = '@回复' + name + ':';
			// $refs不是响应式的，不应该用它绑定数据。只是方便取和操作DOM
			// $refs讲解  https://www.cnblogs.com/xumqfaith/p/7743387.html
			this.$refs.message.focus();
		}
	}
})