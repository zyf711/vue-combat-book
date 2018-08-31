const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader'); //vue-loader，15的版本需要再添加plugin的配置
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	//配置的单入口，webpack从index.js开始工作,webpack4默认entry 路径./src/index.js
	// 所以下边的entry可以不写
	// entry:{
	// 	main:'./src/index'
	// },
	output:{//打包后的文件会存储为demo/dist/main.js 在html中引用它就可以了
		path:path.join(__dirname,'./dist'), //打包后文件的输出目录
		publicPath:'/dist/', //指定资源文件引用目录，可以是CDN
		filename:'main.js' //输出文件的名称
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:'vue-loader',
				options:{
					loaders:{
						css:[
							'vue-style-loader',
							'mini-css-extract-plugin',
							'css-loader'
						]
					}
				}
			},
			{
				test: /\.css$/,
				use:[ //数组形式的话，编译是从后往前。
					MiniCssExtractPlugin.loader,
        　　 　　 	'css-loader'
				]
			},
			// {
			// 	test:/\.vue$/,
			// 	loader:'vue-loader',
			// 	options:{
			// 		loaders:{
			// 			css:ExtractTextPlugin.extract({
			// 				use:'css-loader',
			// 				fallback:'vue-style-loader'
			// 			})
			// 		}
			// 	}
			// },
   //          {
   //              test: /\.css$/,
   //              use: ExtractTextPlugin.extract({
   //                  use: 'css-loader',
   //                  fallback: 'style-loader'
   //              })
   //          },
   			// 除非您要自定义 entry point(入口点) ，否则无需指定babel-loader。
			// {
			// 	test:/\.js$/,
			// 	loader:'babel-loader',
			// 	exclude:/node_modules/
			// },
            {
            	test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            	loader:'url-loader?limit=1024' //文件小于1k就以base64形式加载
            }
		]
	},
	plugins:[
		// new ExtractTextPlugin({
		// 	filename:'main.css',//重命名提取后的css文件
		// 	allChunks: true //有了chunk，需要在此配置
		// }), 
		new MiniCssExtractPlugin('main.css'),
		// new ExtractTextPlugin("main.css"), 
		new VueLoaderPlugin() //vue-loader，15的版本需要再添加plugin的配置
	]
};
module.exports = config
//ES6: export default config