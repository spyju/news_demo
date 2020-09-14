const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode:'development',//production (上线)
    entry: {
        index: path.resolve(__dirname, './src/js/index.js'),
        detail: path.resolve(__dirname, './src/js/detail.js'),
        collections: path.resolve(__dirname, './src/js/collections.js')
    },
    output:{
        path: path.resolve(__dirname + '/dist'),
        filename:"js/[name].js"
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:path.resolve(__dirname,'node_modules'),
                query:{
                    'presets':['latest']
                }
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader',
            },
            {
                test:/\.scss$/,
                use:[
                    // {
                    // loader: MiniCssExtractPlugin.loader,
                    // options: {
                    //     hmr: process.env.NODE_ENV === 'development'
                    // }
                    // },
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:function(){
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'sass-loader'
                ]
                
            },
            {
                test:/\.(png|jpg|jepg|gif|ico)$/i,
                loader:[
                    'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]'
                ]
            },
            
        ]
    },
    plugins:[
        new uglify(),
        new htmlWebpackPlugin({
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
            filename:'index.html',
            template:path.resolve(__dirname,'src/index.html'),
            title:'cjj新闻头条',
            chunksSortMode:'manual',
            chunks:['index'],
            excludesChunks:['node-modules'],
            hash:true
        }),
        new htmlWebpackPlugin({
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
            filename:'detail.html',
            template:path.resolve(__dirname,'src/detail.html'),
            title:'cjj新闻详情',
            chunksSortMode:'manual',
            chunks:['detail'],
            excludesChunks:['node-modules'],
            hash:true
        }),
        new htmlWebpackPlugin({
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
            filename:'collections.html',
            template:path.resolve(__dirname,'src/collections.html'),
            title:'我的收藏',
            chunksSortMode:'manual',
            chunks:['collections'],
            excludesChunks:['node-modules'],
            hash:true
        })
        // new MiniCssExtractPlugin({
        //     filename: 'css/[name].css'
        // })
    ],
    devServer:{
        watchOptions:{
            ignored:/node_modules/
        },
        host:'localhost',
        port: 3200

    }

};

module.exports = config;