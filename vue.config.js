module.exports={
  filenameHashing: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            exclude: /(node_module)/,
            remUnit: 100,
            baseDpr: 2
          })
        ]
      },
      sass: {
        data:  `@import "@/scss/resource.scss";`
      }
    }
  },
  devServer: {
    host: 'localhost',
    port: '8089',
    proxy: {
      "/api":{
        target: "http://2689087bm6.qicp.vip:35338/",
        changeOrigin: true
      }
    }
  }
}
