<template>
	<div>
		<h1>首页</h1>
		<div>{{ count }}</div>
		<button @click="handleIncrement">+10</button>
		<button @click="handleDecrease">-1</button>
		<div>{{ list }}</div>
		<div>{{ listCount }}</div>
		<button @click="handleAsyncIncrement">async +10</button>
	</div>
</template>
<script>
	export default{
		computed:{
			count(){
				return this.$store.state.count;
			},
			list(){
				return this.$store.getters.filteredList;
			},
			listCount(){
				return this.$store.getters.listCount;
			}
		},
		methods:{
			handleIncrement(){
				// 通过this.$store.commit方法来执行main.js里vuex对应的mutations完成逻辑业务
				this.$store.commit('increment')
			},
			handleDecrease(){
				this.$store.commit('decrease')
				// mutation的另一种方式是直接使用包含type属性的对象，如：
				// this.$store.commit({type:'decrease'})
			},
			handleAsyncIncrement(){
				this.$store.dispatch('asyncIncrement').then(()=>{ //actions在组件内通过$store.dispatch触发
					console.log(this.$store.state.count)
				})
			}
		}
	}
</script>