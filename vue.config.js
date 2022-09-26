let proxyObj = {};
proxyObj['/']={
  ws:false,
  target:'http://localhost:8081',
  changeOrigin:true,
  pathRewrite:{
    '^/':''
  }
}

module.exports = {
  transpileDependencies: true,
  devServer:{
    host:'localhost',
    port:8080,
    proxy:proxyObj
  }
}