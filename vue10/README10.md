# 第十章：使用webpack
+ js应用程序的模块打包工具
+ 主要使用场景是单页面富应用(SPA)，SPA通常是一个html文件和一堆按需加载的js组成。
+ webpack只不过是一个js配置文件，掌握四点：入口entry 出口output 加载器loaders 插件plugins 入口和出口webpack4可以不定义了
+ ES6中的export和import用来导出和导入模块。
+ 装nodejs之后windows系统用 win+R cmd 、Powershell、Git Bash等打开  
+ 书中用的是webpack2，目前最新的是4.x所以有些插件需要调试改变才行，不能直接用。   
> 小知识：cmd里输入node可以进入开发模式 输入.exit退出开发者模式。在开发者模式里可以写js，比如`var a = 1;var b = 2;a+b`就会出3

到d盘 git bash里是cd d:或cd /d/ cmd里直接d:

新建文件夹vue_combat

*cd\ 调回根目录  cd..调回到上一级目录  
屏幕内容太多，清屏：cls*

```
d:
mkdir vue_combat
cd vue_combat
mkdir demo
cd demo
npm init
```
初始化配置，一路回车即可。完成后会在demo目录生成package.json

本地局部安装webpack:

`npm install webpack --save-dev`

>小知识：
--save-dev安装的时候会在package.json文件中的devDependencies属性添加模块，这个属性就是开发时依赖的包。只有--save安装的时候会在package.json文件中的dependencies属性添加模块，这个属性就是发布时依赖的包。比如：如果你想把ES6编译成ES5,就用到了babel，那么 就是devDependencies,发布的时候不需要再用babel了，因为打包后就是已经编译出来的ES5代码。如果用了VUE，正式上线，投入使用的时候还是要用到VUE，所以是dependencies。

全局装webpack卸载就把install换成uninstall,更新就是updat

`npm install webpack -g`

cnpm代替npm:

`npm install cnpm -g --registry=https://registry.npm.taobao.org`

cnpm安装过程中提示optional install error: Package require os(darwin) not compatible with your platform(win32)解决方法：

`cnpm rebuild node-sass`

`cnpm install`

或者：

`npm config set registry https://registry.npm.taobao.org`

之后还是npm install

装webpack-dev-server 他可以在开发环境提供很多服务，比如启动一个服务器，热更新，接口代理等。

`npm install webpack-dev-server --save-dev`             

在demo文件夹下创建一个webpack.config.js文件。之后装的加载器一般都要在这里配置下。
```
var config = {

};
module.exports = config
//ES6: export default config
```  

在package.json的scripts里加一个快速启动：   

`"dev": "webpack-dev-server --mode development --open --config webpack.config.js"`   

--open是自动打开浏览器，默认地址是127.0.0.1:8080 --config是指向读取的配置文件路径。
--mode development是设置为开发模式

局域网下看本机ip，改好后可以手机访问。其中ip和端口是可以配置的：

`"dev": "webpack-dev-server --host 192.168.10.122 --port 8080 --open --config webpack.config.js"`

在demo下新建一个src文件夹，里边创建index.js作为入口文件,在webpack.config.js中进行入口entry和输出output的配置。  
**注意：书中是直接在demo下新建main.js文件，示例代码都会把main.js替换为src文件夹的index.js**   
```
var path = require('path');
var config = {
	//配置的单入口，webpack从index.js开始工作,webpack4默认entry 路径./src/index.js
	// 所以下边的entry可以不写
	// entry:{
	// 	main:'./src/index'
	// },
	output:{//打包后的文件会存储为demo/dist/main.js 在html中引用它就可以了
		path:path.join(__dirname,'./dist'), //打包后文件的输出目录
		publicPath:'/dist/', //指定资源文件引用目录，可以是CDN
		filename:'main.js' //输出文件的名称
	}
};
module.exports = config
//ES6: export default config
```   

在demo下新建一个index.html文件作为spa的入口。 npm run dev就会自动打开页面了。   
**注意：按书中操作会提示找不到module webpack-cli/bin/config-yargs 要装下cli**  
`npm install webpack-cli`

webpack世界里每个文件都是一个模块，不同的模块需要不同的加载器(Loaders)来处理。写css用到：  
```
npm install css-loader --save-dev
npm install style-loader --save-dev
```  

安装完在webpack.config.js里配置：   
```
module:{
rules:[
{
    test: /\.css$/,
    use:[ //数组形式的话，编译是从后往前。
        'style-loader',
        'css-loader'
    ]
}
]
}
```  

在src文件夹下新建style.css，写内容。在main.js里导入：`import './style.css'`  

样式都是通过js创建出来的。要使用插件把散落在各地的css提取出来，并生成一个main.css文件（都要在webpack.config.js里配置），最终在index.html里通过link形式加载。  
`npm install extract-text-webpack-plugin@next --save-dev`  

