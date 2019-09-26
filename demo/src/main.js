import Vue from 'vue'
import App from './App.vue'

// Setting custom messages.
import messages from 'vue-val/messages'

messages.required = () => 'Nein.'
messages.maxLength = (maxCharacters) => `Maximum of the maximum is ${maxCharacters} characters.`,

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
