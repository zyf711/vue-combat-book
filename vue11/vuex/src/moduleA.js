const state = {
  useName: "sam", // 模块内部的state是局部的，所以任何组件通过this.$store.state.moduleA.useName读取
  count:10
};
const getters ={ //模块内部getter、mutation和action，仍然注册在全局命名空间内
	sumCount(state,getters,rootState){
		return state.count + rootState.count
	}
}
export default {
	state,
	getters
}