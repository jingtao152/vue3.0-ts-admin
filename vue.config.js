const path = require('path')
// const proxy = 'http://192.168.0.100:9528'

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: "./", // 使用相对路径
    assetsDir: 'admin', // 资源目录
    filenameHashing: false, // 生成文件是否带有hash
    productionSourceMap: false, // 不生成map 文件
    indexPath:'index.html',
    chainWebpack: config => {
        config.resolve.alias
            .set('views', resolve('src/views'))
            .set('base', resolve('src/base'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'))
        config.plugins.delete('preload') // 删除preload链接
        config.plugins.delete('prefetch')// prefetch
    },
    // devServer: {
    //     proxy: {
    //         "/sls-auth-server": {
    //             target: proxy, // 域名
    //             changeOrigin: true
    //         }
    //     }
    // }
}
