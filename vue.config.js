const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  // lintOnSave: false,
  transpileDependencies: true,

  // 配置less自动导入
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 那些文件需要自动引入要使用绝对路径
      // 需要path.join拼接完整路径
      patterns: [
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  }
})
