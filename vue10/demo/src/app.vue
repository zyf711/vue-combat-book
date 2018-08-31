<!-- 可以用jade写 <template lang="jade"></template> -->
<template>
	<div>
		<v-title title="Vue组件化"></v-title>
		<v-button @click="handleClick">点击按钮</v-button>
		<p>
			<img src="./images/image.png" style="width:200px;" alt="">
		</p>
	</div>
	
</template>
<script>
	// 导入组件
	import vTitle from './title.vue';
	import vButton from './button.vue';

	export default{
		components:{
			vTitle,
			vButton
		},
		methods:{
			handleClick(e){
				console.log(e);
			}
		}
	}
</script>
<!-- scoped表示当前css只在这个组件里有效 在chrome调试工具会看到元素上有一窜串内容，就是因为有scoped-->
<!-- 可结合预编译一起使用，比如less -->
<!-- <style lang="less"></style> -->
<style scoped>
	div{
		color:red;
		font-size: 24px;
	}
</style>