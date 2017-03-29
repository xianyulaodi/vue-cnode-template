/**
 * Created by jiagnjunhuan on 2017/2/27
 */
import Vue from 'vue';
import axios from 'axios';
import * as types from '../../constants/constants';

const state = {
    topicsList:[]
};

const getters = {

    getTopicsListData: state => state.topicsList
};

const actions = {
	/**
     * @name  获取主页数据
     * 异步的操作交给action,然后将获取到的数据 commit 到 mutations那里去
     * 
     * # 注意点：
     * 坑点：vuex2只能有两个参数，所以如果你的第二个参数中有多个参数，可以用对象的形式,实际的项目中貌似通过router中来传的，待定
     */
    [types.GET_TOPICS]({commit},obj) {
        axios.get(`https://cnodejs.org/api/v1/topics?page=${obj.pageNo}&limit=20&tab=${obj.tab}`)
        .then((response) => {
          console.log(response);
          commit(types.SET_TOPICS, { list: response.data.data })
        }, (err) => {
          console.log(err)
        })
    }  
}

const mutations = {
    // 获取首页的数据
    [types.SET_TOPICS](state,{list}) {
        state.topicsList=list;  //再次记住，mutations是唯一允许更新应用状态的地方
    }
};

export default{
    state,
    getters,
    actions,
    mutations
}