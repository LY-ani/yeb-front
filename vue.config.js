let proxyObj = {}

proxyObj['/'] = {
  // websocket
  ws: false,
  // 目标地址
  target: 'http://dongeast.top:8181',
  // 发送请求头host会被设置target
  changeOrigin: true,
  // 不重写请求地址
  pathReWrite: {
    '^/': '/'
  }
}



// 设置代理
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}