const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader'); //vue-loader，15的版本需要再添加plugin的配置
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
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
	// optimization: {
	//     splitChunks: {
	//       cacheGroups: {
	//         styles: {            
	//           name: 'main',
	//           test: /\.css$/,
	//           chunks: 'all',    // merge all the css chunk to one file
	//           enforce: true
	//         }
	//       }
	//     }
	//   },
	plugins:[
		new ExtractTextPlugin({
			filename:'main.css',//重命名提取后的css文件
			allChunks: true //有了chunk，需要在此配置
		}), 
		// new MiniCssExtractPlugin({
		// 	filename:'main.css',
		// }),
		new VueLoaderPlugin() //vue-loader，15的版本需要再添加plugin的配置
	],
	module:{
		rules:[
			// {
			// 	test:/\.vue$/,
			// 	loader:'vue-loader',
			// 	options:{
			// 		loaders:{
			// 			css:[
			// 				'vue-style-loader',
			// 				'mini-css-extract-plugin',
			// 				'css-loader'
			// 			]
			// 		}
			// 	}
			// },
			// {
			// 	test: /\.css$/,
			// 	use:[ //数组形式的话，编译是从后往前。
			// 		MiniCssExtractPlugin.loader,
   //      　　 　　 	'css-loader'
			// 	]
			// },
			{
				test:/\.vue$/,
				loader:'vue-loader',
				options:{
					loaders:{
						css:ExtractTextPlugin.extract({
							use:'css-loader',
							fallback:'vue-style-loader'
						})
					}
				}
			},
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
            	test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            	loader:'url-loader?limit=1024' 
            }
		]
	}

};
