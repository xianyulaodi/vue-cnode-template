/**
 * Created by jiangjunhuan@yy.com on 17/2/7.
 */
import Vue from 'vue';
import axios from 'axios';
import * as types from '../constants/constants'



export default {

    //初始化state
    state: {
        tabId:0,
        count:1,
        topicsList:[],
        detailContent:''
    },
    /**
     * @ mutations:
     * mutations: 调用 mutations 是唯一允许更新应用状态的地方，也可以这么说 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
     * 类似于react中的reducers，不同点是用户可以直接触发 mutations,可以接受state作为第一个参数
     * 触发方法：store.commit('increment')  例如： his.$store.commit('increment1');
     *
     * ## 注意点：
     * mutations 必须是同步函数，这也是为什么需要action的原因，action可以提交异步操作
     * mutations 有一个固有参数 state
     * 
     */
    mutations: {
        [types.CHANGE_TAB](state, tabId) {
            Object.assign(state, tabId)
        },
        increment1 (state) {
           state.count++
        },
        // 获取首页的数据
        [types.SET_TOPICS](state,{list}) {
            state.topicsList=list;  //再次记住，mutations是唯一允许更新应用状态的地方
        },
        // 处理详情的数据
        [types.SET_DETAILS](state,{detail}) {
            state.detailContent=detail;  //再次记住，mutations是唯一允许更新应用状态的地方
        },        


    },

    /**
     *  @action:
     *  ## action类似于mutation,不同之处在于：
     *  1. Action 提交的是 mutation，而不是直接变更状态。
     *  2. Action 可以包含任意异步操作。
     *
     *  ## 注意点:
     *  和redux不同之处在于：
     *  用户可以直接触发action,也可以跳过这个步骤，直接触发mutations
     *  用户直接触发 action,可以通过 this.$store.dispatch('increment2');
     *  用户也可以直接触发 mutations,可以通过 this.$store.commit('increment1');
     *  action 有一个固有参数  context。 context是state的父级
     */
    actions: {

        increment2: ({ commit }) => commit('increment1'),
        /**
         * @name  获取主页数据
         * 异步的操作交给action,然后将获取到的数据 commit 到 mutations那里去
         * 注意点：
         * 坑点：vuex2只能有两个参数，所以如果你的第二个参数中有多个参数，可以用对象的形式,实际的项目中貌似通过router中来传的，待定
         */
        [types.GET_TOPICS]({commit},obj) {
            axios.get(`https://cnodejs.org/api/v1/topics?page=${obj.pageNo}&limit=20&tab=${obj.tab}`)
            .then((response) => {
              console.log(response);
              commit('SET_TOPICS', { list: response.data.data })
            }, (err) => {
              console.log(err)
            })
        },
        /**
         * @name 获取详情页
         * @param string id
         */
        [types.GET_DETAILS]({commit},id) {
            console.log(id);
            axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
            .then((response) => {
                console.log(response);
                commit('SET_DETAILS',{detail:response.data.data.content})
            }, (err) => {
              console.log(err)
            })            
        }       
    },

    // getters 允许组件从 Store 中获取数据.
    getters: {
        getTopicsList: state => state.topicsList,
        getDetails: state => state.detailContent
    }
}

/**
 * ## Modules
 * 使用单一状态树，导致应用的所有状态集中到一个很大的对象。但是，当应用变得很大时，store 对象会变得臃肿不堪。
 * 为了解决以上问题，Vuex 允许我们将 store 分割到模块（module）。每个模块拥有自己的 state、mutation、action、getters、甚至是嵌套子模块——从上至下进行类似的分割：
 * 
    const moduleA = {
      state: { ... },
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    }

    const moduleB = {
      state: { ... },
      mutations: { ... },
      actions: { ... }
    }

    const store = new Vuex.Store({
      modules: {
        a: moduleA,
        b: moduleB
      }
    })

    store.state.a // -> moduleA 的状态
    store.state.b // -> moduleB 的状态
 *
 * 

    
 */