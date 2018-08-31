function isValueNumber(value){
	return ( /(^-?[0-9]+\.{1}\d+$) | (^-?[1-9][0-9]*$) | (^-?0{1}$)/ ).test(value+'');
}

Vue.component('input-number',{
	template:'<div class="input-number">\
	<input type="text" :value="currentValue" @change="handleChange" @keydown="handleKeydown"/>\
	<button @click="handleDown" :disabled="currentValue<=min">-</button>\
	<button @click="handleUp" :disabled="currentValue>=max">+</button>\
	</div>',	
	props:{ //因为是独立组件，所以应该对每个prop进行效验
		max:{
			type:Number,
			default:Infinity
		},
		min:{
			type:Number,
			default:-Infinity
		},
		value:{
			type:Number,
			default:0
		},
		step:{
			type:Number,
			default:1
		}
	},
	data:function(){
		// var val = this.value;
		// if( val > this.max ) val = this.max;
		// if( val < this.min ) val = this.min;
		// return{ currentValue : val }
		return {
			// Vue组件是单向数据流，无法从组件内部直接修改prop，value值。解决办法：给组件声明一个data。默认引用value的值。
			//使得可以从组件内部直接修改prop和value的值。就解决了引用父组件value的问题。
			currentValue:this.value
		}
	},
	watch:{ //用来监听某个prop或data的改变,改变时就会触发里边的函数
		currentValue:function(val){
			this.$emit('input',val); //在使用v-model时改变value的
			this.$emit('on-change',val); //触发自定义事件on-change告知父组件数字输入框的值有所改变，例子中没用到
		},
		value:function(val){
			this.updateValue(val)
		}
	},
	methods:{
		updateValue:function(val){ //过滤出一个正确的currentValue
			if( val > this.max ) val = this.max;
			if( val < this.min ) val = this.min;
			this.currentValue = val
		},
		handleDown:function(){
			if( this.currentValue <= this.min ) return;
			this.currentValue -= this.step
		},
		handleUp:function(){
			if( this.currentValue >= this.max ) return;
			this.currentValue += this.step
		},
		handleKeydown:function(event){
			if(event.keyCode==38){
                this.handleUp();
            }
            if(event.keyCode==40){
                this.handleDown() ;
            }
		},
		handleChange:function(event){ //handleChange绑在了上边的原生change事件上。判断当前输入的是否是数字。
			var val = event.target.value.trim();

			var max = this.max;
			var min = this.min;
			
			if( isValueNumber(val) ){			
				val = Number(val);
				this.currentValue = val;

				if( val > max ){
					this.currentValue = max;
				}else if( val < min ){
					this.currentValue = min;
				}
			}else{
					event.target.value = this.currentValue;
				}
		}
	},
	mounted:function(){ 
	//在mounted钩子里调用updateValue()方法是因为第一次初始化时，也对value进行了过滤。
	// 还有种写法，在data选项里返回对象前进行过滤。参照data里的注释。
		this.updateValue(this.value)
	}
})