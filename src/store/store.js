/**
 * Created by jiangjunhuan on 2016/10/28.
 */
 import Vue from 'vue';
 import Vuex from 'vuex';
 import index from './modules/index';
 import details from './modules/details';

 Vue.use(Vuex);

 const store = new Vuex.Store({
     modules: {
        index,
        details
     }
 });

 export default store
 
