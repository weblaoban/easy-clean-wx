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
        target: "http://192.168.1.241:8081/",
        changeOrigin: true
      }
    }
  }
}
