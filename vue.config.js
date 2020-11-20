module.exports = {
  devServer: {
    port: 8079,
    proxy: 'http://hannao.gicp.net:9091/'
  },
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      return [
        {
          ...args[0],
          SERVER_URI: JSON.stringify(process.env.SERVER_URI),
        }
      ]
    })
  }
}
