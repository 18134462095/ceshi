import Vue from 'vue'

const componentsContext = require.context('./', true, /\.js$/)
componentsContext.keys().forEach(components => {
  const componentsConfig = componentsContext(components)
  const ctrl = componentsConfig.default || componentsConfig
  Vue.use(ctrl)
})
