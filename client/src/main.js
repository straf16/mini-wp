import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import GSignInButton from 'vue-google-signin-button'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(GSignInButton)
new Vue(App).$mount('#app')
