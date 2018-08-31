const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
		new ExtractTextPlugin({
			filename:'[name].[hash].css', 
			allChunks:true
		}),
		// new MiniCssExtractPlugin({
		// 	filename:'[name].[hash].css'
		// }),
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