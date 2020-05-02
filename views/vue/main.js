import Vue from "vue";
import App from './components/Searchbar.vue';
import '../style.scss';
import '@fortawesome/fontawesome-free/css/all.css'
//import '@fortawesome/fontawesome-free/js/all'

new Vue({
    el: '#app',
    render: h => h(App)
})
