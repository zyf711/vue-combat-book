<template>
	<div>
		<div>首页</div>
		{{ count }}
		<button @click="handleIncrement">+1</button>
		<button @click="handleDecrease">-10</button>
		<button @click="handleCustom">组件自己定的加多少,这里是+10</button>
		<button @click="handleAsyncIncrement">随机数大于0.5才会2秒后 +1</button>
		<div>{{ list }}</div>
		<div>{{ listCount }}</div>
		<div>通过this.$store.state.moduleA.useName 获取的module.js文件中的数据{{ username }}</div>
		<div>sumCount里count为10，加上count默认是0。初始是10+0的结果：{{ samCount }}</div>
	</div>
</template>
<script>
	export default{
		computed:{
			count(){
				return this.$store.state.count;
			},
			list(){
				return this.$store.getters.filteredList //提交对应getters里的事件名
			},
			listCount(){
				return this.$store.getters.listCount
			},
			username(){
				return this.$store.state.moduleA.useName
			},
			samCount(){
				return this.$store.getters.sumCount
			}
		},
		methods:{
			handleIncrement(){
				this.$store.commit('increment'); //提交对应mutations里的事件名
			},
			handleDecrease(){
				this.$store.commit('decrease');
			},
			handleCustom(){
				this.$store.commit({
					type:'custom', //提交另一种mutations的方式，使用包含type属性的对象
					count:10
				})
			},
			handleAsyncIncrement(){
				this.$store.dispatch('asyncIncrement').then(()=>{
					console.log(this.$store.state.count);
				})
			}
		}
	}
</script>