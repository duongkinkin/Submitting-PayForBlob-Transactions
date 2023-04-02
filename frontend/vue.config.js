var path = require("path");
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://localhost:31000",
  },
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src"),
      },
    },
  },
});
