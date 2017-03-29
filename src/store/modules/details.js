/**
 * Created by jiagnjunhuan on 2017/2/27
 */

import axios from 'axios';
import * as types from '../../constants/constants'

const state = {

    detailContent:''
};

const getters = {

    getDetailsData: state => state.detailContent
};

const actions = {
	/**
     * @name 获取详情页
     * @param {string} id
     */
    [types.GET_DETAILS]({commit},id) {
        console.log(id);
        axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
        .then((response) => {
            commit(types.SET_DETAILS,{detail:response.data.data.content})
        }, (err) => {
          console.log(err)
        })            
    }       
}

const mutations = {
    // 处理详情的数据
    [types.SET_DETAILS](state,{detail}) {
        state.detailContent=detail;  //再次记住，mutations是唯一允许更新应用状态的地方
    }   
};

export default{
    state,
    getters,
    actions,
    mutations
}