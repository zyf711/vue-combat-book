<template>
	<div class="abc">{{ $route.params.id }}</div>
</template>
<script>
	export default{
		mounted(){
			console.log(this.$route)
		}
	}
</script>
<style scoped>
	.abc{
		color:green;
		font-size: 24px;
	}
</style>