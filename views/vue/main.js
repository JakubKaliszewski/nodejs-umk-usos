import Vue from "vue";
import App from './components/Hello.vue';
import '../style.scss';

new Vue({
    el: '#app',
    render: h => h(App)
})
