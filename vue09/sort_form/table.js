Vue.component('vTable',{
	props:{
		columns:{ //描述每列的信息，并渲染在表头<thead>内
			type:Array,
			default:function(){
				return []
			}
		},
		data:{ //每一行的数据，由columns决定每一行里的各列排序。
			type:Array,
			default:function(){
				return []
			}
		}
	},
	// 为了排序后不影响原始数组，data里添加两个对应数据，组件操作在对应数据。不对原始数据做处理
	data:function(){
		return {
			currentColumns:[],
			currentData:[]
		}
	},
		// 用render构造虚拟DOM
		// 表格最外层<table>元素，里面包含<thead>表头和<tbody>表格主体。
		// thead是一行多列(一个tr多个th)。 tbody是多行多列(多个tr多个td)
	render:function(h){ //h就是createElement,只是换了个名称
		var _this = this;
		var ths = [];
		this.currentColumns.forEach(function(col,index){
			if( col.sortable ){
				ths.push(h('th',[
						h('span',col.title),
						// 升序
						h('a',{
							class:{
								on:col._sortType === 'asc'
							},
							on:{
								click:function(){
									_this.handleSortByAsc(index)
								}
							}
						},'↑'),
						// 降序
						h('a',{
							class:{
								on:col._sortType === 'desc'
							},
							on:{
								click:function(){
									_this.handleSortByDesc(index)
								}
							}
						},'↓')
					]))
			}else{
				ths.push(h('th',col.title))
			}
		});

		var trs = [];
		// 先遍历所有行，然后在每一行内再遍历各列
		this.currentData.forEach(function(row){
			var tds = [];
			_this.currentColumns.forEach(function(cell){
				tds.push(h('td',row[cell.key]));
			});
			trs.push(h('tr',tds));
		});

		return h('table',[
				h('thead',[
						h('tr',ths)
					]),
				h('tbody',trs)
			])
	},
	methods:{
		// 把columns赋值给currentColumns
		makeColumns:function(){
			this.currentColumns = this.columns.map(function( col,index ){
				// 添加一个字段标识当前列排序的状态,赋值normal表示默认排序，就是不排序。
				col._sortType = 'normal';
				// 添加一个字段标识当前列在数组中的索引
				col._index = index;
				return col;
			})
		},
		// 把data赋值给currentData
		makeData:function(){
			this.currentData = this.data.map(function( row,index ){
				// 添加一个字段标识当前行在数组中的索引
				row._index = index;
				return row;
			})
		},
		// 升序操作 由小到大
		handleSortByAsc:function(index){
			var key = this.currentColumns[index].key;
			//排序前先将所有列的排序状态重置为normal
			this.currentColumns.forEach(function(col){
				col._sortType = 'normal'; 
			});
			// 设置当前列的排序状态为asc，对应到<a>元素的class名称on
			this.currentColumns[index]._sortType = 'asc';
			this.currentData.sort(function(a,b){
				return a[key] > b[key] ? 1 : -1;
				// return a[key] - b[key]
			});
		},
		// 降序操作 由大到小
		handleSortByDesc:function(index){
			var key = this.currentColumns[index].key;
			this.currentColumns.forEach(function(col){
				col._sortType = 'normal';
			});
			this.currentColumns[index]._sortType = 'desc';
			this.currentData.sort(function(a,b){
				return a[key] < b[key] ? 1 : -1;
				// return b[key] - a[key]
			});
		}
	},
	//渲染完表格后，父级修改了data数据，比如增加，v-table的currentData也应该更新
	//如果某列已存在排序，应该直接处理一次排序。
	watch:{
		data:function(){
			this.makeData();
			var sortedColumn = this.currentColumns.filter(function(col){
				return col._sortType !== 'normal'; //返回排序的数组
			});
			if( sortedColumn.length ){ //如果有进行过排序
				if( sortedColumn[0]._sortType === 'asc' ){
					this.handleSortByAsc(sortedColumn[0]._index);
				}else{
					this.handleSortByDesc(sortedColumn[0]._index);
				}
			}
		}
	},
	mounted(){
		//v-table初始化时调用
		this.makeColumns();
		this.makeData();
	}
})