<template>
	<div>
	<p>介绍页</p>
	<button @click="handleRouter">跳转到user</button>
	</div>
</template>
<script>
	export default{
		methods:{
			handleRouter:function(){
				this.$router.push('/user/123')
			}
		}
	}
</script>