Vue.component('list',{
	props:{
		list:{
			type:Array,
			default:function(){
				return []
			}
		}
	},
	render:function(h){
		var _this = this;
		var list = [];
		this.list.forEach(function( msg,index ){
			var node = h('div',{
				attrs:{
					class:'list-item'
				}
			},[
				h('span',msg.name + ':'),
				h('div',{
					attrs:{
						class:'list-msg'
					}
				},[
					h('p',msg.message),
					h('a',{
						attrs:{
							class:'list-reply'
						},
						on:{
							click:function(){
								_this.handleReply(index)
							}
						}
					},'回复')
				])
			])
			list.push(node);
		});

		if( this.list.length ){
			return h('div',{
				attrs:{
					class:'list'
				}
			},list);
		}else{
			return h('div',{
				attrs:{
					class:'list-nothing'
				}
			},'留言列表为空')
		}
	},
	methods:{
		// 直接向父组件(app)派发一个事件reply，父组件接收后，将当前list-item的昵称提取，并设置到v-textarea内
		handleReply:function(index){
			this.$emit('reply',index)
		}
	}
})