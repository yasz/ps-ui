module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/es/": {
        target: "http://192.168.2.22:9200", // 代理地址
        pathRewrite: { "^/es": "" }
      },
      "/search/": {
        target: "https://www.zanmeishi.com", // 代理地址
      },
      "/song/": {
        target: "https://www.zanmeishi.com", // 代理地址
      }
    }
  }
};