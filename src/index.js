import Vue from 'vue';
import App from './app.vue';
import 'babel-polyfill';

window.addEventListener('load', function () {
    new Vue({
        el: '#app',
        render: h => h(App),
    }).$mount('#app');
})