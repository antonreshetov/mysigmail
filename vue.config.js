const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  baseUrl: isProd ? '/create/' : '/',
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  }
}
