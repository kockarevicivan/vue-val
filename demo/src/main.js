import Vue from 'vue'
import App from './App.vue'

// Setting custom messages.
import { messages } from 'vue-val'

messages.required = () => 'Nein. :('
messages.maxLength = (maxCharacters) => `The highest we can go is ${maxCharacters} characters. :(`,

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
