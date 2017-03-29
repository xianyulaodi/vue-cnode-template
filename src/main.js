// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './app';
import routes from './routes';
import store from './store/store'; // 创建一个 store 对象用于管理应用状态,所有state都存在了这里

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  routes: routes
});

window.__lendApp__ = new Vue({
  el: '#app',
  	   router,
  	   store,
  render: h => h(App)
});