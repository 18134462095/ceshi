import Vue from 'vue'

const componentsContext = require.context('./', true, /\.vue$/)
componentsContext.keys().forEach(components => {
  const componentsConfig = componentsContext(components)
  const ctrl = componentsConfig.default || componentsConfig
  Vue.component(ctrl.name, ctrl)
})
