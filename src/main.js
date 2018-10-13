import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3 from 'web3'

Vue.config.productionTip = false

window.addEventListener('load', () => {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    console.warn('No detecte Metamask')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
