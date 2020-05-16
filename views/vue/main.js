import Vue from "vue";
import App from './App.vue';
import '../style.scss';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'
import { VueSpinners } from '@saeris/vue-spinners'

Vue.use(VueSpinners);
new Vue({
    el: '#app',
    render: h => h(App)
})