*书里的插件版本已经不支持webpack4，所以要用插件后边带个@next的版本。*  

配置webpack.config.js：  
```
var ExtractTextPlugin = require('extract-text-webpack-plugin');

{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'style-loader'
    })
}
plugins:[
    new ExtractTextPlugin({
        filename:'main.css',//重命名提取后的css文件
        allChunks: true
    })
]
```   
或者用另一个插件直接支持webpack4，实现：`npm install mini-css-extract-plugin --save-dev`  
```
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

{
	test: /\.css$/,
	use:[ //数组形式的话，编译是从后往前。
		MiniCssExtractPlugin.loader,
	　　 　　"css-loader"
	]
}
plugins:[
	new MiniCssExtractPlugin('main.css')
]
```   

一个.vue文件一般包含三部分template,script,style。使用.vue文件需要先安装vue-loader,vue-style-loader等加载器并做配置，要使用ES6语法，还要装babel和babel-loader等加载器。

```
npm install --save vue
npm install --save-dev vue-loader
npm install --save-dev vue-style-loader
npm install --save-dev vue-template-compiler
npm install --save-dev vue-hot-reload-api
npm install --save-dev babel
npm install --save-dev babel-loader
npm install --save-dev babel-core
npm install --save-dev babel-plugin-transform-runtime
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-runtime
```

*注意:vue-loader需要在webpack.config.js配置里写入vueloadpluin*  
~~npm install --save-dev babel~~ 已换成npm install --save-dev babel-cli  
~~npm install --save-dev babel-preset-es2015~~已换成npm install --save-dev babel-preset-env

在demo目录下用编辑器新建一个名为.babelrc的文件（没有文件名）。写入babel的配置，webpack会依赖此配置文件来使用babel编译ES6:   
```
{
	"presets":["es2015"], （这里要把es2015换成env）
	"plugins":["transform-runtime"],
	"comments":false
}
```   
配置webpack.config.js来支持对.vue文件和es6的解析：   

```
const { VueLoaderPlugin } = require('vue-loader'); 
//vue-loader，15的版本需要再添加plugin的配置

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
// 除非您要自定义 entry point(入口点) ，否则无需指定babel-loader。
// {
// 	test:/\.js$/,
// 	loader:'babel-loader',
// 	exclude:/node_modules/
// }
```   
安装url-loader和file-loader来支持图片字体等:   
```
npm install --save-dev url-loader 
npm install --save-dev file-loader
```   
本章最后开发环境配置：  
```
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
		new MiniCssExtractPlugin('main.css'),
		// new ExtractTextPlugin("main.css"), 
		new VueLoaderPlugin() //vue-loader，15的版本需要再添加plugin的配置
	]
};
module.exports = config
//ES6: export default config
```   
到生产环境时打包需要用到：   
```
npm install --save-dev webpack-merge
npm install --save-dev html-webpack-plugin 
```  
webpack-merge用于合并两个webpack文件，方便写生产环境的配置文件  
html-webpack-plugin用来生成html文件，通过template选项来读取指定的模板index.ejs   

为了方便开发和生产环境的切换,demo下新建一个生产环境的配置文件webpack.prod.config.js
在package.json中再加一个build的快捷脚本用来打开:   
`"build": "webpack --progress --mode production --hide-modules --config webpack.prod.config.js"`   

```
webpack.prod.config.js配置文件：  

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');

webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig,{
	output:{
		publicPath:'/dist/',
		filename:'[name].[hash].js'
	},
	plugins:[
		// new ExtractTextPlugin({
		// 	filename:'[name].[hash].css', 
		// 	allChunks:true
		// }),
		new MiniCssExtractPlugin({
			filename:'[name].[hash].css'
		}),
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:'"production"'
			}
		}),
		// 压缩已经不用写UglifyJsPlugin
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress:{
		// 		warnings:false
		// 	}
		// }),
		new HtmlWebpackPlugin({
			filename:'../index_prod.html',
			template:'./index.ejs',
			inject:false
		}),
		new VueLoaderPlugin() //vue-loader，15的版本需要再添加plugin的配置
	]
});
```   
index.ejs动态设置了静态资源的路径和文件名。   
ejs是一个js模板库，用来从json数据中生成html字符串，常用于nodejs  
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[0] %>">
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript" src="<%= htmlWebpackPlugin.files.js[0] %>"></script>
</body>
</html> 
```   
>小知识：项目需要重新安装模块的时候，复制好package.json后，npm install   就会安装dependencies字段内的所有依赖模块了。   

node/npm查看安装过的模块或包。结果和文件夹下面的node_modules目录是对应的：
```
npm ls --depth 0
npm ls -g --depth 0
```   
`npm list` 会显示和你已经安装模块的关联模块---这些没有在 package.json文件中被引用。你可以单独 `npm uninstall` 每一个模块或者全部移除它们： `npm prune`