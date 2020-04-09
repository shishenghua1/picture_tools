const webpack = require('webpack');
module.exports = {
    /* baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/', */
    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    // outputDir: 'dist',
    // pages:{ type:Object,Default:undfind } 
    publicPath:"./",
    outputDir:process.env.outputDir,
    devServer: {
        port: 8001, // 端口号
        host: 'localhost',
        /* lintOnSave:false, */
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            /* '/baseUrl':{
                target:"http://10.91.0.122:8095",         
                changeOrigin: true, *//* 是否跨域 */
               /*  ws: true,
                pathRewrite:{
                    '^/baseUrl':''
                }
            }, */
            '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: '<other_url>'
            }            
        },  // 配置多个代理    
    },
    configureWebpack: {
        plugins: [
 
           new webpack.ProvidePlugin({
 
             $:"jquery",
 
             jQuery:"jquery",
 
             "windows.jQuery":"jquery"
 
           })
 
         ]
     },
     chainWebpack: config => {
        
        config.module
          .rule('md')
          .test(/\.md$/)
          .use('html-loader')
            .loader('html-loader')
            .end()
            .use('markdown-loader').loader('markdown-loader').end()
      }

}